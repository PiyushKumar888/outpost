"use client";

import dynamic from "next/dynamic";

export const CanvasEditor = dynamic(
  () => import("./CanvasEditor").then((m) => m.CanvasEditor),
  { ssr: false }
);