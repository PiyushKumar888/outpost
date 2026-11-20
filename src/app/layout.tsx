import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Inter,
  Bricolage_Grotesque,
} from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TooltipPortal, TooltipProvider } from "radix-ui/tooltip";
import { Toaster } from "sonner";
import AppShell from "@/components/ui/AppShell";
import { ClerkProvider } from "@clerk/nextjs";
import {dark} from "@clerk/ui/themes";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



const bricolage = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["opsz"],
});

export const metadata: Metadata = {
  title: "Outpost: Agentic Workspace",
  description:
    "An AI agent that draws and writes alongside you and your team, live.",
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  manifest: "/manifest.json",
  // Link previews (Slack, X, iMessage...). On Vercel, Next fills in the site URL for these paths.
  openGraph: {
    title: "Outpost: Agentic Workspace",
    description:
      "An AI agent that draws and writes alongside you and your team, live.",
    images: [
      { url: "/social/og-image.png", width: 1200, height: 630, alt: "Outpost" },
    ],
  },
  twitter: { card: "summary_large_image", images: ["/social/og-image.png"] },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <ClerkProvider
      appearance={{
        theme: dark,
        variables: { colorPrimary: "oklch(0.74 0.16 55)" },
      }}
    >

      <html
        lang="en"
        className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, bricolage.variable, "font-sans", inter.variable)}
      >
        <body className="min-h-full flex flex-col">

          <TooltipProvider>
            <AppShell>
              {children}
            </AppShell>
          </TooltipProvider>
          <Toaster richColors />
        </body>
      </html>
    </ClerkProvider>
  );
}
