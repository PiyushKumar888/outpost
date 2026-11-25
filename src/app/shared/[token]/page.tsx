import { notFound } from "next/navigation";
import type { Block } from "@blocknote/core";
import type { TLEditorSnapshot } from "tldraw";
import { prisma } from "@/lib/prisma";
import { DocViewer } from "../../(main)/workspace/[id]/_components/DocViewer";
import { SharedCanvasViewer } from "./_components/SharedCanvasViewer";

export default async function SharedWorkspacePage({ params }: PageProps<"/shared/[token]">) {
  const { token } = await params;
  const workspace = await prisma.workspace.findUnique({
    where: { shareToken: token },
    select: {
      name: true,
      doc: { select: { content: true } },
      canvas: { select: { content: true } },
    },
  });

  if (!workspace) notFound();

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 space-y-8 px-6 py-10">
      <header>
        <p className="text-sm text-muted-foreground">Shared workspace</p>
        <h1 className="mt-1 text-3xl font-semibold">{workspace.name}</h1>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-medium">Document</h2>
        <div className="rounded-xl border border-white/10 bg-card p-6">
          <DocViewer content={workspace.doc?.content as Block[] | null} />
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium">Canvas</h2>
        <SharedCanvasViewer snapshot={workspace.canvas?.content as TLEditorSnapshot | null} />
      </section>
    </main>
  );
}
