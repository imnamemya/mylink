export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-b from-zinc-50 to-zinc-100 text-zinc-900 dark:from-zinc-950 dark:to-zinc-900 dark:text-zinc-100">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200/80 bg-white/80 p-8 shadow-sm backdrop-blur-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/80">
        <div className="flex flex-col items-center text-center">
          {/* 프로필 아바타 (심플한 이니셜 배지) */}
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-zinc-900 text-3xl font-bold text-white shadow-inner dark:bg-zinc-100 dark:text-zinc-900">
            손
          </div>

          {/* 이름 */}
          <h1 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl">
            손현우
          </h1>

          {/* 태그 / 신분 */}
          <span className="mt-2 inline-flex items-center rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
            Software Engineer
          </span>

          {/* 소개글 */}
          <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
            직관적인 사용자 경험과 깔끔한 코드를 지향하는 개발자입니다. 복잡한 문제를 단순하게 해결하고 지속적으로 성장하는 과정을 즐깁니다.
          </p>

          {/* 구분선 */}
          <div className="my-6 w-full border-t border-zinc-100 dark:border-zinc-800" />

          {/* 심플한 추가 링크 / 액션 버튼 예시 */}
          <div className="flex w-full flex-col gap-2.5">
            <a
              href="mailto:contact@example.com"
              className="flex w-full items-center justify-center rounded-xl bg-zinc-900 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              이메일 보내기
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center rounded-xl border border-zinc-200 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800/50"
            >
              GitHub 둘러보기
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
