"use client";

import { useState } from "react";
import { Plus, Sparkles } from "lucide-react";

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

// 자주 사용하는 추천 이모지 목록
const PRESET_EMOJIS = ["🔗", "📝", "☕", "💼", "📺", "🚀", "💬", "📸", "🎨", "🌐", "🎵", "🛍️"];

export interface AddLinkFormData {
  title: string;
  url: string;
  emoji?: string;
  isActive: boolean;
}

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

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [emoji, setEmoji] = useState("🔗");
  const [isActive, setIsActive] = useState(true);
  const [errors, setErrors] = useState<{ title?: string; url?: string }>({});

  const resetForm = () => {
    setTitle("");
    setUrl("");
    setEmoji("🔗");
    setIsActive(true);
    setErrors({});
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      resetForm();
    }
    setOpen(nextOpen);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { title?: string; url?: string } = {};
    const trimmedTitle = title.trim();
    let trimmedUrl = url.trim();

    if (!trimmedTitle) {
      newErrors.title = "링크 제목을 입력해주세요.";
    }

    if (!trimmedUrl) {
      newErrors.url = "URL을 입력해주세요.";
    } else {
      // http/https 또는 mailto/tel 등이 없으면 자동으로 https:// 붙이기
      if (!/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(trimmedUrl)) {
        trimmedUrl = `https://${trimmedUrl}`;
      }

      try {
        new URL(trimmedUrl);
      } catch {
        newErrors.url = "올바른 URL 형식(예: https://example.com)을 입력해주세요.";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onAddLink({
      title: trimmedTitle,
      url: trimmedUrl,
      emoji: emoji.trim() || undefined,
      isActive,
    });

    handleOpenChange(false);
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
            프로필 페이지에 노출할 새로운 링크 정보를 입력해주세요.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          {/* 링크 제목 입력 */}
          <div className="space-y-1.5">
            <Label htmlFor="link-title" className="text-xs font-semibold">
              링크 제목 <span className="text-destructive">*</span>
            </Label>
            <Input
              id="link-title"
              placeholder="예: 내 노션 포트폴리오, 인스타그램 등"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors((prev) => ({ ...prev, title: undefined }));
              }}
              aria-invalid={!!errors.title}
              autoFocus
            />
            {errors.title && (
              <p className="text-xs text-destructive">{errors.title}</p>
            )}
          </div>

          {/* URL 입력 */}
          <div className="space-y-1.5">
            <Label htmlFor="link-url" className="text-xs font-semibold">
              링크 주소 (URL) <span className="text-destructive">*</span>
            </Label>
            <Input
              id="link-url"
              type="text"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (errors.url) setErrors((prev) => ({ ...prev, url: undefined }));
              }}
              aria-invalid={!!errors.url}
            />
            {errors.url ? (
              <p className="text-xs text-destructive">{errors.url}</p>
            ) : (
              <p className="text-[11px] text-muted-foreground">
                접두사 없이 입력 시 자동으로 https://가 추가됩니다.
              </p>
            )}
          </div>

          {/* 이모지 선택 / 입력 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="link-emoji" className="text-xs font-semibold flex items-center gap-1">
                <Sparkles className="size-3.5 text-muted-foreground" />
                아이콘 / 이모지
              </Label>
              {emoji && (
                <button
                  type="button"
                  onClick={() => setEmoji("")}
                  className="text-[11px] text-muted-foreground hover:text-foreground transition-colors"
                >
                  지우기
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Input
                id="link-emoji"
                placeholder="예: 🔗"
                value={emoji}
                onChange={(e) => setEmoji(e.target.value)}
                className="w-20 text-center text-lg"
                maxLength={4}
              />
              <div className="flex-1 flex flex-wrap gap-1 items-center">
                {PRESET_EMOJIS.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setEmoji(preset)}
                    className={`size-7 rounded-md text-sm flex items-center justify-center transition-all ${
                      emoji === preset
                        ? "bg-primary text-primary-foreground scale-110 shadow-xs"
                        : "bg-muted/70 hover:bg-muted text-foreground"
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 활성화 (공개) 토글 */}
          <div className="flex items-center justify-between rounded-lg border border-border/80 bg-muted/30 p-3">
            <div className="space-y-0.5">
              <Label htmlFor="link-active" className="text-xs font-medium cursor-pointer">
                링크 공개 (활성화)
              </Label>
              <p className="text-[11px] text-muted-foreground">
                비활성화 시 퍼블릭 프로필에서 숨겨집니다.
              </p>
            </div>
            <Switch
              id="link-active"
              checked={isActive}
              onCheckedChange={setIsActive}
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
