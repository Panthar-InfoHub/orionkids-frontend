/**
 * In-flight deduplication and ordered persistence queue for level attempt checkpoints.
 * Prevents network congestion, duplicate submissions, and out-of-order state overwrites.
 */

interface CheckpointTask {
  sessionId: string;
  attemptId: string;
  checkpoint: Record<string, unknown>;
  seq: number;
}

const inFlightMap = new Map<string, boolean>();
const pendingMap = new Map<string, CheckpointTask>();
const sequenceMap = new Map<string, number>();

/**
 * Clears any pending queued checkpoints for an attempt (e.g. upon final level completion).
 */
export function clearPendingCheckpoints(sessionId: string, attemptId: string) {
  const key = `${sessionId}:${attemptId}`;
  pendingMap.delete(key);
}

/**
 * Queues a checkpoint save with in-flight deduplication and sequencing.
 */
export async function queueCheckpointSave(
  apiUrl: string,
  sessionId: string,
  attemptId: string,
  checkpoint: Record<string, unknown>
): Promise<boolean> {
  if (!apiUrl || !sessionId || !attemptId) return true;

  const key = `${sessionId}:${attemptId}`;
  const seq = (sequenceMap.get(key) || 0) + 1;
  sequenceMap.set(key, seq);

  const task: CheckpointTask = {
    sessionId,
    attemptId,
    checkpoint,
    seq,
  };

  if (inFlightMap.get(key)) {
    // Store latest checkpoint to be dispatched once in-flight request completes
    pendingMap.set(key, task);
    return true;
  }

  return executeSave(apiUrl, key, task);
}

async function executeSave(
  apiUrl: string,
  key: string,
  task: CheckpointTask
): Promise<boolean> {
  inFlightMap.set(key, true);

  try {
    const res = await fetch(
      `${apiUrl}/api/quest/sessions/${encodeURIComponent(task.sessionId)}/attempts/${encodeURIComponent(task.attemptId)}/checkpoint`,
      {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ checkpoint: task.checkpoint }),
      }
    );

    // If account was restricted during active gameplay, route immediately to branded restriction page
    if (res.status === 403) {
      const data = await res.json().catch(() => null);
      if (
        data?.code === "ACCOUNT_RESTRICTED" ||
        data?.error?.code === "ACCOUNT_RESTRICTED"
      ) {
        import("./auth").then(({ broadcastAccountRestricted }) => {
          broadcastAccountRestricted(data?.data?.restrictedReason || data?.error?.message);
        }).catch(() => {});

        if (typeof window !== "undefined" && !window.location.pathname.includes("/account/restricted")) {
          window.location.replace("/account/restricted");
        }
      }
    }

    return res.ok;
  } catch (err) {
    console.warn("[checkpoint-queue] Non-blocking checkpoint save note:", err);
    return false;
  } finally {
    inFlightMap.delete(key);
    // If a newer checkpoint was queued while this save was in flight, process it now
    const nextTask = pendingMap.get(key);
    if (nextTask) {
      pendingMap.delete(key);
      executeSave(apiUrl, key, nextTask).catch(() => {});
    }
  }
}

