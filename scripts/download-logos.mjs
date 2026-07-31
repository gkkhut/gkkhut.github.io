/**
 * Download 128×128 white PNG logos for keyboard keycap technologies.
 * Output: public/assets/logos/{slug}.png (transparent background, white icon)
 */
import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "public", "assets", "logos");

const WHITE_FILL = "#ffffff";
const SIZE = 128;

/** slug → Simple Icons name + optional Devicon fallbacks */
const ICONS = {
  python: {
    simple: "python",
    urls: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
    ],
  },
  sqlserver: {
    simple: "microsoftsqlserver",
    urls: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoftsqlserver/microsoftsqlserver-original.svg",
    ],
  },
  html: {
    simple: "html5",
    urls: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
    ],
  },
  robotics: {
    simple: "abb",
    urls: [
      "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/robotframework.svg",
    ],
  },
  opencv: {
    simple: "opencv",
    urls: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original.svg",
    ],
  },
  react: {
    simple: "react",
    urls: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    ],
  },
  tensorflow: {
    simple: "tensorflow",
    urls: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg",
    ],
  },
  ros: {
    simple: "ros",
    urls: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ros/ros-original.svg",
    ],
  },
  tableau: {
    simple: "tableau",
    urls: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tableau/tableau-original.svg",
    ],
  },
  azure: {
    simple: "microsoftazure",
    urls: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
    ],
  },
  aws: {
    simple: "amazonaws",
    urls: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    ],
  },
  gcp: {
    simple: "googlecloud",
    urls: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg",
    ],
  },
  postgresql: {
    simple: "postgresql",
    urls: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
    ],
  },
  databricks: {
    simple: "databricks",
    urls: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/databricks/databricks-original.svg",
    ],
  },
  github: {
    simple: "github",
    urls: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
    ],
  },
  powerbi: {
    simple: "powerbi",
    urls: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/powerbi/powerbi-original.svg",
    ],
  },
  spark: {
    simple: "apachespark",
    urls: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachespark/apachespark-original.svg",
    ],
  },
  firebase: {
    simple: "firebase",
    urls: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg",
    ],
  },
  wordpress: {
    simple: "wordpress",
    urls: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/wordpress/wordpress-original.svg",
    ],
  },
  autocad: {
    simple: "autodesk",
    urls: [],
  },
  linux: {
    simple: "linux",
    urls: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg",
    ],
  },
  docker: {
    simple: "docker",
    urls: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
    ],
  },
  vbnet: {
    simple: "dotnet",
    urls: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dotnetcore/dotnetcore-original.svg",
    ],
  },
  cybersecurity: {
    simple: "letsencrypt",
    urls: [],
  },
};

/** Custom spark icon for AI */
const AI_SVG_INNER = `<path d="M12 2.5c.6 0 1.1.4 1.2 1l.9 4.2a6.5 6.5 0 0 1 4.2.9l3.8-2.2c.5-.3 1.2-.1 1.5.4s.1 1.2-.4 1.5l-3.8 2.2c.5 1.3.5 2.7 0 4l3.8 2.2c.5.3.7 1 .4 1.5s-1 .7-1.5.4l-3.8-2.2a6.5 6.5 0 0 1-4.2.9l-.9 4.2c-.1.6-.6 1-1.2 1s-1.1-.4-1.2-1l-.9-4.2a6.5 6.5 0 0 1-4.2-.9l-3.8 2.2c-.5.3-1.2.1-1.5-.4s-.1-1.2.4-1.5l3.8-2.2a6.5 6.5 0 0 1 0-4L2.6 8.5c-.5-.3-.7-1-.4-1.5s1-.7 1.5-.4l3.8 2.2a6.5 6.5 0 0 1 4.2-.9l.9-4.2c.1-.6.6-1 1.2-1zm0 5.5a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/>`;

/**
 * Chip + circuit-pin style neural network icon (matches AI reference aesthetic).
 * Stroke-based line art rendered white on transparent PNG.
 */
const NEURAL_NETWORKS_SVG = `<?xml version="1.0" encoding="UTF-8"?>
<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <title>Neural Networks</title>
  <g fill="none" stroke="#ffffff" stroke-width="0.65" stroke-linecap="round" stroke-linejoin="round">
    <path d="M6.5 8.2H4.6M6.5 10.4H4.6M6.5 12H4.6M6.5 13.6H4.6M6.5 15.8H4.6"/>
    <path d="M17.5 8.2H19.4M17.5 10.4H19.4M17.5 12H19.4M17.5 13.6H19.4M17.5 15.8H19.4"/>
    <path d="M9.2 6.5V4.6M12 6.5V4.6M14.8 6.5V4.6"/>
    <path d="M9.2 17.5V19.4M12 17.5V19.4M14.8 17.5V19.4"/>
    <rect x="6.5" y="6.5" width="11" height="11" rx="1.8"/>
    <path d="M8.4 9.2L11.2 8.4M8.4 12L11.2 10.5M8.4 12L11.2 12M8.4 14.8L11.2 13.5M8.4 14.8L11.2 15.6"/>
    <path d="M12.8 8.4L15.6 10M12.8 10.5L15.6 10M12.8 12L15.6 12M12.8 13.5L15.6 14M12.8 15.6L15.6 14"/>
  </g>
  <g fill="#ffffff">
    <circle cx="3.9" cy="8.2" r="0.55"/><circle cx="3.9" cy="10.4" r="0.55"/><circle cx="3.9" cy="12" r="0.55"/><circle cx="3.9" cy="13.6" r="0.55"/><circle cx="3.9" cy="15.8" r="0.55"/>
    <circle cx="20.1" cy="8.2" r="0.55"/><circle cx="20.1" cy="10.4" r="0.55"/><circle cx="20.1" cy="12" r="0.55"/><circle cx="20.1" cy="13.6" r="0.55"/><circle cx="20.1" cy="15.8" r="0.55"/>
    <circle cx="9.2" cy="3.9" r="0.55"/><circle cx="12" cy="3.9" r="0.55"/><circle cx="14.8" cy="3.9" r="0.55"/>
    <circle cx="9.2" cy="20.1" r="0.55"/><circle cx="12" cy="20.1" r="0.55"/><circle cx="14.8" cy="20.1" r="0.55"/>
    <circle cx="8.4" cy="9.2" r="0.62"/><circle cx="8.4" cy="12" r="0.62"/><circle cx="8.4" cy="14.8" r="0.62"/>
    <circle cx="12" cy="8.4" r="0.62"/><circle cx="12" cy="10.5" r="0.62"/><circle cx="12" cy="12" r="0.62"/><circle cx="12" cy="13.5" r="0.62"/><circle cx="12" cy="15.6" r="0.62"/>
    <circle cx="15.6" cy="10" r="0.62"/><circle cx="15.6" cy="14" r="0.62"/>
  </g>
</svg>`;

function extractSvgInner(svgText) {
  const openMatch = svgText.match(/<svg[^>]*>/i);
  const closeIdx = svgText.lastIndexOf("</svg>");
  if (!openMatch || closeIdx === -1) return null;
  return svgText.slice(openMatch.index + openMatch[0].length, closeIdx).trim();
}

function stripFills(svgInner) {
  return svgInner
    .replace(/<title>[\s\S]*?<\/title>/gi, "")
    .replace(/\sfill="[^"]*"/gi, "")
    .replace(/\sfill='[^']*'/gi, "")
    .replace(/\sstyle="[^"]*"/gi, "");
}

function buildWhiteSvg(title, inner) {
  const cleaned = stripFills(inner).replace(
    /<(\w+)([^>]*?)(\/?)>/g,
    (match, tag, attrs, selfClose) => {
      if (
        ["path", "circle", "rect", "polygon", "polyline", "ellipse", "line"].includes(
          tag.toLowerCase()
        )
      ) {
        return `<${tag}${attrs} fill="${WHITE_FILL}"${selfClose}>`;
      }
      return match;
    }
  );

  return Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg role="img" width="${SIZE}" height="${SIZE}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <title>${title}</title>
  ${cleaned}
</svg>`);
}

async function fetchSvg(url) {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) return null;
  const text = await res.text();
  if (!text.includes("<svg")) return null;
  return text;
}

async function fetchIcon(slug, { simple, urls }) {
  const simpleUrl = `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${simple}.svg`;
  let svg = await fetchSvg(simpleUrl);
  if (svg) return svg;

  for (const url of urls) {
    svg = await fetchSvg(url);
    if (svg) return svg;
  }
  return null;
}

function titleFromSlug(slug) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

async function writeWhitePng(slug, inner, title) {
  const svgBuf = buildWhiteSvg(title, inner);
  const outPath = path.join(outDir, `${slug}.png`);

  await sharp(svgBuf)
    .resize(SIZE, SIZE, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toFile(outPath);
}

async function writeCustomWhitePng(slug, svgMarkup) {
  const outPath = path.join(outDir, `${slug}.png`);
  await sharp(Buffer.from(svgMarkup))
    .resize(SIZE, SIZE, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toFile(outPath);
}

function removeOldSvgVariants() {
  for (const file of fs.readdirSync(outDir)) {
    if (file.endsWith("-light.svg") || file.endsWith("-dark.svg")) {
      fs.unlinkSync(path.join(outDir, file));
    }
  }
}

fs.mkdirSync(outDir, { recursive: true });
removeOldSvgVariants();

let ok = 0;
const failed = [];

for (const [slug, config] of Object.entries(ICONS)) {
  const title = titleFromSlug(slug);
  const raw = await fetchIcon(slug, config);
  if (!raw) {
    failed.push(slug);
    console.warn(`FAIL  ${slug}`);
    continue;
  }
  const inner = extractSvgInner(raw);
  if (!inner) {
    failed.push(slug);
    console.warn(`FAIL  ${slug} (invalid SVG)`);
    continue;
  }
  await writeWhitePng(slug, inner, title);
  ok += 1;
  console.log(`OK    ${slug}.png`);
}

await writeWhitePng("ai", AI_SVG_INNER, "AI");
ok += 1;
console.log("OK    ai.png (custom)");

await writeCustomWhitePng("neural-networks", NEURAL_NETWORKS_SVG);
ok += 1;
console.log("OK    neural-networks.png (custom chip + network)");

console.log(`\nDone: ${ok} white PNG logos written (${SIZE}×${SIZE})`);
if (failed.length) {
  console.log(`Failed: ${failed.join(", ")}`);
  process.exitCode = 1;
}
