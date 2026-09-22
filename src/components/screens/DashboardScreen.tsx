import React, { useState } from 'react';
import { AppScreen, UserRole } from '../../types';

interface DashboardScreenProps {
  onNavigate: (screen: AppScreen) => void;
  userRole: UserRole;
  onChangeRole: (role: UserRole) => void;
  onShowToast: (message: string, icon?: string) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  onNavigate,
  userRole,
  onChangeRole,
  onShowToast,
}) => {
  const [selectedCohort, setSelectedCohort] = useState<'10a' | '10b' | '9a'>('10a');
  const [isSyncing, setIsSyncing] = useState(false);
  const [hoveredTrendIndex, setHoveredTrendIndex] = useState<number | null>(null);

  const trendData = [
    { day: 'Thu', val: 92.4 },
    { day: 'Fri', val: 93.1 },
    { day: 'Mon', val: 95.8 },
    { day: 'Tue', val: 94.6 },
    { day: 'Wed', val: 96.0 },
    { day: 'Thu', val: 93.8 },
    { day: 'Today', val: 94.2 },
  ];

  const handleManualSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      onShowToast('Synced 142 records with DPS_Academic_2024.xlsx', 'cloud_done');
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full px-4 pb-24 space-y-4 max-w-4xl mx-auto pt-2">
      {/* Role Switcher & Google Sheets Live Sync Bar */}
      <div className="w-full bg-white rounded-2xl p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)] border border-[#eaedff] flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#dbe1ff] flex items-center justify-center text-[#004ac6] shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-[24px]">shield_person</span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[#131b2e] truncate">
                  {userRole === 'Admin' ? 'Principal Sharma' : 'Sarah Jenkins'}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#2563eb] text-white text-[10px] font-semibold tracking-wide shrink-0">
                  {userRole} Mode
                </span>
              </div>
              <span className="text-xs text-[#515f74] truncate">
                Academic Session 2024-25 • Term 2
              </span>
            </div>
          </div>

          <div className="flex bg-[#f2f3ff] p-1 rounded-xl shrink-0">
            <button
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                userRole === 'Admin'
                  ? 'bg-white text-[#004ac6] shadow-sm'
                  : 'text-[#515f74] hover:text-[#131b2e]'
              }`}
              type="button"
              onClick={() => onChangeRole('Admin')}
            >
              Admin
            </button>
            <button
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                userRole === 'Teacher'
                  ? 'bg-white text-[#004ac6] shadow-sm'
                  : 'text-[#515f74] hover:text-[#131b2e]'
              }`}
              type="button"
              onClick={() => onChangeRole('Teacher')}
            >
              Teacher
            </button>
          </div>
        </div>

        {/* Live Sync Alert Pill */}
        <div
          className="flex items-center justify-between bg-[#f2f3ff] px-3.5 py-2 rounded-xl gap-2 cursor-pointer hover:bg-[#eaedff] transition-colors"
          onClick={handleManualSync}
        >
          <div className="flex items-center gap-2 min-w-0">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#004ac6] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#004ac6]"></span>
            </span>
            <span className="font-mono text-[#515f74] text-[11px] truncate font-medium">
              DPS_Academic_2024.xlsx
            </span>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <span
              className={`material-symbols-outlined text-[#004ac6] text-[15px] ${
                isSyncing ? 'animate-spin' : ''
              }`}
            >
              {isSyncing ? 'sync' : 'cloud_done'}
            </span>
            <span className="text-[11px] font-semibold text-[#004ac6]">
              {isSyncing ? 'Syncing...' : 'Synced 2m ago'}
            </span>
          </div>
        </div>
      </div>

      {/* 4 Key Metric Cards (2x2 Grid) */}
      <div className="grid grid-cols-2 gap-3 w-full">
        {/* Stat 1: Total Students */}
        <div
          className="bg-white rounded-2xl p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)] border border-[#eaedff] flex flex-col justify-between cursor-pointer hover:border-[#2563eb]/40 transition-colors"
          onClick={() => onNavigate('students')}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#515f74]">Students</span>
            <div className="w-7 h-7 rounded-lg bg-[#f2f3ff] flex items-center justify-center text-[#004ac6]">
              <span className="material-symbols-outlined text-[18px]">groups</span>
            </div>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-extrabold text-[#131b2e] tracking-tight">142</div>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="material-symbols-outlined text-[#004ac6] text-[14px]">arrow_upward</span>
              <span className="text-xs text-[#004ac6] font-bold">+12</span>
              <span className="text-[11px] text-[#515f74]">this term</span>
            </div>
          </div>
        </div>

        {/* Stat 2: Teachers on Duty */}
        <div
          className="bg-white rounded-2xl p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)] border border-[#eaedff] flex flex-col justify-between cursor-pointer hover:border-[#2563eb]/40 transition-colors"
          onClick={() => onNavigate('teachers')}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#515f74]">Faculty Active</span>
            <div className="w-7 h-7 rounded-lg bg-[#f2f3ff] flex items-center justify-center text-[#515f74]">
              <span className="material-symbols-outlined text-[18px]">badge</span>
            </div>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-extrabold text-[#131b2e] tracking-tight">
              18 <span className="text-sm text-[#515f74] font-normal">/ 20</span>
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#515f74]"></span>
              <span className="text-[11px] text-[#515f74]">2 on scheduled leave</span>
            </div>
          </div>
        </div>

        {/* Stat 3: Today's Attendance */}
        <div
          className="bg-white rounded-2xl p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)] border border-[#eaedff] flex flex-col justify-between cursor-pointer hover:border-[#2563eb]/40 transition-colors"
          onClick={() => onNavigate('attendance')}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#515f74]">Today's Attn.</span>
            <div className="w-7 h-7 rounded-lg bg-[#f2f3ff] flex items-center justify-center text-[#2563eb]">
              <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
            </div>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-extrabold text-[#131b2e] tracking-tight">94.2%</div>
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#dbe1ff] text-[#003ea8] text-[10px] font-bold mt-1">
              <span>Optimal ≥ 90%</span>
            </div>
          </div>
        </div>

        {/* Stat 4: Avg Syllabus Covered */}
        <div
          className="bg-white rounded-2xl p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)] border border-[#eaedff] flex flex-col justify-between cursor-pointer hover:border-[#ba1a1a]/40 transition-colors"
          onClick={() => onNavigate('syllabus')}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#515f74]">Syllabus Avg</span>
            <div className="w-7 h-7 rounded-lg bg-[#ffdad6] flex items-center justify-center text-[#ba1a1a]">
              <span className="material-symbols-outlined text-[18px]">warning</span>
            </div>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-extrabold text-[#131b2e] tracking-tight">64.8%</div>
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#ba1a1a] text-[10px] font-bold mt-1">
              <span>1 Behind Target</span>
            </div>
          </div>
        </div>
      </div>

      {/* Immediate Operations Toolbar */}
      <div className="w-full flex flex-col space-y-2">
        <div className="flex items-center justify-between px-0.5">
          <span className="text-xs font-bold uppercase tracking-wider text-[#515f74]">
            Immediate Operations
          </span>
          <span className="text-xs text-[#515f74]">4 shortcuts</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            className="min-h-[44px] flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#2563eb] text-white shadow-sm hover:opacity-95 active:scale-[0.98] transition-all cursor-pointer font-semibold text-xs"
            type="button"
            onClick={() => onNavigate('attendance')}
          >
            <span className="material-symbols-outlined text-[18px]">fact_check</span>
            <span className="truncate">+ Mark Attn</span>
          </button>
          <button
            className="min-h-[44px] flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white text-[#131b2e] border border-[#eaedff] shadow-sm hover:bg-[#f2f3ff] active:scale-[0.98] transition-all cursor-pointer font-semibold text-xs"
            type="button"
            onClick={() => onNavigate('marks')}
          >
            <span className="material-symbols-outlined text-[#004ac6] text-[18px]">edit_square</span>
            <span className="truncate">+ UT-2 Marks</span>
          </button>
          <button
            className="min-h-[44px] flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white text-[#131b2e] border border-[#eaedff] shadow-sm hover:bg-[#f2f3ff] active:scale-[0.98] transition-all cursor-pointer font-semibold text-xs"
            type="button"
            onClick={handleManualSync}
          >
            <span
              className={`material-symbols-outlined text-[#5d55f3] text-[18px] ${
                isSyncing ? 'animate-spin' : ''
              }`}
            >
              sync
            </span>
            <span className="truncate">Sync to Sheets</span>
          </button>
          <button
            className="min-h-[44px] flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white text-[#131b2e] border border-[#eaedff] shadow-sm hover:bg-[#f2f3ff] active:scale-[0.98] transition-all cursor-pointer font-semibold text-xs"
            type="button"
            onClick={() => onNavigate('reports')}
          >
            <span className="material-symbols-outlined text-[#515f74] text-[18px]">download</span>
            <span className="truncate">Full Report</span>
          </button>
        </div>
      </div>

      {/* Weekly Attendance Trend Chart Card */}
      <div className="w-full bg-white rounded-2xl p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)] border border-[#eaedff] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-sm font-bold text-[#131b2e]">Weekly Attendance Trend</span>
            <span className="text-xs text-[#515f74]">Trailing 7 school days across all wings</span>
          </div>
          <div className="px-2.5 py-1 rounded-full bg-[#f2f3ff] text-[#004ac6] text-xs font-bold">
            94.2% Avg
          </div>
        </div>

        {/* Custom SVG Line Chart */}
        <div className="relative w-full h-44 pt-4 pb-2">
          <svg className="w-full h-32 overflow-visible" viewBox="0 0 320 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid horizontal lines */}
            <line x1="0" y1="20" x2="320" y2="20" stroke="#f2f3ff" strokeWidth="1" />
            <line x1="0" y1="50" x2="320" y2="50" stroke="#f2f3ff" strokeWidth="1" />
            <line x1="0" y1="80" x2="320" y2="80" stroke="#f2f3ff" strokeWidth="1" />

            {/* Area fill */}
            <path
              d="M 10 76 L 60 70 L 110 42 L 160 54 L 210 40 L 260 62 L 310 58 L 310 100 L 10 100 Z"
              fill="url(#trendGradient)"
            />

            {/* Main line */}
            <path
              d="M 10 76 L 60 70 L 110 42 L 160 54 L 210 40 L 260 62 L 310 58"
              fill="none"
              stroke="#2563eb"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Data points */}
            {[
              { x: 10, y: 76, idx: 0 },
              { x: 60, y: 70, idx: 1 },
              { x: 110, y: 42, idx: 2 },
              { x: 160, y: 54, idx: 3 },
              { x: 210, y: 40, idx: 4 },
              { x: 260, y: 62, idx: 5 },
              { x: 310, y: 58, idx: 6 },
            ].map((pt) => (
              <g
                key={pt.idx}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredTrendIndex(pt.idx)}
                onMouseLeave={() => setHoveredTrendIndex(null)}
              >
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={hoveredTrendIndex === pt.idx ? '6' : '3.5'}
                  fill="#2563eb"
                  stroke="#ffffff"
                  strokeWidth="2"
                  className="transition-all"
                />
              </g>
            ))}
          </svg>

          {/* X Axis Labels */}
          <div className="flex justify-between items-center text-[10px] text-[#515f74] font-medium pt-1 px-1">
            {trendData.map((item, idx) => (
              <span
                key={idx}
                className={`transition-colors ${
                  hoveredTrendIndex === idx ? 'text-[#004ac6] font-bold' : ''
                }`}
              >
                {item.day}
              </span>
            ))}
          </div>

          {/* Hover Tooltip */}
          {hoveredTrendIndex !== null && (
            <div className="absolute top-2 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-[#131b2e] text-white text-[11px] rounded-lg shadow-lg font-mono">
              {trendData[hoveredTrendIndex].day}: {trendData[hoveredTrendIndex].val}% Attendance
            </div>
          )}
        </div>
      </div>

      {/* Class-wise Syllabus Progress Bar Chart */}
      <div className="w-full bg-white rounded-2xl p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)] border border-[#eaedff] space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <span className="text-sm font-bold text-[#131b2e]">Syllabus Completion</span>
            <span className="text-xs text-[#515f74]">Benchmark threshold: 80% prior to Mid-Terms</span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#ba1a1a] text-[10px] font-bold shrink-0 animate-pulse">
            10-B Deficit
          </span>
        </div>

        {/* 3 Column Bar Chart */}
        <div className="relative w-full h-40 pt-2 flex items-end justify-around px-2">
          {/* 80% Benchmark dashed guide */}
          <div className="absolute inset-x-4 top-8 border-b border-dashed border-[#ba1a1a]/40 flex items-center justify-end">
            <span className="text-[10px] text-[#ba1a1a] font-bold bg-white px-1 -translate-y-2">
              80% Benchmark
            </span>
          </div>

          {/* Bar 1: Class 10-A */}
          <div className="flex flex-col items-center gap-1.5 z-10 w-20">
            <span className="text-xs font-bold text-[#131b2e]">78%</span>
            <div className="w-9 bg-[#2563eb] rounded-t-lg transition-all hover:opacity-90" style={{ height: '80px' }}></div>
            <span className="text-[11px] text-[#515f74] font-medium text-center">Class 10-A</span>
          </div>

          {/* Bar 2: Class 10-B */}
          <div className="flex flex-col items-center gap-1.5 z-10 w-24">
            <span className="text-xs font-bold text-[#ba1a1a]">62%</span>
            <div className="w-9 bg-[#ba1a1a] rounded-t-lg transition-all hover:opacity-90" style={{ height: '64px' }}></div>
            <span className="text-[11px] text-[#ba1a1a] font-bold text-center">Class 10-B (Alert)</span>
          </div>

          {/* Bar 3: Class 9-A */}
          <div className="flex flex-col items-center gap-1.5 z-10 w-20">
            <span className="text-xs font-bold text-[#4338d9]">85%</span>
            <div className="w-9 bg-[#4338d9] rounded-t-lg transition-all hover:opacity-90" style={{ height: '92px' }}></div>
            <span className="text-[11px] text-[#515f74] font-medium text-center">Class 9-A</span>
          </div>
        </div>

        {/* Alert Breakdown strip for Class 10-B */}
        <div className="w-full bg-[#ffdad6]/50 p-2.5 rounded-xl flex items-center gap-2.5 border border-[#ffdad6]">
          <span className="material-symbols-outlined text-[#ba1a1a] text-[20px] shrink-0">emergency</span>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold text-[#93000a] truncate">
              Class 10-B is lagging at 62% (Gap: 18%)
            </span>
            <span className="text-[11px] text-[#515f74] truncate">
              Physics and Organic Chemistry require 4 remedial periods
            </span>
          </div>
        </div>
      </div>

      {/* Quick Class Selector Tabs */}
      <div className="w-full bg-white rounded-2xl p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)] border border-[#eaedff] space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-[#131b2e]">Class Cohort Overview</span>
          <button
            className="text-xs text-[#004ac6] font-bold hover:underline cursor-pointer"
            onClick={() => onNavigate('marks')}
          >
            View Gradebook
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex bg-[#f2f3ff] p-1 rounded-xl gap-1">
          <button
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              selectedCohort === '10a'
                ? 'bg-white text-[#004ac6] shadow-sm'
                : 'text-[#515f74] hover:text-[#131b2e]'
            }`}
            onClick={() => setSelectedCohort('10a')}
            type="button"
          >
            Class 10-A
          </button>
          <button
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              selectedCohort === '10b'
                ? 'bg-white text-[#ba1a1a] shadow-sm'
                : 'text-[#515f74] hover:text-[#131b2e]'
            }`}
            onClick={() => setSelectedCohort('10b')}
            type="button"
          >
            Class 10-B
          </button>
          <button
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              selectedCohort === '9a'
                ? 'bg-white text-[#4338d9] shadow-sm'
                : 'text-[#515f74] hover:text-[#131b2e]'
            }`}
            onClick={() => setSelectedCohort('9a')}
            type="button"
          >
            Class 9-A
          </button>
        </div>

        {/* Tab 10-A Content */}
        {selectedCohort === '10a' && (
          <div className="flex flex-col space-y-2 pt-1 animate-in fade-in duration-200">
            <div className="flex items-center justify-between p-3 bg-[#f2f3ff] rounded-xl">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#dbe1ff] text-[#004ac6] flex items-center justify-center font-bold text-xs">
                  10A
                </div>
                <div>
                  <div className="text-xs font-bold text-[#131b2e]">Section Alpha • 48 Students</div>
                  <div className="text-[11px] text-[#515f74]">Class Teacher: Mrs. R. Kaul</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-[#004ac6] font-bold">96.8% Attn</div>
                <div className="text-[10px] text-[#515f74]">78% Syllabus</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-[#f2f3ff] p-2.5 rounded-xl">
                <span className="block text-base font-bold text-[#131b2e]">46</span>
                <span className="text-[10px] text-[#515f74]">Present Today</span>
              </div>
              <div className="bg-[#f2f3ff] p-2.5 rounded-xl">
                <span className="block text-base font-bold text-[#131b2e]">2</span>
                <span className="text-[10px] text-[#515f74]">Excused Leave</span>
              </div>
              <div className="bg-[#f2f3ff] p-2.5 rounded-xl">
                <span className="block text-base font-bold text-[#004ac6]">84.2</span>
                <span className="text-[10px] text-[#515f74]">Avg UT-1 Score</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 10-B Content */}
        {selectedCohort === '10b' && (
          <div className="flex flex-col space-y-2 pt-1 animate-in fade-in duration-200">
            <div className="flex items-center justify-between p-3 bg-[#ffdad6]/40 rounded-xl border border-[#ffdad6]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#ffdad6] text-[#93000a] flex items-center justify-center font-bold text-xs">
                  10B
                </div>
                <div>
                  <div className="text-xs font-bold text-[#131b2e]">Section Beta • 46 Students</div>
                  <div className="text-[11px] text-[#ba1a1a]">Attendance Deficit Watchlist</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-[#ba1a1a] font-bold">88.4% Attn</div>
                <div className="text-[10px] text-[#ba1a1a]">62% Syllabus</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-[#f2f3ff] p-2.5 rounded-xl">
                <span className="block text-base font-bold text-[#131b2e]">39</span>
                <span className="text-[10px] text-[#515f74]">Present Today</span>
              </div>
              <div className="bg-[#f2f3ff] p-2.5 rounded-xl">
                <span className="block text-base font-bold text-[#ba1a1a]">7</span>
                <span className="text-[10px] text-[#515f74]">Unexcused Absent</span>
              </div>
              <div className="bg-[#f2f3ff] p-2.5 rounded-xl">
                <span className="block text-base font-bold text-[#131b2e]">69.5</span>
                <span className="text-[10px] text-[#515f74]">Avg UT-1 Score</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 9-A Content */}
        {selectedCohort === '9a' && (
          <div className="flex flex-col space-y-2 pt-1 animate-in fade-in duration-200">
            <div className="flex items-center justify-between p-3 bg-[#f2f3ff] rounded-xl">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#d5e3fc] text-[#3a485b] flex items-center justify-center font-bold text-xs">
                  9A
                </div>
                <div>
                  <div className="text-xs font-bold text-[#131b2e]">Junior Section • 48 Students</div>
                  <div className="text-[11px] text-[#515f74]">Class Teacher: Mr. T. Roy</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-[#004ac6] font-bold">97.4% Attn</div>
                <div className="text-[10px] text-[#515f74]">85% Syllabus</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-[#f2f3ff] p-2.5 rounded-xl">
                <span className="block text-base font-bold text-[#131b2e]">47</span>
                <span className="text-[10px] text-[#515f74]">Present Today</span>
              </div>
              <div className="bg-[#f2f3ff] p-2.5 rounded-xl">
                <span className="block text-base font-bold text-[#131b2e]">1</span>
                <span className="text-[10px] text-[#515f74]">Medical Leave</span>
              </div>
              <div className="bg-[#f2f3ff] p-2.5 rounded-xl">
                <span className="block text-base font-bold text-[#004ac6]">88.1</span>
                <span className="text-[10px] text-[#515f74]">Avg UT-1 Score</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Critical Escalations Section */}
      <div className="w-full bg-white rounded-2xl p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)] border border-[#eaedff] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ba1a1a] animate-pulse"></span>
            <span className="text-sm font-bold text-[#131b2e]">Critical Escalations</span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#ba1a1a] text-[10px] font-bold">
            Action Required
          </span>
        </div>

        {/* Student Defaulter Item */}
        <div className="bg-[#f2f3ff] p-3 rounded-xl flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                className="w-10 h-10 rounded-full object-cover shrink-0 shadow-sm"
                alt="Aarav Patel"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOvzSGqoFd75BKMPqZe__ufZ0NZFcQKBpgKgoa-NUGurrFQf9lJMvOgzkbMNZePnkgJPqnFhD5fWsz7m3uEmJUyWP8-iLO8u3dZjS-C_g9LLIoA6AfY4FZj3RW9eRhmhTmrjG3_aK3LiIj66sjYLoPy42ILRfupUXEDfEv8g3tFVPAu7tocVFb2ie1MBzpDhYQmd5CpYkO9wFBGnARZpu_v2ff7YDxms_A2h4IJY4CH8albwppa46W5g"
              />
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-[#131b2e] truncate">Aarav Patel</span>
                <span className="text-[11px] text-[#515f74] truncate">Roll #24 • Class 10-B</span>
              </div>
            </div>
            <div className="px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#ba1a1a] text-xs font-bold shrink-0">
              68.0% Attn
            </div>
          </div>
          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-[#515f74] truncate">
              14 unexcused absences this month
            </span>
            <button
              className="min-h-[34px] px-3 py-1 bg-white text-[#131b2e] hover:bg-[#eaedff] rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5 transition-all cursor-pointer border border-[#e2e7ff]"
              onClick={() =>
                onShowToast(
                  'WhatsApp template generated for Aarav Patel guardian (+91 98201 54321)',
                  'chat'
                )
              }
              type="button"
            >
              <span className="material-symbols-outlined text-[#004ac6] text-[16px]">chat</span>
              <span>WhatsApp Parent</span>
            </button>
          </div>
        </div>

        {/* Pending Syllabus Urgent Chapter */}
        <div className="bg-[#f2f3ff] p-3 rounded-xl flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#eaedff] flex items-center justify-center text-[#515f74] shrink-0">
              <span className="material-symbols-outlined text-[20px]">science</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-[#131b2e] truncate">Physics • Ch 6 Optics</span>
              <span className="text-[11px] text-[#515f74] truncate">Class 10-B • 0/5 Lectures logged</span>
            </div>
          </div>
          <button
            className="min-h-[34px] px-3 py-1 bg-[#004ac6] text-white rounded-lg text-xs font-semibold shrink-0 shadow-sm hover:opacity-90 transition-all flex items-center gap-1 cursor-pointer"
            type="button"
            onClick={() => onShowToast('Remedial extra period scheduled for Tuesday 3:30 PM', 'event')}
          >
            <span className="material-symbols-outlined text-[15px]">event_repeat</span>
            <span>Reschedule</span>
          </button>
        </div>

        {/* Additional Academic Notice */}
        <div className="bg-[#f2f3ff] p-3 rounded-xl flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#eaedff] flex items-center justify-center text-[#515f74] shrink-0">
              <span className="material-symbols-outlined text-[20px]">assignment_turned_in</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-[#131b2e] truncate">UT-2 Marks Submission</span>
              <span className="text-[11px] text-[#515f74] truncate">English Core • 3 days till sheet freeze</span>
            </div>
          </div>
          <span className="text-xs text-[#515f74] font-semibold shrink-0">Due Oct 24</span>
        </div>
      </div>
    </div>
  );
};
