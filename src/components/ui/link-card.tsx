"use client";

/**
 * LinkCard
 *
 * shadcn/ui Card 기반의 링크 카드 컴포넌트 (인라인 수정 및 상시 노출 액션 버튼 포함).
 *
 * DESIGN.md 반영:
 *   - border: 1px var(--border) = #dfe4eb  (product-list-control 실측)
 *   - radius: rounded-lg = var(--radius-lg) = 4px  (product-list-control 실측)
 *   - background: var(--card) = #ffffff
 *   - text: var(--foreground) = #333333  (kurly-foreground 실측)
 *   - font: 14px / 400 / Pretendard  (utility 실측값 → text-sm font-normal)
 *   - box-shadow: none  (globals.css 전역 적용)
 */

import { useId, useState } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Loader2,
  Pencil,
  Sparkles,
  Trash2,
} from "lucide-react";
import { cn } from "cn";

import {
  addLinkSchema,
  PRESET_EMOJIS,
  type AddLinkFormData,
} from "@/components/add-link-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface LinkCardProps {
  /** 카드 좌측 이모지 (없으면 기본 🔗) */
  emoji?: string;
  /** 링크 타이틀 */
  title: string;
  /** 이동할 URL */
  url: string;
  /** 공개(활성화) 상태 */
  isActive?: boolean;
  /** 추가 className */
  className?: string;
  /** 인라인 수정 저장 핸들러 */
  onEdit?: (data: AddLinkFormData) => Promise<void> | void;
  /** 삭제 버튼 클릭 핸들러 (삭제 확인 모달 오픈) */
  onDelete?: () => void;
}

export function LinkCard({
  emoji,
  title,
  url,
  isActive = true,
  className,
  onEdit,
  onDelete,
}: LinkCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const fieldIdPrefix = useId();

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<AddLinkFormData>({
    resolver: zodResolver(addLinkSchema),
    mode: "onChange",
    defaultValues: {
      title,
      url,
      emoji: emoji ?? "🔗",
      isActive,
    },
  });

  const watchedTitle = useWatch({ control, name: "title", defaultValue: title }) || "";
  const watchedUrl = useWatch({ control, name: "url", defaultValue: url }) || "";
  const watchedEmoji =
    useWatch({ control, name: "emoji", defaultValue: emoji ?? "🔗" }) || "";

  // 유효한 URL 입력 시 연결될 최종 주소 미리보기 계산 (AddLinkDialog와 동일)
  let urlPreview = "";
  if (watchedUrl.trim() && !errors.url) {
    const trimmed = watchedUrl.trim();
    if (/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(trimmed)) {
      urlPreview = trimmed;
    } else {
      urlPreview = `https://${trimmed}`;
    }
  }

  const handleStartEdit = () => {
    reset({
      title,
      url,
      emoji: emoji ?? "🔗",
      isActive,
    });
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    if (isSubmitting) return;
    reset({
      title,
      url,
      emoji: emoji ?? "🔗",
      isActive,
    });
    setIsEditing(false);
  };

  const onSubmit = async (data: AddLinkFormData) => {
    let finalUrl = data.url.trim();
    if (!/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(finalUrl)) {
      finalUrl = `https://${finalUrl}`;
    }

    await onEdit?.({
      title: data.title.trim(),
      url: finalUrl,
      emoji: data.emoji?.trim() || undefined,
      isActive: data.isActive,
    });

    setIsEditing(false);
  };

  // ── 인라인 편집 모드 UI ───────────────────────────────────────────────────
  if (isEditing) {
    return (
      <Card
        className={cn(
          "py-0 ring-0 rounded-lg border border-primary/60 bg-card transition-all",
          className
        )}
      >
        <CardContent className="p-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-3.5"
            noValidate
          >
            <div className="flex items-center justify-between border-b border-border pb-2">
              <span className="flex items-center gap-1.5 text-xs font-semibold text-primary">
                <Pencil className="size-3.5" />
                링크 수정
              </span>
            </div>

            {/* ── 링크 제목 필드 ── */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor={`${fieldIdPrefix}-title`}
                  className="text-xs font-semibold"
                >
                  링크 제목 <span className="text-destructive">*</span>
                </Label>
                <span
                  className={`text-[11px] tabular-nums ${
                    watchedTitle.length > 50
                      ? "text-destructive font-semibold"
                      : "text-muted-foreground"
                  }`}
                >
                  {watchedTitle.length}/50자
                </span>
              </div>
              <Input
                id={`${fieldIdPrefix}-title`}
                placeholder="예: 내 노션 포트폴리오, 인스타그램 등"
                {...register("title")}
                aria-invalid={!!errors.title}
                autoFocus
              />
              {errors.title?.message && (
                <p className="flex items-center gap-1 text-xs text-destructive mt-1">
                  <AlertCircle className="size-3.5 shrink-0" />
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* ── 링크 URL 필드 ── */}
            <div className="space-y-1.5">
              <Label
                htmlFor={`${fieldIdPrefix}-url`}
                className="text-xs font-semibold"
              >
                링크 주소 (URL) <span className="text-destructive">*</span>
              </Label>
              <Input
                id={`${fieldIdPrefix}-url`}
                type="text"
                placeholder="예: https://example.com 또는 notion.so/portfolio"
                {...register("url")}
                aria-invalid={!!errors.url}
              />
              {errors.url?.message ? (
                <p className="flex items-center gap-1 text-xs text-destructive mt-1">
                  <AlertCircle className="size-3.5 shrink-0" />
                  {errors.url.message}
                </p>
              ) : urlPreview ? (
                <p className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 break-all">
                  <CheckCircle2 className="size-3 shrink-0" />
                  연결 주소: <span className="font-mono">{urlPreview}</span>
                </p>
              ) : (
                <p className="text-[11px] text-muted-foreground">
                  접두사 없이 입력 시 자동으로 https://가 추가됩니다.
                </p>
              )}
            </div>

            {/* ── 아이콘 / 이모지 필드 ── */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor={`${fieldIdPrefix}-emoji`}
                  className="text-xs font-semibold flex items-center gap-1"
                >
                  <Sparkles className="size-3.5 text-muted-foreground" />
                  아이콘 / 이모지
                </Label>
                {watchedEmoji && (
                  <button
                    type="button"
                    onClick={() =>
                      setValue("emoji", "", { shouldValidate: true })
                    }
                    className="text-[11px] text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  >
                    지우기
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Input
                  id={`${fieldIdPrefix}-emoji`}
                  placeholder="예: 🔗"
                  {...register("emoji")}
                  className="w-16 text-center text-lg shrink-0"
                  maxLength={4}
                  aria-invalid={!!errors.emoji}
                />
                <div className="flex-1 flex flex-wrap gap-1 items-center">
                  {PRESET_EMOJIS.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() =>
                        setValue("emoji", preset, {
                          shouldValidate: true,
                          shouldDirty: true,
                        })
                      }
                      className={`size-7 rounded-md text-sm flex items-center justify-center transition-all cursor-pointer ${
                        watchedEmoji === preset
                          ? "bg-primary text-primary-foreground scale-110"
                          : "bg-muted/70 hover:bg-muted text-foreground"
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>
              {errors.emoji?.message && (
                <p className="flex items-center gap-1 text-xs text-destructive mt-1">
                  <AlertCircle className="size-3.5 shrink-0" />
                  {errors.emoji.message}
                </p>
              )}
            </div>

            {/* ── 활성화 (공개) 토글 ── */}
            <div className="flex items-center justify-between rounded-lg border border-border/80 bg-muted/30 p-2.5">
              <div className="space-y-0.5">
                <Label
                  htmlFor={`${fieldIdPrefix}-active`}
                  className="text-xs font-medium cursor-pointer"
                >
                  링크 공개 (활성화)
                </Label>
                <p className="text-[11px] text-muted-foreground">
                  비활성화 시 퍼블릭 프로필에서 숨겨집니다.
                </p>
              </div>
              <Controller
                name="isActive"
                control={control}
                render={({ field }) => (
                  <Switch
                    id={`${fieldIdPrefix}-active`}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>

            {/* ── 인라인 편집 액션 버튼 ── */}
            <div className="flex items-center justify-end gap-2 pt-1">
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={isSubmitting}
                onClick={handleCancelEdit}
                className="cursor-pointer"
              >
                취소
              </Button>
              <Button
                type="submit"
                size="sm"
                disabled={isSubmitting}
                className="cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-3.5 animate-spin" />
                    저장 중...
                  </>
                ) : (
                  "저장하기"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }

  // ── 기본 보기 모드 UI (수정/삭제 버튼 상시 표시) ──────────────────────────
  return (
    <Card
      className={cn(
        // DESIGN.md: product-list-control — 1px border #dfe4eb, 4px radius, white bg
        "group flex-row items-center gap-0 py-0 ring-0 rounded-lg border border-border bg-card",
        // hover: 리프트 + primary(#5f0080) 테두리 강조
        "transition-all duration-150 hover:-translate-y-0.5 hover:border-primary/40",
        className
      )}
    >
      <CardContent className="flex w-full items-center gap-2 px-3 py-2">
        {/* 좌측 + 중앙: 클릭 시 새 창으로 이동하는 링크 영역 */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link flex flex-1 items-center gap-3 min-w-0 py-0.5 pr-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm active:scale-[0.99]"
          aria-label={title}
        >
          {/* 좌측 이모지 (PRD §3.3) */}
          <span
            className="text-lg w-7 text-center shrink-0 select-none leading-none"
            aria-hidden="true"
          >
            {emoji || "🔗"}
          </span>

          {/* 타이틀 — 14px / 400 (DESIGN.md utility 실측) */}
          <span className="flex-1 text-sm font-normal text-foreground leading-snug line-clamp-2 break-words">
            {title}
          </span>

          {/* 외부 이동 아이콘 (PRD §3.3) */}
          <ExternalLink
            className="size-3.5 text-kurly-control-muted group-hover/link:text-muted-foreground shrink-0 transition-colors"
            aria-hidden="true"
          />
        </a>

        {/* 우측: 항상 표시되는 수정 / 삭제 버튼 */}
        <div className="flex items-center gap-1 shrink-0 pl-1 border-l border-border/60">
          <Button
            type="button"
            variant="outline"
            size="xs"
            onClick={handleStartEdit}
            aria-label={`${title} 수정`}
            className="cursor-pointer text-muted-foreground hover:text-foreground"
          >
            <Pencil className="size-3" />
            <span>수정</span>
          </Button>
          <Button
            type="button"
            variant="destructive"
            size="xs"
            onClick={onDelete}
            aria-label={`${title} 삭제`}
            className="cursor-pointer"
          >
            <Trash2 className="size-3" />
            <span>삭제</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
