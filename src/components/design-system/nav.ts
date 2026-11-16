export type NavItem = { key: string; href: string; title: string; lead: string };

export const OVERVIEW: NavItem = {
  key: "overview",
  href: "/design-system",
  title: "Foundations",
  lead: "색, 글자, 간격까지 — 워시펀 제품의 기반이 되는 토큰과 규칙을 둘러보세요.",
};

/** 왼쪽 메뉴와 목록 카드, 이전·다음 문서가 모두 이 순서를 따른다. */
export const FOUNDATIONS: NavItem[] = [
  {
    key: "design-token",
    href: "/design-system/design-token",
    title: "Design Token",
    lead: "디자인 결정을 사람과 코드가 함께 읽을 수 있는 이름으로 옮긴 것입니다.",
  },
  {
    key: "color",
    href: "/design-system/color",
    title: "Color",
    lead: "워시펀 색상은 역할 색과 팔레트로 나뉘며, 제품의 계층·상태·브랜드를 표현합니다.",
  },
  {
    key: "typography",
    href: "/design-system/typography",
    title: "Typography",
    lead: "글꼴은 Pretendard 하나를 쓰고, 크기와 줄 높이는 환경마다 값이 다릅니다.",
  },
  {
    key: "spacing",
    href: "/design-system/spacing",
    title: "Spacing",
    lead: "간격은 4px 단위 하나로 맞춥니다.",
  },
  {
    key: "radius",
    href: "/design-system/radius",
    title: "Radius",
    lead: "모서리의 둥글기는 여섯 단계와 완전한 원으로 정리합니다.",
  },
  {
    key: "elevation",
    href: "/design-system/elevation",
    title: "Elevation",
    lead: "그림자로 면이 떠 있는 높이를 세 단계로 표현합니다.",
  },
];
