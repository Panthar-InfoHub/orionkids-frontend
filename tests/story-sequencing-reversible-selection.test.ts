import { describe, it } from "node:test";
import assert from "node:assert/strict";

interface StoryStep {
  id: number;
  order: number;
  text: string;
  icon: string;
}

const LUNAR_LANDING_STEPS: StoryStep[] = [
  { id: 1, order: 1, text: "Enter Moon orbit", icon: "🛸" },
  { id: 2, order: 2, text: "Touch down on the lunar surface", icon: "🌕" },
  { id: 3, order: 3, text: "Collect moon rocks in samples", icon: "🪨" },
  { id: 4, order: 4, text: "Plant the Orion flag and salute", icon: "🚩" },
];

class StorySequencingModel {
  shuffled: StoryStep[];
  selectedOrder: StoryStep[] = [];

  constructor(steps: StoryStep[]) {
    // Clone initial deck
    this.shuffled = [...steps];
  }

  get availableCards(): StoryStep[] {
    return this.shuffled.filter(
      (step) => !this.selectedOrder.some((s) => s.id === step.id)
    );
  }

  pickStep(step: StoryStep): boolean {
    if (this.selectedOrder.some((s) => s.id === step.id)) {
      return false; // Prevent duplicates
    }
    this.selectedOrder = [...this.selectedOrder, step];
    return true;
  }

  removeStep(stepId: number): boolean {
    if (!this.selectedOrder.some((s) => s.id === stepId)) {
      return false; // Not in sequence
    }
    this.selectedOrder = this.selectedOrder.filter((s) => s.id !== stepId);
    return true;
  }

  resetOrder(): void {
    this.selectedOrder = [];
  }

  isAllPicked(): boolean {
    return this.selectedOrder.length === this.shuffled.length;
  }

  evaluate(): { correctCount: number; accuracy: number; isAllCorrect: boolean } {
    let correctCount = 0;
    this.selectedOrder.forEach((step, idx) => {
      if (step.order === idx + 1) correctCount++;
    });
    const accuracy = Math.round((correctCount / this.shuffled.length) * 100);
    return {
      correctCount,
      accuracy,
      isAllCorrect: correctCount === this.shuffled.length,
    };
  }

  assertInvariants(): void {
    const totalCount = this.shuffled.length;
    // 1. Every card exists in exactly one collection
    assert.equal(
      this.selectedOrder.length + this.availableCards.length,
      totalCount,
      "Sum of selected and available cards must equal total deck size"
    );

    // 2. A card must never appear twice in selected sequence
    const selectedIds = this.selectedOrder.map((s) => s.id);
    const uniqueSelectedIds = new Set(selectedIds);
    assert.equal(
      selectedIds.length,
      uniqueSelectedIds.size,
      "Selected sequence must not contain duplicates"
    );

    // 3. A card must never appear simultaneously in both collections
    for (const sel of this.selectedOrder) {
      assert.ok(
        !this.availableCards.some((avail) => avail.id === sel.id),
        `Card ${sel.id} appeared in both collections simultaneously`
      );
    }
  }
}

describe("Story Sequencing Game — Reversible Card Selection & State Invariant Suite", () => {
  it("Scenario 1: Select one card and remove it", () => {
    const game = new StorySequencingModel(LUNAR_LANDING_STEPS);
    game.assertInvariants();
    assert.equal(game.availableCards.length, 4);
    assert.equal(game.selectedOrder.length, 0);

    // Pick Step 1
    const step1 = LUNAR_LANDING_STEPS[0];
    game.pickStep(step1);
    game.assertInvariants();
    assert.equal(game.selectedOrder.length, 1);
    assert.equal(game.availableCards.length, 3);
    assert.equal(game.selectedOrder[0].id, step1.id);
    assert.ok(!game.availableCards.some((s) => s.id === step1.id));

    // Remove Step 1
    const removed = game.removeStep(step1.id);
    assert.equal(removed, true);
    game.assertInvariants();
    assert.equal(game.selectedOrder.length, 0);
    assert.equal(game.availableCards.length, 4);
    assert.ok(game.availableCards.some((s) => s.id === step1.id));
  });

  it("Scenario 2: Select multiple cards and remove the first card", () => {
    const game = new StorySequencingModel(LUNAR_LANDING_STEPS);
    // User selects 4, 1, 2
    game.pickStep(LUNAR_LANDING_STEPS[3]); // Plant Flag (id 4)
    game.pickStep(LUNAR_LANDING_STEPS[0]); // Enter Orbit (id 1)
    game.pickStep(LUNAR_LANDING_STEPS[1]); // Touch Down (id 2)
    game.assertInvariants();

    assert.deepEqual(
      game.selectedOrder.map((s) => s.id),
      [4, 1, 2]
    );

    // Remove first card (id 4)
    game.removeStep(4);
    game.assertInvariants();

    // Remaining sequence preserves exact relative order: [1, 2]
    assert.deepEqual(
      game.selectedOrder.map((s) => s.id),
      [1, 2]
    );
    assert.ok(game.availableCards.some((s) => s.id === 4));
  });

  it("Scenario 3: Select multiple cards and remove a middle card (user prompt example)", () => {
    const game = new StorySequencingModel(LUNAR_LANDING_STEPS);
    // User selects:
    // 1. Plant the Orion flag and salute (id 4)
    // 2. Enter Moon orbit (id 1)
    // 3. Touch down on the lunar surface (id 2)
    game.pickStep(LUNAR_LANDING_STEPS[3]); // id 4
    game.pickStep(LUNAR_LANDING_STEPS[0]); // id 1
    game.pickStep(LUNAR_LANDING_STEPS[1]); // id 2
    game.assertInvariants();

    assert.deepEqual(
      game.selectedOrder.map((s) => s.id),
      [4, 1, 2]
    );

    // Now user taps "Enter Moon orbit" (id 1, the middle card)
    game.removeStep(1);
    game.assertInvariants();

    // Updated sequence must become: [Plant Flag -> Touch Down]
    assert.deepEqual(
      game.selectedOrder.map((s) => s.id),
      [4, 2]
    );

    // Available cards section now contains: Enter Moon orbit (id 1) and Collect moon rocks (id 3)
    const availIds = game.availableCards.map((s) => s.id).sort();
    assert.deepEqual(availIds, [1, 3]);
  });

  it("Scenario 4: Select multiple cards and remove the last card", () => {
    const game = new StorySequencingModel(LUNAR_LANDING_STEPS);
    game.pickStep(LUNAR_LANDING_STEPS[0]); // id 1
    game.pickStep(LUNAR_LANDING_STEPS[1]); // id 2
    game.pickStep(LUNAR_LANDING_STEPS[2]); // id 3
    game.assertInvariants();

    // Remove last card (id 3)
    game.removeStep(3);
    game.assertInvariants();

    assert.deepEqual(
      game.selectedOrder.map((s) => s.id),
      [1, 2]
    );
    assert.ok(game.availableCards.some((s) => s.id === 3));
  });

  it("Scenario 5: Re-select a previously removed card", () => {
    const game = new StorySequencingModel(LUNAR_LANDING_STEPS);
    // User initially placed 4, then removed 4
    game.pickStep(LUNAR_LANDING_STEPS[3]); // id 4
    game.removeStep(4);
    game.assertInvariants();

    // Now correctly builds sequence: 1 -> 2 -> 3 -> 4
    game.pickStep(LUNAR_LANDING_STEPS[0]); // id 1
    game.pickStep(LUNAR_LANDING_STEPS[1]); // id 2
    game.pickStep(LUNAR_LANDING_STEPS[2]); // id 3
    game.pickStep(LUNAR_LANDING_STEPS[3]); // id 4 (re-selected!)
    game.assertInvariants();

    assert.deepEqual(
      game.selectedOrder.map((s) => s.id),
      [1, 2, 3, 4]
    );
    assert.equal(game.availableCards.length, 0);
  });

  it("Scenario 6: Remove multiple cards one by one until empty", () => {
    const game = new StorySequencingModel(LUNAR_LANDING_STEPS);
    game.pickStep(LUNAR_LANDING_STEPS[0]);
    game.pickStep(LUNAR_LANDING_STEPS[1]);
    game.pickStep(LUNAR_LANDING_STEPS[2]);
    game.pickStep(LUNAR_LANDING_STEPS[3]);
    game.assertInvariants();
    assert.equal(game.selectedOrder.length, 4);

    game.removeStep(2);
    game.assertInvariants();
    assert.equal(game.selectedOrder.length, 3);

    game.removeStep(4);
    game.assertInvariants();
    assert.equal(game.selectedOrder.length, 2);

    game.removeStep(1);
    game.assertInvariants();
    assert.equal(game.selectedOrder.length, 1);

    game.removeStep(3);
    game.assertInvariants();
    assert.equal(game.selectedOrder.length, 0);
    assert.equal(game.availableCards.length, 4);
  });

  it("Scenario 7: Reset entire sequence restores initial card availability", () => {
    const game = new StorySequencingModel(LUNAR_LANDING_STEPS);
    game.pickStep(LUNAR_LANDING_STEPS[0]);
    game.pickStep(LUNAR_LANDING_STEPS[2]);
    assert.equal(game.selectedOrder.length, 2);
    assert.equal(game.availableCards.length, 2);

    game.resetOrder();
    game.assertInvariants();
    assert.equal(game.selectedOrder.length, 0);
    assert.equal(game.availableCards.length, 4);
  });

  it("Scenario 8: Complete a correctly ordered sequence produces 100% accuracy", () => {
    const game = new StorySequencingModel(LUNAR_LANDING_STEPS);
    // Correct chronological order: 1, 2, 3, 4
    game.pickStep(LUNAR_LANDING_STEPS[0]);
    game.pickStep(LUNAR_LANDING_STEPS[1]);
    game.pickStep(LUNAR_LANDING_STEPS[2]);
    game.pickStep(LUNAR_LANDING_STEPS[3]);

    assert.equal(game.isAllPicked(), true);
    const evalResult = game.evaluate();
    assert.equal(evalResult.correctCount, 4);
    assert.equal(evalResult.accuracy, 100);
    assert.equal(evalResult.isAllCorrect, true);
  });

  it("Scenario 9: Attempt to complete a partially filled sequence is prevented", () => {
    const game = new StorySequencingModel(LUNAR_LANDING_STEPS);
    game.pickStep(LUNAR_LANDING_STEPS[0]);
    game.pickStep(LUNAR_LANDING_STEPS[1]);
    assert.equal(game.isAllPicked(), false);

    // If card removed after 3 picked, isAllPicked remains false
    game.pickStep(LUNAR_LANDING_STEPS[2]);
    game.removeStep(2);
    assert.equal(game.isAllPicked(), false);
  });

  it("Scenario 10: Complete an incorrectly ordered sequence calculates score truthfully", () => {
    const game = new StorySequencingModel(LUNAR_LANDING_STEPS);
    // Placed in order: 4, 3, 2, 1 (all inverted)
    game.pickStep(LUNAR_LANDING_STEPS[3]); // pos 1, order 4 (wrong)
    game.pickStep(LUNAR_LANDING_STEPS[2]); // pos 2, order 3 (wrong)
    game.pickStep(LUNAR_LANDING_STEPS[1]); // pos 3, order 2 (wrong)
    game.pickStep(LUNAR_LANDING_STEPS[0]); // pos 4, order 1 (wrong)

    assert.equal(game.isAllPicked(), true);
    const evalResult = game.evaluate();
    assert.equal(evalResult.correctCount, 0);
    assert.equal(evalResult.accuracy, 0);
    assert.equal(evalResult.isAllCorrect, false);
  });

  it("Scenario 11: Rapid repeated tapping prevents duplicate state entries (idempotency)", () => {
    const game = new StorySequencingModel(LUNAR_LANDING_STEPS);
    const step = LUNAR_LANDING_STEPS[0];

    // Rapid double-tap
    const firstPick = game.pickStep(step);
    const secondPick = game.pickStep(step);
    const thirdPick = game.pickStep(step);

    assert.equal(firstPick, true);
    assert.equal(secondPick, false);
    assert.equal(thirdPick, false);
    game.assertInvariants();
    assert.equal(game.selectedOrder.length, 1);

    // Rapid double-remove
    const firstRemove = game.removeStep(step.id);
    const secondRemove = game.removeStep(step.id);

    assert.equal(firstRemove, true);
    assert.equal(secondRemove, false);
    game.assertInvariants();
    assert.equal(game.selectedOrder.length, 0);
  });
});

