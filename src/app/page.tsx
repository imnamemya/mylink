"use client";

import { useState } from "react";

export default function Home() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(label);
      setTimeout(() => setCopied(null), 2500);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "손현우 ✦ Neo-Brutalist Profile",
          text: "개발자 손현우의 프로필 및 프로젝트 링크입니다.",
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
      title: "GitHub Repository",
      koreanTitle: "깃허브 저장소",
      desc: "오픈소스 기여 및 개인 사이드 프로젝트 코드",
      href: "https://github.com",
      badge: "CODE",
      cardBg: "bg-purple-100 hover:bg-purple-200",
      badgeBg: "bg-purple-300",
      icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          />
        </svg>
      ),
    },
    {
      title: "Tech Blog (Velog)",
      koreanTitle: "기술 블로그",
      desc: "개발 회고와 실무 문제 해결 트러블슈팅 기록",
      href: "https://velog.io",
      badge: "LOG",
      cardBg: "bg-emerald-100 hover:bg-emerald-200",
      badgeBg: "bg-lime-300",
      icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      title: "Resume & Portfolio",
      koreanTitle: "이력서 / 경력 기술서",
      desc: "프로젝트 상세 기여도와 커리어 히스토리",
      href: "#",
      badge: "DOC",
      cardBg: "bg-sky-100 hover:bg-sky-200",
      badgeBg: "bg-sky-300",
      icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      title: "Coffee Chat 1:1",
      koreanTitle: "커피챗 신청하기",
      desc: "가벼운 네트워킹, 기술 토크, 협업 제안 환영",
      href: "mailto:contact@example.com?subject=[커피챗 신청] 안녕하세요 손현우님!",
      badge: "TALK",
      cardBg: "bg-rose-100 hover:bg-rose-200",
      badgeBg: "bg-pink-300",
      icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
          <line x1="6" y1="1" x2="6" y2="4" strokeLinecap="round" />
          <line x1="10" y1="1" x2="10" y2="4" strokeLinecap="round" />
          <line x1="14" y1="1" x2="14" y2="4" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  const techStack = [
    { name: "TypeScript", bg: "bg-sky-200" },
    { name: "Next.js 16", bg: "bg-yellow-200" },
    { name: "React 19", bg: "bg-cyan-200" },
    { name: "Tailwind v4", bg: "bg-teal-200" },
    { name: "Node.js", bg: "bg-lime-200" },
    { name: "Git & CI/CD", bg: "bg-orange-200" },
    { name: "UI/UX Design", bg: "bg-pink-200" },
    { name: "REST / GraphQL", bg: "bg-violet-200" },
  ];

  return (
    <main className="relative min-h-screen w-full bg-[#FAF7F2] text-black flex flex-col items-center justify-center py-6 sm:py-10 px-3 sm:px-6 selection:bg-yellow-300 selection:text-black">
      {/* Neo-Brutalist 격자 배경 패턴 */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(to right, #00000015 1px, transparent 1px),
            linear-gradient(to bottom, #00000015 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />

      {/* 장식용 떠있는 스티커 요소들 (큰 화면용) */}
      <div className="pointer-events-none absolute top-8 left-8 hidden lg:block rotate-[-12deg]">
        <div className="border-[3px] border-black bg-yellow-300 px-3 py-1 font-black text-xs tracking-wider shadow-[4px_4px_0px_0px_#000]">
          ✦ HELLO WORLD!
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-12 right-10 hidden lg:block rotate-[8deg]">
        <div className="border-[3px] border-black bg-pink-400 text-white px-3 py-1 font-black text-xs tracking-wider shadow-[4px_4px_0px_0px_#000]">
          ★ NEO-BRUTALISM
        </div>
      </div>

      {/* 메인 래퍼 */}
      <div className="w-full max-w-lg mx-auto">
        {/* 상단 브루탈리스트 네비게이션 & 액션 (모바일 S 최적화) */}
        <header className="flex items-center justify-between mb-3.5 sm:mb-4 gap-1.5 sm:gap-2">
          {/* 브랜드 스탬프 */}
          <div className="inline-flex items-center gap-1 border-[2px] sm:border-[2.5px] border-black bg-black text-yellow-300 px-2 sm:px-3 py-1 text-[11px] sm:text-xs font-black tracking-wider uppercase shadow-[2px_2px_0px_0px_#000] sm:shadow-[3px_3px_0px_0px_#000]">
            <span>MYLINK</span>
            <span className="text-white">v2.0</span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* 상태 뱃지 */}
            <div className="flex items-center gap-1 border-[2px] sm:border-[2.5px] border-black bg-lime-300 px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-black shadow-[2px_2px_0px_0px_#000] sm:shadow-[3px_3px_0px_0px_#000]">
              <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-black animate-ping" />
              <span>ONLINE</span>
            </div>

            {/* 공유 버튼 */}
            <button
              onClick={handleShare}
              className="flex items-center gap-1 border-[2px] sm:border-[2.5px] border-black bg-white px-2 sm:px-3 py-1 text-[11px] sm:text-xs font-black shadow-[2px_2px_0px_0px_#000] sm:shadow-[3px_3px_0px_0px_#000] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_#000] cursor-pointer"
            >
              <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              <span>{copied === "링크" ? "복사됨!" : "SHARE"}</span>
            </button>
          </div>
        </header>

        {/* 메인 프로필 카드 본체 */}
        <section className="relative border-[3px] sm:border-[3.5px] border-black bg-white p-4 sm:p-8 rounded-2xl shadow-[5px_5px_0px_0px_#000] sm:shadow-[8px_8px_0px_0px_#000]">
          {/* 상단 마스킹 테이프 장식 효과 (모바일 S 중앙 정렬 & 비례 최적화) */}
          <div className="absolute -top-3 sm:-top-3.5 left-1/2 -translate-x-1/2 rotate-[-1deg] sm:rotate-[-1.5deg] border-[2px] border-black bg-yellow-200/95 px-3 sm:px-6 py-0.5 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-black shadow-sm select-none whitespace-nowrap">
            /// DEVELOPER PROFILE ///
          </div>

          {/* 프로필 헤더 */}
          <div className="flex flex-col items-center text-center mt-1 sm:mt-2">
            {/* 아바타 박스 */}
            <div className="relative group">
              <div className="flex h-20 w-20 sm:h-28 sm:w-28 items-center justify-center rounded-2xl border-[3px] sm:border-[3.5px] border-black bg-gradient-to-br from-yellow-300 via-pink-300 to-cyan-300 text-3xl sm:text-5xl font-black text-black shadow-[4px_4px_0px_0px_#000] sm:shadow-[5px_5px_0px_0px_#000] transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 select-none">
                손
              </div>
              {/* 스탬프 뱃지 */}
              <div className="absolute -bottom-1.5 -right-2 sm:-bottom-2 sm:-right-3 rotate-[10deg] border-[2px] border-black bg-lime-400 px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-[11px] font-black text-black shadow-[2px_2px_0px_0px_#000]">
                LV.99 ⚡
              </div>
            </div>

            {/* 타이틀 및 인증 뱃지 (모바일 S 정렬 완벽 대응) */}
            <div className="mt-4 sm:mt-5 flex items-center justify-center gap-1.5">
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-black">
                손현우
              </h1>
              <div
                title="Verified"
                className="flex items-center justify-center h-5 w-5 sm:h-6 sm:w-6 shrink-0 rounded-full border-2 border-black bg-cyan-300 text-black shadow-[1.5px_1.5px_0px_0px_#000] sm:shadow-[2px_2px_0px_0px_#000]"
              >
                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            {/* 타이틀 직함 태그 (모바일 S 화면에서도 줄바꿈 어긋남 없이 정돈되도록 개선) */}
            <div className="mt-2.5 sm:mt-3 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
              <span className="inline-flex items-center justify-center gap-1 border-2 border-black bg-yellow-300 px-2 sm:px-3 py-0.5 text-[10px] sm:text-xs font-black shadow-[2px_2px_0px_0px_#000] whitespace-nowrap">
                <span>💻</span>
                <span>SOFTWARE ENGINEER</span>
              </span>
              <span className="inline-flex items-center justify-center gap-1 border-2 border-black bg-pink-300 px-2 sm:px-3 py-0.5 text-[10px] sm:text-xs font-black shadow-[2px_2px_0px_0px_#000] whitespace-nowrap">
                <span>📍</span>
                <span>SEOUL, KR</span>
              </span>
            </div>

            {/* 자기소개 박스 */}
            <div className="mt-4 sm:mt-5 w-full border-2 border-black bg-[#FFFDF8] p-3 sm:p-4 text-left shadow-[3px_3px_0px_0px_#000] sm:shadow-[4px_4px_0px_0px_#000] rounded-xl">
              <div className="flex items-center justify-between mb-1.5 pb-1 border-b-2 border-black">
                <span className="font-mono text-[10px] sm:text-[11px] font-black uppercase text-zinc-600">
                  BIO.TXT
                </span>
                <span className="font-mono text-[10px] sm:text-[11px] font-black text-zinc-400">
                  UTF-8
                </span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-zinc-900 leading-relaxed">
                직관적인 사용자 경험과 타협 없는 코드를 사랑합니다. 복잡한 문제를 명료하고 즐거운 인터랙션으로 해결하며 꾸준히 성장하고 있습니다.
              </p>
            </div>

            {/* 소셜 빠른 액션 바 */}
            <div className="mt-4 sm:mt-5 flex items-center justify-center gap-2 sm:gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-xl border-[2px] sm:border-[2.5px] border-black bg-purple-200 text-black shadow-[2.5px_2.5px_0px_0px_#000] sm:shadow-[3px_3px_0px_0px_#000] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_#000]"
              >
                <svg className="h-4 w-4 sm:h-5 sm:w-5 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>

              <a
                href="mailto:contact@example.com"
                aria-label="이메일"
                className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-xl border-[2px] sm:border-[2.5px] border-black bg-cyan-200 text-black shadow-[2.5px_2.5px_0px_0px_#000] sm:shadow-[3px_3px_0px_0px_#000] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_#000]"
              >
                <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>

              <a
                href="https://velog.io"
                target="_blank"
                rel="noreferrer"
                aria-label="블로그"
                className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-xl border-[2px] sm:border-[2.5px] border-black bg-lime-200 text-black shadow-[2.5px_2.5px_0px_0px_#000] sm:shadow-[3px_3px_0px_0px_#000] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_#000]"
              >
                <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </a>

              <button
                onClick={() => copyToClipboard("contact@example.com", "이메일")}
                aria-label="이메일 복사"
                title="이메일 복사하기"
                className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-xl border-[2px] sm:border-[2.5px] border-black bg-orange-200 text-black shadow-[2.5px_2.5px_0px_0px_#000] sm:shadow-[3px_3px_0px_0px_#000] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_#000] cursor-pointer"
              >
                {copied === "이메일" ? (
                  <svg className="h-4 w-4 sm:h-5 sm:w-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* 복사 토스트 배너 */}
          {copied && (
            <div className="mt-3.5 border-2 border-black bg-lime-300 p-2 sm:p-2.5 rounded-lg text-center font-black text-xs text-black shadow-[2.5px_2.5px_0px_0px_#000] animate-popIn">
              ⚡ {copied}이(가) 클립보드에 복사되었습니다!
            </div>
          )}

          {/* 하이라이트 프로젝트 카드 */}
          <div className="mt-5 sm:mt-6">
            <div className="group relative border-[2px] sm:border-[2.5px] border-black bg-yellow-300 p-3.5 sm:p-4.5 rounded-xl shadow-[3.5px_3.5px_0px_0px_#000] sm:shadow-[4px_4px_0px_0px_#000] transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_#000]">
              <div className="flex items-start justify-between gap-2.5 sm:gap-3">
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                    <span className="border-2 border-black bg-black text-yellow-300 px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] font-black uppercase tracking-wider shrink-0">
                      ★ FEATURED
                    </span>
                    <span className="text-[11px] sm:text-xs font-black text-black">PROJECT</span>
                  </div>
                  <h2 className="text-sm sm:text-base font-black text-black truncate">
                    MyLink - 프로필 올인원 링크
                  </h2>
                  <p className="text-[11px] sm:text-xs font-bold text-zinc-800 leading-snug">
                    네오 브루탈리즘 감성으로 완성한 모던 바이오링크 웹 앱
                  </p>
                </div>
                <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg border-2 border-black bg-white text-black shadow-[2px_2px_0px_0px_#000] transition-transform group-hover:rotate-45">
                  <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* 링크 목록 섹션 */}
          <div className="mt-5 sm:mt-6 space-y-2.5 sm:space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="border-b-2 border-black pb-0.5 font-mono text-[11px] sm:text-xs font-black tracking-wider uppercase text-black">
                ▶ CURATED LINKS
              </span>
              <span className="font-mono text-[10px] sm:text-[11px] font-bold text-zinc-500">
                04 ITEMS
              </span>
            </div>

            {links.map((item, index) => (
              <a
                key={index}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`group flex items-center justify-between rounded-xl border-[2px] sm:border-[2.5px] border-black p-3 sm:p-3.5 shadow-[3.5px_3.5px_0px_0px_#000] sm:shadow-[4px_4px_0px_0px_#000] transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_#000] ${item.cardBg}`}
              >
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg border-2 border-black bg-white text-black shadow-[2px_2px_0px_0px_#000]">
                    {item.icon}
                  </div>
                  <div className="text-left min-w-0">
                    <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                      <span className="text-xs sm:text-sm font-black text-black truncate">
                        {item.koreanTitle}
                      </span>
                      <span className={`border-[1.5px] border-black px-1.5 py-0.2 text-[9px] sm:text-[10px] font-black uppercase shrink-0 ${item.badgeBg}`}>
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-[11px] sm:text-xs font-bold text-zinc-700 truncate">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-md border-2 border-black bg-white text-black transition-transform group-hover:translate-x-1 ml-2">
                  <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
            ))}
          </div>

          {/* 기술 스택 스탬프 영역 */}
          <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t-[2px] sm:border-t-[2.5px] border-black">
            <div className="flex items-center justify-between mb-2.5 sm:mb-3 px-1">
              <span className="font-mono text-[11px] sm:text-xs font-black tracking-wider uppercase text-black">
                ▶ TECH ARSENAL
              </span>
              <span className="text-[10px] sm:text-[11px] font-black text-zinc-500">
                STACK
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech.name}
                  className={`border-2 border-black ${tech.bg} px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs font-black text-black shadow-[2px_2px_0px_0px_#000] hover:-translate-y-0.5 transition-transform cursor-default`}
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </div>

          {/* 하단 CTA 버튼 */}
          <div className="mt-6 sm:mt-7 flex flex-col sm:flex-row gap-2 sm:gap-2.5">
            <a
              href="mailto:contact@example.com"
              className="flex-1 inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-xl border-[2px] sm:border-[2.5px] border-black bg-cyan-400 px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-black text-black shadow-[3.5px_3.5px_0px_0px_#000] sm:shadow-[4px_4px_0px_0px_#000] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_#000]"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              이메일 바로 보내기
            </a>

            <button
              onClick={() => copyToClipboard("contact@example.com", "이메일")}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border-[2px] sm:border-[2.5px] border-black bg-pink-300 px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-black text-black shadow-[3.5px_3.5px_0px_0px_#000] sm:shadow-[4px_4px_0px_0px_#000] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_#000] cursor-pointer"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              주소 복사
            </button>
          </div>
        </section>

        {/* 푸터 영역 */}
        <footer className="mt-6 sm:mt-8 mb-4 text-center">
          <div className="inline-flex flex-col items-center border-2 border-black bg-white px-4 sm:px-5 py-2 sm:py-2.5 shadow-[3px_3px_0px_0px_#000] sm:shadow-[4px_4px_0px_0px_#000] rounded-xl">
            <div className="font-mono text-[11px] sm:text-xs font-black tracking-widest text-black">
              ||| | |||| | || | ||| |||| |
            </div>
            <p className="mt-1 font-mono text-[10px] sm:text-[11px] font-black text-zinc-800">
              © 2026 HYUNWOO SON ✦ ALL RIGHTS RESERVED
            </p>
            <p className="font-mono text-[9px] sm:text-[10px] font-bold text-zinc-500">
              POWERED BY <span className="underline decoration-2 text-black">MYLINK</span>
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
