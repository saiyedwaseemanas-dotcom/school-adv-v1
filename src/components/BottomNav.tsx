import React from 'react';
import { AppScreen } from '../types';

interface BottomNavProps {
  currentScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentScreen,
  onNavigate,
}) => {
  const tabs: { screen: AppScreen; label: string; icon: string }[] = [
    { screen: 'dashboard', label: 'Dashboard', icon: 'grid_view' },
    { screen: 'attendance', label: 'Attendance', icon: 'fact_check' },
    { screen: 'syllabus', label: 'Syllabus', icon: 'menu_book' },
    { screen: 'marks', label: 'Marks', icon: 'grade' },
    { screen: 'sync', label: 'Sync', icon: 'sync_alt' },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-40 pb-[env(safe-area-inset-bottom,0px)] bg-white/95 backdrop-blur-xl shadow-[0_-1px_8px_rgba(0,0,0,0.04)] border-t border-[#eaedff]">
      <div className="flex items-center justify-around h-16 max-w-4xl mx-auto px-1">
        {tabs.map((tab) => {
          const isActive = currentScreen === tab.screen;
          return (
            <button
              key={tab.screen}
              className={`flex-1 min-h-[44px] flex flex-col items-center justify-center gap-0.5 transition-all cursor-pointer ${
                isActive
                  ? 'text-[#2563eb] font-bold'
                  : 'text-[#515f74] hover:text-[#131b2e]'
              }`}
              type="button"
              onClick={() => onNavigate(tab.screen)}
            >
              <span
                className="material-symbols-outlined text-[22px]"
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {tab.icon}
              </span>
              <span className="text-[10px] tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
