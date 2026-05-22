import type { Metadata } from "next";
import LongTailPage, { LongTailContent } from "@/components/consulting/LongTailPage";

const title =
  "세차장 운영 컨설팅 — 매출 증대·객단가·비수기 전략 | 워시펀";
const description =
  "이미 세차장을 운영 중이신가요? 매출 분석, 변동 요금제, 구독 고객 확보, 비수기 매출 안정화, 객단가 증대까지 운영 컨설팅으로 지원합니다. 워시펀 무료 상담.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "세차장 운영",
    "세차장 운영 컨설팅",
    "세차장 매출",
    "세차장 매출 증대",
    "세차장 객단가",
    "세차장 객단가 증대",
    "세차장 비수기",
    "세차장 프로모션",
    "세차장 멤버십",
    "세차장 단골 만들기",
    "세차장 마케팅",
    "워시펀 운영 컨설팅",
  ],
  alternates: { canonical: "/consulting/operations" },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "/consulting/operations",
    title,
    description,
    images: [{ url: "/images/png/cover-page.png", width: 1200, height: 630, alt: "세차장 운영 컨설팅" }],
  },
  twitter: { card: "summary_large_image", title, description },
};

const content: LongTailContent = {
  slug: "operations",
  breadcrumbName: "세차장 운영 컨설팅",
  eyebrow: "세차장 운영 컨설팅",
  h1: "운영 중인 세차장, 매출을 어떻게 더 올릴까요?",
  intro:
    "비수기 매출 감소, 객단가 한계, 신규 고객 확보 어려움 — 운영 중인 세차장의 가장 큰 고민입니다. 워시펀은 데이터 기반 운영 컨설팅으로 매출 구조를 다시 설계해 드립니다.",
  highlights: [
    "데이터 기반 가격·프로모션 최적화",
    "구독 고객 확보로 비수기 매출 고정화",
    "객단가 평균 +22% 달성 사례",
    "시간대 변동 요금제 자동 운영",
    "날씨 기반 자동 프로모션",
    "진상 고객·기기 장애 무인 대응 보조",
  ],
  sections: [
    {
      h: "비수기 매출 안정화 — 구독제로 고정 매출 확보",
      body: "계절성을 가진 세차장의 비수기 매출 감소는 구조적 문제입니다. 워시펀 구독 고객은 월 평균 2.6회 방문하며 비수기에도 안정적인 고정 매출을 만듭니다.",
      bullets: [
        "구독 고객 확보 마케팅 설계",
        "재방문 데이터 기반 리텐션 전략",
        "비수기 한정 변동 요금제 운용",
      ],
    },
    {
      h: "객단가 증대 — 시간 제한 폐지가 만드는 차이",
      body: "기존 셀프세차장은 3분 시간 만료 시 추가 결제 마찰로 객단가 상한이 있었습니다. 후불제·시간 제한 해제 매장은 평균 객단가가 업계 대비 +22% 형성됩니다.",
      bullets: [
        "후불제 시간 제한 폐지 운영",
        "프리미엄 옵션 자동 추천",
        "포인트 적립·재충전 유도",
      ],
    },
    {
      h: "마케팅 자동화 — 점주가 매번 신경 쓰지 않아도 됩니다",
      body: "시간대별 변동 요금제, 날씨 기반 프로모션, 신규 가입 쿠폰 등을 자동으로 운영합니다. 점주는 결과 데이터만 보면 됩니다.",
    },
  ],
  faq: [
    {
      q: "이미 운영 중인데 컨설팅만 받을 수 있나요?",
      a: "예. 시스템 도입과 별도로 운영 컨설팅만 단독으로 진행할 수 있습니다. 다만 워시펀 시스템과 결합하면 자동화 효과가 극대화됩니다.",
    },
    {
      q: "데이터는 어디서 가져오나요?",
      a: "워시펀 시스템 도입 매장은 자체 대시보드에서 매출·고객·기기 데이터를 모두 확인할 수 있습니다. 미도입 매장은 POS·통장 입금 내역 기반으로 1차 분석을 진행합니다.",
    },
    {
      q: "객단가 +22% 사례는 어떻게 가능한가요?",
      a: "시간 제한 폐지·후불제·프리미엄 옵션 자동 추천이 결합되면 고객이 자연스럽게 더 오래·더 많이 사용하게 됩니다.",
    },
    {
      q: "프로모션 운영도 워시펀이 대신해 주나요?",
      a: "기본 프로모션 템플릿(시간대 변동, 날씨, 신규 가입)은 자동 실행되며, 추가 캠페인은 컨설팅 패키지에 따라 함께 설계 가능합니다.",
    },
    {
      q: "비용은 어떻게 책정되나요?",
      a: "컨설팅 범위와 기간에 따라 다릅니다. 무료 1차 상담 후 매장에 맞춘 견적을 안내드립니다.",
    },
  ],
  ctaLead: "운영 컨설팅 무료 상담",
  related: [
    { href: "/consulting/remodeling", label: "기존 매장 리모델링" },
    { href: "/consulting/system", label: "시스템 도입" },
    { href: "/service", label: "점주용 관리 대시보드" },
  ],
};

export default function Page() {
  return <LongTailPage content={content} />;
}
