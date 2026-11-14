import { chromium } from "/home/dev/.nvm/versions/node/v24.13.0/lib/node_modules/omniroute/node_modules/playwright/index.mjs";

async function run() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: "/usr/bin/google-chrome",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
  });
  const page = await context.newPage();

  const outDir = "/home/dev/.gemini/antigravity/brain/89d900b7-6c9e-405b-b9a9-797d0de29b85";

  console.log("Navigating to Level 1...");
  await page.goto("http://localhost:3000/games/rule-discovery?level=1", {
    waitUntil: "networkidle",
  });
  await page.waitForTimeout(1000);

  // 1. Level 1 Preview
  await page.screenshot({ path: `${outDir}/rule_discovery_level1_preview.png` });
  console.log("Captured Level 1 Preview");

  // 2. Click Start Level 1 -> Level 1 Gameplay
  const startBtn1 = page.locator("button:has-text('Start Level 1')");
  if (await startBtn1.count()) {
    await startBtn1.click();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `${outDir}/rule_discovery_level1_gameplay.png` });
    console.log("Captured Level 1 Gameplay");
  }

  // 3. Level 2 Preview
  console.log("Navigating to Level 2...");
  await page.goto("http://localhost:3000/games/rule-discovery?level=2", {
    waitUntil: "networkidle",
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `${outDir}/rule_discovery_level2_preview.png` });
  console.log("Captured Level 2 Preview");

  // 4. Click Start Level 2 -> Level 2 Gameplay
  const startBtn2 = page.locator("button:has-text('Start Level 2')");
  if (await startBtn2.count()) {
    await startBtn2.click();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `${outDir}/rule_discovery_level2_gameplay.png` });
    console.log("Captured Level 2 Gameplay");
  }

  // 5. Level 3 Preview
  console.log("Navigating to Level 3...");
  await page.goto("http://localhost:3000/games/rule-discovery?level=3", {
    waitUntil: "networkidle",
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `${outDir}/rule_discovery_level3_preview.png` });
  console.log("Captured Level 3 Preview");

  // 6. Click Start Level 3 -> Level 3 Gameplay (Round 1: COLOR RULE)
  const startBtn3 = page.locator("button:has-text('Start Level 3')");
  if (await startBtn3.count()) {
    await startBtn3.click();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `${outDir}/rule_discovery_level3_gameplay_color_rule.png` });
    console.log("Captured Level 3 Gameplay (Color Rule)");

    // Select the correct answer (Blue Square) to advance to Round 2 (SHAPE RULE)
    const optBlueSquare = page.locator("button:has-text('Blue Square')");
    if (await optBlueSquare.count()) {
      await optBlueSquare.click();
      await page.waitForTimeout(1200);
      await page.screenshot({ path: `${outDir}/rule_discovery_level3_gameplay_shape_rule.png` });
      console.log("Captured Level 3 Gameplay (Shape Rule)");
    }
  }

  await browser.close();
  console.log("All screenshots captured successfully!");
}

run().catch((err) => {
  console.error("Screenshot error:", err);
  process.exit(1);
});
