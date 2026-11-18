import { createHash } from "crypto";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export interface GuestbookComment {
  id: number;
  entryId: number;
  nickname: string;
  content: string;
  createdAt: string;
}

export interface GuestbookEntry {
  id: number;
  nickname: string;
  message: string;
  likesCount: number;
  createdAt: string;
  comments: GuestbookComment[];
}

function hashPassword(password: string): string {
  return createHash("sha256").update(password).digest("hex");
}

function formatKST(isoDate: string): string {
  const date = new Date(isoDate);
  const parts = new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const get = (type: string) =>
    parts.find((p) => p.type === type)?.value ?? "00";
  return `${get("year")}.${get("month")}.${get("day")} ${get("hour")}:${get("minute")}`;
}

async function fetchAllEntries(): Promise<GuestbookEntry[]> {
  const [entriesRes, commentsRes] = await Promise.all([
    supabase
      .from("guestbook")
      .select("id, nickname, message, likes_count, created_at")
      .order("id", { ascending: false }),
    supabase
      .from("guestbook_comments")
      .select("id, entry_id, nickname, content, created_at")
      .order("id", { ascending: true }),
  ]);

  if (entriesRes.error) {
    throw new Error(entriesRes.error.message);
  }
  if (commentsRes.error) {
    throw new Error(commentsRes.error.message);
  }

  const commentsByEntryId = new Map<number, GuestbookComment[]>();
  for (const row of commentsRes.data ?? []) {
    const comment: GuestbookComment = {
      id: Number(row.id),
      entryId: Number(row.entry_id),
      nickname: row.nickname,
      content: row.content,
      createdAt: formatKST(row.created_at),
    };
    const list = commentsByEntryId.get(comment.entryId) ?? [];
    list.push(comment);
    commentsByEntryId.set(comment.entryId, list);
  }

  return (entriesRes.data ?? []).map((row) => {
    const id = Number(row.id);
    return {
      id,
      nickname: row.nickname,
      message: row.message,
      likesCount: Number(row.likes_count ?? 0),
      createdAt: formatKST(row.created_at),
      comments: commentsByEntryId.get(id) ?? [],
    };
  });
}

export async function GET() {
  try {
    const entries = await fetchAllEntries();
    return NextResponse.json({ entries });
  } catch {
    return NextResponse.json(
      { error: "방명록을 불러오는 중 오류가 발생했어요." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const action = body.action === "comment" ? "comment" : "entry";

    if (action === "comment") {
      const entryId = Number(body.entryId);
      const nickname =
        typeof body.nickname === "string" ? body.nickname.trim() : "";
      const content =
        typeof body.content === "string" ? body.content.trim() : "";
      const password =
        typeof body.password === "string" ? body.password.trim() : "";

      if (!entryId || !nickname || !content || !password) {
        return NextResponse.json(
          { error: "닉네임, 비밀번호, 댓글 내용을 모두 입력해 주세요." },
          { status: 400 }
        );
      }
      if (nickname.length > 20) {
        return NextResponse.json(
          { error: "닉네임은 20자 이내로 입력해 주세요." },
          { status: 400 }
        );
      }
      if (content.length > 200) {
        return NextResponse.json(
          { error: "댓글은 200자 이내로 입력해 주세요." },
          { status: 400 }
        );
      }
      if (password.length < 2 || password.length > 20) {
        return NextResponse.json(
          { error: "비밀번호는 2~20자 사이로 입력해 주세요." },
          { status: 400 }
        );
      }

      const { error } = await supabase.from("guestbook_comments").insert({
        entry_id: entryId,
        nickname,
        content,
        password_hash: hashPassword(password),
      });

      if (error) {
        return NextResponse.json(
          { error: "댓글을 등록하는 중 오류가 발생했어요." },
          { status: 500 }
        );
      }

      const entries = await fetchAllEntries();
      return NextResponse.json({ entries }, { status: 201 });
    }

    const nickname =
      typeof body.nickname === "string" ? body.nickname.trim() : "";
    const message =
      typeof body.message === "string" ? body.message.trim() : "";
    const password =
      typeof body.password === "string" ? body.password.trim() : "";

    if (!nickname || !message || !password) {
      return NextResponse.json(
        { error: "닉네임, 삭제용 비밀번호, 응원 글을 모두 입력해 주세요." },
        { status: 400 }
      );
    }

    if (nickname.length > 20) {
      return NextResponse.json(
        { error: "닉네임은 20자 이내로 입력해 주세요." },
        { status: 400 }
      );
    }

    if (message.length > 300) {
      return NextResponse.json(
        { error: "응원 글은 300자 이내로 입력해 주세요." },
        { status: 400 }
      );
    }

    if (password.length < 2 || password.length > 20) {
      return NextResponse.json(
        { error: "비밀번호는 2~20자 사이로 입력해 주세요." },
        { status: 400 }
      );
    }

    const { error } = await supabase.from("guestbook").insert({
      nickname,
      message,
      password_hash: hashPassword(password),
    });

    if (error) {
      return NextResponse.json(
        { error: "방명록을 저장하는 중 오류가 발생했어요." },
        { status: 500 }
      );
    }

    const entries = await fetchAllEntries();
    return NextResponse.json({ entries }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "요청을 처리하는 중 문제가 발생했어요." },
      { status: 400 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const id = Number(body.id);
    const delta = body.delta === -1 ? -1 : 1;

    if (!id) {
      return NextResponse.json(
        { error: "잘못된 요청입니다." },
        { status: 400 }
      );
    }

    const { data, error } = await supabase.rpc("adjust_guestbook_likes", {
      target_id: id,
      delta,
    });

    if (error) {
      return NextResponse.json(
        { error: "하트를 반영하는 중 오류가 발생했어요." },
        { status: 500 }
      );
    }

    const entries = await fetchAllEntries();
    return NextResponse.json({ likesCount: Number(data ?? 0), entries });
  } catch {
    return NextResponse.json(
      { error: "요청을 처리하는 중 문제가 발생했어요." },
      { status: 400 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const type = body.type === "comment" ? "comment" : "entry";
    const id = Number(body.id);
    const password =
      typeof body.password === "string" ? body.password.trim() : "";

    if (!id || !password) {
      return NextResponse.json(
        { error: "비밀번호를 입력해 주세요." },
        { status: 400 }
      );
    }

    const table = type === "comment" ? "guestbook_comments" : "guestbook";

    const { data: target, error: findError } = await supabase
      .from(table)
      .select("id, password_hash")
      .eq("id", id)
      .single();

    if (findError || !target) {
      return NextResponse.json(
        { error: "대상을 찾을 수 없어요." },
        { status: 404 }
      );
    }

    if (target.password_hash !== hashPassword(password)) {
      return NextResponse.json(
        { error: "비밀번호가 일치하지 않아요." },
        { status: 403 }
      );
    }

    const { error: deleteError } = await supabase
      .from(table)
      .delete()
      .eq("id", id);

    if (deleteError) {
      return NextResponse.json(
        { error: "삭제하는 중 오류가 발생했어요." },
        { status: 500 }
      );
    }

    const entries = await fetchAllEntries();
    return NextResponse.json({ entries });
  } catch {
    return NextResponse.json(
      { error: "삭제 요청을 처리하는 중 문제가 발생했어요." },
      { status: 400 }
    );
  }
}
