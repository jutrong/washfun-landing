import type { Metadata } from "next";
import LongTailPage, { LongTailContent } from "@/components/consulting/LongTailPage";

const title =
  "자동세차장 창업 가이드 — 노터치·구독제·드라이브스루 | 워시펀";
const description =
  "자동세차장 창업을 검토하시나요? 노터치 자동 세차 + 구독제 + 드라이브스루 결제까지 — 워시펀이 자동세차장 창업비용과 운영 모델을 함께 설계합니다.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "자동세차장 창업",
    "자동 세차장 창업비용",
    "노터치 자동세차",
    "드라이브스루 세차",
    "자동 세차 구독제",
    "구독제 세차",
    "세차 구독",
    "자동 세차 결제",
    "주유소 세차",
    "자동 세차장 수익",
    "워시펀 자동세차",
  ],
  alternates: { canonical: "/consulting/auto-wash" },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "/consulting/auto-wash",
    title,
    description,
    images: [{ url: "/images/png/cover-page.png", width: 1200, height: 630, alt: "자동세차장 창업" }],
  },
  twitter: { card: "summary_large_image", title, description },
};

const content: LongTailContent = {
  slug: "auto-wash",
  breadcrumbName: "자동세차장 창업",
  eyebrow: "자동세차장 창업 컨설팅",
  h1: "자동세차장, 단순 1회권으로는 한계가 있습니다.",
  intro:
    "1회 결제 중심의 자동세차는 단가 한계와 비수기 매출 불안정이라는 구조적 문제가 있습니다. 워시펀은 노터치 자동 세차 + 구독제 + 드라이브스루 결제 조합으로 자동세차장의 객수와 객단가를 동시에 끌어올립니다.",
  highlights: [
    "노터치 자동 세차 + 구독제 모델",
    "드라이브스루 결제 (커피보다 쉬운)",
    "월 평균 2.6회 방문 구독 고객",
    "비수기 매출 안정화",
    "변동 요금제·날씨 프로모션",
    "주유소 부속 자동세차 확장 가능",
  ],
  sections: [
    {
      h: "자동세차장 창업비용 — 설비 + 구독 시스템",
      body: "노터치 자동 세차 설비, 드라이브스루 결제 키오스크, 구독제 시스템이 자동세차장 핵심 투자입니다. 부지·토목 공사는 셀프세차 대비 단순한 편이지만 설비 단가가 높습니다.",
      bullets: [
        "노터치 자동 세차 설비",
        "드라이브스루 결제 키오스크",
        "워시펀 구독제 시스템",
        "차량 번호 인식 카메라",
      ],
    },
    {
      h: "구독제 — 자동세차장 매출의 게임체인저",
      body: "1회권 중심 운영은 비수기에 매출이 급락합니다. 월정액 구독 고객은 비가 오든 안 오든 일정 매출을 만들고, 평균 2.6회 방문해 시설 활용도까지 올립니다.",
    },
    {
      h: "드라이브스루 결제 — 차에서 내리지 않아도 끝",
      body: "차량 번호 인식과 사전 등록된 결제 수단을 결합해, 들어갔다 나오면 끝나는 자동세차 경험을 만듭니다. 신규 고객 이용 장벽이 크게 낮아집니다.",
    },
  ],
  faq: [
    {
      q: "자동세차장 창업비용은 평균 얼마가 드나요?",
      a: "노터치 자동 세차 설비가 핵심 투자 항목입니다. 매장 규모·설비 등급에 따라 다르며 워시펀 무료 상담으로 시뮬레이션을 받아보실 수 있습니다.",
    },
    {
      q: "구독제 자동 세차는 어떻게 운영되나요?",
      a: "고객은 월정액 결제 후 무제한 또는 횟수 제한 형태로 자동 세차를 이용합니다. 차량 번호 인식과 연동되어 별도 카드·앱 없이 입장 가능합니다.",
    },
    {
      q: "구독 고객이 얼마나 자주 오나요?",
      a: "워시펀 구독 고객의 월 평균 방문 횟수는 2.6회입니다. 비수기에도 일정한 방문이 유지되어 매출 안정에 큰 도움이 됩니다.",
    },
    {
      q: "기존 자동세차장에 구독제만 추가 도입 가능한가요?",
      a: "예. 워시펀 구독 시스템은 기존 자동 세차 설비와 연동해 추가 도입할 수 있습니다.",
    },
    {
      q: "주유소 부속 자동세차에도 적용 가능한가요?",
      a: "가능합니다. 주유소·정비소 부속 자동세차에 워시펀 구독·결제 시스템을 추가해 차별화하는 사례가 늘고 있습니다.",
    },
  ],
  ctaLead: "자동세차장 창업 상담",
  related: [
    { href: "/consulting/start-business", label: "세차장 창업 종합 가이드" },
    { href: "/consulting/self-wash", label: "셀프세차장 창업 가이드" },
    { href: "/consulting/system", label: "구독제 시스템 자세히" },
  ],
};

export default function Page() {
  return <LongTailPage content={content} />;
}
