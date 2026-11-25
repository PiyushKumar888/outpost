"use client";

import { useEffect, useMemo, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import {
  Tldraw,
  atom,
  computed,
  createTLCurrentUser,
  createUserId,
  getUserPreferences,
  UserRecordType,
  DefaultToolbar,
  DefaultToolbarContent,
  inlineBase64AssetStore,
  defaultShapeUtils,
  defaultBindingUtils,
  type Editor,
  type TLEditorSnapshot,
  type TLComponents,
} from "tldraw";
import { useSync, useSyncDemo } from "@tldraw/sync";
import "tldraw/tldraw.css";
import { saveCanvasContent } from "../../../../../../actions/canvas";
import type { Prisma } from "@/generated/prisma/client";
import { EntityTableShapeUtil } from "../../../../../components/EntityTable/EntityTableShapeUtil";
import { AddEntityTableButton } from "../../../../../components/EntityTable/AddEntityTableButton";
import { snapArrowBindingToRow } from "../../../../../components/EntityTable/snapArrorToRow";
import { useWorkspaceEditors } from "../../../../../components/WorkspaceEditorContext";
import { colorForUser } from "@/lib/utils";

const SAVE_DEBOUNCE_MS = 1000;

const shapeUtils = [EntityTableShapeUtil];

const SYNC_URL = process.env.NEXT_PUBLIC_TLDRAW_SYNC_URL;
const syncShapeUtils = [...defaultShapeUtils, ...shapeUtils];

type SyncOptions = { roomId: string; users?: Parameters<typeof useSyncDemo>[0]["users"] };

const useCanvasSync = SYNC_URL
  ? ({ roomId, users }: SyncOptions) =>
      useSync({
        uri: `${SYNC_URL}/connect/${roomId}`,
        assets: inlineBase64AssetStore,
        shapeUtils: syncShapeUtils,
        bindingUtils: defaultBindingUtils,
        users,
      })
  : ({ roomId, users }: SyncOptions) => useSyncDemo({ roomId, shapeUtils, users });

const components: TLComponents = {
  StylePanel: null,
  PageMenu: null,
  MainMenu: null,
  Toolbar: () => (
    <DefaultToolbar orientation="vertical">
      <AddEntityTableButton />
      <DefaultToolbarContent />
    </DefaultToolbar>
  ),
};

export function CanvasEditor({
  workspaceId,
  initialSnapshot,
}: {
  workspaceId: string;
  initialSnapshot: TLEditorSnapshot | null;
}) {
  const saveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { setCanvasEditor } = useWorkspaceEditors();
  const { user } = useUser();

  const userId = user?.id;
  const userName = user?.fullName ?? user?.username ?? "Anonymous";
  const userImageUrl = user?.imageUrl ?? "";

  // 1. Create the atom ONCE so `users` never changes object identity when Clerk finishes loading.
  const userAtom = useMemo(
    () =>
      atom(
        "currentUser",
        UserRecordType.create({
          id: createUserId(userId ?? "anonymous"),
          name: userName,
          color: colorForUser(userId ?? "anonymous"),
          imageUrl: userImageUrl,
        })
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // Sync Clerk user updates into the existing atom without triggering a useSync reconnect
  useEffect(() => {
    if (!userId) return;
    userAtom.set(
      UserRecordType.create({
        id: createUserId(userId),
        name: userName,
        color: colorForUser(userId),
        imageUrl: userImageUrl,
      })
    );
  }, [userAtom, userId, userName, userImageUrl]);

  const users = useMemo(() => ({ currentUser: userAtom }), [userAtom]);

  const currentUser = useMemo(() => {
    if (!userId) return undefined;
    return createTLCurrentUser({
      userPreferences: computed("clerkUserPreferences", () => ({
        ...getUserPreferences(),
        id: userId,
        name: userName,
        color: colorForUser(userId),
      })),
    });
  }, [userId, userName]);

  // 2. Clean up editor reference properly on React unmount
  useEffect(() => {
    return () => setCanvasEditor(null);
  }, [setCanvasEditor]);

  const sync = useCanvasSync({ roomId: `outpost-${workspaceId}`, users });

  if (sync.status === "loading") {
    return (
      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
        Connecting to canvas...
      </div>
    );
  }

  if (sync.status === "error") {
    return (
      <div className="flex h-full items-center justify-center p-6 text-center text-sm text-destructive">
        Canvas connection failed: {sync.error.message}
      </div>
    );
  }

  const handleMount = (editor: Editor) => {
    setCanvasEditor(editor);

    if (initialSnapshot && editor.getCurrentPageShapeIds().size === 0) {
      editor.loadSnapshot(initialSnapshot);
    }

    editor.store.listen(
      () => {
        if (saveTimeout.current) clearTimeout(saveTimeout.current);
        saveTimeout.current = setTimeout(() => {
          const plainSnapshot = JSON.parse(
            JSON.stringify(editor.getSnapshot())
          ) as Prisma.InputJsonValue;
          saveCanvasContent(workspaceId, plainSnapshot);
        }, SAVE_DEBOUNCE_MS);
      },
      { source: "user", scope: "document" }
    );

    editor.store.listen(
      (entry) => {
        for (const record of Object.values(entry.changes.added)) {
          if (record.typeName === "binding" && record.type === "arrow") {
            snapArrowBindingToRow(editor, record);
          }
        }
      },
      { source: "user", scope: "all" }
    );
  };

  return (
    <div className="isolate h-full w-full [&_.tlui-main-toolbar--vertical]:top-4!">
      <Tldraw
        store={sync.store}
        user={currentUser}
        onMount={handleMount}
        components={components}
        colorScheme="dark"
        shapeUtils={shapeUtils}
        licenseKey={process.env.NEXT_PUBLIC_TLDRAW_LICENSE_KEY}
      />
    </div>
  );
}