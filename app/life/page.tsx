import Link from "next/link";

const activities = [
  {
    id: "walking-trip",
    emoji: "🥾",
    name: "걷기 여행",
    oneLine: "체력의 한계를 넘으며 자기성찰과 성취감을 얻는 1학기 중점 활동",
    tag: "1학기 · 삶의 기초 세우기",
    details: [
      "걷기는 신체의 기초를 다지는 데 가장 적합한 활동이자, 체력의 한계를 넘어서며 성취감을 느끼고 자존감이 올라가는 시간입니다.",
      "어려움을 인내하고 걷는 과정에서 자기성찰이 이루어지며, 1학기에 배운 자기 성찰과 타인 이해 과목들이 걷는 시간에 완성되어 내 것이 됩니다.",
      "연도별 발자취: 2021년 ‘생태와 자연’을 주제로 제주도 한 바퀴 걷기 / 2022년 우크라이나 전쟁을 기억하며 ‘평화’를 주제로 가평에서 임진각 평화공원까지 걷기 / 2023년 10.29참사를 기억하며 ‘생명’을 주제로 안산 4.16기억교실에서 시작해 학교까지 걸었습니다.",
    ],
  },
  {
    id: "internship",
    emoji: "💼",
    name: "인턴십",
    oneLine: "9-11학년이 관심 분야의 일터로 직접 나가 삶의 방향을 탐색하는 사회참여학습",
    tag: "2학기 · 삶의 방향 탐색하기",
    details: [
      "학교라는 제한된 공간을 벗어나 자신이 가고 싶고 장점을 최대한 활용할 수 있는 공간으로 직접 나가보는 경험입니다.",
      "학년별 과정: 9학년은 학교 주변에서 출퇴근할 수 있는 직장에서 2주간 ‘마을 인턴십’, 10학년은 4주간 ‘세미 인턴십’, 11학년은 8주간 ‘인턴십’을 진행합니다.",
      "관심사와 궤적을 같이하는 개인·회사를 선택해 직접 자기소개서를 보내고 면접을 보며 출근합니다. 설렘과 긴장 속에서 세상에 대한 막연한 두려움을 덜고 지금 준비해야 할 것을 알아갑니다.",
    ],
  },
  {
    id: "theme-trip",
    emoji: "🧭",
    name: "테마여행",
    oneLine: "한 학기 동안 한 가지 주제를 학생 주도로 연구하고 현장을 찾아가는 3학기 활동",
    tag: "3학기 · 삶의 대안 모색하기",
    details: [
      "한 학기 동안 한 가지 주제를 다각도에서 깊이 연구하고, 만날 사람이나 기업을 직접 탐색해 메일·전화로 약속을 잡고 동선을 짜서 한 주간 다녀옵니다.",
      "2022년 ‘경제’ 주제 사례 ①: 경제와 노동의 관계를 공부한 팀은 대우조선해양 분규 참여 사무장님, 파리바게트 노동자분들, 배달의 민족 기사님들을 만나 노동 현장의 어려움을 배웠습니다.",
      "2022년 ‘경제’ 주제 사례 ②: 공정경제와 마을경제를 탐구한 팀은 전국의 공정경제 사장님들을 만난 뒤 학교로 돌아와 ‘학교화폐’와 ‘기본소득’을 만드는 변화를 주도했습니다.",
    ],
  },
  {
    id: "dormitory",
    emoji: "🏠",
    name: "기숙사 생활",
    oneLine: "함께 지내는 친구들과 갈등을 해결하고 조정하며 사람 사랑을 배우는 숨은 교육과정",
    tag: "사랑의 멋 · 함께 살아가기",
    details: [
      "기숙사 생활은 샬롬자유학교에서 ‘사람 사랑’을 배우는 가장 중요한 숨은 교육과정입니다.",
      "함께 지내는 친구들과의 갈등을 덮어두고 살 수 없는 기숙학교의 특성상, 갈등을 해결하고 조정하는 수많은 질문과 대답이 오갑니다.",
      "때로는 그 과정이 지치게도 하지만, 서로의 다름을 이해하고 조율하며 함께 성장하는 소중한 배움터가 됩니다.",
    ],
  },
  {
    id: "with-village",
    emoji: "🤝",
    name: "마을과 함께",
    oneLine: "교육과정 공유회, 장터, 축제 공연 등으로 지역사회와 소통하고 연대하는 활동",
    tag: "대안의 삶 · 지역사회 연대",
    details: [
      "작은 마을 단위에서라도 대안의 삶을 실천하기 위해 지역사회와 연대하며 작게나마 하나님나라 운동을 실천합니다.",
      "학기에 한 번 이상 주민들과 소통하는 장을 마련하고, 교육과정 공유회나 졸업식을 통해 마을과 함께 학교 이야기를 나눕니다.",
      "마을 장터에 나가 물건을 팔거나 마을 축제에 초대되어 공연을 하기도 하고, 매주 한 번 쓰레기 봉투와 집게를 들고 마을 청소를 하며 마을의 변화를 함께 만들어갑니다.",
    ],
  },
];

export default function SchoolLifePage() {
  return (
    <div className="space-y-10">
      {/* 상단 소개 영역 */}
      <section className="rounded-3xl border border-emerald-900/15 bg-gradient-to-br from-[#f3f8ec] via-[#fdfbf4] to-[#eef5e4] p-6 sm:p-8">
        <div className="space-y-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-700/20 bg-emerald-700/10 px-3.5 py-1 text-xs font-extrabold text-emerald-900">
            <span>🌱 우리가 직접 선택하고 만들어가는 일상</span>
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight text-emerald-950 sm:text-3xl md:text-4xl">
            재학생이 뽑은 샬롬자유학교 학교생활 5가지
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-emerald-950/80 sm:text-base">
            교실 책상 안에만 머무르지 않고 직접 걸으며 성찰하고, 일터와 현장을 찾아가고, 기숙사와 마을에서 부대끼며{" "}
            <strong className="font-bold text-emerald-900">
              자유의 맛 · 사랑의 멋 · 대안의 삶
            </strong>
            을 살아가는 우리들의 이야기예요.
          </p>
        </div>
      </section>

      {/* 활동 카드 5개 */}
      <section aria-label="학교생활 활동 카드 5개" className="grid gap-6">
        {activities.map((activity, index) => (
          <article
            key={activity.id}
            className="rounded-3xl border border-emerald-900/12 bg-white p-6 shadow-xs transition hover:border-emerald-700/35 sm:p-7"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              {/* 이모지 아이콘 */}
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-emerald-900/10 bg-[#f2f7e9] text-3xl shadow-2xs">
                <span role="img" aria-label={activity.name}>
                  {activity.emoji}
                </span>
              </div>

              {/* 이름, 한 줄 설명, 상세 내용 */}
              <div className="flex-1 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-emerald-700 px-3 py-0.5 text-xs font-extrabold text-white">
                    활동 {index + 1}
                  </span>
                  <span className="rounded-full bg-[#f5f2e6] px-3 py-0.5 text-xs font-bold text-emerald-900">
                    {activity.tag}
                  </span>
                </div>

                <div>
                  <h2 className="text-xl font-extrabold text-emerald-950 sm:text-2xl">
                    {activity.emoji} {activity.name}
                  </h2>
                  <p className="mt-1 rounded-xl bg-lime-100/80 px-3.5 py-2 text-sm font-bold text-emerald-950 sm:text-base">
                    “{activity.oneLine}”
                  </p>
                </div>

                <ul className="space-y-2 border-t border-emerald-900/10 pt-3 text-sm leading-relaxed text-emerald-950/85">
                  {activity.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-2">
                      <span className="mt-0.5 text-emerald-700" aria-hidden="true">
                        🌿
                      </span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* 하단 방명록 유도 배너 */}
      <section className="flex flex-col items-center justify-between gap-4 rounded-3xl border border-emerald-900/12 bg-[#f7f4e8] p-6 text-center sm:flex-row sm:text-left">
        <div>
          <h2 className="text-lg font-extrabold text-emerald-950">
            우리 학교 이야기가 어떠셨나요? 💬
          </h2>
          <p className="mt-1 text-sm text-emerald-950/80">
            방명록에 따뜻한 인사나 응원의 한마디를 남겨 주시면 모두 함께 볼 수 있어요!
          </p>
        </div>
        <Link
          href="/guestbook"
          className="shrink-0 rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-bold text-white shadow-xs transition hover:bg-emerald-800"
        >
          💌 방명록 쓰러 가기
        </Link>
      </section>
    </div>
  );
}
