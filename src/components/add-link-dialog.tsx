"use client";

import { useState } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AlertCircle, CheckCircle2, Plus, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

// ─── 추천 이모지 목록 ─────────────────────────────────────────────────────────

const PRESET_EMOJIS = ["🔗", "📝", "☕", "💼", "📺", "🚀", "💬", "📸", "🎨", "🌐", "🎵", "🛍️"];

// ─── Zod 스키마 정의 ──────────────────────────────────────────────────────────

export const addLinkSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "링크 제목을 입력해주세요.")
    .min(2, "제목은 최소 2자 이상 입력해주세요.")
    .max(50, "제목은 최대 50자까지 입력 가능합니다."),
  url: z
    .string()
    .trim()
    .min(1, "링크 주소(URL)를 입력해주세요.")
    .refine((val) => !/\s/.test(val), "URL에는 공백이 포함될 수 없습니다.")
    .refine((val) => {
      // mailto: 지원
      if (/^mailto:/i.test(val)) {
        const email = val.replace(/^mailto:/i, "").split("?")[0];
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      }
      // tel: 지원
      if (/^tel:/i.test(val)) {
        return /^\+?[\d\s-]{3,}$/.test(val.replace(/^tel:/i, ""));
      }
      // 웹 주소 프로토콜 및 도메인 검증
      let target = val;
      if (!/^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(target)) {
        target = `https://${target}`;
      }
      try {
        const parsed = new URL(target);
        if (!["http:", "https:"].includes(parsed.protocol)) return false;
        return parsed.hostname.includes(".") || parsed.hostname === "localhost";
      } catch {
        return false;
      }
    }, "올바른 URL 형식(예: https://example.com 또는 notion.so/portfolio)을 입력해주세요."),
  emoji: z
    .string()
    .trim()
    .optional()
    .refine((val) => {
      if (!val) return true;
      return !/[a-zA-Z0-9]/.test(val);
    }, "영문이나 숫자 대신 이모지 또는 기호를 입력해주세요.")
    .refine((val) => {
      if (!val) return true;
      return [...val].length <= 2;
    }, "이모지는 최대 2개까지 입력 가능합니다."),
  isActive: z.boolean(),
});

export type AddLinkFormData = z.infer<typeof addLinkSchema>;

// ─── 컴포넌트 Props ──────────────────────────────────────────────────────────

interface AddLinkDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onAddLink: (data: AddLinkFormData) => void;
  trigger?: React.ReactNode;
}

export function AddLinkDialog({
  open,
  onOpenChange,
  onAddLink,
  trigger,
}: AddLinkDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  const setOpen = (val: boolean) => {
    if (!isControlled) {
      setInternalOpen(val);
    }
    onOpenChange?.(val);
  };

  // React Hook Form + Zod 설정
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<AddLinkFormData>({
    resolver: zodResolver(addLinkSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      url: "",
      emoji: "🔗",
      isActive: true,
    },
  });

  const watchedTitle = useWatch({ control, name: "title", defaultValue: "" }) || "";
  const watchedUrl = useWatch({ control, name: "url", defaultValue: "" }) || "";
  const watchedEmoji = useWatch({ control, name: "emoji", defaultValue: "🔗" }) || "";

  // 유효한 URL 입력 시 연결될 최종 주소 미리보기 계산
  let urlPreview = "";
  if (watchedUrl.trim() && !errors.url) {
    const trimmed = watchedUrl.trim();
    if (/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(trimmed)) {
      urlPreview = trimmed;
    } else {
      urlPreview = `https://${trimmed}`;
    }
  }

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      reset();
    }
    setOpen(nextOpen);
  };

  const onSubmit = (data: AddLinkFormData) => {
    let finalUrl = data.url.trim();
    if (!/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(finalUrl)) {
      finalUrl = `https://${finalUrl}`;
    }

    onAddLink({
      title: data.title.trim(),
      url: finalUrl,
      emoji: data.emoji?.trim() || undefined,
      isActive: data.isActive,
    });

    reset();
    setOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {trigger && <DialogTrigger render={trigger as React.ReactElement} />}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            <Plus className="size-5 text-primary" />
            새 링크 추가
          </DialogTitle>
          <DialogDescription>
            React Hook Form과 Zod로 실시간 검증되는 링크 추가 폼입니다.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2" noValidate>
          {/* ── 링크 제목 필드 (RHF register) ── */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="link-title" className="text-xs font-semibold">
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
              id="link-title"
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

          {/* ── 링크 URL 필드 (RHF register) ── */}
          <div className="space-y-1.5">
            <Label htmlFor="link-url" className="text-xs font-semibold">
              링크 주소 (URL) <span className="text-destructive">*</span>
            </Label>
            <Input
              id="link-url"
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
              <p className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 mt-1">
                <CheckCircle2 className="size-3 shrink-0" />
                연결 주소: <span className="font-mono">{urlPreview}</span>
              </p>
            ) : (
              <p className="text-[11px] text-muted-foreground">
                접두사 없이 입력 시 자동으로 https://가 추가됩니다.
              </p>
            )}
          </div>

          {/* ── 아이콘 / 이모지 필드 (RHF register & setValue) ── */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="link-emoji" className="text-xs font-semibold flex items-center gap-1">
                <Sparkles className="size-3.5 text-muted-foreground" />
                아이콘 / 이모지
              </Label>
              {watchedEmoji && (
                <button
                  type="button"
                  onClick={() => setValue("emoji", "", { shouldValidate: true })}
                  className="text-[11px] text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  지우기
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Input
                id="link-emoji"
                placeholder="예: 🔗"
                {...register("emoji")}
                className="w-20 text-center text-lg"
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
                        ? "bg-primary text-primary-foreground scale-110 shadow-xs"
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

          {/* ── 활성화 (공개) 토글 (RHF Controller) ── */}
          <div className="flex items-center justify-between rounded-lg border border-border/80 bg-muted/30 p-3">
            <div className="space-y-0.5">
              <Label htmlFor="link-active" className="text-xs font-medium cursor-pointer">
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
                  id="link-active"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
          </div>

          <DialogFooter className="mt-4 pt-2">
            <DialogClose
              render={
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleOpenChange(false)}
                >
                  취소
                </Button>
              }
            />
            <Button type="submit">
              추가하기
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
