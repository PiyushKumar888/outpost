"use client";

import { Tldraw, type TLEditorSnapshot, type TLComponents } from "tldraw";
import "tldraw/tldraw.css";
import { EntityTableShapeUtil } from "@/components/EntityTable/EntityTableShapeUtil";

const shapeUtils = [EntityTableShapeUtil];
const components: TLComponents = {
  StylePanel: null,
  PageMenu: null,
  MainMenu: null,
  Toolbar: null,
};

export function SharedCanvasViewer({ snapshot }: { snapshot: TLEditorSnapshot | null }) {
  if (!snapshot) {
    return (
      <div className="flex h-[60vh] min-h-96 items-center justify-center rounded-xl border border-white/10 text-sm text-muted-foreground">
        This canvas is empty.
      </div>
    );
  }

  return (
    <div
      aria-label="Read-only shared canvas"
      className="relative h-[60vh] min-h-96 overflow-hidden rounded-xl border border-white/10 [&_.tl-container]:pointer-events-none"
    >
      <Tldraw
        snapshot={snapshot}
        shapeUtils={shapeUtils}
        components={components}
        hideUi
        onMount={(editor) => {
          editor.zoomToFit();
        }}
        colorScheme="dark"
        licenseKey={process.env.NEXT_PUBLIC_TLDRAW_LICENSE_KEY}
      />
    </div>
  );
}
