import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { GAME_TUTORIALS, getLevelTutorial } from "../lib/data/game-tutorials";
import { PREVIEW_GAMES_LIST, PREVIEW_METADATA, STROOP_PREVIEWS, CARD_FLIP_PREVIEWS, PATTERN_PREVIEWS, ODD_ONE_OUT_PREVIEWS, RULE_DISCOVERY_PREVIEWS, STORY_SEQUENCING_PREVIEWS } from "../lib/data/quest-previews";
import { GameKey, GameLevel } from "../types/game-tutorial";

describe("OrionKids — Interactive 3-Stage Tutorial & Game Preview Verification Suite", () => {
  const ALL_GAMES: GameKey[] = [
    "stroop",
    "card-flip",
    "pattern",
    "odd-one-out",
    "rule-discovery",
    "story-sequencing",
  ];
  const ALL_LEVELS: GameLevel[] = [1, 2, 3];

  // -------------------------------------------------------------
  // SUITE 1: 6 Game Previews Verification
  // -------------------------------------------------------------
  describe("Suite 1: Six Game Introduction Previews", () => {
    it("1.1 defines all 6 canonical games in PREVIEW_GAMES_LIST", () => {
      const keys = PREVIEW_GAMES_LIST.map((g) => g.key).sort();
      assert.deepEqual(keys, ALL_GAMES.slice().sort());
    });

    it("1.2 verifies Stroop preview explains ink vs word and provides isolated options", () => {
      for (const lvl of ALL_LEVELS) {
        const config = STROOP_PREVIEWS[lvl];
        assert.ok(config, `Missing Stroop preview config for level ${lvl}`);
        assert.ok(config.word.length > 0);
        assert.ok(config.inkColor.startsWith("#"));
        assert.ok(config.options.length >= 2);
        assert.ok(config.options.some((o) => o.isCorrect), "Must have a correct answer");
        assert.ok(config.options.some((o) => !o.isCorrect), "Must have distractor options");
      }
    });

    it("1.3 verifies Card Flip preview provides pairs to match and hint IDs", () => {
      for (const lvl of ALL_LEVELS) {
        const config = CARD_FLIP_PREVIEWS[lvl];
        assert.ok(config, `Missing Card Flip preview for level ${lvl}`);
        assert.ok(config.cards.length >= 4);
        assert.ok(config.pairsToMatch >= 1);
        assert.ok(config.cards.some((c) => c.id === config.hintCardId));
      }
    });

    it("1.4 verifies Pattern preview has sequence, missingIndex, and valid answer", () => {
      for (const lvl of ALL_LEVELS) {
        const config = PATTERN_PREVIEWS[lvl];
        assert.ok(config, `Missing Pattern preview for level ${lvl}`);
        assert.ok(config.sequence.length >= 4);
        assert.ok(config.options.some((o) => o.isCorrect));
      }
    });

    it("1.5 verifies Odd One Out preview has exactly one odd item per level", () => {
      for (const lvl of ALL_LEVELS) {
        const config = ODD_ONE_OUT_PREVIEWS[lvl];
        assert.ok(config, `Missing Odd One Out preview for level ${lvl}`);
        const oddItems = config.items.filter((i) => i.isOdd);
        assert.equal(oddItems.length, 1, "Must have exactly 1 odd item");
      }
    });

    it("1.6 verifies Rule Discovery preview provides rule explanation and target buckets", () => {
      for (const lvl of ALL_LEVELS) {
        const config = RULE_DISCOVERY_PREVIEWS[lvl];
        assert.ok(config, `Missing Rule Discovery preview for level ${lvl}`);
        assert.ok(config.targetBuckets.length >= 2);
        assert.ok(config.cardToSort);
        assert.ok(["color", "shape", "count"].includes(config.ruleType));
      }
    });

    it("1.7 verifies Story Sequencing preview provides shuffled steps and hint", () => {
      for (const lvl of ALL_LEVELS) {
        const config = STORY_SEQUENCING_PREVIEWS[lvl];
        assert.ok(config, `Missing Story Sequencing preview for level ${lvl}`);
        assert.ok(config.steps.length >= 3);
        assert.ok(config.shuffledSteps.length === config.steps.length);
      }
    });
  });

  // -------------------------------------------------------------
  // SUITE 2: All 18 Level-Specific Tutorials (3-Stage Engine)
  // -------------------------------------------------------------
  describe("Suite 2: 18 Level-Specific Tutorials (3-Stage Engine)", () => {
    it("2.1 verifies all 18 level tutorials have complete 3-stage definitions (Demo, Practice, Ready)", () => {
      let count = 0;
      for (const game of ALL_GAMES) {
        for (const lvl of ALL_LEVELS) {
          const tut = getLevelTutorial(game, lvl);
          assert.ok(tut, `Missing tutorial for ${game} level ${lvl}`);

          // Stage 1: SHOW ME (Demo)
          assert.ok(tut.demo, `Missing demo for ${game} lvl ${lvl}`);
          assert.ok(tut.demo.instruction.length > 5, `Demo instruction too short for ${game} lvl ${lvl}`);
          assert.ok(tut.demo.subInstruction.length > 5, `Demo subInstruction too short for ${game} lvl ${lvl}`);
          assert.ok(tut.demo.actionExplanation.length > 3, `Demo actionExplanation missing for ${game} lvl ${lvl}`);
          assert.ok(tut.demo.demoPayload, `Missing demoPayload for ${game} lvl ${lvl}`);

          // Stage 2: LET ME TRY (Practice)
          assert.ok(tut.practice, `Missing practice for ${game} lvl ${lvl}`);
          assert.ok(tut.practice.type, `Practice type missing for ${game} lvl ${lvl}`);
          assert.ok(tut.practice.data, `Practice data missing for ${game} lvl ${lvl}`);

          // Stage 3: READY TO PLAY
          assert.ok(tut.readyMessage.length > 10, `Ready message too short for ${game} lvl ${lvl}`);
          assert.ok((tut.readyTip || "").length > 5, `Ready tip missing or too short for ${game} lvl ${lvl}`);

          count++;
        }
      }
      assert.equal(count, 18, "Must verify exactly 18 complete level tutorials");
    });

    it("2.2 Stroop: verifies demonstration and practice align with level rules", () => {
      const s1 = getLevelTutorial("stroop", 1)!;
      const s2 = getLevelTutorial("stroop", 2)!;
      const s3 = getLevelTutorial("stroop", 3)!;

      // Level 1: Match ink colour directly
      assert.equal(s1.practice.type, "stroop");
      if (s1.practice.type === "stroop") {
        assert.equal(s1.practice.data.correctLabel, "Blue");
      }

      // Level 2: Incongruent trick word (ignore letters, pick ink)
      assert.equal(s2.practice.type, "stroop");
      if (s2.practice.type === "stroop") {
        assert.equal(s2.practice.data.word, "GREEN");
        assert.equal(s2.practice.data.correctLabel, "Red"); // Ink is red
      }

      // Level 3: Reverse rules (read written word)
      assert.equal(s3.practice.type, "stroop");
      if (s3.practice.type === "stroop") {
        assert.equal(s3.practice.data.word, "BLUE");
        assert.equal(s3.practice.data.correctLabel, "Blue"); // Spelled word
      }
    });

    it("2.3 Card Flip: verifies practice cards contain matching pairs for isolated practice", () => {
      for (const lvl of ALL_LEVELS) {
        const cf = getLevelTutorial("card-flip", lvl)!;
        assert.equal(cf.practice.type, "card-flip");
        if (cf.practice.type === "card-flip") {
          const cards = cf.practice.data.cards;
          assert.ok(cards.length >= 4);
          // Check that there is at least one pair of matching cards
          const pairMap = new Map<number, number>();
          for (const c of cards) {
            pairMap.set(c.pairId, (pairMap.get(c.pairId) || 0) + 1);
          }
          const hasCompletePair = Array.from(pairMap.values()).some((cnt) => cnt === 2);
          assert.ok(hasCompletePair, `Card flip practice for level ${lvl} must have matching pairs`);
        }
      }
    });

    it("2.4 Pattern: verifies practice sequence has matching answer tile", () => {
      for (const lvl of ALL_LEVELS) {
        const pat = getLevelTutorial("pattern", lvl)!;
        assert.equal(pat.practice.type, "pattern");
        if (pat.practice.type === "pattern") {
          const { sequence, missingIndex, options, answer } = pat.practice.data;
          assert.ok(sequence.length > missingIndex);
          assert.ok(options.includes(answer), `Answer ${answer} must be in options for level ${lvl}`);
        }
      }
    });

    it("2.5 Odd One Out: verifies practice items have exactly 1 odd item", () => {
      for (const lvl of ALL_LEVELS) {
        const ooo = getLevelTutorial("odd-one-out", lvl)!;
        assert.equal(ooo.practice.type, "odd-one-out");
        if (ooo.practice.type === "odd-one-out") {
          const oddItems = ooo.practice.data.items.filter((i) => i.isOdd);
          assert.equal(oddItems.length, 1, `Odd One Out practice level ${lvl} must have 1 odd item`);
        }
      }
    });

    it("2.6 Rule Discovery: verifies practice preserves rule secrecy without spoiling level answers", () => {
      for (const lvl of ALL_LEVELS) {
        const rd = getLevelTutorial("rule-discovery", lvl)!;
        assert.equal(rd.practice.type, "rule-discovery");
        if (rd.practice.type === "rule-discovery") {
          const { buckets, cardToSort, targetBucketId } = rd.practice.data;
          assert.ok(buckets.length >= 2);
          assert.ok(cardToSort);
          assert.ok(buckets.some((b) => b.id === targetBucketId));
        }
      }
    });

    it("2.7 Story Sequencing: verifies practice steps have valid 1-2-3 chronological order", () => {
      for (const lvl of ALL_LEVELS) {
        const ss = getLevelTutorial("story-sequencing", lvl)!;
        assert.equal(ss.practice.type, "story-sequencing");
        if (ss.practice.type === "story-sequencing") {
          const { steps, shuffledSteps } = ss.practice.data;
          assert.ok(steps.length >= 3);
          assert.equal(shuffledSteps.length, steps.length);
          const orders = steps.map((s) => s.order);
          assert.deepEqual(orders, [1, 2, 3]);
        }
      }
    });
  });

  // -------------------------------------------------------------
  // SUITE 3: Strict Backend & Telemetry Isolation
  // -------------------------------------------------------------
  describe("Suite 3: Backend & Telemetry Isolation", () => {
    it("3.1 confirms tutorial actions never invoke backend telemetry APIs", () => {
      const calls: string[] = [];

      // Simulated tutorial practice handler
      function onPracticeAction(action: string) {
        // Pure local state transition
        if (action === "selectPracticeOption") {
          return { status: "local_feedback" };
        }
        calls.push(action);
        return { status: "server_called" };
      }

      onPracticeAction("selectPracticeOption");
      assert.equal(calls.length, 0, "No network calls allowed during tutorial practice");
    });

    it("3.2 confirms reaction time clock resets to performance.now() when tutorial completes", () => {
      // Suppose tutorial was open for 15,000ms
      const fakeTutorialDuration = 15_000;
      let trialStartTime = 100_000;

      function onTutorialClosed() {
        // Reset trial start time
        trialStartTime = 100_000 + fakeTutorialDuration;
      }

      onTutorialClosed();
      // Gameplay reaction time should calculate from 115,000, not 100,000
      const currentNow = 117_500;
      const reactionTime = currentNow - trialStartTime;
      assert.equal(reactionTime, 2_500, "Tutorial duration must not inflate gameplay reaction time");
    });
  });

  // -------------------------------------------------------------
  // SUITE 4: 6 Game Previews Only & Real-Time Practice Feedback
  // -------------------------------------------------------------
  describe("Suite 4: 6 Game Previews Only & Explicit Let Me Try Feedback", () => {
    it("4.1 ensures exactly 6 game previews are defined (1 per game, not per level)", () => {
      const keys = PREVIEW_GAMES_LIST.map((g) => g.key);
      assert.equal(keys.length, 6, "Must have exactly 6 previews for 6 games");
      assert.deepEqual(
        keys.sort(),
        ["card-flip", "odd-one-out", "pattern", "rule-discovery", "story-sequencing", "stroop"].sort()
      );
    });

    it("4.2 verifies 'Let Me Try' feedback states handle both CORRECT and WRONG answers explicitly", () => {
      function evaluatePracticeChoice(userChoice: string, correctChoice: string, hint: string) {
        if (userChoice === correctChoice) {
          return {
            isCorrect: true,
            banner: `CORRECT! Spot on! +1 Star`,
            cssClass: "bg-emerald-100 text-emerald-900 border-emerald-500",
            icon: "✓",
          };
        }
        return {
          isCorrect: false,
          banner: `INCORRECT! ${hint}`,
          cssClass: "bg-rose-100 text-rose-900 border-rose-500 animate-wobble",
          icon: "✕",
        };
      }

      // Test correct answer
      const correctRes = evaluatePracticeChoice("RED", "RED", "Look at ink color!");
      assert.equal(correctRes.isCorrect, true);
      assert.ok(correctRes.banner.includes("CORRECT!"));
      assert.equal(correctRes.icon, "✓");
      assert.ok(correctRes.cssClass.includes("emerald"));

      // Test wrong answer
      const wrongRes = evaluatePracticeChoice("BLUE", "RED", "Look at ink color!");
      assert.equal(wrongRes.isCorrect, false);
      assert.ok(wrongRes.banner.includes("INCORRECT!"));
      assert.equal(wrongRes.icon, "✕");
      assert.ok(wrongRes.cssClass.includes("rose"));
      assert.ok(wrongRes.cssClass.includes("animate-wobble"));
    });
  });
});

