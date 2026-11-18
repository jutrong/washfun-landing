// 파일을 읽지 않는 순수 계산만 둔다. 문서 페이지(Next)와 테스트가 같이 쓴다.

const channel = (hex, at) => {
  const value = parseInt(hex.slice(at, at + 2), 16) / 255;
  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
};
const luminance = (hex) => 0.2126 * channel(hex, 1) + 0.7152 * channel(hex, 3) + 0.0722 * channel(hex, 5);

/** WCAG 2 명도 대비. "#RRGGBB" 두 색을 받아 1~21 을 소수 둘째 자리까지 돌려준다. */
export function contrastRatio(a, b) {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return Math.round(((light + 0.05) / (dark + 0.05)) * 100) / 100;
}

/** accessibility.json 의 색 짝마다 대비와 통과 여부를 붙인다. valueOf 는 토큰 경로를 색 값으로 바꾼다. */
export function checkPairsWith(a11y, valueOf) {
  return a11y.pairs.map((pair) => {
    const fgValue = valueOf(pair.fg);
    const bgValue = valueOf(pair.bg);
    const ratio = contrastRatio(fgValue, bgValue);
    const required = a11y.contrast[pair.kind];
    return { ...pair, fgValue, bgValue, ratio, required, pass: ratio >= required };
  });
}
