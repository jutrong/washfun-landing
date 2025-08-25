import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import GoogleAnalytics from "@/lib/GoogleAnalytics";

const pretendard = localFont({
  src: [
    {
      path: "../../public/fonts/Pretendard-Thin.woff",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-ExtraLight.woff",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-Light.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-SemiBold.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-Bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-ExtraBold.woff",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-Black.woff",
      weight: "900",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.lifedivergence.com"),
  title: "WashFun - 워시펀",
  description: "RF카드를 대체한 세차장 디지털 혁신, 매장 관리부터 경쟁력 확보까지 - 워시펀과 함께",
  keywords: ["워시펀", "washfun", "셀프세차", "노터치 자동세차", "세차 구독", "세차 카드", "세차장 창업", "세차장 창업비용", "세차장 매매", "세차장 임대", "세차장"],
  openGraph: {
    title: "WashFun - 워시펀",
    description: "RF카드를 대체한 세차장 디지털 혁신, 매장 관리부터 경쟁력 확보까지 - 워시펀과 함께",
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
        <link rel="shortcut icon" href="/icon.ico" />
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
