import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "assets", "projects-covers");
fs.mkdirSync(outDir, { recursive: true });

/** Motif families: subtle geometry on ink/slate — no stock photos. */
const covers = [
  { id: "phd-ot-anomaly", label: "Ph.D. Research", motif: "grid" },
  { id: "greenbelt", label: "Six Sigma", motif: "nodes" },
  { id: "pokayoke", label: "Manufacturing", motif: "shield" },
  { id: "sql-upgrade", label: "OT Databases", motif: "layers" },
  { id: "ai-manufacturing", label: "AI / ML", motif: "brain" },
  { id: "vision-140k", label: "Machine Vision", motif: "lens" },
  { id: "ssa-crm", label: "Custom CRM", motif: "nodes" },
  { id: "homelab", label: "Infrastructure", motif: "grid" },
  { id: "analog-devices", label: "Anomaly Detection", motif: "wave" },
  { id: "emergency-vehicle", label: "Computer Vision", motif: "lens" },
  { id: "ariac", label: "Robotics", motif: "arm" },
  { id: "gps-vault", label: "Embedded Security", motif: "shield" },
  { id: "sunganak", label: "Data Science", motif: "wave" },
  { id: "rrt-agv", label: "Path Planning", motif: "path" },
  { id: "edhr", label: "Quality Systems", motif: "layers" },
  { id: "fft-hardening", label: "OT Hardening", motif: "shield" },
  { id: "tableau-dashboards", label: "BI / Analytics", motif: "bars" },
  { id: "turtlebot-walker", label: "ROS Robotics", motif: "arm" },
  { id: "astar-path", label: "Path Planning", motif: "path" },
  { id: "op5-npi", label: "Insulet — NPI", motif: "nodes" },
  { id: "auto-tcp", label: "Insulet — Robotics", motif: "arm" },
  { id: "conveyor-hmi", label: "Insulet — HMI", motif: "layers" },
  { id: "laser-marker", label: "Insulet — Laser", motif: "shield" },
];

function motifPaths(motif) {
  switch (motif) {
    case "grid":
      return `<g stroke="#94a3b8" stroke-width="1.5" opacity="0.35">
        <path d="M80 80h200v140H80z"/><path d="M80 115h200M80 150h200M80 185h200"/>
        <path d="M130 80v140M180 80v140M230 80v140"/></g>`;
    case "nodes":
      return `<g fill="none" stroke="#94a3b8" stroke-width="1.8" opacity="0.4">
        <circle cx="140" cy="130" r="18"/><circle cx="220" cy="110" r="14"/><circle cx="200" cy="190" r="16"/>
        <path d="M155 140l50-20M155 145l35 40M210 125l-5 50"/></g>`;
    case "shield":
      return `<path d="M180 70l70 28v50c0 42-30 78-70 92-40-14-70-50-70-92V98l70-28z" fill="none" stroke="#94a3b8" stroke-width="2" opacity="0.4"/>`;
    case "layers":
      return `<g fill="none" stroke="#94a3b8" stroke-width="1.8" opacity="0.4">
        <ellipse cx="180" cy="110" rx="90" ry="28"/><ellipse cx="180" cy="150" rx="90" ry="28"/>
        <ellipse cx="180" cy="190" rx="90" ry="28"/></g>`;
    case "brain":
      return `<g fill="none" stroke="#94a3b8" stroke-width="1.8" opacity="0.4">
        <path d="M120 160c0-40 30-70 60-70s40 20 40 20 10-20 40-20 60 30 60 70-25 70-55 70c-15 0-25-10-45-10s-30 10-45 10c-30 0-55-30-55-70z"/>
        <path d="M180 100v100M150 140h60"/></g>`;
    case "lens":
      return `<g fill="none" stroke="#94a3b8" stroke-width="1.8" opacity="0.4">
        <circle cx="180" cy="150" r="55"/><circle cx="180" cy="150" r="28"/>
        <path d="M180 95v20M180 185v20M125 150h20M215 150h20"/></g>`;
    case "wave":
      return `<path d="M70 160c30-40 50-40 80 0s50 40 80 0 50-40 80 0" fill="none" stroke="#94a3b8" stroke-width="2" opacity="0.4"/>
        <path d="M70 190c30-40 50-40 80 0s50 40 80 0 50-40 80 0" fill="none" stroke="#64748b" stroke-width="1.5" opacity="0.35"/>`;
    case "arm":
      return `<g fill="none" stroke="#94a3b8" stroke-width="2" opacity="0.4" stroke-linecap="round">
        <path d="M110 200l50-60 45 20 40-55"/><circle cx="160" cy="140" r="8"/><circle cx="205" cy="160" r="8"/>
        <path d="M245 105h30v30"/></g>`;
    case "path":
      return `<g fill="none" stroke="#94a3b8" stroke-width="2" opacity="0.4">
        <path d="M90 200c40-10 50-80 90-90s70 20 100-30" stroke-dasharray="8 6"/>
        <circle cx="90" cy="200" r="6" fill="#94a3b8"/><circle cx="280" cy="80" r="6" fill="#94a3b8"/></g>`;
    case "bars":
      return `<g fill="#94a3b8" opacity="0.35">
        <rect x="100" y="160" width="28" height="60" rx="4"/><rect x="145" y="120" width="28" height="100" rx="4"/>
        <rect x="190" y="140" width="28" height="80" rx="4"/><rect x="235" y="100" width="28" height="120" rx="4"/></g>`;
    default:
      return "";
  }
}

function coverSvg(label, motif) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 360 240">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#1e293b"/>
    </linearGradient>
  </defs>
  <rect width="360" height="240" fill="url(#bg)"/>
  <circle cx="300" cy="40" r="90" fill="#38bdf8" opacity="0.08"/>
  <circle cx="40" cy="200" r="70" fill="#64748b" opacity="0.12"/>
  ${motifPaths(motif)}
  <text x="28" y="210" fill="#cbd5e1" font-family="Segoe UI, Arial, sans-serif" font-size="14" font-weight="600" letter-spacing="0.08em">${label.toUpperCase()}</text>
</svg>`;
}

for (const { id, label, motif } of covers) {
  fs.writeFileSync(path.join(outDir, `${id}.svg`), coverSvg(label, motif));
}

console.log(`Wrote ${covers.length} project covers to ${outDir}`);
