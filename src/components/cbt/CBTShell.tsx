import React from 'react';
import { Sidebar } from '@/pages/CBTApp';

export default function CBTShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-pink-200 via-sky-200 to-yellow-200 saturate-150">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
        <div className="col-span-1" data-onboard="sidebar"><Sidebar /></div>
        <div className="col-span-11">
          {children}
        </div>
      </div>
    </div>
  );
}
