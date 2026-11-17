import { test, describe } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";

describe("OrionKids — Card Flip Repeated Card Reveal Prevention Suite", () => {
  const cardFlipArenaPath = path.resolve(
    process.cwd(),
    "components/games/card-flip/card-flip-game-arena.tsx"
  );
  const content = fs.readFileSync(cardFlipArenaPath, "utf-8");

  test("1. Dependency Array Safety: useEffect does NOT depend on moves, matchedCount, or activeSessionId", () => {
    // Extract the setup useEffect block
    const effectRegex = /useEffect\(\(\)\s*=>\s*\{[\s\S]*?hasInitializedRef[\s\S]*?\},\s*\[(.*?)\]\);/;
    const match = content.match(effectRegex);

    assert.ok(match, "Setup useEffect with hasInitializedRef guard must exist");
    const depsString = match[1];

    assert.ok(
      !depsString.includes("moves"),
      "useEffect dependency array must NOT include 'moves' to prevent re-triggering sneak peek on player turns"
    );
    assert.ok(
      !depsString.includes("matchedCount"),
      "useEffect dependency array must NOT include 'matchedCount' to prevent re-triggering sneak peek on pair matches"
    );
    assert.ok(
      !depsString.includes("activeSessionId"),
      "useEffect dependency array must NOT include 'activeSessionId' to prevent re-triggering sneak peek when session resolves asynchronously"
    );
  });

  test("2. Mid-Game Guard: startDealAndSneakPeekSequence aborts if gameplay is already in progress", () => {
    assert.ok(
      content.includes("movesRef.current > 0 || matchedCountRef.current > 0"),
      "startDealAndSneakPeekSequence must check if moves or matches have occurred and prevent card reveal"
    );
    assert.ok(
      content.includes('setIntroPhase("ready")'),
      "startDealAndSneakPeekSequence must stay in ready phase if gameplay is already in progress"
    );
  });

  test("3. Tutorial Dismissal Guard: Closing tutorial mid-game does not reveal cards", () => {
    assert.ok(
      content.includes("if (movesRef.current === 0 && matchedCountRef.current === 0)"),
      "Tutorial close must only trigger sneak peek when game has zero moves and zero matches"
    );
  });

  test("4. Single-Run Guard: Level initialization runs only once per level instance", () => {
    assert.ok(
      content.includes("hasInitializedRef.current === level"),
      "Level initialization must be guarded by hasInitializedRef check"
    );
  });

  test("5. Fast Timings Preserved: Initial preview ready timer (1050ms) and mismatch flip-back (450ms) remain fast", () => {
    assert.ok(
      content.includes("}, 1050);"),
      "Ready timer must remain 1050ms"
    );
    assert.ok(
      content.includes("450") && !content.includes("900"),
      "Mismatch flip-back timer must remain fast (450ms)"
    );
  });
});

