"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "홈", emoji: "🏡" },
  { href: "/life", label: "학교생활", emoji: "🌱" },
  { href: "/guestbook", label: "방명록", emoji: "💌" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-emerald-900/10 bg-[#fdfbf4]/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-4xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-3 self-start rounded-2xl transition-opacity hover:opacity-90"
        >
          <Image
            src="/logo.jpg"
            alt="샬롬자유학교 로고"
            width={120}
            height={44}
            className="h-10 w-auto rounded-lg border border-emerald-900/10 bg-white object-contain p-1 shadow-xs"
            priority
          />
          <div>
            <span className="block text-xs font-semibold text-emerald-700">
              이왕이면 샬자~ 🌿
            </span>
            <span className="block text-lg font-extrabold tracking-tight text-emerald-950">
              샬롬자유학교
            </span>
          </div>
        </Link>

        <nav aria-label="주요 메뉴" className="flex items-center gap-1.5 sm:gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold transition-all sm:flex-initial ${
                  isActive
                    ? "bg-emerald-700 text-white shadow-xs"
                    : "bg-emerald-950/5 text-emerald-950 hover:bg-emerald-700/15"
                }`}
              >
                <span aria-hidden="true">{item.emoji}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
