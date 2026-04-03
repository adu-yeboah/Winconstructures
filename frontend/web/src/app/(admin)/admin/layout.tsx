import React from "react";
import Sidebar from "../components/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
export default function Homelayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar />
      <div className="ml-52">
        <SidebarTrigger />

        {children}
      </div>
    </SidebarProvider>
  );
}
