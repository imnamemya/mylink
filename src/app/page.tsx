"use client";

import { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>("all");
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
          title: "손현우 | 컬리 큐레이션 프로필",
          text: "엄선된 소프트웨어 엔지니어 손현우의 프로필 링크입니다.",
          url: window.location.href,
        })
        .catch(() => {
          copyToClipboard(window.location.href, "프로필 링크");
        });
    } else {
      copyToClipboard(window.location.href, "프로필 링크");
    }
  };

  const tabs = [
    { id: "all", label: "전체보기" },
    { id: "links", label: "큐레이션 링크" },
    { id: "projects", label: "프로젝트" },
    { id: "skills", label: "기술 스택" },
  ];

  const links = [
    {
      category: "오픈소스 & 코드",
      title: "GitHub 저장소",
      desc: "지속 가능한 아키텍처와 오픈소스 기여 내역",
      badge: "Kurly Only",
      href: "https://github.com",
      actionLabel: "저장소 방문",
      type: "links",
    },
    {
      category: "기술 아카이브",
      title: "기술 블로그 (Velog)",
      desc: "품질 기준을 지키는 문제 해결 과정과 엔지니어링 회고",
      badge: "Best Curation",
      href: "https://velog.io",
      actionLabel: "글 목록 보기",
      type: "links",
    },
    {
      category: "상세 이력",
      title: "이력서 및 경력 기술서",
      desc: "신뢰와 전문성을 바탕으로 쌓아온 상세 커리어 로드맵",
      badge: "Verified",
      href: "#",
      actionLabel: "이력서 열람",
      type: "links",
    },
    {
      category: "네트워킹 & 제안",
      title: "1:1 커피챗 신청",
      desc: "더 나은 개발 문화와 새로운 프로젝트 협업을 위한 만남",
      badge: "샛별 응답",
      href: "mailto:contact@example.com?subject=[컬리 커피챗] 안녕하세요 손현우님!",
      actionLabel: "대화 신청하기",
      type: "links",
    },
  ];

  const projects = [
    {
      title: "MyLink - 미니멀 올인원 링크 서비스",
      desc: "절제된 디자인과 타협 없는 완성도로 구현한 링크인바이오 웹 애플리케이션",
      tags: ["Next.js 16", "React 19", "Tailwind CSS"],
      badge: "대표 프로젝트",
      deliveryText: "상시 열람 가능 · 오픈소스 공개",
      href: "https://github.com",
    },
  ];

  const techStack = [
    { name: "TypeScript", role: "주 언어 / 정적 타입 설계" },
    { name: "Next.js 16", role: "App Router / SSR & SSG" },
    { name: "React 19", role: "모던 컴포넌트 아키텍처" },
    { name: "Tailwind CSS", role: "디자인 시스템 & 토큰 기반 UI" },
    { name: "Node.js", role: "RESTful API & 백엔드 런타임" },
    { name: "Git & GitHub", role: "버전 관리 & 협업 파이프라인" },
  ];

  const filteredLinks =
    activeTab === "all" || activeTab === "links" ? links : [];
  const showProjects = activeTab === "all" || activeTab === "projects";
  const showSkills = activeTab === "all" || activeTab === "skills";

  return (
    <main className="min-h-screen w-full bg-[#ffffff] text-[#333333] flex flex-col items-center">
      {/* 1. 컬리 스타일 최상단 알림 띠배너 (샛별 큐레이션 공지) */}
      <aside aria-label="프로필 공지" className="w-full bg-[#5f0080] text-white py-2 px-3 text-center text-[12px] sm:text-[13px] font-normal tracking-tight">
        <span>지금 가장 정갈한 코드를 짓는 개발자, </span>
        <strong className="font-semibold underline underline-offset-2">손현우의 포트폴리오</strong>
        <span>에 오신 것을 환영합니다.</span>
      </aside>

      {/* 2. 컬리 헤더 (로고 & 서피스 네비게이션) */}
      <header className="w-full border-b border-[#dfe4eb] bg-white sticky top-0 z-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[#5f0080] text-[20px] sm:text-[22px] font-bold tracking-tight">
              MyLink
            </span>
            <span className="text-[#999999] text-[12px] font-normal border-l border-[#dfe4eb] pl-2 ml-1 hidden sm:inline">
              컬리 인스파이어드 에디션
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              aria-label="프로필 공유하기"
              className="text-[#464c52] text-[13px] sm:text-[14px] font-normal hover:text-[#5f0080] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <svg className="w-4 h-4 text-[#5f0080]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              <span>{copied === "프로필 링크" ? "복사완료" : "공유"}</span>
            </button>
            <button
              onClick={() => copyToClipboard("contact@example.com", "이메일 주소")}
              aria-label="이메일 주소 복사"
              className="border border-[#dfe4eb] rounded-[4px] px-2.5 py-1 text-[12px] sm:text-[13px] text-[#333333] hover:border-[#5f0080] hover:text-[#5f0080] transition-colors cursor-pointer"
            >
              {copied === "이메일 주소" ? "복사됨!" : "이메일 복사"}
            </button>
          </div>
        </div>

        {/* 3. 컬리 카테고리 탭 (DESIGN.md 명세: inactive #b5b5b5 18px/400, selected #5f0080 18px/500, radius 0px) */}
        <nav aria-label="섹션 카테고리" className="max-w-3xl mx-auto px-4 sm:px-6 flex items-center gap-6 sm:gap-8 overflow-x-auto no-scrollbar border-t border-[#f7f7f7]">
          {tabs.map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3.5 sm:py-4 text-[15px] sm:text-[18px] transition-colors whitespace-nowrap cursor-pointer border-b-[2px] ${
                  isSelected
                    ? "text-[#5f0080] font-medium border-[#5f0080]"
                    : "text-[#b5b5b5] font-normal border-transparent hover:text-[#5f0080]"
                }`}
                style={{ lineHeight: "24px" }}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>
      </header>

      {/* 중앙 메인 컨텐츠 영역 */}
      <div className="w-full max-w-3xl px-4 sm:px-6 py-8 sm:py-10 flex-1">
        {/* 복사 안내 알림 토스트 (컬리 미니멀 스타일) */}
        {copied && (
          <div className="mb-6 p-3 bg-[#f7f7f7] border border-[#dfe4eb] rounded-[4px] text-center text-[13px] text-[#5f0080] font-medium animate-fadeIn">
            ✓ {copied}가 클립보드에 안전하게 복사되었습니다.
          </div>
        )}

        {/* 4. 프로필 인트로 카드 (컬리 생산자/큐레이터 소개 포맷) */}
        <section className="border border-[#dfe4eb] rounded-[4px] bg-white p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6 text-center sm:text-left">
            {/* 아바타 (컬리 시그니처 퍼플 보더 & 미니멀 모노그램) */}
            <div className="relative shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-[#5f0080] flex items-center justify-center bg-[#f7f7f7] text-[#5f0080] text-2xl sm:text-3xl font-medium select-none">
                손
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1.5">
                <span className="text-[12px] font-medium text-[#5f0080] bg-[#f7f7f7] px-2 py-0.5 rounded-[2px] border border-[#dfe4eb]">
                  샛별 엔지니어
                </span>
                <span className="text-[12px] font-normal text-[#999999]">
                  서울시 근무 · 풀스택 소프트웨어 엔지니어
                </span>
              </div>

              <h1 className="text-[22px] sm:text-[26px] font-medium text-[#333333] tracking-tight">
                손현우
              </h1>

              {/* 컬리 브랜드 철학: Something Better 반영 */}
              <p className="mt-3 text-[14px] leading-[22px] text-[#464c52] font-normal">
                나와 동료들이 안심하고 신뢰할 수 있는 가치를 짓습니다.
                <br />
                복잡한 요구사항 속에서도 본질을 잃지 않는 단단한 코드와 절제된 사용자 경험을 지향합니다.
              </p>

              {/* 퀵 액션 (컬리 아웃라인 버튼 및 다이렉트 이메일) */}
              <div className="mt-5 flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                <a
                  href="mailto:contact@example.com"
                  className="inline-flex items-center justify-center px-4 h-9 bg-[#5f0080] text-white text-[13px] font-medium rounded-[4px] hover:bg-[#52006e] transition-colors"
                >
                  이메일로 문의하기
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 h-9 border border-[#dfe4eb] bg-white text-[#333333] text-[13px] font-normal rounded-[4px] hover:border-[#5f0080] hover:text-[#5f0080] transition-colors"
                >
                  GitHub 방문
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 5. 단독 큐레이션 프로젝트 섹션 (Kurly Only 스타일) */}
        {showProjects && (
          <section className="mb-8">
            <div className="flex items-center justify-between pb-3 border-b border-[#333333] mb-4">
              <div className="flex items-center gap-2">
                <span className="text-[16px] sm:text-[18px] font-medium text-[#333333]">
                  단독 큐레이션 프로젝트
                </span>
                <span className="text-[12px] font-normal text-[#5f0080]">
                  Kurly Only
                </span>
              </div>
              <span className="text-[12px] text-[#999999]">엄선된 대표작</span>
            </div>

            {projects.map((proj, idx) => (
              <div
                key={idx}
                className="border border-[#dfe4eb] rounded-[4px] p-5 sm:p-6 bg-white hover:border-[#5f0080] transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-medium text-[#5f0080] bg-[#f7f7f7] border border-[#dfe4eb] px-1.5 py-0.5 rounded-[2px]">
                      {proj.badge}
                    </span>
                    <h2 className="text-[16px] sm:text-[17px] font-medium text-[#333333]">
                      {proj.title}
                    </h2>
                  </div>
                  <span className="text-[12px] text-[#999999] font-normal">
                    {proj.deliveryText}
                  </span>
                </div>

                <p className="text-[14px] text-[#464c52] leading-relaxed mb-4">
                  {proj.desc}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#f7f7f7]">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[12px] text-[#999999] bg-[#f7f7f7] px-2 py-0.5 rounded-[2px]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <a
                    href={proj.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[13px] text-[#5f0080] font-medium hover:underline"
                  >
                    프로젝트 코드 살펴보기 →
                  </a>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* 6. 큐레이션 링크 섹션 (컬리 상품 리스트 아티클 명세: Flat, 1px border, 4px rounded button) */}
        {filteredLinks.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center justify-between pb-3 border-b border-[#333333] mb-4">
              <h2 className="text-[16px] sm:text-[18px] font-medium text-[#333333]">
                큐레이션 링크
              </h2>
              <span className="text-[13px] text-[#999999]">
                총 {filteredLinks.length}건
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {filteredLinks.map((item, idx) => (
                <article
                  key={idx}
                  className="border border-[#dfe4eb] rounded-[4px] p-4 sm:p-5 flex flex-col justify-between hover:border-[#5f0080] transition-colors bg-white"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] text-[#999999] font-normal">
                        {item.category}
                      </span>
                      <span className="text-[11px] text-[#5f0080] font-medium">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="text-[15px] font-medium text-[#333333] mb-1">
                      {item.title}
                    </h3>
                    <p className="text-[13px] text-[#464c52] leading-[18px] line-clamp-2">
                      {item.desc}
                    </p>
                  </div>

                  {/* 컬리 프로덕트 리스트 컨트롤 규격 (DESIGN.md: 36px 높이, border #dfe4eb, rounded 4px, 14px 400) */}
                  <div className="mt-4 pt-3 border-t border-[#f7f7f7]">
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="w-full h-9 flex items-center justify-center border border-[#dfe4eb] rounded-[4px] text-[13px] sm:text-[14px] text-[#333333] font-normal hover:border-[#5f0080] hover:text-[#5f0080] transition-colors"
                    >
                      {item.actionLabel}
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* 7. 기술 스택 섹션 (컬리 스펙 테이블 모티브) */}
        {showSkills && (
          <section className="mb-8">
            <div className="flex items-center justify-between pb-3 border-b border-[#333333] mb-4">
              <h2 className="text-[16px] sm:text-[18px] font-medium text-[#333333]">
                기술 스택 및 검증된 역량
              </h2>
              <span className="text-[12px] text-[#999999]">품질 보증</span>
            </div>

            <div className="border border-[#dfe4eb] rounded-[4px] overflow-hidden divide-y divide-[#dfe4eb]">
              {techStack.map((tech) => (
                <div
                  key={tech.name}
                  className="flex flex-col sm:flex-row sm:items-center justify-between px-4 py-3 bg-white text-[13px] sm:text-[14px]"
                >
                  <span className="font-medium text-[#333333] sm:w-1/3">
                    {tech.name}
                  </span>
                  <span className="text-[#464c52] sm:w-2/3 mt-0.5 sm:mt-0 font-normal">
                    {tech.role}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 8. 하단 빠른 문의 배너 */}
        <div className="border border-[#dfe4eb] bg-[#f7f7f7] rounded-[4px] p-5 sm:p-6 text-center">
          <p className="text-[13px] text-[#999999] mb-1 font-normal">
            궁금한 점이 있으신가요?
          </p>
          <p className="text-[16px] font-medium text-[#333333] mb-4">
            편안하게 대화 나누고 함께할 가치를 만들어갑니다.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 max-w-sm mx-auto">
            <a
              href="mailto:contact@example.com"
              className="w-full sm:flex-1 h-10 flex items-center justify-center bg-[#5f0080] text-white text-[14px] font-medium rounded-[4px] hover:bg-[#52006e] transition-colors"
            >
              이메일 보내기
            </a>
            <button
              onClick={() => copyToClipboard("contact@example.com", "이메일 주소")}
              className="w-full sm:w-auto px-4 h-10 flex items-center justify-center border border-[#dfe4eb] bg-white text-[#333333] text-[14px] font-normal rounded-[4px] hover:border-[#5f0080] hover:text-[#5f0080] transition-colors cursor-pointer"
            >
              이메일 주소 복사
            </button>
          </div>
        </div>
      </div>

      {/* 9. 컬리 커머스 모티브 푸터 (신뢰와 검증의 정보 표시) */}
      <footer className="w-full border-t border-[#dfe4eb] bg-[#f7f7f7] mt-12 py-8 text-[#999999] text-[12px] leading-[18px]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#e2e2e2] text-[#464c52]">
            <div className="flex items-center gap-3 text-[13px] font-medium">
              <span className="text-[#333333]">마이링크 소개</span>
              <span>·</span>
              <span>개인정보 취급방침</span>
              <span>·</span>
              <span>이용안내</span>
            </div>
            <div className="text-[12px] text-[#999999]">
              문의응답: 월~금 상시 확인 (샛별 답장)
            </div>
          </div>

          <div className="pt-4 space-y-1">
            <p>
              개발자: 손현우 | 이메일: contact@example.com | 저장소: github.com/imnamemya/mylink
            </p>
            <p>
              본 프로필은 컬리(Kurly) 디자인 시스템 가이드라인(DESIGN.md)을 준수하여 제작되었습니다.
            </p>
            <p className="pt-2 text-[#b5b5b5]">
              © 2026 손현우. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
