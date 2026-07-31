const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  await page.goto("http://localhost:3000/#skills", { waitUntil: "domcontentloaded", timeout: 60000 });
  // Wait for canvas + spline load
  await page.waitForSelector("canvas", { timeout: 30000 });
  await page.waitForTimeout(8000);
  const result = await page.evaluate(async () => {
    // Find Application via React fiber is hard; check canvas exists and scene request succeeded
    const canvases = [...document.querySelectorAll("canvas")];
    const sizes = canvases.map((c) => ({ w: c.width, h: c.height }));
    return { canvasCount: canvases.length, sizes };
  });
  // Network: skills-keyboard loaded?
  const splineOk = await page.evaluate(() => performance.getEntriesByType("resource").some((r) => r.name.includes("skills-keyboard")));
  console.log(JSON.stringify({ result, splineOk, errors: errors.slice(0, 10) }, null, 2));
  await page.screenshot({ path: "public/assets/debug-skills-verify.png" });
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
