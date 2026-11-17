import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {
  shouldAutoOpenTutorial,
  markTutorialAsSeen,
  getTutorialStorageKey,
} from "../lib/utils/game-tutorial-session";

// In-memory mock sessionStorage for Node environment
class MockSessionStorage {
  private store: Map<string, string> = new Map();

  getItem(key: string): string | null {
    return this.store.get(key) || null;
  }

  setItem(key: string, value: string): void {
    this.store.set(key, value);
  }

  removeItem(key: string): void {
    this.store.delete(key);
  }

  clear(): void {
    this.store.clear();
  }
}

describe("OrionKids — In-Game 'How to Play' Preview & Tutorial Auto-Open Suite", () => {
  beforeEach(() => {
    (global as any).window = {};
    (global as any).sessionStorage = new MockSessionStorage();
  });

  describe("Part 1: shouldAutoOpenTutorial & markTutorialAsSeen Logic", () => {
    it("1. shouldAutoOpenTutorial returns true on Level 1 for a fresh quest session", () => {
      const sessionId = "sess_test_101";
      const games = ["stroop", "card-flip", "pattern", "odd-one-out", "rule-discovery", "story-sequencing"];

      for (const game of games) {
        assert.equal(
          shouldAutoOpenTutorial(game, 1, sessionId),
          true,
          `Game ${game} must auto-open tutorial on Level 1 for fresh session`
        );
      }
    });

    it("2. shouldAutoOpenTutorial returns false on Level 2 and Level 3", () => {
      const sessionId = "sess_test_102";
      assert.equal(shouldAutoOpenTutorial("stroop", 2, sessionId), false);
      assert.equal(shouldAutoOpenTutorial("stroop", 3, sessionId), false);
      assert.equal(shouldAutoOpenTutorial("card-flip", 2, sessionId), false);
      assert.equal(shouldAutoOpenTutorial("pattern", 2, sessionId), false);
      assert.equal(shouldAutoOpenTutorial("rule-discovery", 2, sessionId), false);
    });

    it("3. markTutorialAsSeen marks the session key and prevents re-triggering within the same session", () => {
      const sessionId = "sess_test_103";
      assert.equal(shouldAutoOpenTutorial("card-flip", 1, sessionId), true);

      markTutorialAsSeen("card-flip", sessionId);
      assert.equal(
        shouldAutoOpenTutorial("card-flip", 1, sessionId),
        false,
        "Tutorial must not re-trigger once marked as seen for this session"
      );
    });

    it("4. A new quest session ID automatically prompts the tutorial on Level 1 again", () => {
      const sessionA = "sess_child_A";
      const sessionB = "sess_child_B";

      markTutorialAsSeen("card-flip", sessionA);
      assert.equal(shouldAutoOpenTutorial("card-flip", 1, sessionA), false);

      // Child B starts fresh
      assert.equal(
        shouldAutoOpenTutorial("card-flip", 1, sessionB),
        true,
        "New session must auto-open tutorial on Level 1"
      );
    });

    it("5. getTutorialStorageKey builds authoritative session-scoped key", () => {
      assert.equal(
        getTutorialStorageKey("stroop", "session_abc"),
        "orion_tut_session_abc_stroop"
      );
      assert.equal(
        getTutorialStorageKey("card-flip", null),
        "orion_tut_seen_card_flip"
      );
    });
  });

  describe("Part 2: All 6 Game Arenas Integration Audit", () => {
    const arenaFiles = [
      { name: "Stroop", file: "components/games/stroop/stroop-game-arena.tsx", key: "stroop" },
      { name: "Card Flip", file: "components/games/card-flip/card-flip-game-arena.tsx", key: "card-flip" },
      { name: "Pattern", file: "components/games/pattern/pattern-game-arena.tsx", key: "pattern" },
      { name: "Odd One Out", file: "components/games/odd-one-out/odd-one-out-game-arena.tsx", key: "odd-one-out" },
      { name: "Rule Discovery", file: "components/games/rule-discovery/rule-discovery-game-arena.tsx", key: "rule-discovery" },
      { name: "Story Sequencing", file: "components/games/story-sequencing/story-sequencing-game-arena.tsx", key: "story-sequencing" },
    ];

    it("6. Every game arena imports and calls shouldAutoOpenTutorial and markTutorialAsSeen", () => {
      for (const arena of arenaFiles) {
        const fullPath = path.resolve(process.cwd(), arena.file);
        const content = fs.readFileSync(fullPath, "utf-8");

        assert.ok(
          content.includes("shouldAutoOpenTutorial"),
          `${arena.name} arena must import and call shouldAutoOpenTutorial`
        );
        assert.ok(
          content.includes("markTutorialAsSeen"),
          `${arena.name} arena must import and call markTutorialAsSeen`
        );
        assert.ok(
          content.includes(`"${arena.key}"`),
          `${arena.name} arena must check for game key "${arena.key}"`
        );
      }
    });

    it("7. Card Flip defers deal and sneak-peek animation until tutorial is dismissed", () => {
      const cardFlipPath = path.resolve(
        process.cwd(),
        "components/games/card-flip/card-flip-game-arena.tsx"
      );
      const content = fs.readFileSync(cardFlipPath, "utf-8");

      assert.ok(
        content.includes("startDealAndSneakPeekSequence"),
        "Card Flip must have isolated startDealAndSneakPeekSequence method"
      );
      assert.ok(
        content.includes("startDealAndSneakPeekSequence();"),
        "Card Flip must launch deal sequence upon tutorial dismiss"
      );
    });
  });
});

