import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const DEFAULT_PATH = fileURLToPath(new URL("../writing.json", import.meta.url));

export function loadWriting(path = DEFAULT_PATH) {
  return JSON.parse(readFileSync(path, "utf8"));
}

// 말투가 어긋난 끝맺음. "~해주세요"는 두 말투에서 모두 쓴다.
const WRONG_ENDING = {
  해요체: /니다|니까/,
  합쇼체: /(어요|아요|여요|해요|예요|에요|까요|네요|지요|죠)(?![가-힣])/,
};

// 수동형이 더 정확한 말(끝남, 따라오는 결과)은 그대로 둔다.
const PASSIVE = /되었|됐(어요|습니다)|되어요/;
const PASSIVE_OK = /종료|만료|해지|연체|적용/;
const HONORIFIC = /시겠어요|시겠습니까|계시|계세요|여쭈|(?<!함)께(서|는|도)?(?![가-힣])/;

/**
 * 문구 하나가 글쓰기 규칙을 어긴 곳을 돌려준다. 기계로 알 수 있는 것만 본다:
 * 피하는 말(term), 어려운 한자어(plain), 금액·포인트 표기(amount), 느낌표·말줄임표(punctuation), 말투(voice), 수동형(passive), 지나친 높임말(honorific).
 */
export function findIssues(text, env, writing = loadWriting()) {
  const issues = [];

  for (const term of writing.terms) {
    const body = (term.except ?? []).reduce((rest, word) => rest.replaceAll(word, ""), text);
    for (const word of term.avoid) if (body.includes(word)) issues.push({ rule: "term", found: word, suggest: term.use });
  }

  for (const word of writing.plain) if (text.includes(word.avoid)) issues.push({ rule: "plain", found: word.avoid, suggest: word.use });

  const amount = text.match(/\d{4,}\s*(원|P)|\d\s+(원|P)(?![A-Za-z])/);
  if (amount) issues.push({ rule: "amount", found: amount[0] });

  const punctuation = text.match(/!|\.{2,}|…/);
  if (punctuation) issues.push({ rule: "punctuation", found: punctuation[0] });

  const style = writing.voice[env]?.style;
  const ending = style ? text.match(WRONG_ENDING[style]) : null;
  if (ending) issues.push({ rule: "voice", found: ending[0], suggest: style });

  const passive = PASSIVE_OK.test(text) ? null : text.match(PASSIVE);
  if (passive) issues.push({ rule: "passive", found: passive[0] });

  const honorific = style === "해요체" ? text.match(HONORIFIC) : null;
  if (honorific) issues.push({ rule: "honorific", found: honorific[0] });

  return issues;
}
