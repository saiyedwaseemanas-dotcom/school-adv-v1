import React, { useState } from 'react';
import { AppScreen } from '../types';
import { APP_LOGO, PROFILE_AVATAR } from '../data/mockData';

interface HeaderProps {
  currentScreen: AppScreen;
  onOpenDrawer: () => void;
  onOpenApkModal?: () => void;
  onShowToast: (message: string, icon?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onOpenDrawer,
  onOpenApkModal,
  onShowToast,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const getScreenSubtitle = (screen: AppScreen) => {
    switch (screen) {
      case 'dashboard':
        return 'Dashboard';
      case 'attendance':
        return 'Take Attendance';
      case 'syllabus':
        return 'Syllabus';
      case 'marks':
        return 'Marks & Exams';
      case 'sync':
        return 'Google Sheets Sync';
      case 'students':
        return 'Students Directory';
      case 'teachers':
        return 'Faculty & Staff';
      case 'reports':
        return 'Institutional Reports';
      case 'settings':
        return 'Settings';
      default:
        return 'Workspace Portal';
    }
  };

  return (
    <header className="fixed top-0 w-full z-40 bg-[#ffffff]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] pt-[env(safe-area-inset-top,0px)]">
      <div className="h-16 px-4 flex items-center justify-between gap-1 max-w-4xl mx-auto">
        <div className="flex items-center gap-1">
          <button
            aria-label="Open Menu"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-[#434655] hover:bg-[#eaedff] active:scale-95 transition-all cursor-pointer"
            onClick={onOpenDrawer}
            type="button"
          >
            <span className="material-symbols-outlined text-[24px]">menu</span>
          </button>

          <div className="flex items-center gap-2 pl-1">
            <img
              alt="EduTrack Pro Logo"
              className="h-8 w-auto object-contain"
              src={APP_LOGO}
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-[1rem] font-bold text-[#131b2e] leading-none tracking-tight">
                  EduTrack
                </span>
                <span className="px-1.5 py-0.5 rounded-full bg-[#d5e3fc] text-[#3a485b] text-[10px] uppercase font-bold tracking-wider">
                  2024-25
                </span>
              </div>
              <span className="text-[11px] font-medium text-[#434655] leading-tight mt-0.5">
                {getScreenSubtitle(currentScreen)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {onOpenApkModal && (
            <button
              aria-label="Build Android APK on GitHub"
              className="min-h-[44px] px-2.5 flex items-center gap-1.5 rounded-lg text-[#004ac6] bg-[#eaf1ff] hover:bg-[#dbe7ff] active:scale-95 transition-all text-xs font-bold cursor-pointer"
              type="button"
              onClick={onOpenApkModal}
              title="GitHub APK CI/CD Build Guide"
            >
              <span className="material-symbols-outlined text-[18px]">android</span>
              <span className="hidden sm:inline">Build APK</span>
            </button>
          )}

          <div className="relative">
            <button
              aria-label="Notifications"
              className="min-h-[44px] min-w-[44px] relative flex items-center justify-center rounded-lg text-[#434655] hover:bg-[#eaedff] transition-colors cursor-pointer"
              type="button"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <span className="material-symbols-outlined text-[22px]">notifications</span>
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#004ac6] ring-2 ring-white"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-2xl border border-[#e2e7ff] p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-[#eaedff]">
                  <span className="text-sm font-bold text-[#131b2e]">Notifications</span>
                  <span className="text-[11px] text-[#004ac6] font-semibold cursor-pointer" onClick={() => onShowToast('All notifications marked as read')}>
                    Mark all read
                  </span>
                </div>
                <div className="divide-y divide-[#f2f3ff] mt-1 max-h-64 overflow-y-auto">
                  <div className="py-2.5 flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#ba1a1a] mt-1.5 shrink-0"></span>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-[#131b2e]">Attendance Alert: Aarav Patel</p>
                      <p className="text-[11px] text-[#434655]">Unexcused absence reached 14 days this month.</p>
                      <span className="text-[10px] text-gray-400 mt-0.5 block">10 mins ago</span>
                    </div>
                  </div>
                  <div className="py-2.5 flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#2563eb] mt-1.5 shrink-0"></span>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-[#131b2e]">UT-2 Science Marks Saved</p>
                      <p className="text-[11px] text-[#434655]">Class 10-A evaluation synchronized to sheets.</p>
                      <span className="text-[10px] text-gray-400 mt-0.5 block">1 hour ago</span>
                    </div>
                  </div>
                  <div className="py-2.5 flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#5d55f3] mt-1.5 shrink-0"></span>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-[#131b2e]">Pacing Notice</p>
                      <p className="text-[11px] text-[#434655]">Mathematics is 2 periods behind Midterm schedule.</p>
                      <span className="text-[10px] text-gray-400 mt-0.5 block">3 hours ago</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="min-h-[44px] min-w-[44px] flex items-center justify-center pl-1">
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover shadow-[0_1px_3px_rgba(0,0,0,0.08)] ring-1 ring-[#c3c6d7]/30"
              src={PROFILE_AVATAR}
            />
          </div>
        </div>
      </div>
    </header>
  );
};
