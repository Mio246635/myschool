"use client";

import { useEffect, useState } from "react";

interface GuestbookEntry {
  id: number;
  nickname: string;
  message: string;
  createdAt: string;
}

export default function GuestbookPage() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  async function loadEntries() {
    try {
      setIsLoading(true);
      const res = await fetch("/api/guestbook", { cache: "no-store" });
      if (!res.ok) throw new Error("방명록을 불러오지 못했어요.");
      const data = await res.json();
      setEntries(Array.isArray(data.entries) ? data.entries : []);
    } catch {
      setErrorMsg("방명록 목록을 불러오는 중 오류가 발생했어요.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadEntries();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!nickname.trim() || !message.trim()) {
      setErrorMsg("닉네임과 응원 글을 모두 입력해 주세요.");
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nickname: nickname.trim(),
          message: message.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "등록에 실패했어요.");
        return;
      }

      if (Array.isArray(data.entries)) {
        setEntries(data.entries);
      }
      setNickname("");
      setMessage("");
      setSuccessMsg("따뜻한 응원 글이 방명록에 등록되었어요! 🌿");
    } catch {
      setErrorMsg("서버와 통신하는 중 문제가 발생했어요.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-10">
      {/* 상단 배너 */}
      <section className="rounded-3xl border border-emerald-900/15 bg-gradient-to-br from-[#f3f8ec] via-[#fdfbf4] to-[#eef5e4] p-6 sm:p-8">
        <div className="space-y-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-700/20 bg-emerald-700/10 px-3.5 py-1 text-xs font-extrabold text-emerald-900">
            <span>💌 모두 함께 보는 응원 노트</span>
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight text-emerald-950 sm:text-3xl md:text-4xl">
            샬롬자유학교 방명록
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-emerald-950/80 sm:text-base">
            “이왕이면 샬자~” 우리 학교를 찾아주신 분들의 따뜻한 인사와 응원 글을 남겨 주세요. 남겨 주신 글은 서버 메모리에 저장되어 이곳을 방문하는 모두가 함께 볼 수 있습니다.
          </p>
        </div>
      </section>

      {/* 방명록 작성 폼 */}
      <section className="rounded-3xl border border-emerald-900/12 bg-white p-6 shadow-xs sm:p-8">
        <h2 className="text-lg font-extrabold text-emerald-950 sm:text-xl">
          ✏️ 응원 글 남기기
        </h2>
        <p className="mt-1 text-xs text-emerald-950/70 sm:text-sm">
          실제 학생·선생님 실명이나 전화번호 등 개인정보는 적지 마시고 별명(닉네임)으로 남겨 주세요.
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label
              htmlFor="nickname"
              className="block text-sm font-bold text-emerald-950"
            >
              닉네임
            </label>
            <input
              id="nickname"
              type="text"
              maxLength={20}
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="예: 숲속산책자, 샬자응원단"
              className="mt-1.5 w-full rounded-2xl border border-emerald-900/20 bg-[#fdfbf4] px-4 py-2.5 text-sm text-emerald-950 placeholder:text-emerald-950/40 focus:border-emerald-700 focus:bg-white focus:outline-none sm:max-w-xs"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-bold text-emerald-950"
            >
              응원 글
            </label>
            <textarea
              id="message"
              rows={3}
              maxLength={300}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="샬롬자유학교에 전하고 싶은 따뜻한 응원 한마디를 적어 주세요!"
              className="mt-1.5 w-full rounded-2xl border border-emerald-900/20 bg-[#fdfbf4] px-4 py-3 text-sm text-emerald-950 placeholder:text-emerald-950/40 focus:border-emerald-700 focus:bg-white focus:outline-none"
            />
          </div>

          {errorMsg && (
            <p className="rounded-xl bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-700">
              ⚠️ {errorMsg}
            </p>
          )}

          {successMsg && (
            <p className="rounded-xl bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-800">
              {successMsg}
            </p>
          )}

          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-emerald-950/60">
              {message.length} / 300자
            </span>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-1.5 rounded-full bg-emerald-700 px-6 py-2.5 text-sm font-extrabold text-white shadow-xs transition hover:bg-emerald-800 disabled:opacity-50"
            >
              <span>🌱</span>
              <span>{isSubmitting ? "등록 중..." : "응원 글 등록하기"}</span>
            </button>
          </div>
        </form>
      </section>

      {/* 방명록 글 목록 */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-emerald-950 sm:text-xl">
            📬 남겨진 응원 글 ({entries.length}개)
          </h2>
          <button
            type="button"
            onClick={loadEntries}
            className="rounded-full border border-emerald-900/15 bg-white px-3.5 py-1.5 text-xs font-bold text-emerald-900 transition hover:bg-emerald-50"
          >
            🔄 새로고침
          </button>
        </div>

        {isLoading ? (
          <div className="rounded-3xl border border-emerald-900/10 bg-white p-8 text-center text-sm text-emerald-950/70">
            방명록을 불러오는 중이에요... 🌿
          </div>
        ) : entries.length === 0 ? (
          <div className="rounded-3xl border border-emerald-900/10 bg-white p-8 text-center text-sm text-emerald-950/70">
            아직 남겨진 글이 없어요. 첫 번째 응원 글을 남겨 보세요!
          </div>
        ) : (
          <div className="grid gap-4">
            {entries.map((entry) => (
              <article
                key={entry.id}
                className="rounded-2xl border border-emerald-900/12 bg-white p-5 shadow-2xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-900/10 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f1f7e8] text-sm">
                      🌿
                    </span>
                    <span className="font-extrabold text-emerald-950">
                      {entry.nickname}
                    </span>
                  </div>
                  <span className="text-xs font-medium text-emerald-950/60">
                    {entry.createdAt}
                  </span>
                </div>
                <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-emerald-950/90 sm:text-base">
                  {entry.message}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
