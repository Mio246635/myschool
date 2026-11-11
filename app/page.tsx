import Image from "next/image";
import Link from "next/link";

const coreValues = [
  {
    emoji: "🌿",
    title: "자유의 맛",
    subtitle: "선택하고 책임지는 연습",
    badge: "삶의 주체가 되어 살아가기",
    description:
      "어른들이 만들어놓은 구조에 가두거나 학년과 역할을 계급구조로 받아들이게 하는 '학교화된 사회'를 넘어, 아이들의 잠재력을 끌어내는 마중물 같은 교육을 지향합니다.",
    points: [
      "종된 것으로부터의 자유(갈 5:1): 연예인, 돈, 유튜브, SNS, 술, 담배, 마약, 학력, 권력 등 다양한 욕망을 통제·절제하며 자기 삶의 수단으로 만들어가는 연습",
      "사랑으로 종 노릇 할 자유(갈 5:13): 자기 자신만을 위한 것이 아니라 사랑하는 것을 위해 헌신하고, 사회 변혁·연약한 이웃 돕기·대안적 공동체를 세워가는 자유",
      "작게는 들을 수업과 듣지 않을 수업을 선택하고 책임지며, 크게는 개인프로젝트·프리패스·동아리·인턴십·주제학습 학기 등을 통해 삶의 방향을 스스로 선택",
    ],
  },
  {
    emoji: "💚",
    title: "사랑의 멋",
    subtitle: "하나님, 나와 이웃, 자연 사랑",
    badge: "삶이 묻어나는 사랑의 실천",
    description:
      "하나님 사랑, 나와 이웃 사랑, 자연 사랑은 결코 떨어지지 않는 하나라는 생각으로 교육과정 속에서 할 수 있는 것들을 하나씩 실천합니다.",
    points: [
      "종교행위에만 집중하기보다 삶이 묻어나도록 주 3회 아침묵상을 하고 주일이면 함께 예배드리는 시간",
      "매주 한 번 쓰레기 봉투와 집게를 들고 나가는 마을 청소: 지저분하던 공간이 꽃밭으로 변하고 마을 어른들과 경찰관분들도 먼저 인사와 칭찬을 건네는 변화 경험",
      "자신과 주변 사람에 대한 이해를 넓히는 수업과, 함께 지내는 친구들과의 갈등을 해결하고 조정하며 사람 사랑을 배우는 가장 중요한 숨은 교육과정인 기숙사 생활",
    ],
  },
  {
    emoji: "🌱",
    title: "대안의 삶",
    subtitle: "앎과 삶의 일치",
    badge: "아는 대로 오늘을 살아가기",
    description:
      "모두가 똑같은 한 가지 대안을 강조하기보다, 각자의 자리에서 현대사회의 잘못된 세계관을 뛰어넘는 성경적 대안을 실천하고 드러내며 살아가기를 꿈꿉니다.",
    points: [
      "많이 알기보다 적게 알더라도 아는 대로 살아가는 연습: 시험을 위한 공부가 아니라 오늘의 삶에 실천하기 위한 배움",
      "학교 안에서 직접 실현해보는 기본소득, 학교화폐, 콩앗이(타임뱅크 샬자판)",
      "학기에 한 번 이상 주민들과 소통하는 장, 교육과정 공유회와 졸업식, 마을 장터 참여와 마을 축제 공연 등 작은 마을 단위에서 실천하는 하나님나라 운동",
    ],
  },
];

const semesters = [
  {
    term: "1학기",
    emoji: "🥾",
    title: "삶의 기초를 세우는 학기",
    summary:
      "언어능력과 자기성찰능력을 키우고, 체력의 한계를 넘어서며 몸과 마음의 기초를 단단히 다지는 학기입니다.",
    highlights: [
      "마샬 로젠버그의 비폭력대화: 판단에 앞서 있는 그대로 관찰하고, 자신의 느낌과 그 이면의 필요(욕구)를 찾아 강요 없이 전달하는 연습",
      "책을 읽고 글을 쓰는 다양한 수업과 세계 어디를 가도 최소한의 삶을 유지할 때 사용할 영어능력 향상",
      "중점 활동 [걷기 여행]: 체력의 한계를 넘으며 자기성찰과 타인 이해 과목들을 자신의 것으로 완성하는 시간 (2021년 '생태와 자연' 제주도 한 바퀴 / 2022년 '평화' 가평~임진각 평화공원 / 2023년 '생명' 안산 4.16기억교실~학교)",
    ],
  },
  {
    term: "2학기",
    emoji: "🧭",
    title: "삶의 방향을 탐색하는 학기",
    summary:
      "자신의 강점과 약점을 파악하고, 학교라는 제한된 공간을 넘어 사회 속으로 직접 뛰어들어 삶의 방향을 탐색하는 학기입니다.",
    highlights: [
      "하워드 가드너의 다중지능이론에 따른 다중지능 검사 및 강점지능을 연계한 삶의 방향 탐색 수업",
      "7-8학년 중점 활동 [몰입주간]: 2주간 모든 수업을 중단하고 보드게임 제작, 동영상 제작, 기타 연주 완주 등 자신의 역량과 흥미에 집중하는 시간",
      "9-11학년 중점 활동 [인턴십]: 직접 자기소개서를 보내고 면접을 보며 사회를 경험하는 시간 — 9학년 마을 인턴십(2주), 10학년 세미 인턴십(4주), 11학년 인턴십(8주)",
    ],
  },
  {
    term: "3학기",
    emoji: "🌍",
    title: "삶의 대안을 모색하는 학기",
    summary:
      "지속가능하고 변혁적인 삶을 위하여 자신의 삶의 기준을 세우고, 어떤 분야에서 살아가든 앎과 삶을 일치시키는 방법을 모색하는 학기입니다.",
    highlights: [
      "미셸 보바의 도덕지능이론에 따라 도덕성의 덕목을 스스로 갖추며 아는 것과 사는 것을 일치시키는 삶의 철학 세우기",
      "중점 활동 [테마여행]: 한 학기 동안 한 가지 주제를 다각도로 연구하고, 학생 주도로 만날 사람·기업에 연락하고 동선을 짜서 한 주간 다녀온 뒤 학교와 마을에 적용하는 활동",
      "2022년 '경제' 주제 사례: 경제와 노동 현장(대우조선해양 분규 사무장님, 파리바게트 노동자, 배달의 민족 기사님) 탐방 팀 / 전국 공정경제·마을경제 탐구 후 학교화폐와 기본소득을 만든 팀",
    ],
  },
];

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* 1. 큰 인사말 배너 (Hero) */}
      <section className="relative overflow-hidden rounded-3xl border border-emerald-900/15 bg-gradient-to-br from-[#f3f8ec] via-[#fdfbf4] to-[#eef5e4] p-6 shadow-xs sm:p-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-700/20 bg-emerald-700/10 px-4 py-1.5 text-sm font-bold text-emerald-900">
              <span>☀️ 재학생이 들려주는 우리 학교 이야기</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-emerald-950 sm:text-4xl md:text-5xl">
              이왕이면 샬자~ 🌿
              <span className="mt-2 block text-xl font-bold text-emerald-800 sm:text-2xl">
                샬롬자유학교에 오신 것을 환영해요!
              </span>
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-emerald-950/85 sm:text-lg">
              우리 학교의 한 줄 소개는{" "}
              <strong className="rounded-md bg-lime-200/70 px-1.5 py-0.5 font-extrabold text-emerald-950">
                “하나님의 형상을 회복하고 삶의 힘을 기르는 교육”
              </strong>
              이에요.{" "}
              <strong className="font-bold text-emerald-900">
                “학교가 누구의 것이지?”
              </strong>
              라는 질문에서 출발해, 학생이 교육과정의 중심에서 스스로 선택하고 책임지며 함께 만들어가는 학교랍니다.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/life"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-bold text-white shadow-xs transition hover:bg-emerald-800"
              >
                <span>🌱 우리가 뽑은 학교생활 5가지 보기</span>
              </Link>
              <Link
                href="/guestbook"
                className="inline-flex items-center gap-2 rounded-full border border-emerald-800/25 bg-white px-5 py-2.5 text-sm font-bold text-emerald-900 transition hover:bg-emerald-50"
              >
                <span>💌 방명록에 응원 남기기</span>
              </Link>
            </div>
          </div>

          <div className="flex shrink-0 flex-col items-center self-center rounded-2xl border border-emerald-900/10 bg-white p-5 shadow-xs">
            <Image
              src="/logo.jpg"
              alt="샬롬자유학교 로고"
              width={180}
              height={80}
              className="h-auto w-36 object-contain sm:w-44"
              priority
            />
            <span className="mt-3 rounded-full bg-[#fdfbf4] px-3 py-1 text-xs font-bold text-emerald-800">
              📖 2017년 무빙스쿨 토의로 세운 가치
            </span>
          </div>
        </div>
      </section>

      {/* 2. 교육철학 & 3대 핵심 가치 카드 */}
      <section className="space-y-6">
        <div className="space-y-2">
          <span className="text-sm font-extrabold text-emerald-700">
            ✨ 교육철학 · 하나님의 형상을 회복하는 교육
          </span>
          <h2 className="text-2xl font-extrabold text-emerald-950 sm:text-3xl">
            교사와 학생이 일주일간 함께 토의해 정한 3가지 핵심 가치
          </h2>
          <p className="text-sm leading-relaxed text-emerald-950/80 sm:text-base">
            2017년 무빙스쿨에서 6년의 교육과정 동안 회복해야 할 하나님의 형상이 무엇인지 교사와 학생이 일주일간 토의하여{" "}
            <strong className="font-bold text-emerald-900">
              “자유의 맛, 사랑의 멋, 대안의 삶”
            </strong>
            을 우리가 학교생활 중 회복해야 할 가치로 정했어요.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {coreValues.map((item) => (
            <article
              key={item.title}
              className="flex flex-col justify-between rounded-3xl border border-emerald-900/12 bg-white p-6 shadow-xs transition hover:border-emerald-700/30"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f1f7e8] text-2xl">
                    {item.emoji}
                  </span>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800">
                    {item.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-extrabold text-emerald-950">
                    {item.title}
                  </h3>
                  <p className="text-sm font-bold text-emerald-700">
                    {item.subtitle}
                  </p>
                </div>

                <p className="text-sm leading-relaxed text-emerald-950/80">
                  {item.description}
                </p>

                <ul className="space-y-2.5 border-t border-emerald-900/10 pt-4 text-xs leading-relaxed text-emerald-950/85 sm:text-sm">
                  {item.points.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <span className="mt-0.5 text-emerald-600" aria-hidden="true">
                        ✔
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 3. 교육과정 · 1년 3학기 흐름 타임라인 */}
      <section className="space-y-6 rounded-3xl border border-emerald-900/12 bg-[#f7f4e8] p-6 sm:p-8">
        <div className="space-y-2">
          <span className="text-sm font-extrabold text-emerald-700">
            🗓️ 교육과정 · 삶의 힘을 기르는 1년 3학기 흐름
          </span>
          <h2 className="text-2xl font-extrabold text-emerald-950 sm:text-3xl">
            왜 1년이 3학기일까요?
          </h2>
          <p className="text-sm leading-relaxed text-emerald-950/80 sm:text-base">
            보통의 학교가 2학기로 운영되는 것과 달리, 기숙학교의 피로감을 덜고 4월과 8월에 시행되는 검정고시와 원활하게 연계하기 위해 1년을 3학기로 구성했어요.{" "}
            <strong className="font-bold text-emerald-900">
              “무엇을 가르쳐야 하나?”
            </strong>
            보다{" "}
            <strong className="font-bold text-emerald-900">
              “학교가 누구의 것이지?”
            </strong>
            를 먼저 질문하며 학생의 의견과 주도성이 담긴 연간 교육과정을 만들어가고 있습니다.
          </p>
        </div>

        {/* 1 → 2 → 3학기 타임라인 */}
        <div className="grid gap-6 lg:grid-cols-3">
          {semesters.map((sem, index) => (
            <div
              key={sem.term}
              className="relative flex flex-col rounded-2xl border border-emerald-900/12 bg-white p-5 shadow-xs"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-700 px-3 py-1 text-xs font-extrabold text-white">
                  <span>{sem.emoji}</span>
                  <span>{sem.term}</span>
                </span>
                <span className="text-xs font-bold text-emerald-700/80">
                  STEP {index + 1}
                </span>
              </div>

              <h3 className="text-lg font-extrabold text-emerald-950">
                {sem.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-emerald-950/80">
                {sem.summary}
              </p>

              <ul className="mt-4 space-y-2 border-t border-emerald-900/10 pt-3 text-xs leading-relaxed text-emerald-950/85 sm:text-sm">
                {sem.highlights.map((hl) => (
                  <li key={hl} className="flex items-start gap-2">
                    <span className="mt-0.5 text-emerald-700" aria-hidden="true">
                      •
                    </span>
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-emerald-800/15 bg-[#eef5e4] p-4 text-center text-sm font-medium text-emerald-950">
          “모든 순간이 아름다울 수는 없지만, 모든 과정이 행복할 수는 없지만… 이렇게 살아가고 성장하는 친구들이 아름답고 행복한 삶을 살아가는 것은 사실입니다.” 🌿
        </div>
      </section>
    </div>
  );
}
