"use client";

import { useState } from "react";
import { AlertTriangle, Loader2, Trash2 } from "lucide-react";

import type { LinkItem } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DeleteLinkDialogProps {
  link: LinkItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirmDelete: (linkId: string) => Promise<void> | void;
}

export function DeleteLinkDialog({
  link,
  open,
  onOpenChange,
  onConfirmDelete,
}: DeleteLinkDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleOpenChange = (nextOpen: boolean) => {
    if (isDeleting) return;
    onOpenChange(nextOpen);
  };

  const handleDelete = async () => {
    if (!link || isDeleting) return;
    setIsDeleting(true);
    try {
      await onConfirmDelete(link.id);
      onOpenChange(false);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            <Trash2 className="size-5 text-destructive" />
            정말로 삭제하시겠습니까?
          </DialogTitle>
          <DialogDescription>
            선택한 링크를 목록에서 삭제합니다.
          </DialogDescription>
        </DialogHeader>

        {link && (
          <div className="space-y-3 py-2">
            {/* 삭제 대상 링크 이름 표시 */}
            <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/40 px-3.5 py-2.5">
              <span className="text-lg shrink-0 select-none" aria-hidden="true">
                {link.emoji ?? "🔗"}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground break-words">
                  {link.title}
                </p>
                <p className="text-xs text-muted-foreground truncate mt-0.5">
                  {link.url}
                </p>
              </div>
            </div>

            {/* 경고 문구 (빨간색) */}
            <p className="flex items-center gap-1.5 text-xs font-medium text-red-600 dark:text-red-500">
              <AlertTriangle className="size-3.5 shrink-0" />
              이 작업은 되돌릴 수 없습니다.
            </p>
          </div>
        )}

        <DialogFooter className="mt-2">
          <DialogClose
            render={
              <Button
                type="button"
                variant="outline"
                disabled={isDeleting}
                onClick={() => handleOpenChange(false)}
              >
                취소
              </Button>
            }
          />
          <Button
            type="button"
            variant="destructive"
            disabled={isDeleting}
            onClick={handleDelete}
            className="bg-red-600 text-white hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 cursor-pointer"
          >
            {isDeleting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                삭제 중...
              </>
            ) : (
              "삭제하기"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
