"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";

export default function App() {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>

              {/* <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>sdf</BreadcrumbPage>
              </BreadcrumbItem> */}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-col min-h-screen p-4">
        <main className="flex-grow flex justify-center items-center">
          <div className="max-w-2xl text-lg space-y-4">
            <p>
              Welcome to DSA Visualizer! This project aims to provide
              interactive visualizations for Data Structures and Algorithms,
              making them easier to understand.
            </p>
            <p>
              Here you can explore different data structures like arrays, linked
              lists, trees, and graphs, and see how various algorithms work step
              by step.
            </p>
            <p>
              We believe that visual learning is a powerful tool for
              understanding complex concepts. Feel free to explore and
              experiment with the visualizations.
            </p>
          </div>
        </main>

        <footer className="mt-8 text-center text-sm text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} DSA Visualizer. All rights
            reserved.
          </p>
        </footer>
      </div>
    </>
  );
}
