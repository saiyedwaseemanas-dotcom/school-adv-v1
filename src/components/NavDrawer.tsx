import React from 'react';
import { AppScreen, UserRole } from '../types';
import { APP_LOGO, PROFILE_AVATAR } from '../data/mockData';

interface NavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
  userRole: UserRole;
  onChangeRole: (role: UserRole) => void;
  onShowToast: (message: string, icon?: string) => void;
}

export const NavDrawer: React.FC<NavDrawerProps> = ({
  isOpen,
  onClose,
  currentScreen,
  onNavigate,
  userRole,
  onChangeRole,
  onShowToast,
}) => {
  const navItems: { screen: AppScreen; label: string; icon: string }[] = [
    { screen: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { screen: 'students', label: 'Students Directory', icon: 'school' },
    { screen: 'teachers', label: 'Faculty & Staff', icon: 'badge' },
    { screen: 'attendance', label: 'Take Attendance', icon: 'fact_check' },
    { screen: 'syllabus', label: 'Syllabus Tracker', icon: 'menu_book' },
    { screen: 'marks', label: 'Marks & Exams', icon: 'grade' },
    { screen: 'reports', label: 'Institutional Reports', icon: 'analytics' },
    { screen: 'sync', label: 'Google Sheets Sync', icon: 'sync_alt' },
    { screen: 'settings', label: 'Settings', icon: 'settings' },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-[#283044]/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-[290px] bg-white shadow-[0_20px_25px_-5px_rgba(15,23,42,0.12)] transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="pt-[env(safe-area-inset-top,0px)] px-4 pb-4 flex items-center justify-between border-b border-[#eaedff]">
          <div className="flex items-center gap-2">
            <img
              alt="EduTrack Pro Logo"
              className="h-8 w-auto object-contain"
              src={APP_LOGO}
            />
            <div className="flex flex-col">
              <span className="text-base font-bold text-[#131b2e]">EduTrack Pro</span>
              <span className="text-xs font-semibold text-[#004ac6]">Workspace Portal</span>
            </div>
          </div>
          <button
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-[#434655] hover:bg-[#eaedff] transition-colors cursor-pointer"
            onClick={onClose}
            type="button"
            aria-label="Close Drawer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Role Switcher */}
        <div className="px-4 py-2.5">
          <div className="bg-[#f2f3ff] p-1 rounded-lg flex gap-1">
            {(['Teacher', 'Admin', 'Student'] as UserRole[]).map((role) => (
              <button
                key={role}
                className={`flex-1 py-1.5 px-2 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                  userRole === role
                    ? 'bg-white text-[#004ac6] shadow-[0_1px_2px_rgba(0,0,0,0.04)]'
                    : 'text-[#434655] hover:text-[#131b2e]'
                }`}
                type="button"
                onClick={() => {
                  onChangeRole(role);
                  onShowToast(`Switched workspace mode to ${role}`);
                }}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 overflow-y-auto px-2 py-1 space-y-1">
          {navItems.map((item) => {
            const isActive = currentScreen === item.screen;
            return (
              <button
                key={item.screen}
                className={`w-full min-h-[44px] px-4 flex items-center gap-3 rounded-lg transition-colors text-sm font-medium cursor-pointer ${
                  isActive
                    ? 'bg-[#dbe1ff] text-[#003ea8] font-bold'
                    : 'text-[#434655] hover:bg-[#eaedff] hover:text-[#131b2e]'
                }`}
                type="button"
                onClick={() => {
                  onNavigate(item.screen);
                  onClose();
                }}
              >
                <span
                  className="material-symbols-outlined text-[22px]"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Profile Footer */}
        <div className="pb-[env(safe-area-inset-bottom,0px)] p-4 bg-[#f2f3ff] flex items-center gap-2 border-t border-[#eaedff]">
          <img
            alt="Profile"
            className="w-9 h-9 rounded-full object-cover ring-1 ring-[#c3c6d7]/40"
            src={PROFILE_AVATAR}
          />
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-sm font-semibold text-[#131b2e] truncate">
              {userRole === 'Admin' ? 'Principal Sharma' : 'Sarah Jenkins'}
            </span>
            <span className="text-[11px] text-[#434655] truncate">
              {userRole === 'Admin' ? 'Office of the Principal' : 'Mathematics Dept.'}
            </span>
          </div>
          <button
            aria-label="Log Out"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-[#434655] hover:text-[#ba1a1a] transition-colors cursor-pointer"
            type="button"
            onClick={() => onShowToast('Session logged out safely', 'lock')}
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};
