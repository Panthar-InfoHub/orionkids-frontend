/**
 * OrionKids In-Game Tutorial Session Helper
 *
 * Scopes tutorial completion tracking to the active quest session ID, ensuring that:
 * 1. Every fresh quest session automatically presents the 3-stage "How to Play" tutorial
 *    at Level 1 of each game.
 * 2. Subsequent levels (Level 2 & Level 3) in the same game are not interrupted.
 * 3. Page reloads within the same level do not annoyingly re-trigger the tutorial once dismissed.
 */

export function getTutorialStorageKey(gameKey: string, sessionId?: string | null): string {
  const normalizedKey = gameKey.replace(/-/g, "_");
  if (sessionId && sessionId.trim().length > 0) {
    return `orion_tut_${sessionId.trim()}_${normalizedKey}`;
  }
  return `orion_tut_seen_${normalizedKey}`;
}

export function shouldAutoOpenTutorial(
  gameKey: string,
  level: number,
  sessionId?: string | null
): boolean {
  if (level !== 1 || typeof window === "undefined") {
    return false;
  }
  try {
    const key = getTutorialStorageKey(gameKey, sessionId);
    return sessionStorage.getItem(key) !== "1";
  } catch {
    return false;
  }
}

export function markTutorialAsSeen(gameKey: string, sessionId?: string | null): void {
  if (typeof window === "undefined") {
    return;
  }
  try {
    const key = getTutorialStorageKey(gameKey, sessionId);
    sessionStorage.setItem(key, "1");
  } catch {
    // Ignore storage errors in restricted contexts
  }
}
