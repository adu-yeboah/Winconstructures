"use client";
import React from "react";
import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

interface WidgetCardProps {
  icon: LucideIcon;
  title: string;
  figure: number | string;
  link: string;
  linkText: string;
  change?: string;
}

export function WidgetCard({ icon: Icon, title, figure, link, linkText }: WidgetCardProps) {
  return (
    <Card className="md:w-[30%] hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="text-sm font-semibold uppercase text-gray-500">{title}</div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-gray-900">{figure}</div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <a href={link} className="text-sm text-gray-500 hover:text-primary underline lowercase">{linkText}</a>
        <Icon className="w-5 h-5 text-primary" />
      </CardFooter>
    </Card>
  )
}
