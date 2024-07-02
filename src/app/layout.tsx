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
  title: "WashFun - 워시펀",
  description: "셀프 세차의 디지털 혁신 - 워시펀과 함께",
  icons: {
    icon: "/images/svg/washfun-logo2.svg"
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
      <body className={pretendard.className}>
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        ) : null}
        {children}
      </body>
    </html>
  );
}
