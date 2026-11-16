// 토큰 원본을 정적 파일로 내보낸다. 다른 제품의 sync-tokens 가 /design-system/tokens.json 에서 받아 간다.
import { copyFileSync, cpSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";

const from = fileURLToPath(new URL("../tokens.json", import.meta.url));
const toDir = fileURLToPath(new URL("../../public/design-system/", import.meta.url));

mkdirSync(toDir, { recursive: true });
copyFileSync(from, `${toDir}tokens.json`);
// 아이콘 원본도 같이 내보낸다. /design-system/icons/<이름>.svg
cpSync(fileURLToPath(new URL("../icons/", import.meta.url)), `${toDir}icons/`, { recursive: true });
