export type NavItem = { key: string; href: string; title: string; lead: string };

export const COMPONENTS_HREF = "/design-system/components";

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
    key: "layout",
    href: "/design-system/layout",
    title: "Layout",
    lead: "화면 좌우 여백, 너비 경계, 본문 최대 너비, 겹치는 순서를 정합니다.",
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
  {
    key: "gradient",
    href: "/design-system/gradient",
    title: "Gradient",
    lead: "그라디언트는 배경과 강조 면에서 깊이와 움직임을 표현할 때 쓰는 색 토큰입니다.",
  },
  {
    key: "iconography",
    href: "/design-system/iconography",
    title: "Iconography",
    lead: "아이콘은 24 격자에 그린 Line과 Fill 두 가지 모양을 쓰고, 색은 글자색을 따릅니다.",
  },
  {
    key: "motion",
    href: "/design-system/motion",
    title: "Motion",
    lead: "움직임의 시간은 다섯 단계, 곡선은 쓰임새에 따라 네 가지를 씁니다.",
  },
  {
    key: "writing",
    href: "/design-system/writing",
    title: "Writing",
    lead: "버튼, 오류, 알림의 문구를 쉽고 한결같게 쓰는 규칙과 용어입니다.",
  },
  {
    key: "accessibility",
    href: "/design-system/accessibility",
    title: "Accessibility",
    lead: "누구나 같은 노력으로 쓸 수 있도록 대비, 글자 크기, 누르는 영역의 기준을 정합니다.",
  },
];
