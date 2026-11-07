/**
 * MyLink 1단계 — 시연용 Mock 데이터
 *
 * PRD §4.2에 명시된 기본 Mock 데이터 세트를 TypeScript 타입과 함께 정의합니다.
 * LocalStorage에 데이터가 없을 때 자동 주입되는 초기값으로 사용됩니다.
 */

// ─────────────────────────────────────────
// 타입 정의 (PRD §4.1 데이터 모델)
// ─────────────────────────────────────────

export type SocialPlatform =
  | "instagram"
  | "youtube"
  | "twitter"
  | "github"
  | "email";

export interface SocialLink {
  id: string;
  platform: SocialPlatform;
  url: string;
}

export interface LinkItem {
  id: string;
  title: string;
  url: string;
  emoji?: string;
  isActive: boolean;
  order: number;
}

export interface Profile {
  username: string;
  displayName: string;
  bio: string;
  avatarUrl: string;
  socials: SocialLink[];
}

export interface MyLinkData {
  profile: Profile;
  links: LinkItem[];
}

// ─────────────────────────────────────────
// Mock 데이터
// ─────────────────────────────────────────

export const MOCK_PROFILE: Profile = {
  username: "creator_demo",
  displayName: "김링크 (Link Creator)",
  bio: "디지털 노마드의 일상과 생산성 툴을 공유합니다 ✈️\n매주 목요일 저녁 뉴스레터 발행!",
  // 감각적인 크리에이터 프로필 샘플 이미지 (Unsplash, 무료 사용 가능)
  avatarUrl:
    "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?w=200&h=200&fit=crop&crop=face&q=80",
  socials: [
    {
      id: "social-1",
      platform: "instagram",
      url: "https://instagram.com/creator_demo",
    },
    {
      id: "social-2",
      platform: "youtube",
      url: "https://youtube.com/@creator_demo",
    },
    {
      id: "social-3",
      platform: "twitter",
      url: "https://x.com/creator_demo",
    },
    {
      id: "social-4",
      platform: "github",
      url: "https://github.com/creator_demo",
    },
    {
      id: "social-5",
      platform: "email",
      url: "mailto:hello@creator-demo.com",
    },
  ],
};

export const MOCK_LINKS: LinkItem[] = [
  {
    id: "link-1",
    title: "2026 생산성 툴 베스트 5 정리 노션",
    url: "https://notion.so",
    emoji: "📝",
    isActive: true,
    order: 1,
  },
  {
    id: "link-2",
    title: "유튜브: 1인 크리에이터 워크플로우 영상",
    url: "https://youtube.com/@creator_demo",
    emoji: "📺",
    isActive: true,
    order: 2,
  },
  {
    id: "link-3",
    title: "커피 한 잔 후원하기 (Buy Me a Coffee)",
    url: "https://buymeacoffee.com",
    emoji: "☕",
    isActive: true,
    order: 3,
  },
  {
    id: "link-4",
    title: "포트폴리오 및 협업/외주 문의",
    url: "mailto:hello@creator-demo.com?subject=[협업 문의] 안녕하세요!",
    emoji: "💼",
    isActive: true,
    order: 4,
  },
  // isActive: false — 퍼블릭 뷰에서 렌더링 제외 (PRD §2.3 엣지 케이스)
  {
    id: "link-5",
    title: "비공개 링크 (테스트용)",
    url: "https://example.com/private",
    emoji: "🔒",
    isActive: false,
    order: 5,
  },
];

/** LocalStorage에 주입할 최종 Mock 데이터 묶음 */
export const MOCK_DATA: MyLinkData = {
  profile: MOCK_PROFILE,
  links: MOCK_LINKS,
};
