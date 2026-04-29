'use client';

import React from 'react';
import { Settings } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="p-6">
      <div className="flex items-center gap-2.5 mb-6">
        <span className="block w-4 h-px bg-secondary" />
        <span className="text-secondary text-[10px] font-medium tracking-[0.12em] uppercase">Settings</span>
      </div>
      <h1 className="text-[24px] font-serif font-semibold text-gray-900 leading-tight">Settings</h1>
      <p className="text-[12px] text-tertiary mt-1">Manage your account settings and preferences</p>
    </div>
  );
}