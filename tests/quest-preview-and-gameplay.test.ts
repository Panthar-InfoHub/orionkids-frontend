import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  PREVIEW_GAMES_LIST,
  PREVIEW_METADATA,
  STROOP_PREVIEWS,
  CARD_FLIP_PREVIEWS,
  PATTERN_PREVIEWS,
  ODD_ONE_OUT_PREVIEWS,
  RULE_DISCOVERY_PREVIEWS,
  STORY_SEQUENCING_PREVIEWS,
} from "../lib/data/quest-previews";
import { getRouteForUserProfile, UserProfile } from "../lib/api/auth";
import { PreviewGameKey, PreviewLevel } from "../types/quest-preview";

describe("Interactive Quest Preview & Gameplay Enhancement Suite", () => {
  describe("Phase 4: 18 Playable Level Previews Verification", () => {
    it("1. has all 6 canonical games in PREVIEW_GAMES_LIST", () => {
      assert.equal(PREVIEW_GAMES_LIST.length, 6);
      const keys = PREVIEW_GAMES_LIST.map((g) => g.key);
      assert.deepEqual(keys, [
        "stroop",
        "card-flip",
        "pattern",
        "odd-one-out",
        "rule-discovery",
        "story-sequencing",
      ]);
    });

    it("2. has metadata and objectives for all 18 level previews (6 games x 3 levels)", () => {
      const gameKeys: PreviewGameKey[] = [
        "stroop",
        "card-flip",
        "pattern",
        "odd-one-out",
        "rule-discovery",
        "story-sequencing",
      ];
      const levels: PreviewLevel[] = [1, 2, 3];

      let count = 0;
      for (const game of gameKeys) {
        for (const lvl of levels) {
          const meta = PREVIEW_METADATA[game][lvl];
          assert.ok(meta, `Missing metadata for ${game} level ${lvl}`);
          assert.equal(meta.gameKey, game);
          assert.equal(meta.level, lvl);
          assert.ok(meta.objective.length > 5);
          assert.ok(meta.hintInstruction.length > 5);
          count++;
        }
      }
      assert.equal(count, 18, "Must have exactly 18 distinct level configurations");
    });

    it("3. Stroop Colour-Word: accurately evaluates Level 1 (congruent), Level 2 (incongruent), Level 3 (reverse rule)", () => {
      // Level 1: RED in Red ink
      const l1 = STROOP_PREVIEWS[1];
      assert.equal(l1.word, "RED");
      assert.equal(l1.inkName, "Red");
      const l1Correct = l1.options.find((o) => o.isCorrect);
      assert.equal(l1Correct?.label, "Red");
      assert.equal(l1.hintOptionLabel, "Red");

      // Level 2: BLUE in Yellow ink
      const l2 = STROOP_PREVIEWS[2];
      assert.equal(l2.word, "BLUE");
      assert.equal(l2.inkName, "Yellow");
      const l2Correct = l2.options.find((o) => o.isCorrect);
      assert.equal(l2Correct?.label, "Yellow");
      assert.equal(l2.hintOptionLabel, "Yellow");

      // Level 3: GREEN in Red ink, Reverse rule: Name written WORD
      const l3 = STROOP_PREVIEWS[3];
      assert.equal(l3.word, "GREEN");
      const l3Correct = l3.options.find((o) => o.isCorrect);
      assert.equal(l3Correct?.label, "Green");
      assert.equal(l3.hintOptionLabel, "Green");
    });

    it("4. Cosmic Card Flip: Level 1 (4 cards / 2 pairs), Level 2 (6 cards / 3 pairs), Level 3 (8 cards / 4 pairs)", () => {
      const l1 = CARD_FLIP_PREVIEWS[1];
      assert.equal(l1.cards.length, 4);
      assert.equal(l1.pairsToMatch, 2);

      const l2 = CARD_FLIP_PREVIEWS[2];
      assert.equal(l2.cards.length, 6);
      assert.equal(l2.pairsToMatch, 3);

      const l3 = CARD_FLIP_PREVIEWS[3];
      assert.equal(l3.cards.length, 8);
      assert.equal(l3.pairsToMatch, 4);

      // Verify pair consistency: each pairId has exactly 2 cards
      for (const lvl of [1, 2, 3] as PreviewLevel[]) {
        const config = CARD_FLIP_PREVIEWS[lvl];
        const pairCounts: Record<number, number> = {};
        for (const card of config.cards) {
          pairCounts[card.pairId] = (pairCounts[card.pairId] || 0) + 1;
        }
        for (const [, count] of Object.entries(pairCounts)) {
          assert.equal(count, 2, `Every pair in Level ${lvl} must have exactly 2 cards`);
        }
      }
    });

    it("5. Pattern Recognition: sequence progression and missing answer logic across levels 1, 2, 3", () => {
      const l1 = PATTERN_PREVIEWS[1];
      assert.equal(l1.sequence[l1.missingIndex], "❓");
      const l1Answer = l1.options.find((o) => o.isCorrect);
      assert.equal(l1Answer?.symbol, "⭐");
      assert.equal(l1.hintSymbol, "⭐");

      const l2 = PATTERN_PREVIEWS[2];
      assert.equal(l2.sequence[l2.missingIndex], "❓");
      const l2Answer = l2.options.find((o) => o.isCorrect);
      assert.equal(l2Answer?.symbol, "🟢");

      const l3 = PATTERN_PREVIEWS[3];
      assert.equal(l3.sequence[l3.missingIndex], "❓");
      const l3Answer = l3.options.find((o) => o.isCorrect);
      assert.equal(l3Answer?.symbol, "🌙");
    });

    it("6. Odd One Out: has exactly one odd item per level with reasons and hints", () => {
      for (const lvl of [1, 2, 3] as PreviewLevel[]) {
        const config = ODD_ONE_OUT_PREVIEWS[lvl];
        const oddItems = config.items.filter((i) => i.isOdd);
        assert.equal(oddItems.length, 1, `Level ${lvl} must have exactly 1 odd item`);
        assert.equal(config.hintItemId, oddItems[0].id);
        assert.ok(oddItems[0].reason, "Odd item must include an educational explanation");
      }
    });

    it("7. Rule Discovery: switches rule type across levels (Level 1: Color, Level 2: Shape, Level 3: Count)", () => {
      // Level 1: Color rule
      const l1 = RULE_DISCOVERY_PREVIEWS[1];
      assert.equal(l1.ruleType, "color");
      const l1Matched = l1.targetBuckets.find((b) => b.id === l1.hintBucketId);
      assert.equal(l1Matched?.color, l1.cardToSort.color);

      // Level 2: Shape rule
      const l2 = RULE_DISCOVERY_PREVIEWS[2];
      assert.equal(l2.ruleType, "shape");
      const l2Matched = l2.targetBuckets.find((b) => b.id === l2.hintBucketId);
      assert.equal(l2Matched?.shape, l2.cardToSort.shape);

      // Level 3: Count rule
      const l3 = RULE_DISCOVERY_PREVIEWS[3];
      assert.equal(l3.ruleType, "count");
      const l3Matched = l3.targetBuckets.find((b) => b.id === l3.hintBucketId);
      assert.equal(l3Matched?.count, l3.cardToSort.count);
    });

    it("8. Story Sequencing: chronological 1..N order and shuffled demo initial state", () => {
      for (const lvl of [1, 2, 3] as PreviewLevel[]) {
        const config = STORY_SEQUENCING_PREVIEWS[lvl];
        assert.equal(config.steps.length, config.shuffledSteps.length);
        // Correct steps are sorted 1..N
        const orders = config.steps.map((s) => s.order);
        assert.deepEqual(
          orders,
          Array.from({ length: config.steps.length }, (_, i) => i + 1)
        );
      }
    });
  });

  describe("Phase 3: Play Quest Functionality & State Machine Routing", () => {
    it("9. routes unapproved or terms-pending users to their authoritative onboarding state", () => {
      // Case A: User has not accepted terms
      const userTermsNotAccepted: UserProfile = {
        id: "user_terms_test",
        email: "parent@example.com",
        name: "Parent Test",
        role: "USER",
        status: "ACTIVE",
        termsAccepted: false,
      };
      assert.equal(getRouteForUserProfile(userTermsNotAccepted), "/terms-and-conditions");

      // Case B: Terms accepted, no access request submitted
      const userNoRequest: UserProfile = {
        id: "user_req_test",
        email: "parent@example.com",
        name: "Parent Test",
        role: "USER",
        status: "PENDING",
        termsAccepted: true,
        termsVersion: "v1.0",
        accessRequestStatus: null,
      };
      assert.equal(getRouteForUserProfile(userNoRequest), "/access-request");

      // Case C: Access request is pending
      const userPending: UserProfile = {
        id: "user_pending_test",
        email: "parent@example.com",
        name: "Parent Test",
        role: "USER",
        status: "PENDING",
        termsAccepted: true,
        termsVersion: "v1.0",
        accessRequestStatus: "PENDING",
      };
      assert.equal(getRouteForUserProfile(userPending), "/access-pending");

      // Case D: Access request was rejected
      const userRejected: UserProfile = {
        id: "user_rej_test",
        email: "parent@example.com",
        name: "Parent Test",
        role: "USER",
        status: "PENDING",
        termsAccepted: true,
        termsVersion: "v1.0",
        accessRequestStatus: "REJECTED",
      };
      assert.equal(getRouteForUserProfile(userRejected), "/access-rejected");

      // Case E: Account is restricted
      const userRestricted: UserProfile = {
        id: "user_res_test",
        email: "parent@example.com",
        name: "Parent Test",
        role: "USER",
        status: "RESTRICTED",
        termsAccepted: true,
      };
      assert.equal(getRouteForUserProfile(userRestricted), "/access-denied");
    });

    it("10. routes approved active user to child onboarding if incomplete, or dashboard if onboarded", () => {
      // Approved user without child
      const userApprovedNew: UserProfile = {
        id: "user_appr_new",
        email: "parent@example.com",
        name: "Parent Test",
        role: "USER",
        status: "ACTIVE",
        termsAccepted: true,
        termsVersion: "v1.0",
        accessRequestStatus: "APPROVED",
        hasCompletedOnboarding: false,
      };
      assert.equal(getRouteForUserProfile(userApprovedNew), "/onboarding");

      // Approved user with child onboarded
      const userApprovedOnboarded: UserProfile = {
        id: "user_appr_done",
        email: "parent@example.com",
        name: "Parent Test",
        role: "USER",
        status: "ACTIVE",
        termsAccepted: true,
        termsVersion: "v1.0",
        accessRequestStatus: "APPROVED",
        hasCompletedOnboarding: true,
      };
      assert.equal(getRouteForUserProfile(userApprovedOnboarded), "/dashboard");
    });

    it("11. routes admin user directly to admin dashboard", () => {
      const adminUser: UserProfile = {
        id: "admin_test",
        email: "admin@example.com",
        name: "Admin User",
        role: "ADMIN",
        status: "ACTIVE",
        termsAccepted: true,
        termsVersion: "v1.0",
        accessRequestStatus: "APPROVED",
      };
      assert.equal(getRouteForUserProfile(adminUser), "/admin");
    });
  });
});
