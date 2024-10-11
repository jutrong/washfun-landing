import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import GoogleAnalytics from "@/lib/GoogleAnalytics";


const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.lifedivergence.com"),

  title: "WashFun - 워시펀",
  description: "셀프 세차의 디지털 혁신 - 워시펀과 함께",
  keywords: ["워시펀", "셀프세차", "워시펀 카드", "워시펀 코인박스", "워시펀 포스", "워시펀 무인화", "워시펀 직원관리", "washfun", "후불결제 시스템"],
  icons: {
    icon: "/images/png/logo.png"
  },
  openGraph: {
    title: "WashFun - 워시펀",
    description: "셀프 세차의 디지털 혁신 - 워시펀과 함께",
    images: [
      {
        url: "/images/png/cover-page.png",
        alt: "워시펀 대시보드 이미지",
      }
    ]

  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr" className={`${pretendard.variable}`}>
      <meta name="google-site-verification" content="rFOt_n-IDumlpzicrWEfpl9ctFdZW62a2IkNIanTBaM" />
      <meta name="naver-site-verification" content="d983fee3f0b7db68efd9a65aa2ebd48490c11d92" />
      {/* <!-- naver 블로그, 카카오톡 미리보기 설정 --> */}
      <meta property="og:title" content="셀프 세차의 디지털 혁신 - 워시펀과 함께" />
      <meta property="og:url" content="https://www.lifedivergence.com" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="/images/png/cover-page.png" />
      <meta property="og:description" content="워시펀을 통해 매출,고객 수 등 다양한 데이터를 한 눈에 확인하세요." />
      <meta property="og:site_name" content="washfun - 워시펀" />
      <meta property="og:locale" content="ko_KR" />

      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <body className={pretendard.className}>
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        ) : null}
        {children}
      </body>
    </html>
  );
}
