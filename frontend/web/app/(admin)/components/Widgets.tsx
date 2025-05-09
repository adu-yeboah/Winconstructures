import React from 'react';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

interface WidgetsProps {
  icon: LucideIcon;
  title: string;
  figure: number | string;
  link: string;
  linkText: string;
}

export const Widgets = ({ icon: Icon, title, figure, link, linkText }: WidgetsProps) => {
  return (
    <div className="flex flex-col justify-around w-[300px] h-[150px] p-2.5 bg-white text-white rounded-[10px]">
      <div className="text-base uppercase text-grey1">{title}</div>
      <div className="text-3xl p-[0_5px] text-tertiary">{figure}</div>
      <div className="flex items-center justify-between">
        <Link href={link} className="underline text-grey1 hover:text-secondary lowercase">
          {linkText}
        </Link>
        <Icon className="text-tertiary" />
      </div>
    </div>
  );
};