/**
 * LinkCard
 *
 * shadcn/ui Card 기반의 링크 카드 컴포넌트.
 *
 * DESIGN.md 반영:
 *   - border: 1px var(--border) = #dfe4eb  (product-list-control 실측)
 *   - radius: rounded-lg = var(--radius-lg) = 4px  (product-list-control 실측)
 *   - background: var(--card) = #ffffff
 *   - text: var(--foreground) = #333333  (kurly-foreground 실측)
 *   - font: 14px / 400 / Pretendard  (utility 실측값 → text-sm font-normal)
 *   - box-shadow: none  (globals.css 전역 적용)
 *
 * 인터랙션 (PRD §3.3):
 *   - hover: -translate-y-0.5 카드 리프트 + 테두리 primary 색상 강조
 *   - active: 눌리는 피드백 (scale-down)
 *   - 클릭: target="_blank" 새 창 (PRD §3.3)
 */

import { ExternalLink } from "lucide-react";
import { cn } from "cn";
import { Card, CardContent } from "@/components/ui/card";

interface LinkCardProps {
  /** 카드 좌측 이모지 (없으면 기본 🔗) */
  emoji?: string;
  /** 링크 타이틀 */
  title: string;
  /** 이동할 URL */
  url: string;
  /** 추가 className */
  className?: string;
}

export function LinkCard({ emoji, title, url, className }: LinkCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg"
      aria-label={title}
    >
      <Card
        className={cn(
          // DESIGN.md: product-list-control — 1px border #dfe4eb, 4px radius, white bg
          "flex-row items-center gap-0 py-0 ring-0 rounded-lg border border-border bg-card",
          // hover: 리프트 + primary(#5f0080) 테두리 강조
          "transition-all duration-150 group-hover:-translate-y-0.5 group-hover:border-primary/40",
          // active: 눌리는 피드백
          "group-active:translate-y-0 group-active:scale-[0.99]",
          className
        )}
      >
        {/* DESIGN.md: product-list-control — 36px height 기준, padding 균등 적용 */}
        <CardContent className="flex w-full items-center gap-4 px-4 py-[10px]">
          {/* 좌측 이모지 (PRD §3.3) */}
          <span
            className="text-lg w-7 text-center shrink-0 select-none leading-none"
            aria-hidden="true"
          >
            {emoji ?? "🔗"}
          </span>

          {/* 타이틀 — 14px / 400 (DESIGN.md utility 실측) */}
          <span className="flex-1 text-sm font-normal text-foreground leading-snug line-clamp-2">
            {title}
          </span>

          {/* 외부 이동 아이콘 (PRD §3.3) */}
          <ExternalLink
            className="size-4 text-kurly-control-muted group-hover:text-muted-foreground shrink-0 transition-colors"
            aria-hidden="true"
          />
        </CardContent>
      </Card>
    </a>
  );
}
