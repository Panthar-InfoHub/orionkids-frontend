import { test, describe } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";

describe("OrionKids — Card Flip 3D Preview Effect & Favicon Suite", () => {
  const previewEnginePath = path.resolve(
    process.cwd(),
    "components/quest-preview/games/card-flip-preview-engine.tsx"
  );
  const practiceStagePath = path.resolve(
    process.cwd(),
    "components/game-tutorial/tutorial-practice-stage.tsx"
  );
  const showMeStagePath = path.resolve(
    process.cwd(),
    "components/game-tutorial/tutorial-show-me-stage.tsx"
  );
  const layoutPath = path.resolve(process.cwd(), "app/layout.tsx");

  test("1. CardFlipPreviewEngine has authentic 3D card flip structure", () => {
    const content = fs.readFileSync(previewEnginePath, "utf-8");

    assert.ok(
      content.includes("perspective-1000"),
      "CardFlipPreviewEngine must have perspective-1000 container"
    );
    assert.ok(
      content.includes("preserve-3d"),
      "Card button must have preserve-3d"
    );
    assert.ok(
      content.includes("[transform:rotateY(180deg)]"),
      "Card must rotate 180 degrees in Y axis when flipped"
    );
    assert.ok(
      content.includes("backface-hidden"),
      "Card faces must have backface-hidden"
    );
    assert.ok(
      content.includes("duration-500"),
      "Card flip transition must have duration-500 matching the real game"
    );
  });

  test("2. CardFlipPracticeArena in tutorial has 3D card flip structure", () => {
    const content = fs.readFileSync(practiceStagePath, "utf-8");

    assert.ok(
      content.includes("perspective-1000 w-16 h-20"),
      "CardFlipPracticeArena must have perspective-1000 container"
    );
    assert.ok(
      content.includes("preserve-3d"),
      "Practice card must have preserve-3d"
    );
    assert.ok(
      content.includes("[transform:rotateY(180deg)]"),
      "Practice card must rotate on Y axis when opened"
    );
  });

  test("3. Tutorial Show-Me stage has 3D card flip structure", () => {
    const content = fs.readFileSync(showMeStagePath, "utf-8");

    assert.ok(
      content.includes("perspective-1000"),
      "Show-me stage must have perspective-1000"
    );
    assert.ok(
      content.includes("preserve-3d"),
      "Show-me card must have preserve-3d"
    );
  });

  test("4. RootLayout metadata defines OrionKids icons", () => {
    const content = fs.readFileSync(layoutPath, "utf-8");

    assert.ok(content.includes("icons:"), "metadata must define icons");
    assert.ok(
      content.includes("/favicon.ico"),
      "icons must reference /favicon.ico"
    );
    assert.ok(
      content.includes("/apple-icon.png"),
      "icons must reference /apple-icon.png"
    );
    assert.ok(
      content.includes("/svg/Logo.svg"),
      "icons must reference OrionKids SVG logo"
    );
  });

  test("5. OrionKids Favicon & Icon files exist on disk with valid sizes", () => {
    const appFavicon = path.resolve(process.cwd(), "app/favicon.ico");
    const pubFavicon = path.resolve(process.cwd(), "public/favicon.ico");
    const appIcon = path.resolve(process.cwd(), "app/icon.png");
    const appleIcon = path.resolve(process.cwd(), "app/apple-icon.png");

    assert.ok(fs.existsSync(appFavicon), "app/favicon.ico must exist");
    assert.ok(fs.existsSync(pubFavicon), "public/favicon.ico must exist");
    assert.ok(fs.existsSync(appIcon), "app/icon.png must exist");
    assert.ok(fs.existsSync(appleIcon), "app/apple-icon.png must exist");

    assert.ok(fs.statSync(appFavicon).size > 1000, "app/favicon.ico must be non-empty");
    assert.ok(fs.statSync(pubFavicon).size > 1000, "public/favicon.ico must be non-empty");
    assert.ok(fs.statSync(appIcon).size > 500, "app/icon.png must be non-empty");
    assert.ok(fs.statSync(appleIcon).size > 5000, "app/apple-icon.png must be non-empty");
  });
});

