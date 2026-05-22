import type { Metadata } from "next";
import LongTailPage, { LongTailContent } from "@/components/consulting/LongTailPage";

const title =
  "세차장 리모델링 컨설팅 — 기존 매장 디지털 전환 | 워시펀";
const description =
  "이미 운영 중인 세차장을 어떻게 업그레이드할지 고민이신가요? RF카드·키오스크를 유지한 채 후불제 셀프 세차, 구독제 자동 세차, 포인트 시스템을 단계적으로 도입하는 세차장 리모델링 컨설팅을 제공합니다.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "세차장 리모델링",
    "세차장 리모델링 비용",
    "세차장 업그레이드",
    "세차장 디지털 전환",
    "세차장 RF카드 교체",
    "세차장 시스템 교체",
    "세차장 무인화",
    "세차장 키오스크 교체",
    "세차장 객단가",
    "세차장 매출 증대",
    "워시펀 리모델링",
  ],
  alternates: { canonical: "/consulting/remodeling" },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "/consulting/remodeling",
    title,
    description,
    images: [{ url: "/images/png/cover-page.png", width: 1200, height: 630, alt: "세차장 리모델링 컨설팅" }],
  },
  twitter: { card: "summary_large_image", title, description },
};

const content: LongTailContent = {
  slug: "remodeling",
  breadcrumbName: "세차장 리모델링",
  eyebrow: "세차장 리모델링 컨설팅",
  h1: "기존 세차장, 전부 갈아엎지 않아도 됩니다.",
  intro:
    "RF카드·코인박스·기존 키오스크는 그대로 두고, 필요한 기능만 단계적으로 도입하세요. 워시펀은 운영 중단 없는 점진적 리모델링으로 객단가와 재방문율을 끌어올립니다.",
  highlights: [
    "기존 기기 활용 + 부분 도입 가능",
    "운영 중단 최소화 (보통 1~3일)",
    "기존 고객 혼란 없이 점진 마이그레이션",
    "객단가 평균 +22% 사례",
    "비수기 매출 안정화",
    "변동 요금제·날씨 프로모션 자동화",
  ],
  sections: [
    {
      h: "리모델링이 필요한 신호 — 매장은 이렇게 늙습니다",
      body: "RF카드 잔액 분실 민원, 시간 만료 시 재결제 이탈, 신규 고객 진입 장벽, 비수기 매출 급락, 진상 고객 대응의 어려움. 이런 신호가 한두 가지라도 보인다면 리모델링 검토 시점입니다.",
      bullets: [
        "RFID 카드 잔액 환불·이전 민원 빈도 증가",
        "고객은 3분 만료 후 추가 결제 망설임",
        "현금 결제 의존 → 신규 고객 진입 거부감",
        "비수기 매출이 성수기 대비 40% 이하",
      ],
    },
    {
      h: "단계적 마이그레이션 — 한 번에 다 바꾸지 않습니다",
      body: "기존 RF카드 시스템을 유지하면서 후불제 셀프 세차, 포인트 자동 충전 키오스크를 부분 도입할 수 있습니다. 익숙한 고객은 RF카드를, 새로운 고객은 워시펀 앱을 사용하는 하이브리드 운영이 가능합니다.",
      bullets: [
        "1단계: 포인트 자동 충전 키오스크 추가",
        "2단계: 후불제 셀프 세차 시스템 도입",
        "3단계: 구독제 자동 세차로 확장",
        "4단계: 점주용 관리 대시보드 통합",
      ],
    },
    {
      h: "리모델링 비용 — 부분 도입은 부담이 작습니다",
      body: "전체 시스템 교체가 아닌 모듈식 도입이라 초기 비용 부담이 큽니다. 매장 베이 수와 도입 범위에 따라 견적이 달라지며, 워시펀 무료 상담 시 매장에 맞춘 단계별 견적을 함께 산출해 드립니다.",
    },
  ],
  faq: [
    {
      q: "기존 RF카드 고객은 어떻게 처리하나요?",
      a: "RFID 카드 잔액을 점주 웹에서 확인 후 해당 고객의 워시펀 계정에 포인트로 충전해 드릴 수 있습니다. 기존 고객 이탈 없이 자연스럽게 전환됩니다.",
    },
    {
      q: "운영 중단 없이 리모델링이 가능한가요?",
      a: "예. 시간대별 베이 일부만 작업하거나 야간 작업으로 진행해 영업 중단을 최소화합니다. 설비 설치는 보통 1~3일 내 완료됩니다.",
    },
    {
      q: "기존 코인박스·청소기는 어떻게 되나요?",
      a: "워시펀 후불제 시스템과 연동 가능한 형태로 모듈을 추가합니다. 기존 설비 전체 교체 없이 부분 업그레이드가 가능합니다.",
    },
    {
      q: "리모델링 후 매출이 정말 오르나요?",
      a: "변동 요금제·구독 도입 매장은 평균 객단가가 업계 평균 대비 +22% 높게 형성되며, 비수기 매출 변동성이 크게 줄어드는 효과를 확인하고 있습니다.",
    },
    {
      q: "A/S는 어떻게 진행되나요?",
      a: "코인박스·청소기·자동시작 시스템 단순 고장 건은 2년 무상 A/S가 제공됩니다. 여분 제품 택배 발송으로 점주가 직접 교체 가능한 구조입니다.",
    },
  ],
  ctaLead: "리모델링 무료 상담",
  related: [
    { href: "/consulting/system", label: "세차장 무인 시스템 도입" },
    { href: "/consulting/operations", label: "세차장 운영 컨설팅" },
    { href: "/consulting/start-business", label: "신규 창업 가이드" },
  ],
};

export default function Page() {
  return <LongTailPage content={content} />;
}
