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
  description: "워시펀을 통해 매출,고객 수 등 다양한 데이터를 한 눈에 확인하세요. 셀프 세차의 디지털 혁신 - 워시펀과 함께",
  icons: {
    icon: "/favicon.ico "
  },
  keywords: ["워시펀", "셀프세차", "워시펀 카드", "워시펀 코인박스", "워시펀 포스", "워시펀 무인화", "워시펀 직원관리", "washfun", "후불결제 시스템"],
  openGraph: {
    title: "WashFun - 워시펀",
    description: "워시펀을 통해 매출,고객 수 등 다양한 데이터를 한 눈에 확인하세요. 셀프 세차의 디지털 혁신 - 워시펀과 함께",
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
      <head>
        <meta name="google-site-verification" content="rFOt_n-IDumlpzicrWEfpl9ctFdZW62a2IkNIanTBaM" />
        <meta name="naver-site-verification" content="d983fee3f0b7db68efd9a65aa2ebd48490c11d92" />
      </head>
      <body className={pretendard.className}>
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        ) : null}
        {children}
      </body>
    </html>
  );
}
