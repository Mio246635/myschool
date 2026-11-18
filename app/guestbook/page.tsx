"use client";

import { useEffect, useState } from "react";

interface GuestbookComment {
  id: number;
  entryId: number;
  nickname: string;
  content: string;
  createdAt: string;
}

interface GuestbookEntry {
  id: number;
  nickname: string;
  message: string;
  likesCount: number;
  createdAt: string;
  comments: GuestbookComment[];
}

const LIKED_STORAGE_KEY = "shalom_guestbook_liked_ids";

export default function GuestbookPage() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // 하트(공감) 상태
  const [likedIds, setLikedIds] = useState<number[]>([]);
  const [likingId, setLikingId] = useState<number | null>(null);

  // 게시글 삭제 상태
  const [deletingEntryId, setDeletingEntryId] = useState<number | null>(null);
  const [deleteEntryPassword, setDeleteEntryPassword] = useState("");
  const [deleteEntryError, setDeleteEntryError] = useState("");
  const [isDeletingEntry, setIsDeletingEntry] = useState(false);

  // 댓글 열림/작성/삭제 상태
  const [openCommentEntryIds, setOpenCommentEntryIds] = useState<number[]>([]);
  const [commentInputs, setCommentInputs] = useState<
    Record<number, { nickname: string; password: string; content: string }>
  >({});
  const [submittingCommentEntryId, setSubmittingCommentEntryId] = useState<
    number | null
  >(null);
  const [commentErrors, setCommentErrors] = useState<Record<number, string>>(
    {}
  );

  const [deletingCommentId, setDeletingCommentId] = useState<number | null>(
    null
  );
  const [deleteCommentPassword, setDeleteCommentPassword] = useState("");
  const [deleteCommentError, setDeleteCommentError] = useState("");
  const [isDeletingComment, setIsDeletingComment] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LIKED_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setLikedIds(parsed.map((v) => Number(v)).filter(Boolean));
        }
      }
    } catch {
      // ignore localStorage errors
    }
    loadEntries();
  }, []);

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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!nickname.trim() || !password.trim() || !message.trim()) {
      setErrorMsg("닉네임, 삭제용 비밀번호, 응원 글을 모두 입력해 주세요.");
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nickname: nickname.trim(),
          password: password.trim(),
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
      setPassword("");
      setMessage("");
      setSuccessMsg("따뜻한 응원 글이 방명록에 등록되었어요! 🌿");
    } catch {
      setErrorMsg("서버와 통신하는 중 문제가 발생했어요.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleToggleLike(entryId: number) {
    if (likingId === entryId) return;
    const alreadyLiked = likedIds.includes(entryId);
    const delta = alreadyLiked ? -1 : 1;

    const updatedLikedIds = alreadyLiked
      ? likedIds.filter((id) => id !== entryId)
      : [...likedIds, entryId];

    setLikedIds(updatedLikedIds);
    try {
      localStorage.setItem(LIKED_STORAGE_KEY, JSON.stringify(updatedLikedIds));
    } catch {
      // ignore
    }

    // 낙관적 업데이트
    setEntries((prev) =>
      prev.map((item) =>
        item.id === entryId
          ? { ...item, likesCount: Math.max(0, item.likesCount + delta) }
          : item
      )
    );

    try {
      setLikingId(entryId);
      const res = await fetch("/api/guestbook", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: entryId, delta }),
      });
      const data = await res.json();
      if (res.ok && Array.isArray(data.entries)) {
        setEntries(data.entries);
      }
    } catch {
      // 실패 시 재조회
      loadEntries();
    } finally {
      setLikingId(null);
    }
  }

  async function handleDeleteEntry(entryId: number) {
    setDeleteEntryError("");
    if (!deleteEntryPassword.trim()) {
      setDeleteEntryError("비밀번호를 입력해 주세요.");
      return;
    }

    try {
      setIsDeletingEntry(true);
      const res = await fetch("/api/guestbook", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "entry",
          id: entryId,
          password: deleteEntryPassword.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setDeleteEntryError(data.error || "삭제에 실패했어요.");
        return;
      }
      if (Array.isArray(data.entries)) {
        setEntries(data.entries);
      }
      setDeletingEntryId(null);
      setDeleteEntryPassword("");
    } catch {
      setDeleteEntryError("서버와 통신하는 중 문제가 발생했어요.");
    } finally {
      setIsDeletingEntry(false);
    }
  }

  function toggleCommentSection(entryId: number) {
    setOpenCommentEntryIds((prev) =>
      prev.includes(entryId)
        ? prev.filter((id) => id !== entryId)
        : [...prev, entryId]
    );
  }

  function updateCommentInput(
    entryId: number,
    field: "nickname" | "password" | "content",
    value: string
  ) {
    setCommentInputs((prev) => ({
      ...prev,
      [entryId]: {
        nickname: prev[entryId]?.nickname ?? "",
        password: prev[entryId]?.password ?? "",
        content: prev[entryId]?.content ?? "",
        [field]: value,
      },
    }));
  }

  async function handleCreateComment(
    e: React.FormEvent<HTMLFormElement>,
    entryId: number
  ) {
    e.preventDefault();
    const input = commentInputs[entryId] ?? {
      nickname: "",
      password: "",
      content: "",
    };

    setCommentErrors((prev) => ({ ...prev, [entryId]: "" }));

    if (!input.nickname.trim() || !input.password.trim() || !input.content.trim()) {
      setCommentErrors((prev) => ({
        ...prev,
        [entryId]: "닉네임, 비밀번호, 댓글 내용을 모두 입력해 주세요.",
      }));
      return;
    }

    try {
      setSubmittingCommentEntryId(entryId);
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "comment",
          entryId,
          nickname: input.nickname.trim(),
          password: input.password.trim(),
          content: input.content.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setCommentErrors((prev) => ({
          ...prev,
          [entryId]: data.error || "댓글 등록에 실패했어요.",
        }));
        return;
      }

      if (Array.isArray(data.entries)) {
        setEntries(data.entries);
      }
      setCommentInputs((prev) => ({
        ...prev,
        [entryId]: { nickname: "", password: "", content: "" },
      }));
    } catch {
      setCommentErrors((prev) => ({
        ...prev,
        [entryId]: "서버와 통신하는 중 문제가 발생했어요.",
      }));
    } finally {
      setSubmittingCommentEntryId(null);
    }
  }

  async function handleDeleteComment(commentId: number) {
    setDeleteCommentError("");
    if (!deleteCommentPassword.trim()) {
      setDeleteCommentError("비밀번호를 입력해 주세요.");
      return;
    }

    try {
      setIsDeletingComment(true);
      const res = await fetch("/api/guestbook", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "comment",
          id: commentId,
          password: deleteCommentPassword.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setDeleteCommentError(data.error || "댓글 삭제에 실패했어요.");
        return;
      }

      if (Array.isArray(data.entries)) {
        setEntries(data.entries);
      }
      setDeletingCommentId(null);
      setDeleteCommentPassword("");
    } catch {
      setDeleteCommentError("서버와 통신하는 중 문제가 발생했어요.");
    } finally {
      setIsDeletingComment(false);
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
            “이왕이면 샬자~” 우리 학교를 찾아주신 분들의 따뜻한 인사와 응원 글을 남겨 주세요. 남겨 주신 글은 데이터베이스에 안전하게 저장되며, 하트와 댓글로 서로의 응원에 마음을 더할 수 있습니다.
          </p>
        </div>
      </section>

      {/* 방명록 작성 폼 */}
      <section className="rounded-3xl border border-emerald-900/12 bg-white p-6 shadow-xs sm:p-8">
        <h2 className="text-lg font-extrabold text-emerald-950 sm:text-xl">
          ✏️ 응원 글 남기기
        </h2>
        <p className="mt-1 text-xs text-emerald-950/70 sm:text-sm">
          실제 학생·선생님 실명이나 전화번호 등 개인정보는 적지 마시고 별명(닉네임)으로 남겨 주세요. 비밀번호는 나중에 글을 삭제할 때 사용됩니다.
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 sm:max-w-xl">
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
                className="mt-1.5 w-full rounded-2xl border border-emerald-900/20 bg-[#fdfbf4] px-4 py-2.5 text-sm text-emerald-950 placeholder:text-emerald-950/40 focus:border-emerald-700 focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-bold text-emerald-950"
              >
                삭제용 비밀번호
              </label>
              <input
                id="password"
                type="password"
                maxLength={20}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="2~20자 입력"
                className="mt-1.5 w-full rounded-2xl border border-emerald-900/20 bg-[#fdfbf4] px-4 py-2.5 text-sm text-emerald-950 placeholder:text-emerald-950/40 focus:border-emerald-700 focus:bg-white focus:outline-none"
              />
            </div>
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
            {entries.map((entry) => {
              const isLiked = likedIds.includes(entry.id);
              const isCommentOpen = openCommentEntryIds.includes(entry.id);
              const commentForm = commentInputs[entry.id] ?? {
                nickname: "",
                password: "",
                content: "",
              };

              return (
                <article
                  key={entry.id}
                  className="rounded-2xl border border-emerald-900/12 bg-white p-5 shadow-2xs"
                >
                  {/* 카드 헤더 */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-900/10 pb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f1f7e8] text-sm">
                        🌿
                      </span>
                      <span className="font-extrabold text-emerald-950">
                        {entry.nickname}
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-medium text-emerald-950/60">
                        {entry.createdAt}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          if (deletingEntryId === entry.id) {
                            setDeletingEntryId(null);
                            setDeleteEntryPassword("");
                            setDeleteEntryError("");
                          } else {
                            setDeletingEntryId(entry.id);
                            setDeleteEntryPassword("");
                            setDeleteEntryError("");
                          }
                        }}
                        className="rounded-lg border border-emerald-900/15 px-2 py-1 text-xs font-semibold text-emerald-950/70 transition hover:border-red-300 hover:bg-red-50 hover:text-red-700"
                      >
                        삭제
                      </button>
                    </div>
                  </div>

                  {/* 게시글 삭제 비밀번호 확인 인라인 창 */}
                  {deletingEntryId === entry.id && (
                    <div className="mt-3 rounded-xl border border-red-200 bg-red-50/70 p-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold text-red-900">
                          삭제 비밀번호:
                        </span>
                        <input
                          type="password"
                          maxLength={20}
                          value={deleteEntryPassword}
                          onChange={(e) =>
                            setDeleteEntryPassword(e.target.value)
                          }
                          placeholder="작성 시 입력한 비밀번호"
                          className="rounded-lg border border-red-300 bg-white px-3 py-1.5 text-xs text-emerald-950 focus:border-red-500 focus:outline-none"
                        />
                        <button
                          type="button"
                          disabled={isDeletingEntry}
                          onClick={() => handleDeleteEntry(entry.id)}
                          className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-red-700 disabled:opacity-50"
                        >
                          {isDeletingEntry ? "삭제 중..." : "확인"}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setDeletingEntryId(null);
                            setDeleteEntryPassword("");
                            setDeleteEntryError("");
                          }}
                          className="rounded-lg border border-emerald-900/15 bg-white px-2.5 py-1.5 text-xs font-semibold text-emerald-950/70 hover:bg-gray-50"
                        >
                          취소
                        </button>
                      </div>
                      {deleteEntryError && (
                        <p className="mt-1.5 text-xs font-semibold text-red-700">
                          ⚠️ {deleteEntryError}
                        </p>
                      )}
                    </div>
                  )}

                  {/* 본문 */}
                  <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-emerald-950/90 sm:text-base">
                    {entry.message}
                  </p>

                  {/* 하단 액션 바 (하트 & 댓글 토글) */}
                  <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-emerald-900/8 pt-3">
                    <button
                      type="button"
                      onClick={() => handleToggleLike(entry.id)}
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-bold transition ${
                        isLiked
                          ? "border-rose-300 bg-rose-50 text-rose-700"
                          : "border-emerald-900/15 bg-[#fdfbf4] text-emerald-950/80 hover:bg-rose-50/60 hover:text-rose-700"
                      }`}
                    >
                      <span>{isLiked ? "❤️" : "🤍"}</span>
                      <span>하트 {entry.likesCount}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleCommentSection(entry.id)}
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-bold transition ${
                        isCommentOpen || entry.comments.length > 0
                          ? "border-emerald-700/25 bg-emerald-50/70 text-emerald-900"
                          : "border-emerald-900/15 bg-[#fdfbf4] text-emerald-950/80 hover:bg-emerald-50/50"
                      }`}
                    >
                      <span>💬</span>
                      <span>댓글 {entry.comments.length}</span>
                    </button>
                  </div>

                  {/* 댓글 목록 및 댓글 작성 영역 */}
                  {(isCommentOpen || entry.comments.length > 0) && (
                    <div className="mt-3 space-y-3 rounded-2xl border border-emerald-900/10 bg-[#faf8f0] p-4">
                      {entry.comments.length > 0 && (
                        <div className="space-y-2.5">
                          {entry.comments.map((comment) => (
                            <div
                              key={comment.id}
                              className="rounded-xl border border-emerald-900/10 bg-white px-3.5 py-2.5 text-xs sm:text-sm"
                            >
                              <div className="flex items-center justify-between gap-2">
                                <span className="font-extrabold text-emerald-950">
                                  🌱 {comment.nickname}
                                </span>
                                <div className="flex items-center gap-2">
                                  <span className="text-[11px] text-emerald-950/55">
                                    {comment.createdAt}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (deletingCommentId === comment.id) {
                                        setDeletingCommentId(null);
                                        setDeleteCommentPassword("");
                                        setDeleteCommentError("");
                                      } else {
                                        setDeletingCommentId(comment.id);
                                        setDeleteCommentPassword("");
                                        setDeleteCommentError("");
                                      }
                                    }}
                                    className="text-[11px] font-semibold text-emerald-950/60 hover:text-red-600"
                                  >
                                    삭제
                                  </button>
                                </div>
                              </div>
                              <p className="mt-1 whitespace-pre-wrap text-emerald-950/85">
                                {comment.content}
                              </p>

                              {deletingCommentId === comment.id && (
                                <div className="mt-2 rounded-lg border border-red-200 bg-red-50/70 p-2">
                                  <div className="flex flex-wrap items-center gap-1.5">
                                    <input
                                      type="password"
                                      maxLength={20}
                                      value={deleteCommentPassword}
                                      onChange={(e) =>
                                        setDeleteCommentPassword(e.target.value)
                                      }
                                      placeholder="댓글 비밀번호"
                                      className="rounded-md border border-red-300 bg-white px-2.5 py-1 text-xs text-emerald-950 focus:outline-none"
                                    />
                                    <button
                                      type="button"
                                      disabled={isDeletingComment}
                                      onClick={() =>
                                        handleDeleteComment(comment.id)
                                      }
                                      className="rounded-md bg-red-600 px-2.5 py-1 text-xs font-bold text-white hover:bg-red-700 disabled:opacity-50"
                                    >
                                      {isDeletingComment ? "삭제 중" : "확인"}
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setDeletingCommentId(null);
                                        setDeleteCommentPassword("");
                                        setDeleteCommentError("");
                                      }}
                                      className="rounded-md border border-emerald-900/15 bg-white px-2 py-1 text-xs text-emerald-950/70"
                                    >
                                      취소
                                    </button>
                                  </div>
                                  {deleteCommentError && (
                                    <p className="mt-1 text-[11px] font-semibold text-red-700">
                                      ⚠️ {deleteCommentError}
                                    </p>
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {isCommentOpen ? (
                        <form
                          onSubmit={(e) => handleCreateComment(e, entry.id)}
                          className="space-y-2.5 pt-1"
                        >
                          <div className="grid gap-2 sm:grid-cols-2">
                            <input
                              type="text"
                              maxLength={20}
                              value={commentForm.nickname}
                              onChange={(e) =>
                                updateCommentInput(
                                  entry.id,
                                  "nickname",
                                  e.target.value
                                )
                              }
                              placeholder="댓글 닉네임"
                              className="rounded-xl border border-emerald-900/20 bg-white px-3 py-2 text-xs text-emerald-950 placeholder:text-emerald-950/40 focus:border-emerald-700 focus:outline-none"
                            />
                            <input
                              type="password"
                              maxLength={20}
                              value={commentForm.password}
                              onChange={(e) =>
                                updateCommentInput(
                                  entry.id,
                                  "password",
                                  e.target.value
                                )
                              }
                              placeholder="삭제용 비밀번호 (2~20자)"
                              className="rounded-xl border border-emerald-900/20 bg-white px-3 py-2 text-xs text-emerald-950 placeholder:text-emerald-950/40 focus:border-emerald-700 focus:outline-none"
                            />
                          </div>

                          <div className="flex gap-2">
                            <input
                              type="text"
                              maxLength={200}
                              value={commentForm.content}
                              onChange={(e) =>
                                updateCommentInput(
                                  entry.id,
                                  "content",
                                  e.target.value
                                )
                              }
                              placeholder="따뜻한 답글을 남겨 보세요 (200자 이내)"
                              className="flex-1 rounded-xl border border-emerald-900/20 bg-white px-3 py-2 text-xs text-emerald-950 placeholder:text-emerald-950/40 focus:border-emerald-700 focus:outline-none"
                            />
                            <button
                              type="submit"
                              disabled={submittingCommentEntryId === entry.id}
                              className="shrink-0 rounded-xl bg-emerald-700 px-4 py-2 text-xs font-extrabold text-white transition hover:bg-emerald-800 disabled:opacity-50"
                            >
                              {submittingCommentEntryId === entry.id
                                ? "등록 중..."
                                : "댓글 등록"}
                            </button>
                          </div>

                          {commentErrors[entry.id] && (
                            <p className="text-xs font-semibold text-red-700">
                              ⚠️ {commentErrors[entry.id]}
                            </p>
                          )}
                        </form>
                      ) : (
                        <button
                          type="button"
                          onClick={() => toggleCommentSection(entry.id)}
                          className="text-xs font-bold text-emerald-800 hover:underline"
                        >
                          + 댓글 쓰기
                        </button>
                      )}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
