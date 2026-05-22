"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";

export default function FloatingCTA() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 1200);
    return () => clearTimeout(t);
  }, []);

  if (pathname?.startsWith("/contact")) return null;
  if (pathname?.startsWith("/inquiry")) return null;
  if (pathname?.startsWith("/terms")) return null;
  if (pathname?.startsWith("/term-of")) return null;
  if (pathname?.startsWith("/privacy-policy")) return null;

  return (
    <div className="fixed bottom-[24px] right-[24px] z-[200] flex flex-col items-end gap-[10px] lg:bottom-[16px] lg:right-[16px]">
      {open && (
        <>
          <Link
            href="/contact"
            onClick={() => track("lead_cta_click", { source: "floating_contact" })}
            className="flex items-center gap-[8px] rounded-[999px] bg-white px-[16px] py-[10px] text-[14px] font-semibold text-black shadow-[0_8px_24px_rgba(0,0,0,0.18)] ring-1 ring-black/10 transition hover:translate-y-[-1px] lg:hidden"
            aria-label="세차장 컨설팅 무료 상담 신청"
          >
            <span aria-hidden>💬</span>
            온라인 상담
          </Link>
          <a
            href="tel:+82-70-8806-8088"
            onClick={() => track("lead_cta_click", { source: "floating_tel" })}
            className="flex items-center gap-[8px] rounded-[999px] bg-white px-[16px] py-[10px] text-[14px] font-semibold text-black shadow-[0_8px_24px_rgba(0,0,0,0.18)] ring-1 ring-black/10 transition hover:translate-y-[-1px] lg:hidden"
            aria-label="워시펀 전화 상담 070-8806-8088"
          >
            <span aria-hidden>📞</span>
            070-8806-8088
          </a>
        </>
      )}
      <Link
        href="/contact"
        onClick={() => track("lead_cta_click", { source: "floating_main" })}
        className="rounded-[999px] bg-main px-[20px] py-[14px] text-[15px] font-semibold text-white shadow-[0_12px_28px_rgba(28,115,186,0.45)] transition hover:translate-y-[-1px]"
        aria-label="워시펀 무료 상담 신청하기"
      >
        무료 상담 신청
      </Link>
    </div>
  );
}
