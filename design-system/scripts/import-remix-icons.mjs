// meta.json 에 적힌 모양을 Remix Icon 공식 패키지에서 가져와 design-system/icons 를 채운다.
// 사용: node design-system/scripts/import-remix-icons.mjs <remixicon 패키지 폴더>
// 아이콘을 추가하려면 meta.json 에 모양 이름과 한글 검색어를 적고 다시 돌린다.
import { readdirSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = fileURLToPath(new URL("../icons/", import.meta.url));
const source = process.argv[2];
if (!source) {
  console.error("Usage: node import-remix-icons.mjs <path to remixicon package>");
  process.exit(1);
}

const found = new Map(); // 파일 이름 → { category, path }
for (const category of readdirSync(join(source, "icons"))) {
  for (const file of readdirSync(join(source, "icons", category))) {
    if (file.endsWith(".svg")) found.set(file, { category, path: join(source, "icons", category, file) });
  }
}

const meta = JSON.parse(readFileSync(`${dir}meta.json`, "utf8"));
const missing = Object.keys(meta).filter((name) => !found.has(`${name}-line.svg`) && !found.has(`${name}-fill.svg`));
if (missing.length > 0) {
  console.error(`Not in Remix Icon: ${missing.join(", ")}`);
  process.exit(1);
}

const wanted = new Set();
for (const [name, entry] of Object.entries(meta)) {
  for (const variant of ["line", "fill"]) {
    const hit = found.get(`${name}-${variant}.svg`);
    if (!hit) continue;
    const svg = readFileSync(hit.path, "utf8").trim();
    if (!/^<svg viewBox="0 0 24 24" fill="currentColor"/.test(svg)) throw new Error(`Unexpected SVG shape: ${hit.path}`);
    writeFileSync(`${dir}${name}-${variant}.svg`, `${svg}\n`);
    wanted.add(`${name}-${variant}.svg`);
    entry.category = hit.category;
  }
}
for (const file of readdirSync(dir)) if (file.endsWith(".svg") && !wanted.has(file)) rmSync(`${dir}${file}`);

writeFileSync(`${dir}meta.json`, `${JSON.stringify(meta, null, 2)}\n`);
const version = JSON.parse(readFileSync(join(source, "package.json"), "utf8")).version;
console.log(`Remix Icon v${version} → ${wanted.size} icons (${Object.keys(meta).length} shapes)`);
