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

/**
 * 문구 하나가 글쓰기 규칙을 어긴 곳을 돌려준다. 기계로 알 수 있는 것만 본다:
 * 피하는 말(term), 금액·포인트 표기(amount), 느낌표·말줄임표(punctuation), 말투(voice).
 */
export function findIssues(text, env, writing = loadWriting()) {
  const issues = [];

  for (const term of writing.terms) {
    const body = (term.except ?? []).reduce((rest, word) => rest.replaceAll(word, ""), text);
    for (const word of term.avoid) if (body.includes(word)) issues.push({ rule: "term", found: word, suggest: term.use });
  }

  const amount = text.match(/\d{4,}\s*(원|P)|\d\s+(원|P)(?![A-Za-z])/);
  if (amount) issues.push({ rule: "amount", found: amount[0] });

  const punctuation = text.match(/!|\.{2,}|…/);
  if (punctuation) issues.push({ rule: "punctuation", found: punctuation[0] });

  const style = writing.voice[env]?.style;
  const ending = style ? text.match(WRONG_ENDING[style]) : null;
  if (ending) issues.push({ rule: "voice", found: ending[0], suggest: style });

  return issues;
}
