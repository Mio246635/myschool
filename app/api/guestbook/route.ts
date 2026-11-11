import { NextResponse } from "next/server";

export interface GuestbookEntry {
  id: number;
  nickname: string;
  message: string;
  createdAt: string;
}

// 서버 메모리(서버의 변수)에 방명록 데이터를 저장하여 모든 방문자가 함께 볼 수 있게 유지합니다.
const globalForGuestbook = globalThis as unknown as {
  guestbookEntries?: GuestbookEntry[];
  guestbookNextId?: number;
};

if (!globalForGuestbook.guestbookEntries) {
  globalForGuestbook.guestbookEntries = [
    {
      id: 1,
      nickname: "샬자 재학생 🌱",
      message:
        "이왕이면 샬자~! 우리 학교 소개 페이지에 찾아와 주셔서 반가워요. 따뜻한 응원 한마디 남겨 주세요!",
      createdAt: "첫 인사글",
    },
  ];
  globalForGuestbook.guestbookNextId = 2;
}

export async function GET() {
  const entries = globalForGuestbook.guestbookEntries ?? [];
  return NextResponse.json({ entries });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const nickname =
      typeof body.nickname === "string" ? body.nickname.trim() : "";
    const message =
      typeof body.message === "string" ? body.message.trim() : "";

    if (!nickname || !message) {
      return NextResponse.json(
        { error: "닉네임과 응원 글을 모두 입력해 주세요." },
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

    const now = new Date();
    const formattedTime = `${now.getFullYear()}.${String(
      now.getMonth() + 1
    ).padStart(2, "0")}.${String(now.getDate()).padStart(2, "0")} ${String(
      now.getHours()
    ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    const newEntry: GuestbookEntry = {
      id: globalForGuestbook.guestbookNextId ?? Date.now(),
      nickname,
      message,
      createdAt: formattedTime,
    };

    globalForGuestbook.guestbookNextId =
      (globalForGuestbook.guestbookNextId ?? 2) + 1;

    globalForGuestbook.guestbookEntries = [
      newEntry,
      ...(globalForGuestbook.guestbookEntries ?? []),
    ];

    return NextResponse.json(
      { entry: newEntry, entries: globalForGuestbook.guestbookEntries },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "요청을 처리하는 중 문제가 발생했어요." },
      { status: 400 }
    );
  }
}
