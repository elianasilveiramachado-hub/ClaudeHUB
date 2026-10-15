// Renders each art HTML to PNG at its native size.
// Usage: NODE_PATH=$(npm root -g) node render.mjs
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const dir = path.dirname(fileURLToPath(import.meta.url));
const out = path.resolve(dir, "..");
const arts = [
  ["feed-1-chamada", 1080, 1350],
  ["feed-2-como-participar", 1080, 1350],
  ["feed-3-premio", 1080, 1350],
  ["story-1-grupo-vip", 1080, 1920],
  ["story-2-reposicao", 1080, 1920],
];

const browser = await chromium.launch();
for (const [name, width, height] of arts) {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.goto("file://" + path.join(dir, name + ".html"), { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(out, name + ".png") });
  await page.close();
  console.log("ok", name);
}
await browser.close();
