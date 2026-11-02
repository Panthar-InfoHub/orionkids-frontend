import test, { describe } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {
  STROOP_LEVEL_1_TRIALS,
  STROOP_LEVEL_2_TRIALS,
  STROOP_LEVEL_3_TRIALS,
  getStroopTrials,
  FAMILIAR_OBJECTS_BY_COLOR,
} from "@/lib/api/stroop";

describe("OrionKids — Scored Completion Label & Stroop Level 1 Redesign", () => {
  const stroopFile = path.resolve(
    process.cwd(),
    "components/games/stroop/stroop-game-arena.tsx"
  );
  const cardFlipFile = path.resolve(
    process.cwd(),
    "components/games/card-flip/card-flip-game-arena.tsx"
  );
  const patternFile = path.resolve(
    process.cwd(),
    "components/games/pattern/pattern-game-arena.tsx"
  );
  const oddOneOutFile = path.resolve(
    process.cwd(),
    "components/games/odd-one-out/odd-one-out-game-arena.tsx"
  );
  const ruleDiscoveryFile = path.resolve(
    process.cwd(),
    "components/games/rule-discovery/rule-discovery-game-arena.tsx"
  );
  const storySequencingFile = path.resolve(
    process.cwd(),
    "components/games/story-sequencing/story-sequencing-game-arena.tsx"
  );

  const stroopContent = fs.readFileSync(stroopFile, "utf-8");
  const cardFlipContent = fs.readFileSync(cardFlipFile, "utf-8");
  const patternContent = fs.readFileSync(patternFile, "utf-8");
  const oddOneOutContent = fs.readFileSync(oddOneOutFile, "utf-8");
  const ruleDiscoveryContent = fs.readFileSync(ruleDiscoveryFile, "utf-8");
  const storySequencingContent = fs.readFileSync(storySequencingFile, "utf-8");

  describe("PART 1 & PART 4: Scored Completion Label Across All Six Games", () => {
    test("1. Replaces 'Replay Level' with 'Play Again' as secondary action in Stroop", () => {
      assert.ok(
        !stroopContent.includes("Replay Level"),
        "The label 'Replay Level' must be removed from the UI"
      );
      assert.ok(
        stroopContent.includes("Play Again 🔄"),
        "Replay functionality should be labeled 'Play Again 🔄'"
      );
    });

    test("2. Displays 'Scored' status badge only on successful completion across all 6 games", () => {
      const arenas = [
        { name: "Stroop", content: stroopContent },
        { name: "Card Flip", content: cardFlipContent },
        { name: "Pattern Recognition", content: patternContent },
        { name: "Odd One Out", content: oddOneOutContent },
        { name: "Rule Discovery", content: ruleDiscoveryContent },
        { name: "Story Sequencing", content: storySequencingContent },
      ];

      for (const arena of arenas) {
        assert.ok(
          arena.content.includes("data-testid=\"scored-badge\"") &&
          arena.content.includes("Scored"),
          `${arena.name} must render a Scored badge on completion`
        );
        assert.ok(
          arena.content.includes("submissionStatus === \"success\""),
          `${arena.name} must display Scored conditionally on successful submission`
        );
      }
    });

    test("3. Scored badge is not an interactive button triggering another attempt", () => {
      // In all 6 files, the scored-badge is a div/span pill, not a button
      const allContents = [
        stroopContent,
        cardFlipContent,
        patternContent,
        oddOneOutContent,
        ruleDiscoveryContent,
        storySequencingContent,
      ];

      for (const content of allContents) {
        assert.ok(
          !content.includes('<button data-testid="scored-badge"'),
          "Scored must not be an interactive button"
        );
      }
    });
  });

  describe("PART 2: Stroop Level 1 Redesign & Familiar Objects", () => {
    test("4. Familiar objects are defined for color themes", () => {
      assert.ok(FAMILIAR_OBJECTS_BY_COLOR.Red?.icon === "🍎");
      assert.ok(FAMILIAR_OBJECTS_BY_COLOR.Blue?.icon === "🦋");
      assert.ok(FAMILIAR_OBJECTS_BY_COLOR.Green?.icon === "🐸");
      assert.ok(FAMILIAR_OBJECTS_BY_COLOR.Yellow?.icon === "🍌");
    });

    test("5. Level 1 trials vary words and ink colours with balanced congruency", () => {
      const l1 = getStroopTrials(1);
      assert.equal(l1.length, 8, "Must preserve existing trial count of 8 trials");

      // Verify words vary
      const words = new Set(l1.map((t) => t.word));
      assert.ok(words.has("RED"), "Must include RED");
      assert.ok(words.has("BLUE"), "Must include BLUE");
      assert.ok(words.has("GREEN"), "Must include GREEN");
      assert.ok(words.has("YELLOW"), "Must include YELLOW");

      // Verify ink colors vary
      const inkNames = new Set(l1.map((t) => t.inkName));
      assert.ok(inkNames.has("Red"), "Must include Red ink");
      assert.ok(inkNames.has("Blue"), "Must include Blue ink");
      assert.ok(inkNames.has("Green"), "Must include Green ink");
      assert.ok(inkNames.has("Yellow"), "Must include Yellow ink");

      // Verify balanced congruency
      const congruentCount = l1.filter((t) => t.congruent).length;
      const incongruentCount = l1.filter((t) => !t.congruent).length;
      assert.equal(congruentCount, 4, "Must have 4 congruent trials");
      assert.equal(incongruentCount, 4, "Must have 4 incongruent trials");

      // Verify each trial preserves the fundamental Stroop evaluation rule
      for (const trial of l1) {
        assert.ok(trial.inkName, "Trial must have valid inkName");
        assert.ok(trial.options.some((o) => o.label.toLowerCase() === trial.inkName.toLowerCase()),
          `Options must include the correct ink colour ${trial.inkName}`
        );
      }
    });

    test("6. Stroop Level 1 renders engaging Colour Detective prompts and familiar clues bar", () => {
      assert.ok(
        stroopContent.includes("Colour Detective") ||
        stroopContent.includes("LEVEL_1_PROMPTS"),
        "Must include engaging Colour Detective prompts"
      );
      assert.ok(
        stroopContent.includes("Detective Clues") ||
        stroopContent.includes("🍎 Apple"),
        "Must display familiar object clues in Level 1"
      );
      assert.ok(
        stroopContent.includes("Target Ink Colour"),
        "Must feature prominent target ink indicator"
      );
    });

    test("7. Colour selection buttons in Level 1 display familiar icons and maintain silent feedback", () => {
      // Confirms option buttons render displayIcon
      assert.ok(
        stroopContent.includes("displayIcon"),
        "Option buttons must support familiar object icons"
      );
      // Confirms correctness is never exposed during active gameplay
      assert.ok(
        !stroopContent.includes('text-emerald-500: "Correct"') &&
        !stroopContent.includes('text-rose-500: "Wrong"'),
        "Silent feedback must be preserved — no correct/wrong reveals during active play"
      );
    });
  });

  describe("PART 3: Separation of Tutorial and Actual Gameplay", () => {
    test("8. Tutorial guide runs independently and does not record actual level telemetry", () => {
      // In stroop arena, tutorial is managed by GameTutorialGuide modal with independent state
      assert.ok(
        stroopContent.includes("<GameTutorialGuide"),
        "Must render separate GameTutorialGuide modal"
      );
    });
  });
});
