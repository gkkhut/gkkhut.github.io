import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const skillDir = path.join(root, "public", "assets", "skill-icons");
const darkDir = path.join(root, "public", "assets", "keycaps", "dark");
const lightDir = path.join(root, "public", "assets", "keycaps", "light");
const logoCache = path.join(root, "public", "assets", "brand-logos");

for (const d of [skillDir, darkDir, lightDir, logoCache]) {
  fs.mkdirSync(d, { recursive: true });
}

/**
 * Real brand logos for keycaps (not letter initials).
 * Sources: jsDelivr simple-icons / devicon.
 */
const icons = {
  python: {
    color: "#3776AB",
    urls: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
      "https://cdn.simpleicons.org/python/3776AB",
    ],
  },
  sqlserver: {
    color: "#CC2927",
    urls: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoftsqlserver/microsoftsqlserver-original.svg",
      "https://cdn.simpleicons.org/microsoftsqlserver/CC2927",
    ],
  },
  matlab: {
    color: "#E56604",
    urls: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matlab/matlab-original.svg",
    ],
  },
  opencv: {
    color: "#5C3EE8",
    urls: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original.svg",
      "https://cdn.simpleicons.org/opencv/5C3EE8",
    ],
  },
  pytorch: {
    color: "#EE4C2C",
    urls: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg",
      "https://cdn.simpleicons.org/pytorch/EE4C2C",
    ],
  },
  tensorflow: {
    color: "#FF6F00",
    urls: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg",
      "https://cdn.simpleicons.org/tensorflow/FF6F00",
    ],
  },
  ros: {
    color: "#22314E",
    urls: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ros/ros-original.svg",
      "https://cdn.simpleicons.org/ros/22314E",
    ],
  },
  tableau: {
    color: "#E97627",
    urls: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tableau/tableau-original.svg",
      "https://cdn.simpleicons.org/tableau/E97627",
    ],
  },
  azure: {
    color: "#0078D4",
    urls: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
      "https://cdn.simpleicons.org/microsoftazure/0078D4",
    ],
  },
  aws: {
    color: "#FF9900",
    urls: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
      "https://cdn.simpleicons.org/amazonaws/FF9900",
    ],
  },
  postgres: {
    color: "#336791",
    urls: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
      "https://cdn.simpleicons.org/postgresql/4169E1",
    ],
  },
  databricks: {
    color: "#FF3621",
    urls: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/databricks/databricks-original.svg",
      "https://cdn.simpleicons.org/databricks/FF3621",
    ],
  },
  git: {
    color: "#F05032",
    urls: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
      "https://cdn.simpleicons.org/git/F05032",
    ],
  },
  github: {
    color: "#181717",
    urls: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
      "https://cdn.simpleicons.org/github/181717",
    ],
  },
  powerbi: {
    color: "#F2C811",
    urls: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/powerbi/powerbi-original.svg",
      "https://cdn.simpleicons.org/powerbi/F2C811",
    ],
  },
  spark: {
    color: "#E25A1C",
    urls: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachespark/apachespark-original.svg",
      "https://cdn.simpleicons.org/apachespark/E25A1C",
    ],
  },
  genai: {
    color: "#10A37F",
    urls: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/openai/openai-original.svg",
      "https://cdn.simpleicons.org/openai/412991",
    ],
  },
  autocad: {
    color: "#E51937",
    urls: ["https://cdn.simpleicons.org/autodesk/E51937"],
  },
  linux: {
    color: "#FCC624",
    urls: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg",
      "https://cdn.simpleicons.org/linux/FCC624",
    ],
  },
  docker: {
    color: "#2496ED",
    urls: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
      "https://cdn.simpleicons.org/docker/2496ED",
    ],
  },
  plc: {
    color: "#00A4EF",
    urls: ["https://cdn.simpleicons.org/siemens/00A4EF"],
  },
  vision: {
    color: "#FF6600",
    urls: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original.svg",
    ],
  },
  sap: {
    color: "#0FAAFF",
    urls: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sap/sap-original.svg",
      "https://cdn.simpleicons.org/sap/0FAAFF",
    ],
  },
  dotnet: {
    color: "#512BD4",
    urls: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dotnetcore/dotnetcore-original.svg",
      "https://cdn.simpleicons.org/dotnet/512BD4",
    ],
  },
  security: {
    color: "#00B4D8",
    urls: ["https://cdn.simpleicons.org/letsencrypt/00B4D8"],
  },
  spotfire: { color: "#FF1E14", urls: ["https://cdn.simpleicons.org/tibco/FF1E14"] },
  keras: {
    color: "#D00000",
    urls: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/keras/keras-original.svg",
      "https://cdn.simpleicons.org/keras/D00000",
    ],
  },
  sklearn: {
    color: "#F7931E",
    urls: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg",
      "https://cdn.simpleicons.org/scikitlearn/F7931E",
    ],
  },
  react: {
    color: "#61DAFB",
    urls: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
      "https://cdn.simpleicons.org/react/61DAFB",
    ],
  },
  nodejs: {
    color: "#339933",
    urls: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
      "https://cdn.simpleicons.org/nodedotjs/339933",
    ],
  },
  gcp: {
    color: "#4285F4",
    urls: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg",
      "https://cdn.simpleicons.org/googlecloud/4285F4",
    ],
  },
  wireguard: { color: "#88171A", urls: ["https://cdn.simpleicons.org/wireguard/88171A"] },
  iot: { color: "#29B6F6", urls: ["https://cdn.simpleicons.org/mqtt/29B6F6"] },
  csharp: {
    color: "#239120",
    urls: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg",
      "https://cdn.simpleicons.org/csharp/239120",
    ],
  },
  express: {
    color: "#000000",
    urls: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
      "https://cdn.simpleicons.org/express/000000",
    ],
  },
  prisma: { color: "#2D3748", urls: ["https://cdn.simpleicons.org/prisma/2D3748"] },
  r: {
    color: "#276DC3",
    urls: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/r/r-original.svg",
      "https://cdn.simpleicons.org/r/276DC3",
    ],
  },
  office: { color: "#D83B01", urls: ["https://cdn.simpleicons.org/microsoftoffice/D83B01"] },
};

async function fetchLogo(name, urls) {
  const cachePath = path.join(logoCache, `${name}.svg`);
  if (fs.existsSync(cachePath) && fs.statSync(cachePath).size > 40) {
    return fs.readFileSync(cachePath);
  }
  for (const url of urls) {
    try {
      const res = await fetch(url, { redirect: "follow" });
      if (!res.ok) continue;
      const text = await res.text();
      if (!text.includes("<svg") && !text.includes("<?xml")) continue;
      fs.writeFileSync(cachePath, text);
      return Buffer.from(text);
    } catch {
      /* try next */
    }
  }
  return null;
}

function fallbackTile(name, color) {
  const label = name.slice(0, 3).toUpperCase();
  return Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">
  <rect width="256" height="256" rx="48" fill="${color}"/>
  <text x="128" y="150" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="48" font-weight="700" fill="#fff">${label}</text>
</svg>`);
}

async function makeKeycapPng(logoBuf, outPath) {
  // Brand logo centered on transparent canvas — full-color like the Python mark
  const logo = await sharp(logoBuf)
    .resize(180, 180, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
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
    .composite([{ input: logo, gravity: "centre" }])
    .png()
    .toFile(outPath);
}

async function makeGridTile(logoBuf, color, outPath) {
  const logo = await sharp(logoBuf)
    .resize(140, 140, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const bg = await sharp({
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
      { input: logo, gravity: "centre" },
    ])
    .png()
    .toBuffer();

  await sharp(bg).png().toFile(outPath);
  // Also keep SVG-less grid as PNG referenced path stays .svg in constants —
  // write SVG wrapper that embeds isn't needed; constants use .svg — write PNG
  // AND a tiny SVG that points users to PNG? Better: update constants to .png
  // For now write both: PNG for keycaps, and SVG tile for grid via sharp->svg fallback
  fs.writeFileSync(
    outPath.replace(/\.png$/i, ".svg"),
    `<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="256" height="256" viewBox="0 0 256 256">
  <rect width="256" height="256" rx="48" fill="${color}"/>
  <image href="data:image/png;base64,${logo.toString("base64")}" x="58" y="58" width="140" height="140"/>
</svg>`
  );
}

let ok = 0;
for (const [name, { color, urls }] of Object.entries(icons)) {
  let logoBuf = await fetchLogo(name, urls);
  if (!logoBuf) {
    console.warn(`fallback tile for ${name}`);
    logoBuf = fallbackTile(name, color);
  }

  // Skill grid: colored tile with brand logo
  await makeGridTile(logoBuf, color, path.join(skillDir, `${name}.png`));

  // Keycaps: same full-color logo on transparent bg for dark & light scenes
  await makeKeycapPng(logoBuf, path.join(darkDir, `${name}.png`));
  await makeKeycapPng(logoBuf, path.join(lightDir, `${name}.png`));
  ok += 1;
}

console.log(`Wrote ${ok} brand logos → skill-icons + keycaps (dark/light)`);
