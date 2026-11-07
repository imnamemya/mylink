"use client";

import { useState } from "react";

export default function Home() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "손현우 | 프로필 링크",
          text: "개발자 손현우의 프로필 및 프로젝트를 확인해보세요.",
          url: window.location.href,
        })
        .catch(() => {
          copyToClipboard(window.location.href, "링크");
        });
    } else {
      copyToClipboard(window.location.href, "링크");
    }
  };

  const links = [
    {
      title: "GitHub 저장소",
      desc: "오픈소스 기여 및 개인 프로젝트 코드",
      href: "https://github.com",
      badge: "GitHub",
      badgeColor: "bg-zinc-800 text-zinc-100 dark:bg-zinc-700",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          />
        </svg>
      ),
    },
    {
      title: "기술 블로그 (Velog)",
      desc: "개발 회고와 실무 트러블슈팅 기록",
      href: "https://velog.io",
      badge: "Blog",
      badgeColor: "bg-emerald-600 text-white",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      title: "이력서 / 포트폴리오",
      desc: "경력 사항과 상세 프로젝트 이력 보기",
      href: "#",
      badge: "Resume",
      badgeColor: "bg-blue-600 text-white",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      title: "1:1 커피챗 신청",
      desc: "개발 이야기나 협업 제안 언제든 환영합니다",
      href: "mailto:contact@example.com?subject=[커피챗 신청] 안녕하세요 손현우님",
      badge: "Coffee Chat",
      badgeColor: "bg-amber-600 text-white",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
          <line x1="6" y1="1" x2="6" y2="4" strokeLinecap="round" />
          <line x1="10" y1="1" x2="10" y2="4" strokeLinecap="round" />
          <line x1="14" y1="1" x2="14" y2="4" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  const techStack = [
    { name: "TypeScript", color: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800" },
    { name: "Next.js", color: "bg-zinc-100 text-zinc-900 border-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700" },
    { name: "React", color: "bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/50 dark:text-cyan-300 dark:border-cyan-800" },
    { name: "Tailwind CSS", color: "bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/50 dark:text-teal-300 dark:border-teal-800" },
    { name: "Node.js", color: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800" },
    { name: "Git & GitHub", color: "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/50 dark:text-orange-300 dark:border-orange-800" },
  ];

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-zinc-950 text-zinc-100 selection:bg-indigo-500 selection:text-white flex flex-col items-center justify-center py-12 px-4 sm:px-6">
      {/* 배경 오로라/그라디언트 블러 효과 */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[450px] w-[450px] rounded-full bg-gradient-to-br from-indigo-600/30 via-purple-600/20 to-transparent blur-3xl" />
        <div className="absolute top-1/3 -right-32 h-[400px] w-[400px] rounded-full bg-gradient-to-bl from-cyan-500/25 via-blue-600/15 to-transparent blur-3xl" />
        <div className="absolute -bottom-32 left-1/4 h-[420px] w-[420px] rounded-full bg-gradient-to-tr from-violet-600/25 via-pink-600/15 to-transparent blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] opacity-70" />
      </div>

      {/* 중앙 메인 컨테이너 */}
      <div className="w-full max-w-lg transition-all">
        {/* 상단 액션 바 (공유 버튼 & 상태) */}
        <div className="flex items-center justify-between mb-4 px-2">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-medium text-emerald-400 tracking-wide">
              커피챗 & 새로운 기회 탐색 중
            </span>
          </div>

          <button
            onClick={handleShare}
            aria-label="프로필 공유하기"
            className="group flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-300 backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/20 active:scale-95"
          >
            <svg
              className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-200 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
            <span>{copied === "링크" ? "복사됨!" : "공유"}</span>
          </button>
        </div>

        {/* 메인 프로필 카드 */}
        <div className="relative rounded-3xl border border-white/10 bg-zinc-900/60 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl ring-1 ring-white/5 transition-all">
          {/* 프로필 상단 영역: 아바타 + 이름 + 소개 */}
          <div className="flex flex-col items-center text-center">
            {/* 아바타 (모던 그라디언트 링 + 입체감 배지) */}
            <div className="relative group">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-80 blur transition duration-500 group-hover:opacity-100 group-hover:blur-md" />
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-b from-zinc-800 to-zinc-900 text-3xl font-extrabold text-white shadow-xl ring-2 ring-white/20 select-none">
                <span className="bg-gradient-to-r from-indigo-200 via-white to-pink-200 bg-clip-text text-transparent">
                  손
                </span>
              </div>
              <div className="absolute bottom-0 right-0 rounded-full border-2 border-zinc-900 bg-gradient-to-tr from-emerald-500 to-teal-400 p-1 shadow-md">
                <svg className="h-3.5 w-3.5 text-zinc-950" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>

            {/* 이름 및 인증 배지 */}
            <div className="mt-5 flex items-center justify-center gap-1.5">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                손현우
              </h1>
              <span
                title="Verified Developer"
                className="inline-flex items-center text-sky-400"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.9 14.7l-4.1-4.1 1.4-1.4 2.7 2.7 6.9-6.9 1.4 1.4-8.3 8.3z" />
                </svg>
              </span>
            </div>

            {/* 직무 및 역할 태그 */}
            <div className="mt-2.5 flex flex-wrap items-center justify-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300">
                <span>💻</span> Software Engineer
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-300">
                <span>📍</span> Seoul, Korea
              </span>
            </div>

            {/* 소개글 */}
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-zinc-300 max-w-sm font-normal">
              직관적인 사용자 경험과 확장 가능한 코드를 지향합니다.
              <br />
              복잡한 문제를 단순하게 풀고 동료들과 함께 성장하는 과정을 즐깁니다.
            </p>

            {/* 소셜 빠른 아이콘 바 */}
            <div className="mt-5 flex items-center justify-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-400 transition-all hover:bg-white/15 hover:text-white hover:scale-105 active:scale-95"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  />
                </svg>
              </a>

              <a
                href="mailto:contact@example.com"
                aria-label="이메일"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-400 transition-all hover:bg-white/15 hover:text-white hover:scale-105 active:scale-95"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>

              <a
                href="https://velog.io"
                target="_blank"
                rel="noreferrer"
                aria-label="블로그"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-400 transition-all hover:bg-white/15 hover:text-white hover:scale-105 active:scale-95"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </a>

              <button
                onClick={() => copyToClipboard("contact@example.com", "이메일")}
                aria-label="이메일 주소 복사"
                title="이메일 주소 복사"
                className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-400 transition-all hover:bg-white/15 hover:text-white hover:scale-105 active:scale-95"
              >
                {copied === "이메일" ? (
                  <svg className="h-5 w-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* 복사 완료 알림 토스트 (미니) */}
          {copied && (
            <div className="mt-3 py-1.5 px-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-center text-xs font-medium text-emerald-300 animate-fadeIn transition">
              ✓ {copied}이(가) 클립보드에 복사되었습니다!
            </div>
          )}

          {/* 하이라이트 프로젝트 카드 */}
          <div className="mt-7">
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-4.5 transition-all duration-300 hover:border-indigo-500/50 hover:bg-white/[0.09] hover:shadow-lg hover:shadow-indigo-500/10">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center rounded-md bg-indigo-500/20 px-2 py-0.5 text-[11px] font-semibold text-indigo-300 ring-1 ring-inset ring-indigo-500/30">
                      FEATURED
                    </span>
                    <span className="text-xs text-zinc-400">최신 프로젝트</span>
                  </div>
                  <h2 className="text-base font-semibold text-white group-hover:text-indigo-200 transition-colors">
                    MyLink - 프로필 올인원 링크
                  </h2>
                  <p className="text-xs leading-relaxed text-zinc-400">
                    심플하고 아름다운 모던 포트폴리오 & 바이오링크 웹 애플리케이션
                  </p>
                </div>
                <div className="rounded-full bg-white/10 p-2 text-zinc-300 group-hover:bg-indigo-500 group-hover:text-white transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* 주요 링크 리스트 */}
          <div className="mt-5 space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                주요 바로가기
              </span>
            </div>

            {links.map((item, index) => (
              <a
                key={index}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.03] p-4 transition-all duration-200 hover:scale-[1.01] hover:border-white/20 hover:bg-white/[0.08] active:scale-[0.99]"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-300 transition-colors group-hover:border-indigo-400/40 group-hover:bg-indigo-500/10 group-hover:text-indigo-300">
                    {item.icon}
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-zinc-100 group-hover:text-white">
                        {item.title}
                      </span>
                      <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-medium ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 group-hover:text-zinc-300 line-clamp-1">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="text-zinc-500 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-white">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
            ))}
          </div>

          {/* 기술 스택 섹션 */}
          <div className="mt-6 pt-5 border-t border-white/10">
            <span className="block text-xs font-semibold tracking-wider text-zinc-400 uppercase mb-3 px-1">
              관심 기술 및 스택
            </span>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech.name}
                  className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-medium text-zinc-300 transition-colors hover:border-white/20 hover:bg-white/10"
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </div>

          {/* 하단 CTA 버튼 */}
          <div className="mt-7 flex flex-col sm:flex-row gap-2.5">
            <a
              href="mailto:contact@example.com"
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:from-indigo-600 hover:to-purple-700 hover:shadow-indigo-500/40 active:scale-95"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              이메일로 문의하기
            </a>

            <button
              onClick={() => copyToClipboard("contact@example.com", "이메일")}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-zinc-200 backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/30 active:scale-95"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              주소 복사
            </button>
          </div>
        </div>

        {/* 푸터 영역 */}
        <footer className="mt-8 text-center text-xs text-zinc-400">
          <p>© 2026 손현우. All rights reserved.</p>
          <p className="mt-1 flex items-center justify-center gap-1 text-[11px] text-zinc-400">
            <span>Powered by</span>
            <span className="font-semibold text-zinc-300">MyLink</span>
          </p>
        </footer>
      </div>
    </main>
  );
}
