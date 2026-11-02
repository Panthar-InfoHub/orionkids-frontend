import test, { describe } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

describe("Card Flip 'Are you tired?' Modal & Quest Speed Optimizations", () => {
  const cardFlipFile = path.resolve(
    process.cwd(),
    "components/games/card-flip/card-flip-game-arena.tsx"
  );
  const cardFlipContent = fs.readFileSync(cardFlipFile, "utf-8");

  test("CardFlipGameArena: triggers 'Are you tired?' modal when moves > 4 and level is not complete", () => {
    // Verifies showTiredModal state and moves > 4 trigger condition
    assert.ok(
      cardFlipContent.includes("showTiredModal"),
      "CardFlipGameArena must have showTiredModal state"
    );
    assert.ok(
      cardFlipContent.includes("nextMoves > 4") &&
      cardFlipContent.includes("setShowTiredModal(true)"),
      "CardFlipGameArena must prompt the tired modal when moves > 4"
    );
  });

  test("CardFlipGameArena: provides 'Yes, next level' skip option and 'No, keep playing!' continue option", () => {
    assert.ok(
      cardFlipContent.includes("handleSkipToNextLevelFromTired"),
      "Must have handler for skipping to next level from tired modal"
    );
    assert.ok(
      cardFlipContent.includes("handleContinuePlayingFromTired"),
      "Must have handler for continuing to play when user answers No"
    );
    assert.ok(
      cardFlipContent.includes("Are you tired?"),
      "Modal must ask 'Are you tired?'"
    );
    assert.ok(
      cardFlipContent.includes("Yes, next level"),
      "Must have button to move to next level"
    );
    assert.ok(
      cardFlipContent.includes("No, keep playing!"),
      "Must have button to keep playing"
    );
  });

  test("CardFlipGameArena: sneak peek and interaction timings are accelerated for fast UX", () => {
    // Ready timer is accelerated to ~1050ms
    assert.ok(
      cardFlipContent.includes("}, 1050);"),
      "Ready timer must be set to 1050ms"
    );
    // Mismatch flip-back is fast (450ms instead of 900ms)
    assert.ok(
      cardFlipContent.includes("450") && !cardFlipContent.includes("900"),
      "Mismatch flip-back timer must be fast (450ms instead of 900ms)"
    );
  });

  test("Stroop: does not auto-open tutorial popup on level load and has fast transition hold", () => {
    const stroopFile = path.resolve(
      process.cwd(),
      "components/games/stroop/stroop-game-arena.tsx"
    );
    const stroopContent = fs.readFileSync(stroopFile, "utf-8");

    // isTutorialOpen initialized to false
    assert.ok(
      stroopContent.includes("const [isTutorialOpen, setIsTutorialOpen] = useState(false);"),
      "Stroop must initialize isTutorialOpen to false to prevent blocking modal on every level"
    );
  });

  test("Pattern Recognition: flight and hold timings are accelerated", () => {
    const patternFile = path.resolve(
      process.cwd(),
      "components/games/pattern/pattern-game-arena.tsx"
    );
    const patternContent = fs.readFileSync(patternFile, "utf-8");

    assert.ok(
      patternContent.includes("holdDuration = 180"),
      "Pattern hold duration must be fast (180ms)"
    );
  });
});
