// Gera os documentos (CAMPANHA.md, ATIVIDADES-VICTOR.md) e as artes (PNG) a partir de campanha.config.json.
// Uso:
//   NODE_PATH=$(npm root -g) node gerar.mjs           documentos + artes
//   node gerar.mjs --so-documentos                    só os documentos (não precisa do Playwright)
//   NODE_PATH=$(npm root -g) node gerar.mjs --final   recusa gerar se ainda houver valor sem definição
import { readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import path from "node:path";
import { raiz, carregarConfig, preencher, avisarPendencias } from "./config.mjs";

const args = process.argv.slice(2);
const config = carregarConfig();
const faltando = avisarPendencias(config);
if (args.includes("--final") && faltando.length) {
  console.error("--final: defina os valores acima antes de gerar a versão final.");
  process.exit(1);
}

const aviso = "<!-- Arquivo gerado por gerar.mjs a partir de modelos/ e campanha.config.json. Edite o modelo, não este arquivo. -->\n\n";
for (const doc of ["CAMPANHA.md", "ATIVIDADES-VICTOR.md"]) {
  const modelo = readFileSync(path.join(raiz, "modelos", doc), "utf8");
  writeFileSync(path.join(raiz, doc), aviso + preencher(modelo, config, "md"));
  console.log("ok", doc);
}

if (args.includes("--so-documentos")) process.exit(0);

const { chromium } = createRequire(import.meta.url)("playwright");
const src = path.join(raiz, "artes", "src");
const arts = [
  ["feed-1-chamada", 1080, 1350],
  ["feed-2-como-participar", 1080, 1350],
  ["feed-3-premio", 1080, 1350],
  ["story-1-grupo-vip", 1080, 1920],
  ["story-2-reposicao", 1080, 1920],
];

const browser = await chromium.launch();
for (const [name, width, height] of arts) {
  const html = preencher(readFileSync(path.join(src, name + ".html"), "utf8"), config, "html")
    .replace("<head>", `<head><base href="${pathToFileURL(src + path.sep)}">`);
  const page = await browser.newPage({ viewport: { width, height } });
  await page.goto(pathToFileURL(path.join(src, name + ".html")).href);
  await page.setContent(html, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(raiz, "artes", name + ".png") });
  await page.close();
  console.log("ok", name);
}
await browser.close();
