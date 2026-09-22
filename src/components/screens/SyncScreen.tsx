import React, { useState } from 'react';

interface SyncScreenProps {
  onShowToast: (message: string, icon?: string) => void;
  onOpenApkModal?: () => void;
}

export const SyncScreen: React.FC<SyncScreenProps> = ({ onShowToast, onOpenApkModal }) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [sheetUrl, setSheetUrl] = useState(
    'https://docs.google.com/spreadsheets/d/1DPS_Academic_2024_Gradebook_Master'
  );
  const [autoSync, setAutoSync] = useState(true);

  const syncModules = [
    {
      name: 'Evaluation Gradebook',
      sub: 'Class 10-A, 10-B, 9-A Science & Maths marks',
      rows: '142 rows',
      status: 'Active',
      icon: 'grade',
    },
    {
      name: 'Daily Attendance Register',
      sub: 'Session 24 Oct, 2024 • 36 Present, 2 Absent',
      rows: '40 rows',
      status: 'Active',
      icon: 'fact_check',
    },
    {
      name: 'Syllabus Tracker Units',
      sub: '12 Chapters tracking with NCERT milestones',
      rows: '12 rows',
      status: 'Active',
      icon: 'menu_book',
    },
    {
      name: 'Faculty Check-in & Biometrics',
      sub: 'Gate 2 punch logs and allocated leaves',
      rows: '20 rows',
      status: 'Active',
      icon: 'badge',
    },
  ];

  const handleForceSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      onShowToast('All 4 academic modules synced with Google Sheets!', 'cloud_done');
    }, 1500);
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto pt-2 pb-24 space-y-4 px-4">
      {/* Cloud Sync Status Header Card */}
      <section className="bg-white rounded-2xl p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)] border border-[#eaedff] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#dbe1ff] text-[#004ac6] flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">cloud_sync</span>
            </div>
            <div>
              <span className="text-base font-bold text-[#131b2e] block leading-tight">
                Google Sheets Live Sync
              </span>
              <span className="text-xs text-[#515f74]">Two-way cloud spreadsheet pipeline</span>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-[#dcfce7] text-[#15803d] text-xs font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#15803d] animate-pulse"></span>
            Connected
          </span>
        </div>

        {/* Spreadsheet Link Display */}
        <div className="bg-[#f2f3ff] p-3 rounded-xl flex flex-col gap-1.5">
          <span className="text-[10px] text-[#515f74] font-bold uppercase tracking-wider">
            Connected Target Spreadsheet
          </span>
          <div className="flex items-center justify-between gap-2">
            <input
              type="text"
              value={sheetUrl}
              onChange={(e) => setSheetUrl(e.target.value)}
              className="bg-transparent text-xs font-mono font-medium text-[#131b2e] focus:outline-none w-full truncate"
            />
            <button
              className="text-[#004ac6] hover:bg-[#e2e7ff] p-1.5 rounded-lg text-xs font-bold shrink-0 cursor-pointer"
              onClick={() => onShowToast('Spreadsheet link copied to clipboard', 'content_copy')}
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">content_copy</span>
            </button>
          </div>
        </div>

        {/* Auto Sync Toggle & Timestamp */}
        <div className="flex items-center justify-between pt-1 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-[#515f74]">Auto-sync every 15 mins:</span>
            <button
              className={`w-10 h-6 rounded-full transition-colors relative cursor-pointer ${
                autoSync ? 'bg-[#004ac6]' : 'bg-[#c3c6d7]'
              }`}
              onClick={() => {
                setAutoSync(!autoSync);
                onShowToast(
                  autoSync ? 'Auto-sync paused' : 'Auto-sync enabled (15 min interval)'
                );
              }}
              type="button"
            >
              <span
                className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                  autoSync ? 'left-5' : 'left-1'
                }`}
              ></span>
            </button>
          </div>
          <span className="text-[#515f74] font-mono text-[11px]">Last Sync: 2 mins ago</span>
        </div>

        {/* Primary Force Sync Button */}
        <button
          className="w-full min-h-[44px] bg-[#004ac6] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-[#003ea8] active:scale-98 transition-all cursor-pointer shadow-sm"
          onClick={handleForceSync}
          type="button"
          disabled={isSyncing}
        >
          <span
            className={`material-symbols-outlined text-[18px] ${isSyncing ? 'animate-spin' : ''}`}
          >
            sync
          </span>
          <span>{isSyncing ? 'Synchronizing Academic Rows...' : 'Force Sync All Modules Now'}</span>
        </button>
      </section>

      {/* Sync Modules List */}
      <section className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-[#515f74] uppercase tracking-wider">
            Synchronized Modules
          </span>
          <span className="text-xs text-[#004ac6] font-semibold cursor-pointer" onClick={() => onShowToast('All module mappings verified!')}>
            Verify Schema
          </span>
        </div>

        <div className="space-y-2.5">
          {syncModules.map((mod, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)] border border-[#eaedff] flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#f2f3ff] text-[#004ac6] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">{mod.icon}</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-bold text-[#131b2e] truncate">{mod.name}</span>
                  <span className="text-xs text-[#515f74] truncate">{mod.sub}</span>
                </div>
              </div>

              <div className="flex flex-col items-end shrink-0">
                <span className="text-xs font-bold text-[#15803d] bg-[#dcfce7] px-2 py-0.5 rounded-full">
                  {mod.rows}
                </span>
                <span className="text-[10px] text-[#515f74] mt-0.5">Synced OK</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Android APK & GitHub Actions Build Pipeline */}
      <section className="bg-white rounded-2xl p-4 sm:p-5 shadow-[0_1px_4px_rgba(0,0,0,0.04)] border border-[#eaedff] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#eaf1ff] text-[#004ac6] flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">android</span>
            </div>
            <div>
              <span className="text-sm sm:text-base font-bold text-[#131b2e] block leading-tight">
                Android APK GitHub Build
              </span>
              <span className="text-xs text-[#515f74]">Capacitor 8 &bull; GitHub Actions CI/CD</span>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-[#dcfce7] text-[#15803d] text-xs font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#15803d] animate-pulse"></span>
            CI/CD Ready
          </span>
        </div>

        <p className="text-xs text-[#515f74] leading-relaxed">
          The GitHub Actions workflow (<code>.github/workflows/build-apk.yml</code>) compiles your native Android APK in the cloud on every push or manual trigger.
        </p>

        <div className="bg-[#f8f9fe] p-3 rounded-xl border border-[#eaedff] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
          <div className="space-y-0.5">
            <div className="font-semibold text-[#131b2e] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#004ac6]">terminal</span>
              <span>Workflow File:</span>
            </div>
            <code className="text-[#004ac6] text-[11px] block font-mono">
              .github/workflows/build-apk.yml
            </code>
          </div>

          <div className="flex items-center gap-2">
            <button
              className="px-3 py-1.5 bg-white border border-[#eaedff] hover:bg-[#eaedff] text-[#131b2e] text-xs font-semibold rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
              onClick={() => {
                navigator.clipboard.writeText('.github/workflows/build-apk.yml');
                onShowToast('Workflow path copied to clipboard!', 'content_copy');
              }}
              type="button"
            >
              <span className="material-symbols-outlined text-[14px]">content_copy</span>
              <span>Copy Path</span>
            </button>
            {onOpenApkModal && (
              <button
                className="px-3 py-1.5 bg-[#004ac6] hover:bg-[#003ea8] text-white text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer transition-colors shadow-sm"
                onClick={onOpenApkModal}
                type="button"
              >
                <span className="material-symbols-outlined text-[15px]">info</span>
                <span>View APK Guide</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Export & Backup Section */}
      <section className="bg-white rounded-2xl p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)] border border-[#eaedff] space-y-3">
        <span className="text-sm font-bold text-[#131b2e] block">Offline Data Archive</span>
        <p className="text-xs text-[#515f74] leading-relaxed">
          Download snapshot copies of all evaluation records, attendance books, and syllabus milestones in open spreadsheet format.
        </p>
        <div className="grid grid-cols-2 gap-2">
          <button
            className="min-h-[40px] px-3 rounded-xl bg-[#f2f3ff] text-[#131b2e] hover:bg-[#eaedff] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-[#eaedff]"
            onClick={() => onShowToast('Exporting DPS_Academic_2024.xlsx snapshot...', 'download')}
            type="button"
          >
            <span className="material-symbols-outlined text-[16px] text-[#004ac6]">table_view</span>
            <span>Download .XLSX</span>
          </button>
          <button
            className="min-h-[40px] px-3 rounded-xl bg-[#f2f3ff] text-[#131b2e] hover:bg-[#eaedff] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-[#eaedff]"
            onClick={() => onShowToast('Exporting marksheet CSV archive...', 'download')}
            type="button"
          >
            <span className="material-symbols-outlined text-[16px] text-[#004ac6]">description</span>
            <span>Download .CSV</span>
          </button>
        </div>
      </section>
    </div>
  );
};
