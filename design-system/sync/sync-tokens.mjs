#!/usr/bin/env node
// 워시펀 디자인 토큰을 받아 이 제품의 형식으로 바꿔 파일로 쓴다.
// 변환까지 모두 성공한 뒤에만 --out 파일을 쓴다. 중간에 실패하면 기존 파일은 그대로다.
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import { toTailwindPreset, toTsObject } from "./convert.mjs";

const DEFAULT_SOURCE = "https://www.lifedivergence.com/design-system/tokens.json";

const USAGE = `Usage: node sync-tokens.mjs --format <tailwind|ts> --env <web|app|kiosk> --out <file> [--source <url or path>]
  --source defaults to ${DEFAULT_SOURCE}`;

const FORMATS = { tailwind: toTailwindPreset, ts: toTsObject };

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 2) {
    const name = argv[i];
    if (!name?.startsWith("--") || argv[i + 1] === undefined) return null;
    args[name.slice(2)] = argv[i + 1];
  }
  return args;
}

async function readSource(source) {
  if (/^https?:\/\//.test(source)) {
    const res = await fetch(source);
    if (!res.ok) throw new Error(`Could not download tokens: ${res.status} ${res.statusText} (${source})`);
    return res.text();
  }
  return readFile(source, "utf8");
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args || !args.format || !args.env || !args.out || !(args.format in FORMATS)) {
    console.error(USAGE);
    process.exit(2);
  }
  const source = args.source ?? DEFAULT_SOURCE;
  const text = await readSource(source);
  let tree;
  try {
    tree = JSON.parse(text);
  } catch {
    throw new Error(`Tokens source is not valid JSON: ${source}`);
  }
  if (typeof tree?.version !== "string" || !tree.color) throw new Error(`Tokens source is not a washfun tokens file: ${source}`);
  const output = FORMATS[args.format](tree, args.env);
  await mkdir(dirname(args.out), { recursive: true });
  await writeFile(args.out, output);
  console.log(`tokens v${tree.version} → ${args.out}`);
}

main().catch((error) => {
  console.error(`sync-tokens: ${error.message}`);
  process.exit(1);
});
