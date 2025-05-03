import React from 'react';
import { User } from 'lucide-react';
import Link from 'next/link';

export const Widgets = () => {
  return (
    <div className="flex flex-col justify-around w-[300px] h-[150px] p-2.5 bg-white text-white rounded-[10px]">
      <div className="text-base uppercase text-grey1">users</div>
      <div className="text-3xl p-[0_5px] text-tertiary">340</div>
      <div className="flex items-center justify-between">
        <Link href="/dashboard" className="underline text-grey1 hover:text-secondary lowercase">
          see all users
        </Link>
        <User className="text-tertiary" />
      </div>
    </div>
  );
};
