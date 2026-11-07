/**
 * ProfileAvatar
 *
 * shadcn/ui Avatar (base-ui) 기반의 프로필 이미지 컴포넌트.
 * 이미지 로드 실패 시 이름 첫 글자를 Fallback으로 표시합니다.
 *
 * PRD §3.1 — 아바타 이미지 (원형, 기본 샘플 이미지 또는 이니셜 Fallback)
 */

import { cn } from "cn";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

interface ProfileAvatarProps {
  /** 이미지 URL */
  src: string;
  /** 접근성 alt 텍스트 (보통 표시 이름) */
  alt: string;
  /** Fallback 이니셜 (보통 displayName 첫 글자) */
  fallback: string;
  /** 추가 className */
  className?: string;
}

export function ProfileAvatar({
  src,
  alt,
  fallback,
  className,
}: ProfileAvatarProps) {
  return (
    <Avatar
      size="lg"
      className={cn(
        // 기본 shadcn Avatar size=lg(40px)보다 크게 — 80px 고정
        "size-20 ring-2 ring-border after:hidden",
        className
      )}
    >
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback className="text-xl font-semibold bg-muted text-muted-foreground">
        {fallback}
      </AvatarFallback>
    </Avatar>
  );
}
