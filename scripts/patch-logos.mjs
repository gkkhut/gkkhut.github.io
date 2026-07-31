import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

async function keycapFromFile(src, name) {
  const logo = await sharp(src)
    .resize(180, 180, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  for (const dir of ["dark", "light"]) {
    await sharp({
      create: {
        width: 256,
        height: 256,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      },
    })
      .composite([{ input: logo, gravity: "centre" }])
      .png()
      .toFile(path.join(root, "public/assets/keycaps", dir, `${name}.png`));
  }
  console.log("keycap", name);
}

const userPy = path.join(root, "public/assets/brand-logos/python-user.png");
if (fs.existsSync(userPy)) {
  await keycapFromFile(userPy, "python");
  const color = "#3776AB";
  const tileLogo = await sharp(userPy)
    .resize(140, 140, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();
  await sharp({
    create: {
      width: 256,
      height: 256,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      {
        input: Buffer.from(
          `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256"><rect width="256" height="256" rx="48" fill="${color}"/></svg>`
        ),
        top: 0,
        left: 0,
      },
      { input: tileLogo, gravity: "centre" },
    ])
    .png()
    .toFile(path.join(root, "public/assets/skill-icons/python.png"));

  fs.writeFileSync(
    path.join(root, "public/assets/skill-icons/python.svg"),
    `<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="256" height="256" viewBox="0 0 256 256"><rect width="256" height="256" rx="48" fill="${color}"/><image href="data:image/png;base64,${tileLogo.toString("base64")}" x="58" y="58" width="140" height="140"/></svg>`
  );
}

const retries = {
  tableau: ["https://cdn.simpleicons.org/tableau/E97627"],
  powerbi: ["https://cdn.simpleicons.org/powerbi/F2C811"],
  genai: [
    "https://cdn.jsdelivr.net/npm/simple-icons@11.4.0/icons/openai.svg",
    "https://cdn.simpleicons.org/openai/412991",
  ],
  spotfire: ["https://cdn.simpleicons.org/tibco/FF1E14"],
  office: ["https://cdn.simpleicons.org/microsoft/D83B01"],
};

for (const [name, urls] of Object.entries(retries)) {
  let buf = null;
  for (const url of urls) {
    try {
      const r = await fetch(url);
      if (!r.ok) continue;
      const t = await r.text();
      if (!t.includes("svg")) continue;
      buf = Buffer.from(t);
      fs.writeFileSync(
        path.join(root, "public/assets/brand-logos", `${name}.svg`),
        t
      );
      break;
    } catch {
      /* next */
    }
  }
  if (!buf) {
    console.log("still fail", name);
    continue;
  }
  await keycapFromFile(buf, name);
}

console.log("done");
