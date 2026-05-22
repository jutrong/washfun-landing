import type { Metadata } from "next";
import LongTailPage, { LongTailContent } from "@/components/consulting/LongTailPage";

const title =
  "세차장 무인 시스템 도입 — 키오스크·POS·관리 대시보드 | 워시펀";
const description =
  "세차장 무인화·키오스크·POS·점주용 관리 대시보드까지 통합 도입. RF카드 대체, 후불제 결제, 구독제 자동 세차, 변동 요금제, 포인트 충전을 한 번에. 무료 도입 상담.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "세차장 시스템 도입",
    "세차장 무인 시스템",
    "세차장 무인화",
    "세차장 키오스크",
    "세차장 POS",
    "세차장 결제 시스템",
    "무인 세차 결제",
    "IoT 세차",
    "세차 앱",
    "RFID 세차 대체",
    "세차 카드 충전",
    "워시펀 시스템",
  ],
  alternates: { canonical: "/consulting/system" },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "/consulting/system",
    title,
    description,
    images: [{ url: "/images/png/cover-page.png", width: 1200, height: 630, alt: "세차장 무인 시스템 도입" }],
  },
  twitter: { card: "summary_large_image", title, description },
};

const content: LongTailContent = {
  slug: "system",
  breadcrumbName: "세차장 시스템 도입",
  eyebrow: "세차장 무인 시스템 컨설팅",
  h1: "세차장 무인 운영, 시스템부터 제대로 시작하세요.",
  intro:
    "후불제 셀프 세차, 구독제 자동 세차, 포인트 자동 충전 키오스크, 변동 요금제, 점주용 관리 대시보드를 하나의 시스템으로 통합합니다. 무인 운영도 안심하고 맡길 수 있는 세차장 인프라를 제공합니다.",
  highlights: [
    "후불제 자동 결제 셀프 세차",
    "정기 구독 기반 노터치 자동 세차",
    "포인트 자동 충전 현금 키오스크",
    "실시간 베이 모니터링·원격 제어",
    "변동 요금제·날씨 프로모션 자동화",
    "KC 인증 설비 + 2년 무상 A/S",
  ],
  sections: [
    {
      h: "왜 무인 시스템이 필요한가요?",
      body: "RF카드 시대의 셀프 세차장은 잔돈·카드 잔액·시간 만료 같은 마찰이 많아 신규 고객 진입 장벽이 높았습니다. 무인 시스템은 고객 경험을 단순화하고, 점주는 매출·기기·재고를 실시간으로 관리할 수 있습니다.",
      bullets: [
        "신규 고객 진입 장벽 제거 (앱·키오스크)",
        "객단가 상한 해제 (시간 제한 폐지)",
        "야간 무인 운영 안전성 확보",
        "기기 장애·재고 부족 사전 알림",
      ],
    },
    {
      h: "구성 요소 — 필요한 것만 골라 도입",
      body: "워시펀 시스템은 모듈식 구조라 매장 상황에 맞게 필요한 기능만 선택해 도입할 수 있습니다.",
      bullets: [
        "셀프 세차 후불 결제 모듈",
        "자동 세차 구독제 모듈",
        "포인트 충전 키오스크",
        "변동 요금제·프로모션 엔진",
        "점주용 대시보드 (PC·모바일)",
        "베이별 사용 시간·상태 모니터링",
      ],
    },
    {
      h: "데이터 — 매출, 고객, 기기 한 화면에서",
      body: "일별·월별·시간별·베이별 매출, 재방문 횟수, 방문자 수, 에러 발생 내역을 점주용 대시보드에서 한눈에 확인할 수 있습니다. 데이터를 기반으로 가격·프로모션을 조정해 매출 최적화가 가능합니다.",
    },
  ],
  faq: [
    {
      q: "설치 기간은 얼마나 걸리나요?",
      a: "매장 규모에 따라 다르지만 보통 1~2일, 자동시작 시스템까지 포함 시 최대 3일 정도 소요됩니다.",
    },
    {
      q: "기존 기기를 모두 교체해야 하나요?",
      a: "아닙니다. 워시펀은 기존 RF카드·키오스크 환경에 모듈식으로 추가 도입 가능합니다. 한 번에 다 바꾸지 않아도 됩니다.",
    },
    {
      q: "장애 발생 시 대응은 어떻게 되나요?",
      a: "코인박스·청소기·자동시작 시스템 단순 고장 건은 2년 무상 A/S, 여분 제품 택배 발송으로 점주가 직접 교체 가능합니다. 실시간 에러 알림도 점주 앱으로 전달됩니다.",
    },
    {
      q: "고객은 어떻게 결제하나요?",
      a: "워시펀 앱 후불 결제, 키오스크 포인트 충전, 기존 RF카드 호환 등 다양한 결제 수단이 동시에 가능합니다.",
    },
    {
      q: "시스템만 도입할 수 있나요? 컨설팅 없이?",
      a: "가능합니다. 단, 워시펀은 도입 후 가격 전략·프로모션 설계 등 운영 컨설팅을 기본 제공하므로 도입 효과를 극대화하실 수 있습니다.",
    },
  ],
  ctaLead: "시스템 도입 무료 상담",
  related: [
    { href: "/consulting/remodeling", label: "기존 매장 리모델링" },
    { href: "/consulting/operations", label: "운영 컨설팅" },
    { href: "/service", label: "점주용 관리 시스템 자세히 보기" },
  ],
};

export default function Page() {
  return <LongTailPage content={content} />;
}
