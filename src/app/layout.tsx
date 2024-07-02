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
  metadataBase: new URL("https://washfun.vercel.app"),

  title: "WashFun - 워시펀",
  description: "셀프 세차의 디지털 혁신 - 워시펀과 함께",
  icons: {
    icon: "/images/svg/washfun-logo2.svg"
  },
  openGraph: {
    title: "WashFun - 워시펀",
    description: "셀프 세차의 디지털 혁신 - 워시펀과 함께",
    images: [
      {
        url: "/images/png/dashboard-mockup.png",
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
      <meta name="google-site-verification" content="VMTp64EcMV80hjezkmVT12Yd2tPjLS823u_zVWUxIwE" />
      <meta name="naver-site-verification" content="0dfd8e7c9e0fdc338d7b7a27f89ddac03bb278b9" />
      {/* <!-- naver 블로그, 카카오톡 미리보기 설정 --> */}
      <meta property="og:title" content="워시펀 - 셀프 세차의 디지털 혁신 - 워시펀과 함께" />
      <meta property="og:url" content="https://washfun.vercel.app/" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="/images/png/dashboard-mockup.png" />
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
