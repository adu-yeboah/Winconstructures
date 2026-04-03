"use client";
import React from "react";
import Link from "next/link";
import { Home, Building, PlusCircle, MessageSquare, LogOut } from "lucide-react";
import Image from "next/image";
import { Sidebar, SidebarFooter, SidebarMenuItem } from "@/components/ui/sidebar"; 
import { Button } from "@/components/ui/button";

export default function AppSidebar() {
  const navItems = [
    { href: "/home", label: "Home", icon: Home },
    { href: "/properties", label: "Properties", icon: Building },
    { href: "/add", label: "Add", icon: PlusCircle },
    { href: "/messages", label: "Messages", icon: MessageSquare },
  ];

  return (
    <Sidebar className="w-48 fixed top-0 h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="flex justify-center py-6">
        <Image
          src="/logo.png"
          alt="Wiscon Structures Logo"
          width={100}
          height={60}
          className="object-contain"
          priority
        />
      </div>

      {/* Navigation Items */}
      <div className="flex-1 flex flex-col mt-4 space-y-1">
        {navItems.map((item) => (
          <SidebarMenuItem key={item.href} className="px-0">
            <Link
              href={item.href}
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-primary hover:text-white transition"
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          </SidebarMenuItem>
        ))}
      </div>

      {/* Footer / Logout */}
      <SidebarFooter className="p-4">
        <Button
          variant="ghost"
          className="flex items-center gap-3 w-full text-red-600 hover:bg-red-50 hover:text-red-700"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}