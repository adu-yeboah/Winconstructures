"use client";
import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Home,
  Building,
  PlusCircle,
  MessageSquare,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import {
  Sidebar,
  SidebarProvider,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Dashboard", href: "/admin", icon: Home },
  { title: "Properties", href: "/admin/properties", icon: Building },
  { title: "Add Property", href: "/admin/add", icon: PlusCircle },
  { title: "Messages", href: "/admin/messages", icon: MessageSquare, badge: 3 },
];

const secondaryItems = [
  { title: "Profile", href: "/admin/profile", icon: User },
  { title: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AppSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();


  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar className="border-r bg-white ">
          {/* Logo */}
          <SidebarHeader className="px-5 py-5 border-b border-gray-100 w-full items-center justify-center flex">
            <Image
              src="/logo.png"
              alt="Wiscon Structures Logo"
              width={140}
              height={60}
              className="object-contain"
              priority
            />
          </SidebarHeader>

          {/* Nav */}
          <SidebarContent className="px-3 py-4 flex-1">
            <p className="text-[10px] font-medium tracking-[0.1em] uppercase text-tertiary px-2 mb-2">
              Menu
            </p>
            <SidebarMenu className="flex flex-col gap-0.5">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.href} className="relative">
                    {isActive && (
                      <span className="absolute left-0 top-1/2 ml-0.5 -translate-y-1/2 -translate-x-3 w-[3px] h-5 bg-primary rounded-r-full" />
                    )}
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.href}
                        className={`flex items-center gap-2.5 px-3 py-5 rounded-lg text-[13px] transition-all duration-150 ${
                          isActive
                            ? "bg-primary-light text-primary font-medium"
                            : "text-tertiary hover:bg-primary-light hover:text-primary"
                        }`}
                      >
                        <item.icon className="w-[15px] h-[15px] shrink-0" />
                        <span className="flex-1">{item.title}</span>
                        {item.badge && (
                          <span className="bg-secondary text-primary-dark text-[10px] font-semibold px-1.5 py-0.5 rounded-full leading-none">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>

            <p className="text-[10px] font-medium tracking-[0.1em] uppercase text-tertiary px-2 mb-2 mt-5">
              Settings
            </p>
            <SidebarMenu className="flex flex-col gap-0.5">
              {secondaryItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.href}
                        className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13px] transition-all duration-150 ${
                          isActive
                            ? "bg-primary-light text-primary font-medium"
                            : "text-tertiary hover:bg-primary-light hover:text-primary"
                        }`}
                      >
                        <item.icon className="w-[15px] h-[15px] shrink-0" />
                        {item.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarContent>

          {/* Footer */}
          <SidebarFooter className="p-3 border-t border-gray-100">
            <div className="flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-gray-50 cursor-pointer mb-1">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                <span className="font-serif text-secondary text-xs font-semibold">
                  A
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-medium text-gray-900 truncate">
                  Admin User
                </p>
                <p className="text-[11px] text-tertiary">Super Admin</p>
              </div>
            </div>
            <button className="flex items-center gap-2 w-full px-2.5 py-2 rounded-lg text-[13px] text-red-500 hover:bg-red-50 transition-colors">
              <LogOut className="w-3.5 h-3.5" />
              Logout
            </button>
          </SidebarFooter>
        </Sidebar>

        {/* Main */}
        <div className="flex-1 flex flex-col bg-gray-50 relative">

          <div className="bg-white border-b border-gray-100 px-6 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div>
                <h1 className="font-serif text-[20px] font-semibold text-gray-900 leading-tight">
                  Dashboard
                </h1>
                <p className="text-[11px] text-tertiary">
                  Admin / <span className="text-primary">Overview</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
                <span className="font-serif text-secondary text-sm font-semibold">
                  A
                </span>
              </div>
            </div>
          </div>

          <main className="flex-1 overflow-auto p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
