import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  COSMIC_COLORS,
  CosmicShape,
  getCardLabel,
  type CosmicColor,
  type CosmicShapeType,
} from "../components/games/rule-discovery/cosmic-shapes";
import {
  isRuleMatch,
  LEVEL_1_ROUNDS,
  LEVEL_2_ROUNDS,
  LEVEL_3_ROUNDS,
  getRoundsForLevel,
  createRound,
} from "../components/games/rule-discovery/rule-discovery-data";
import { QUEST_GAMES_METADATA } from "../lib/api/quest";

describe("OrionKids — Rule Discovery Game Enhancement Verification Suite", () => {
  // =========================================================================
  // 1. VISUAL RENDERING & YELLOW TRIANGLE COLOR BUG FIX
  // =========================================================================
  describe("1. Centralized Color Configuration & Yellow Triangle Bug Fix", () => {
    it("1.1 defines centralized color palette with exact hex codes and navy stroke", () => {
      assert.equal(COSMIC_COLORS.red.hex, "#EF4444", "Red must be #EF4444");
      assert.equal(COSMIC_COLORS.blue.hex, "#2563EB", "Blue must be #2563EB");
      assert.equal(COSMIC_COLORS.yellow.hex, "#FACC15", "Yellow must be #FACC15");

      assert.equal(COSMIC_COLORS.red.stroke, "#0A1D3D", "Red stroke must be #0A1D3D");
      assert.equal(COSMIC_COLORS.blue.stroke, "#0A1D3D", "Blue stroke must be #0A1D3D");
      assert.equal(COSMIC_COLORS.yellow.stroke, "#0A1D3D", "Yellow stroke must be #0A1D3D");
    });

    it("1.2 renders accessible text labels for all combinations (never relying on color alone)", () => {
      const yellowTriangleLabel = getCardLabel("yellow", "triangle");
      assert.equal(yellowTriangleLabel, "Yellow Triangle");

      const blueCircleLabel = getCardLabel("blue", "circle");
      assert.equal(blueCircleLabel, "Blue Circle");

      const redSquareLabel = getCardLabel("red", "square");
      assert.equal(redSquareLabel, "Red Square");
    });

    it("1.3 verifies triangle shape renders with fill='#FACC15' and not white text color", () => {
      const element = CosmicShape({ shape: "triangle", color: "yellow", size: 36 });
      assert.ok(element, "CosmicShape must return a valid React element");
      assert.equal(element.type, "svg");

      const children = Array.isArray(element.props.children)
        ? element.props.children.filter(Boolean)
        : [element.props.children];
      const polygon = children.find((c: any) => c.type === "polygon");
      assert.ok(polygon, "Must find polygon child element");
      assert.equal(
        polygon.props.fill,
        "#FACC15",
        "Triangle polygon fill MUST be #FACC15 (not white or inherit)"
      );
      assert.equal(polygon.props.stroke, "#0A1D3D");
      assert.ok(polygon.props.points.includes("50,12"));
    });

    it("1.4 verifies circle and square shapes render their configured SVG fills", () => {
      const circleEl = CosmicShape({ shape: "circle", color: "red", size: 32 });
      const circleChildren = Array.isArray(circleEl.props.children)
        ? circleEl.props.children.filter(Boolean)
        : [circleEl.props.children];
      const circleChild = circleChildren.find((c: any) => c.type === "circle");
      assert.ok(circleChild);
      assert.equal(circleChild.props.fill, "#EF4444");

      const squareEl = CosmicShape({ shape: "square", color: "blue", size: 32 });
      const squareChildren = Array.isArray(squareEl.props.children)
        ? squareEl.props.children.filter(Boolean)
        : [squareEl.props.children];
      const squareChild = squareChildren.find((c: any) => c.type === "rect");
      assert.ok(squareChild);
      assert.equal(squareChild.props.fill, "#2563EB");
    });
  });

  // =========================================================================
  // 2. LEVEL 1 — COLOR MATCHING LOGIC
  // =========================================================================
  describe("2. Level 1 — Color Matching Evaluation", () => {
    it("2.1 accepts same color regardless of different shape", () => {
      const target = { color: "blue" as CosmicColor, shape: "circle" as CosmicShapeType };
      const option = { color: "blue" as CosmicColor, shape: "square" as CosmicShapeType };

      const isMatch = isRuleMatch("COLOR", target, option);
      assert.equal(isMatch, true, "Same color must match under COLOR rule");
    });

    it("2.2 rejects different color even if shape matches", () => {
      const target = { color: "blue" as CosmicColor, shape: "circle" as CosmicShapeType };
      const distractor = { color: "red" as CosmicColor, shape: "circle" as CosmicShapeType };

      const isMatch = isRuleMatch("COLOR", target, distractor);
      assert.equal(isMatch, false, "Different color must NOT match under COLOR rule");
    });

    it("2.3 rejects option differing in both color and shape", () => {
      const target = { color: "blue" as CosmicColor, shape: "circle" as CosmicShapeType };
      const option = { color: "yellow" as CosmicColor, shape: "triangle" as CosmicShapeType };

      const isMatch = isRuleMatch("COLOR", target, option);
      assert.equal(isMatch, false);
    });

    it("2.4 verifies Level 1 rounds have exactly one correct answer and diverse positions", () => {
      const rounds = LEVEL_1_ROUNDS;
      assert.ok(rounds.length >= 4, "Must have at least 4 rounds for Level 1");

      const correctPositions = new Set<number>();

      for (const round of rounds) {
        assert.equal(round.rule, "COLOR");
        const matches = round.options.filter((opt) =>
          isRuleMatch(round.rule, round.target, opt)
        );
        assert.equal(
          matches.length,
          1,
          `Round ${round.id} must have exactly 1 matching option`
        );
        assert.equal(
          matches[0].id,
          round.correctAnswer.id,
          "Matched option must equal correctAnswer"
        );

        const correctIdx = round.options.findIndex(
          (opt) => opt.id === round.correctAnswer.id
        );
        correctPositions.add(correctIdx);
      }

      // Ensure answers are not hardcoded to a single fixed position index
      assert.ok(
        correctPositions.size > 1,
        "Correct answer position must vary across rounds (not fixed index)"
      );
    });
  });

  // =========================================================================
  // 3. LEVEL 2 — SHAPE MATCHING LOGIC
  // =========================================================================
  describe("3. Level 2 — Shape Matching Evaluation", () => {
    it("3.1 accepts same shape regardless of different color", () => {
      const target = { color: "blue" as CosmicColor, shape: "circle" as CosmicShapeType };
      const option = { color: "red" as CosmicColor, shape: "circle" as CosmicShapeType };

      const isMatch = isRuleMatch("SHAPE", target, option);
      assert.equal(isMatch, true, "Same shape must match under SHAPE rule");
    });

    it("3.2 rejects different shape even if color matches", () => {
      const target = { color: "blue" as CosmicColor, shape: "circle" as CosmicShapeType };
      const distractor = { color: "blue" as CosmicColor, shape: "square" as CosmicShapeType };

      const isMatch = isRuleMatch("SHAPE", target, distractor);
      assert.equal(isMatch, false, "Different shape must NOT match under SHAPE rule");
    });

    it("3.3 verifies Level 2 rounds have exactly one correct answer and diverse positions", () => {
      const rounds = LEVEL_2_ROUNDS;
      assert.ok(rounds.length >= 4, "Must have at least 4 rounds for Level 2");

      const correctPositions = new Set<number>();

      for (const round of rounds) {
        assert.equal(round.rule, "SHAPE");
        const matches = round.options.filter((opt) =>
          isRuleMatch(round.rule, round.target, opt)
        );
        assert.equal(
          matches.length,
          1,
          `Round ${round.id} must have exactly 1 matching option`
        );
        assert.equal(matches[0].id, round.correctAnswer.id);

        const correctIdx = round.options.findIndex(
          (opt) => opt.id === round.correctAnswer.id
        );
        correctPositions.add(correctIdx);
      }

      assert.ok(correctPositions.size > 1, "Correct answer position must vary");
    });
  });

  // =========================================================================
  // 4. LEVEL 3 — COSMIC RULE SWITCH
  // =========================================================================
  describe("4. Level 3 — Cosmic Rule Switch & Dynamic Alternation", () => {
    it("4.1 accurately switches between COLOR and SHAPE rules across rounds", () => {
      const rounds = LEVEL_3_ROUNDS;
      assert.ok(rounds.length >= 4, "Level 3 must have multiple dynamic rounds");

      // Verify that both rules exist in Level 3
      const rulesUsed = new Set(rounds.map((r) => r.rule));
      assert.ok(rulesUsed.has("COLOR"), "Level 3 must use COLOR rule");
      assert.ok(rulesUsed.has("SHAPE"), "Level 3 must use SHAPE rule");

      // Verify alternation: at least one rule change happens
      let switchCount = 0;
      for (let i = 1; i < rounds.length; i++) {
        if (rounds[i].rule !== rounds[i - 1].rule) {
          switchCount++;
        }
      }
      assert.ok(switchCount >= 2, "Level 3 must switch rules multiple times");
    });

    it("4.2 verifies each Level 3 round correctly matches only the active rule", () => {
      for (const round of LEVEL_3_ROUNDS) {
        const matches = round.options.filter((opt) =>
          isRuleMatch(round.rule, round.target, opt)
        );
        assert.equal(
          matches.length,
          1,
          `Round ${round.id} (${round.rule}) must have exactly 1 match`
        );
        assert.equal(matches[0].id, round.correctAnswer.id);

        // Distractor matching the INACTIVE rule must be present and rejected
        const inactiveRule = round.rule === "COLOR" ? "SHAPE" : "COLOR";
        const distractor = round.options.find(
          (opt) =>
            isRuleMatch(inactiveRule, round.target, opt) &&
            !isRuleMatch(round.rule, round.target, opt)
        );
        assert.ok(
          distractor,
          `Round ${round.id} must include a tempting distractor that matches the opposite rule (${inactiveRule})`
        );
      }
    });

    it("4.3 verifies example rounds from specification match expected answers", () => {
      // Spec Round 1: Target: Blue Circle, Rule: COLOR.
      // Options: Red Circle, Blue Square, Yellow Triangle.
      // Expected: Blue Square
      const r1 = LEVEL_3_ROUNDS[0];
      assert.equal(r1.rule, "COLOR");
      assert.equal(r1.target.color, "blue");
      assert.equal(r1.target.shape, "circle");
      assert.equal(r1.correctAnswer.color, "blue");
      assert.equal(r1.correctAnswer.shape, "square");

      // Spec Round 2: Target: Yellow Triangle, Rule: SHAPE.
      // Options: Yellow Circle, Blue Triangle, Red Square.
      // Expected: Blue Triangle
      const r2 = LEVEL_3_ROUNDS[1];
      assert.equal(r2.rule, "SHAPE");
      assert.equal(r2.target.color, "yellow");
      assert.equal(r2.target.shape, "triangle");
      assert.equal(r2.correctAnswer.color, "blue");
      assert.equal(r2.correctAnswer.shape, "triangle");

      // Spec Round 3: Target: Red Square, Rule: COLOR.
      // Options: Blue Square, Red Circle, Yellow Triangle.
      // Expected: Red Circle
      const r3 = LEVEL_3_ROUNDS[2];
      assert.equal(r3.rule, "COLOR");
      assert.equal(r3.target.color, "red");
      assert.equal(r3.target.shape, "square");
      assert.equal(r3.correctAnswer.color, "red");
      assert.equal(r3.correctAnswer.shape, "circle");

      // Spec Round 4: Target: Blue Circle, Rule: SHAPE.
      // Options: Red Circle, Blue Square, Yellow Triangle.
      // Expected: Red Circle
      const r4 = LEVEL_3_ROUNDS[3];
      assert.equal(r4.rule, "SHAPE");
      assert.equal(r4.target.color, "blue");
      assert.equal(r4.target.shape, "circle");
      assert.equal(r4.correctAnswer.color, "red");
      assert.equal(r4.correctAnswer.shape, "circle");
    });
  });

  // =========================================================================
  // 5. PREVIEW SYSTEM & METADATA REGRESSION
  // =========================================================================
  describe("5. Preview System & Metadata Integrity", () => {
    it("5.1 getRoundsForLevel returns correct round set for Level 1, 2, and 3", () => {
      const l1 = getRoundsForLevel(1);
      assert.equal(l1.length, 4);
      assert.ok(l1.every((r) => r.rule === "COLOR"));

      const l2 = getRoundsForLevel(2);
      assert.equal(l2.length, 4);
      assert.ok(l2.every((r) => r.rule === "SHAPE"));

      const l3 = getRoundsForLevel(3);
      assert.equal(l3.length, 6);
      assert.ok(l3.some((r) => r.rule === "COLOR"));
      assert.ok(l3.some((r) => r.rule === "SHAPE"));
    });

    it("5.2 QUEST_GAMES_METADATA reflects updated Cosmic Rule Switch for Level 3", () => {
      const rdMeta = QUEST_GAMES_METADATA["rule-discovery"];
      assert.ok(rdMeta);
      assert.equal(rdMeta.id, 5);
      assert.equal(rdMeta.totalLevels, 3);
      assert.ok(rdMeta.subtitles[1].includes("Color Matching"));
      assert.ok(rdMeta.subtitles[2].includes("Shape Shifting"));
      assert.ok(
        rdMeta.subtitles[3].includes("Cosmic Rule Switch"),
        "Level 3 subtitle must mention Cosmic Rule Switch"
      );
      assert.ok(rdMeta.callouts[3].includes("rule symbol"));
    });

    it("5.3 createRound throws if generated options do not have exactly 1 valid match", () => {
      assert.throws(() => {
        // Deliberately incorrect: correctColor does NOT match targetColor for COLOR rule
        createRound({
          id: 99,
          rule: "COLOR",
          targetColor: "blue",
          targetShape: "circle",
          correctColor: "red", // mismatch!
          correctShape: "square",
          distractorColor: "yellow",
          distractorShape: "circle",
          otherColor: "yellow",
          otherShape: "triangle",
        });
      }, /Invalid round generation/);
    });
  });
});
