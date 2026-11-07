"use client";

/**
 * ProfilePage
 *
 * PRD 1단계 — LocalStorage 기반 모바일 최적화 프로필 페이지.
 *
 * - LocalStorage에 데이터가 없으면 MOCK_DATA를 자동 주입합니다.
 * - 모바일(≤md): 화면 전체를 가득 채웁니다.
 * - PC(≥md): 화면 중앙에 480px 카드로 플로팅됩니다.
 * - 우측 하단 플로팅 버튼으로 Mock 데이터 초기화가 가능합니다.
 *
 * 사용 컴포넌트 (shadcn/ui 기반):
 *   - ProfileAvatar  → @/components/ui/profile-avatar
 *   - SocialIconButton → @/components/ui/social-icon-button
 *   - LinkCard       → @/components/ui/link-card
 *   - Separator      → @/components/ui/separator
 *   - Button         → @/components/ui/button
 */

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { Loader2, Plus, RotateCcw } from "lucide-react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  type QueryDocumentSnapshot,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { MOCK_DATA, type LinkItem, type MyLinkData } from "@/lib/mock-data";
import { ProfileAvatar } from "@/components/ui/profile-avatar";
import { SocialIconButton } from "@/components/ui/social-icon-button";
import { LinkCard } from "@/components/ui/link-card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { AddLinkDialog, type AddLinkFormData } from "@/components/add-link-dialog";
import { DeleteLinkDialog } from "@/components/delete-link-dialog";

const STORAGE_KEY = "mylink";
const FIRESTORE_LINKS_PATH = "users/anonymous/links";

// ─── 헬퍼: localStorage 읽기/쓰기 및 동기화 스토어 ─────────────────────────────

let memoryData: MyLinkData | null = null;
const listeners = new Set<() => void>();

function emitChange() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function loadData(): MyLinkData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored) as MyLinkData;
  } catch {
    // JSON 파싱 실패 등 예외 — Mock 데이터로 복구
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_DATA));
  return MOCK_DATA;
}

function getSnapshot(): MyLinkData | null {
  if (typeof window === "undefined") return null;
  if (!memoryData) {
    memoryData = loadData();
  }
  return memoryData;
}

function getServerSnapshot(): MyLinkData | null {
  return null;
}

function saveData(newData: MyLinkData) {
  memoryData = newData;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  } catch {
    // ignore
  }
  emitChange();
}

function resetData() {
  saveData(MOCK_DATA);
}

function mapDocsToLinkItems(docs: QueryDocumentSnapshot[]): LinkItem[] {
  return docs.map((docSnap, idx) => {
    const docData = docSnap.data({ serverTimestamps: "estimate" });
    const rawUpdatedAt = docData.updatedAt;
    const updatedAt =
      rawUpdatedAt && typeof rawUpdatedAt.toDate === "function"
        ? rawUpdatedAt.toDate().toISOString()
        : typeof rawUpdatedAt === "string"
          ? rawUpdatedAt
          : undefined;

    return {
      id: docSnap.id,
      title: docData.title ?? "",
      url: docData.url ?? "",
      emoji: docData.emoji || undefined,
      isActive: docData.isActive ?? true,
      order: typeof docData.order === "number" ? docData.order : idx + 1,
      updatedAt,
    };
  });
}

// ─── 메인 컴포넌트 ────────────────────────────────────────────────────────────

export default function ProfilePage() {
  const data = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [firestoreLinks, setFirestoreLinks] = useState<LinkItem[]>([]);
  const [isLoadingLinks, setIsLoadingLinks] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [deletingLink, setDeletingLink] = useState<LinkItem | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Firestore(users/anonymous/links)에서 createdAt 최신순으로 링크 목록 조회
  const fetchLinks = useCallback(async () => {
    try {
      const linksRef = collection(db, FIRESTORE_LINKS_PATH);
      const q = query(linksRef, orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      setFirestoreLinks(mapDocsToLinkItems(snapshot.docs));
    } catch (error) {
      console.error("Firestore 링크 목록 조회 오류:", error);
    } finally {
      setIsLoadingLinks(false);
    }
  }, []);

  // 페이지 로드 시 Firestore에서 링크 불러오기 및 실시간 동기화 (createdAt 최신순)
  useEffect(() => {
    const linksRef = collection(db, FIRESTORE_LINKS_PATH);
    const q = query(linksRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setFirestoreLinks(mapDocsToLinkItems(snapshot.docs));
        setIsLoadingLinks(false);
      },
      (error) => {
        console.error("Firestore 링크 목록 구독 오류:", error);
        setIsLoadingLinks(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleReset = () => {
    resetData();
    void fetchLinks();
    showToast("초기 데이터로 복원되었습니다");
  };

  const handleAddLink = async (formData: AddLinkFormData) => {
    if (!data) return;

    const nextOrder =
      firestoreLinks.length > 0
        ? Math.max(...firestoreLinks.map((l) => l.order)) + 1
        : 1;

    try {
      const linksRef = collection(db, FIRESTORE_LINKS_PATH);
      const docRef = await addDoc(linksRef, {
        title: formData.title,
        url: formData.url,
        emoji: formData.emoji ?? "",
        isActive: formData.isActive,
        order: nextOrder,
        createdAt: serverTimestamp(),
      });

      const newLink: LinkItem = {
        id: docRef.id,
        title: formData.title,
        url: formData.url,
        emoji: formData.emoji,
        isActive: formData.isActive,
        order: nextOrder,
      };

      // 최신순(createdAt desc)이므로 새 링크를 목록 최상단에 즉시 반영 후 재조회
      setFirestoreLinks((prev) => [
        newLink,
        ...prev.filter((l) => l.id !== newLink.id),
      ]);
      await fetchLinks();

      showToast(
        formData.isActive
          ? "새 링크가 Firestore에 추가되었습니다!"
          : "비공개 링크가 Firestore에 추가되었습니다 (퍼블릭 뷰 숨김)"
      );
    } catch (error) {
      console.error("Firestore 링크 추가 실패:", error);
      showToast("링크 저장 중 오류가 발생했습니다. 다시 시도해주세요.");
      throw error;
    }
  };

  // Firestore(users/anonymous/links/{linkId}) 링크 수정
  const handleUpdateLink = async (linkId: string, formData: AddLinkFormData) => {
    try {
      const linkDocRef = doc(db, FIRESTORE_LINKS_PATH, linkId);
      await updateDoc(linkDocRef, {
        title: formData.title,
        url: formData.url,
        emoji: formData.emoji ?? "",
        isActive: formData.isActive,
        updatedAt: serverTimestamp(),
      });

      const nowIso = new Date().toISOString();
      setFirestoreLinks((prev) =>
        prev.map((l) =>
          l.id === linkId
            ? {
                ...l,
                title: formData.title,
                url: formData.url,
                emoji: formData.emoji,
                isActive: formData.isActive,
                updatedAt: nowIso,
              }
            : l
        )
      );
      await fetchLinks();

      showToast(
        formData.isActive
          ? "링크가 Firestore에 수정되었습니다!"
          : "링크가 비공개로 수정되었습니다 (퍼블릭 뷰 숨김)"
      );
    } catch (error) {
      console.error("Firestore 링크 수정 실패:", error);
      showToast("링크 수정 중 오류가 발생했습니다. 다시 시도해주세요.");
      throw error;
    }
  };

  // Firestore(users/anonymous/links/{linkId}) 링크 삭제
  const handleDeleteLink = async (linkId: string) => {
    try {
      const linkDocRef = doc(db, FIRESTORE_LINKS_PATH, linkId);
      await deleteDoc(linkDocRef);

      setFirestoreLinks((prev) => prev.filter((l) => l.id !== linkId));
      await fetchLinks();

      showToast("링크가 삭제되었습니다.");
    } catch (error) {
      console.error("Firestore 링크 삭제 실패:", error);
      showToast("링크 삭제 중 오류가 발생했습니다. 다시 시도해주세요.");
      throw error;
    }
  };

  // 데이터 로드 전 최소 플레이스홀더 — 레이아웃 시프트 방지
  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <span className="text-sm text-muted-foreground">로딩 중…</span>
      </div>
    );
  }

  const { profile } = data;

  // isActive: true 인 링크만 표시 (Firestore 쿼리에서 createdAt 내림차순 정렬 완료)
  const activeLinks = firestoreLinks.filter((l) => l.isActive);

  // Fallback 이니셜: displayName 첫 글자
  const avatarFallback = profile.displayName.charAt(0);

  return (
    <>
      {/**
       * 배경 — 모바일: bg-background(white), PC: bg-muted(연회색)
       * min-h-screen으로 짧은 콘텐츠에서도 전체 화면 커버
       */}
      <div className="min-h-screen bg-muted flex justify-center md:items-center md:py-10">
        {/**
         * 프로필 카드 컨테이너
         * - 모바일: 화면 전체를 채우는 풀스크린 (w-full, min-h-screen)
         * - PC(md↑): 중앙 480px 카드 (rounded-2xl, border, shadow 없음)
         */}
        <div className="w-full max-w-[480px] min-h-screen flex flex-col bg-background md:min-h-0 md:rounded-2xl md:overflow-hidden md:border md:border-border">

          {/* ── 프로필 헤더 ───────────────────────────────────── */}
          <header className="flex flex-col items-center pt-10 pb-6 px-6 text-center">
            {/* 아바타 (PRD §3.1) */}
            <ProfileAvatar
              src={profile.avatarUrl}
              alt={`${profile.displayName} 프로필 이미지`}
              fallback={avatarFallback}
            />

            {/* 표시 이름 */}
            <h1 className="mt-4 text-xl font-semibold tracking-tight text-foreground">
              {profile.displayName}
            </h1>

            {/* Bio — \n 줄바꿈 지원 (PRD §3.1) */}
            {/* DESIGN.md: body emphasis #464c52 → text-accent-foreground */}
            <p className="mt-2 text-sm text-accent-foreground leading-relaxed whitespace-pre-line max-w-xs">
              {profile.bio}
            </p>

            {/* 소셜 아이콘 바 (PRD §3.2) */}
            {profile.socials.length > 0 && (
              <div className="mt-4 flex items-center gap-0.5">
                {profile.socials.map((social) => (
                  <SocialIconButton
                    key={social.id}
                    platform={social.platform}
                    url={social.url}
                  />
                ))}
              </div>
            )}
          </header>

          {/* 헤더 / 링크 목록 구분선 */}
          <Separator className="mx-6 w-auto" />

          {/* ── 링크 카드 목록 (PRD §3.3) ────────────────────── */}
          <main className="flex-1 flex flex-col gap-3 px-5 py-6">
            {isLoadingLinks && activeLinks.length === 0 ? (
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground py-10">
                <Loader2 className="size-4 animate-spin" />
                <span>링크를 불러오는 중…</span>
              </div>
            ) : activeLinks.length === 0 ? (
              <p className="text-center text-sm text-muted-foreground py-10">
                등록된 링크가 없습니다.
              </p>
            ) : (
              activeLinks.map((link) => (
                <LinkCard
                  key={link.id}
                  emoji={link.emoji}
                  title={link.title}
                  url={link.url}
                  isActive={link.isActive}
                  updatedAt={link.updatedAt}
                  onEdit={(formData) => handleUpdateLink(link.id, formData)}
                  onDelete={() => setDeletingLink(link)}
                />
              ))
            )}

            {/* 링크 추가 버튼 (목록 내 인라인) */}
            <button
              type="button"
              onClick={() => setIsAddDialogOpen(true)}
              className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border/80 bg-background/50 px-4 py-3 text-sm font-medium text-muted-foreground transition-all hover:border-primary/50 hover:bg-muted/40 hover:text-foreground cursor-pointer group"
            >
              <span className="flex size-5 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Plus className="size-3" />
              </span>
              <span>새 링크 추가</span>
            </button>
          </main>

          {/* ── 푸터 (PRD §3.4) ───────────────────────────────── */}
          <footer className="py-5 text-center text-xs text-muted-foreground/60">
            Powered by MyLink
          </footer>
        </div>
      </div>

      {/* ── 시연용 플로팅 컨트롤 바 ──────────────────────────── */}
      <div className="fixed bottom-5 right-5 flex flex-col items-end gap-2 z-50">
        {/* 알림 토스트 */}
        {toastMessage && (
          <div className="animate-fadeIn rounded-lg bg-foreground px-3 py-2 text-xs text-background shadow-lg">
            {toastMessage}
          </div>
        )}

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            aria-label="기본 Mock 데이터로 재설정"
            className="rounded-full gap-1.5 text-muted-foreground hover:text-foreground bg-background shadow-xs"
          >
            <RotateCcw className="size-3.5" />
            초기화
          </Button>

          <Button
            size="sm"
            onClick={() => setIsAddDialogOpen(true)}
            aria-label="새 링크 추가하기"
            className="rounded-full gap-1.5 shadow-md cursor-pointer"
          >
            <Plus className="size-3.5" />
            새 링크 추가
          </Button>
        </div>
      </div>

      {/* ── 링크 추가 다이얼로그 ──────────────────────────────── */}
      <AddLinkDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAddLink={handleAddLink}
      />

      {/* ── 링크 삭제 확인 다이얼로그 ─────────────────────────── */}
      <DeleteLinkDialog
        link={deletingLink}
        open={!!deletingLink}
        onOpenChange={(open) => {
          if (!open) setDeletingLink(null);
        }}
        onConfirmDelete={handleDeleteLink}
      />
    </>
  );
}
