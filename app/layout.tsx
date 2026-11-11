import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "샬롬자유학교 소개 · 이왕이면 샬자~",
  description: "하나님의 형상을 회복하고 삶의 힘을 기르는 교육, 샬롬자유학교를 소개합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#fdfbf4] text-[#293329]">
        <Navbar />
        <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
          {children}
        </main>
        <footer className="mt-12 border-t border-emerald-900/10 bg-[#f6f2e4] py-6 text-center text-sm text-emerald-950/80">
          <div className="mx-auto max-w-4xl px-4">
            <p className="font-medium">
              학생 실습으로 만든 사이트예요 (공식 홈페이지 아님) · 공식 홈페이지:{" "}
              <a
                href="https://www.shalomfree.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-emerald-800 underline underline-offset-4 hover:text-emerald-600"
              >
                shalomfree.kr
              </a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}

