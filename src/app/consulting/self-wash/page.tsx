import type { Metadata } from "next";
import LongTailPage, { LongTailContent } from "@/components/consulting/LongTailPage";

const title =
  "셀프세차장 창업 가이드 — 비용·수익·시스템 | 워시펀";
const description =
  "셀프세차장 창업, 어떻게 시작하시나요? 베이 수·기기 사양·후불제 결제·코인박스 IoT까지 — 워시펀이 셀프세차장 창업비용과 운영을 함께 설계합니다.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "셀프세차장 창업",
    "셀프 세차장 창업비용",
    "셀프 세차 창업",
    "셀프세차 창업비용",
    "셀프 세차 기기",
    "코인 세차장",
    "후불제 셀프 세차",
    "IoT 코인박스",
    "셀프세차 결제",
    "셀프 세차장 수익",
    "워시펀 셀프세차",
  ],
  alternates: { canonical: "/consulting/self-wash" },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "/consulting/self-wash",
    title,
    description,
    images: [{ url: "/images/png/cover-page.png", width: 1200, height: 630, alt: "셀프세차장 창업" }],
  },
  twitter: { card: "summary_large_image", title, description },
};

const content: LongTailContent = {
  slug: "self-wash",
  breadcrumbName: "셀프세차장 창업",
  eyebrow: "셀프세차장 창업 컨설팅",
  h1: "셀프세차장 창업, 후불제 시대에 맞게 시작하세요.",
  intro:
    "베이 구성, IoT 코인박스·청소기, 후불제 결제, 잔돈 없는 키오스크 — 워시펀의 셀프세차 시스템과 함께라면 RF카드 시대를 건너뛴 신축 셀프세차장이 가능합니다.",
  highlights: [
    "후불제 자동 결제 셀프 세차",
    "실시간 서버 연동 IoT 코인박스",
    "사용량 데이터 자동 수집",
    "잔돈·RF카드 분실 민원 제로",
    "베이별 사용 시간·상태 모니터링",
    "변동 요금제로 회전율 극대화",
  ],
  sections: [
    {
      h: "셀프세차장 창업비용 — 베이·기기·시스템 분리 견적",
      body: "셀프세차장 창업비용은 부지·토목·기기·시스템으로 구분됩니다. 워시펀은 모듈별로 견적을 분리해 자금 계획을 세우기 쉽게 안내드립니다.",
      bullets: [
        "부지·토목·전기·배수 공사",
        "셀프 세차 기기·코인박스·청소기",
        "워시펀 후불제 시스템·키오스크",
        "초기 마케팅·간판·CCTV",
      ],
    },
    {
      h: "기기 구성 — 베이 수와 동선이 결정합니다",
      body: "베이 수는 부지 면적과 예상 차량 통행량에 맞춰 결정합니다. 일반적으로 진출입 동선과 드라잉존 위치가 회전율과 객단가를 좌우합니다.",
    },
    {
      h: "후불제 시스템 — 셀프세차의 가장 큰 변화",
      body: "기존 코인·RF카드 방식은 시간 만료 시 추가 결제 마찰로 객단가 상한이 있었습니다. 워시펀 후불제는 사용한 만큼만 결제되어 고객이 부담 없이 더 오래 사용합니다.",
    },
  ],
  faq: [
    {
      q: "셀프세차장 창업비용은 평균 얼마가 드나요?",
      a: "베이 수·부지·토목 공사 범위에 따라 큰 차이가 납니다. 워시펀 무료 상담으로 매장에 맞춘 견적과 회수기간 시뮬레이션을 받으실 수 있습니다.",
    },
    {
      q: "IoT 코인박스가 일반 코인박스와 어떻게 다른가요?",
      a: "워시펀 IoT 코인박스는 실시간 서버 통신으로 사용량·잔액·고장 상태를 점주가 원격에서 확인할 수 있습니다. 운영·정산 효율이 크게 올라갑니다.",
    },
    {
      q: "후불제와 코인·RF카드 방식 중 무엇이 유리한가요?",
      a: "객단가·재방문율·고객 진입 장벽 측면에서 후불제 시스템이 우위입니다. RF카드 방식과 병행 운영도 가능합니다.",
    },
    {
      q: "운영 인력이 필요한가요?",
      a: "기본적으로 무인 운영을 전제로 설계됩니다. 워시펀 시스템이 결제·정산·기기 모니터링을 자동화하므로 점주는 원격 관리만 하시면 됩니다.",
    },
    {
      q: "기존 셀프세차장에도 워시펀 후불제를 추가할 수 있나요?",
      a: "예. 기존 기기·환경 그대로 두고 후불제 모듈만 추가 도입 가능합니다. 세차장 리모델링 페이지에서 자세한 내용을 확인하실 수 있습니다.",
    },
  ],
  ctaLead: "셀프세차장 창업 상담",
  related: [
    { href: "/consulting/start-business", label: "세차장 창업 종합 가이드" },
    { href: "/consulting/auto-wash", label: "자동세차장 창업 가이드" },
    { href: "/consulting/system", label: "후불제 시스템 자세히" },
  ],
};

export default function Page() {
  return <LongTailPage content={content} />;
}
