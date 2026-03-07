import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/src/components/layout/sidebar";
import { SidebarProvider } from "@/components/layout/sidebar-provider";
import { ProgressProvider } from "@/components/providers/progress-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DSA OS - Developer Practice Platform",
  description: "A modern developer environment for DSA practice.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark selection:bg-primary/30">
      <body className={`${inter.className} bg-background text-foreground antialiased relative min-h-screen`}>
        {/* Subtle Global Ambient Gradient */}
        <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))] pointer-events-none" />
        <ProgressProvider>
          <SidebarProvider>
            <div className="relative z-10 flex h-screen w-full overflow-hidden">
              <Sidebar />
              <div className="flex flex-1 flex-col overflow-hidden max-w-full">
                <main className="flex-1 overflow-y-auto w-full">
                  {children}
                </main>
              </div>
            </div>
          </SidebarProvider>
        </ProgressProvider>
      </body>
    </html>
  );
}
