const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const logs = [];
  page.on("console", (m) => logs.push(`[${m.type()}] ${m.text()}`));
  page.on("pageerror", (e) => logs.push(`[pageerror] ${e}`));
  await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(12000);
  const info = await page.evaluate(() => {
    const canvases = [...document.querySelectorAll("canvas")];
    const main = document.querySelector("main");
    const splineWrap = document.querySelector(".fixed.inset-0");
    const cs = splineWrap ? getComputedStyle(splineWrap) : null;
    const resources = performance.getEntriesByType("resource").map(r => r.name).filter(n => /spline|skill|keyboard/i.test(n));
    return {
      canvas: canvases.map(c => ({ w: c.width, h: c.height, display: getComputedStyle(c).display, opacity: getComputedStyle(c).opacity, pe: getComputedStyle(c).pointerEvents })),
      mainBg: main ? getComputedStyle(main).backgroundColor : null,
      wrap: cs ? { opacity: cs.opacity, z: cs.zIndex, display: cs.display, visibility: cs.visibility } : null,
      resources,
      hash: location.hash,
      bodyBg: getComputedStyle(document.body).backgroundColor,
    };
  });
  console.log(JSON.stringify(info, null, 2));
  console.log("---LOGS---");
  console.log(logs.filter(l => /error|warn|keycap|spline|WebGL|Failed/i.test(l)).slice(0, 40).join("\n"));
  await page.screenshot({ path: "public/assets/debug-hero-now.png" });
  await page.goto("http://localhost:3000/#skills", { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(5000);
  await page.screenshot({ path: "public/assets/debug-skills-now.png" });
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
