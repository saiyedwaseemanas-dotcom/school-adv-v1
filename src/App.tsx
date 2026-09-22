import React, { useState } from 'react';
import { AppScreen, UserRole, ToastState } from './types';
import { Header } from './components/Header';
import { NavDrawer } from './components/NavDrawer';
import { BottomNav } from './components/BottomNav';
import { ToastNotification } from './components/modals/ToastNotification';
import { DashboardScreen } from './components/screens/DashboardScreen';
import { AttendanceScreen } from './components/screens/AttendanceScreen';
import { SyllabusScreen } from './components/screens/SyllabusScreen';
import { MarksScreen } from './components/screens/MarksScreen';
import { SyncScreen } from './components/screens/SyncScreen';
import { StudentsDirectoryScreen } from './components/screens/StudentsDirectoryScreen';
import { FacultyScreen } from './components/screens/FacultyScreen';
import { ReportsScreen } from './components/screens/ReportsScreen';
import { ApkBuildModal } from './components/modals/ApkBuildModal';

export const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('dashboard');
  const [userRole, setUserRole] = useState<UserRole>('Teacher');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isApkModalOpen, setIsApkModalOpen] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = (message: string, icon?: string) => {
    setToast({
      id: Date.now(),
      message,
      icon,
    });
  };

  const closeToast = () => {
    setToast(null);
  };

  return (
    <div className="min-h-screen bg-[#f7f9fe] text-[#131b2e] font-sans flex flex-col selection:bg-[#004ac6] selection:text-white">
      {/* Top Header */}
      <Header
        currentScreen={currentScreen}
        onOpenDrawer={() => setIsDrawerOpen(true)}
        onOpenApkModal={() => setIsApkModalOpen(true)}
        onShowToast={showToast}
      />

      {/* Main Screen Content Body */}
      <main className="flex-1 w-full flex flex-col">
        {currentScreen === 'dashboard' && (
          <DashboardScreen
            onNavigate={setCurrentScreen}
            userRole={userRole}
            onChangeRole={setUserRole}
            onShowToast={showToast}
          />
        )}

        {currentScreen === 'attendance' && (
          <AttendanceScreen onShowToast={showToast} />
        )}

        {currentScreen === 'syllabus' && (
          <SyllabusScreen onShowToast={showToast} />
        )}

        {currentScreen === 'marks' && (
          <MarksScreen onShowToast={showToast} />
        )}

        {currentScreen === 'sync' && (
          <SyncScreen onShowToast={showToast} onOpenApkModal={() => setIsApkModalOpen(true)} />
        )}

        {currentScreen === 'students' && (
          <StudentsDirectoryScreen onShowToast={showToast} />
        )}

        {currentScreen === 'teachers' && (
          <FacultyScreen onShowToast={showToast} />
        )}

        {currentScreen === 'reports' && (
          <ReportsScreen onShowToast={showToast} />
        )}

        {currentScreen === 'settings' && (
          <div className="flex flex-col w-full max-w-4xl mx-auto pt-2 pb-24 space-y-4 px-4">
            {/* Android APK CI/CD Settings Card */}
            <div className="bg-white rounded-2xl p-5 shadow-[0_1px_4px_rgba(0,0,0,0.04)] border border-[#eaedff] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#eaf1ff] text-[#004ac6] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[22px]">android</span>
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-[#131b2e]">Android APK & GitHub Actions</h2>
                    <span className="text-xs text-[#515f74]">Automated Mobile CI/CD Pipeline</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#dcfce7] text-[#15803d] text-xs font-bold">
                  Configured
                </span>
              </div>
              <p className="text-xs text-[#515f74] leading-relaxed">
                Capacitor configuration and GitHub Actions workflow <code>.github/workflows/build-apk.yml</code> are ready. Every push to GitHub or manual workflow trigger builds an installable <code>EduTrack-debug.apk</code>.
              </p>
              <div className="pt-1 flex items-center gap-2">
                <button
                  className="px-3.5 py-2 bg-[#004ac6] text-white rounded-xl text-xs font-bold hover:bg-[#003ea8] transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
                  onClick={() => setIsApkModalOpen(true)}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">rocket_launch</span>
                  <span>View APK Build Guide & Instructions</span>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-[0_1px_4px_rgba(0,0,0,0.04)] border border-[#eaedff] space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#dbe1ff] text-[#004ac6] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[22px]">settings</span>
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#131b2e]">Academic Configuration</h2>
                  <span className="text-xs text-[#515f74]">Term 1 (2024-25) Institution Settings</span>
                </div>
              </div>

              <div className="space-y-3 pt-2 text-xs">
                <div className="flex items-center justify-between p-3 bg-[#f2f3ff] rounded-xl">
                  <div>
                    <span className="font-bold text-[#131b2e] block">Attendance Defaulter Threshold</span>
                    <span className="text-[#515f74]">Flag students with attendance below threshold</span>
                  </div>
                  <span className="font-mono font-bold text-[#ba1a1a] bg-white px-2.5 py-1 rounded-lg">
                    75%
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-[#f2f3ff] rounded-xl">
                  <div>
                    <span className="font-bold text-[#131b2e] block">Grading Scale Scheme</span>
                    <span className="text-[#515f74]">CBSE 9-Point Absolute Grading</span>
                  </div>
                  <span className="font-bold text-[#004ac6] bg-white px-2.5 py-1 rounded-lg">
                    Active
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-[#f2f3ff] rounded-xl">
                  <div>
                    <span className="font-bold text-[#131b2e] block">Automated WhatsApp Absentee Alerts</span>
                    <span className="text-[#515f74]">Trigger daily SMS/WhatsApp to absentee guardians</span>
                  </div>
                  <span className="font-bold text-[#15803d] bg-white px-2.5 py-1 rounded-lg">
                    Enabled
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-[#f2f3ff] rounded-xl">
                  <div>
                    <span className="font-bold text-[#131b2e] block">Current User Role Mode</span>
                    <span className="text-[#515f74]">Switch role preview for permission testing</span>
                  </div>
                  <select
                    className="font-bold text-[#004ac6] bg-white px-2.5 py-1 rounded-lg border border-[#eaedff] focus:outline-none cursor-pointer"
                    value={userRole}
                    onChange={(e) => {
                      const newRole = e.target.value as UserRole;
                      setUserRole(newRole);
                      showToast(`Role switched to ${newRole}`, 'switch_account');
                    }}
                  >
                    <option value="Teacher">Teacher</option>
                    <option value="Admin">Admin</option>
                    <option value="Student">Student</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Persistent Bottom Navigation */}
      <BottomNav currentScreen={currentScreen} onNavigate={setCurrentScreen} />

      {/* Slide-over Navigation Drawer */}
      <NavDrawer
        isOpen={isDrawerOpen}
        currentScreen={currentScreen}
        onClose={() => setIsDrawerOpen(false)}
        onNavigate={setCurrentScreen}
        userRole={userRole}
        onChangeRole={setUserRole}
        onShowToast={showToast}
      />

      {/* Global Interactive Feedback Toast */}
      <ToastNotification toast={toast} onDismiss={closeToast} />

      {/* Android APK GitHub Actions Build Modal */}
      <ApkBuildModal
        isOpen={isApkModalOpen}
        onClose={() => setIsApkModalOpen(false)}
        onShowToast={showToast}
      />
    </div>
  );
};

export default App;
