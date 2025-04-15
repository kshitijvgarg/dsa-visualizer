"use client";

import React, { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ChevronRight, Folder, File } from "lucide-react";
import { Tree, TreeNode } from "@/lib/models/tree";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Separator } from "@radix-ui/react-separator";

const tree = new Tree();

export default function Page() {
  const [AddText, setAddText] = useState("");

  const handleAdd = () => {
    tree.addNode(Number(AddText));
    setAddText("");
  };

  return (
    <>
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/">
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Tree</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex gap-2 p-2">
        <Input
          type="number"
          value={AddText}
          onChange={(e) => setAddText(e.target.value)}
          className="w-36"
        ></Input>
        <Button type="submit" onClick={handleAdd}>
          Add to tree
        </Button>
      </div>
      <PrintTree root={tree.root} />
    </>
  );
}

function PrintTree({ root }: { root: TreeNode | null }) {
  if (root == null) {
    return (
      <SidebarMenuButton>
        <File />
        empty
      </SidebarMenuButton>
    );
  }

  return (
    <SidebarMenuItem>
      <Collapsible className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90">
        <CollapsibleTrigger asChild>
          <SidebarMenuButton>
            <ChevronRight className="transition-transform" />
            <Folder />
            {root.data}
          </SidebarMenuButton>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <SidebarMenuSub>
            {/* recursively call this print tree function */}
            <PrintTree root={root.left} />
            <PrintTree root={root.right} />
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
}
