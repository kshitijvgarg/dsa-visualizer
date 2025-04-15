import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "DSA Visualizer | By Kshitij Garg",
  description:
    "Explore and understand Data Structures and Algorithms with interactive visualizations. DSA Visualizer provides a hands-on learning experience for students and developers. Visualize complex concepts like arrays, linked lists, trees, sorting algorithms, and more.",
};

type RootLayoutProps = {
  children: ReactNode;
};

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-title" content="DSA Visualizer" />
      </head>

      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main>
            <SidebarProvider>
              <AppSidebar />

              <SidebarInset>{children}</SidebarInset>
            </SidebarProvider>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
