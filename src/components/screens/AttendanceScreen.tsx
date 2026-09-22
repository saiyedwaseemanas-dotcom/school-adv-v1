import React, { useState } from 'react';
import { StudentAttendanceRecord, AttendanceStatus } from '../../types';
import { INITIAL_ATTENDANCE_RECORDS, FACULTY_MEMBERS } from '../../data/mockData';

interface AttendanceScreenProps {
  onShowToast: (message: string, icon?: string) => void;
}

export const AttendanceScreen: React.FC<AttendanceScreenProps> = ({ onShowToast }) => {
  const [activeTab, setActiveTab] = useState<'student' | 'faculty'>('student');
  const [selectedClass, setSelectedClass] = useState('Class 10 - A');
  const [sessionDate, setSessionDate] = useState('2024-10-24');
  const [sessionMode, setSessionMode] = useState<'full' | 'period'>('full');
  const [isSaving, setIsSaving] = useState(false);

  // Initialize records
  const [students, setStudents] = useState<StudentAttendanceRecord[]>(() => {
    // Generate up to 10 visible students while maintaining stats corresponding to 40 total
    const extra: StudentAttendanceRecord[] = [
      {
        id: 5,
        name: 'Kabir Mehta',
        rollNo: '05',
        section: 'Sec 10A',
        attendancePercent: 96,
        status: 'P',
        parentPhone: '+91 98110 55432',
        avatarUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuAL00CKkRJEKRA9x35BYned7DjgyIPecoLl3xAsodNNmPps83pB5erd9dLgJN4s4iRjZtnxkn16AFLhfze4afg4Qpk7gaUn4xKaU_JL3ak6JENwOVc-0G4TIOdN4ts3XX87_zxl5d35ObxfTLbBZDo-e0l5YfpWra65RBfr8fYeKfxtaXVeG4ckvZ8Ri8i2_7EVMCRMbNdSwI8hiLd1TkacurbNjZ9AfLM0fOTmc2LRfberzNRfEYiUbg',
      },
      {
        id: 6,
        name: 'Rhea Sen',
        rollNo: '06',
        section: 'Sec 10A',
        attendancePercent: 92,
        status: 'P',
        parentPhone: '+91 98200 12398',
        avatarUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuCgX03Ju9uifP_EwggPCm8vO4Ekdrx7-yxZSNZhbrHE8A5nj0QIv34-P4AnW5mcngb4q4D-18M2Eqyzfwyufs8QLEEnj_QpBwvECpUBETd_K2QIJOVvbFkjxDaO2fCGK3hV6QZRg8HvpBlBGW795qxYe97ubTAaCrZmq7-WRL1HR9EWAu1iy3m2gy3bO5S2A0w8SJq_y9YowxDd9CQ4MyhAMMF7OQlm3xtusGNtBK8Rkzfmf5L4MP3rIw',
      },
    ];
    return [...INITIAL_ATTENDANCE_RECORDS, ...extra];
  });

  // Calculate live counts
  // Total cohort is 40; visible student modifications adjust live counts
  const presentCount =
    32 + students.filter((s) => s.status === 'P').length - 2; // base offset to match 36 when initial
  const absentCount = students.filter((s) => s.status === 'A').length + 1; // 2 initial
  const leaveCount = students.filter((s) => s.status === 'L').length; // 1 initial
  const halfDayCount = students.filter((s) => s.status === 'HD').length; // 1 initial

  const handleStatusChange = (id: number, status: AttendanceStatus) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status } : s))
    );
  };

  const handleMarkAllPresent = () => {
    setStudents((prev) => prev.map((s) => ({ ...s, status: 'P' })));
    onShowToast('All 40 Students marked Present for today!', 'done_all');
  };

  const handleSaveAndSync = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      onShowToast('Attendance register saved & synchronized to Google Sheets!', 'cloud_sync');
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full pb-24 max-w-4xl mx-auto pt-2">
      {/* Interactive View Switcher Pill */}
      <div className="px-4 pb-2">
        <div className="bg-[#f2f3ff] p-1 rounded-full flex gap-1 shadow-sm border border-[#eaedff]">
          <button
            className={`flex-1 py-2 px-3 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'student'
                ? 'bg-white text-[#004ac6] shadow-sm'
                : 'text-[#515f74] hover:text-[#131b2e]'
            }`}
            onClick={() => setActiveTab('student')}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">school</span>
            <span>Student Roll</span>
          </button>
          <button
            className={`flex-1 py-2 px-3 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'faculty'
                ? 'bg-white text-[#004ac6] shadow-sm'
                : 'text-[#515f74] hover:text-[#131b2e]'
            }`}
            onClick={() => setActiveTab('faculty')}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">badge</span>
            <span>Faculty Check-in</span>
          </button>
        </div>
      </div>

      {activeTab === 'student' ? (
        <div className="flex flex-col space-y-3.5">
          {/* Academic Filters Bento */}
          <div className="px-4">
            <div className="bg-white rounded-2xl p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)] border border-[#eaedff] space-y-3">
              <div className="grid grid-cols-2 gap-3">
                {/* Class Selector */}
                <div className="bg-[#f2f3ff] rounded-xl p-2 px-3 flex flex-col justify-center">
                  <span className="text-[10px] text-[#515f74] uppercase font-bold tracking-wider">
                    Grade & Division
                  </span>
                  <div className="flex items-center justify-between">
                    <select
                      className="appearance-none bg-transparent text-sm font-bold text-[#131b2e] focus:outline-none cursor-pointer w-full"
                      value={selectedClass}
                      onChange={(e) => {
                        setSelectedClass(e.target.value);
                        onShowToast(`Loaded ${e.target.value} roll list`);
                      }}
                    >
                      <option value="Class 10 - A">Class 10 - A</option>
                      <option value="Class 10 - B">Class 10 - B</option>
                      <option value="Class 9 - A">Class 9 - A</option>
                      <option value="Class 11 - Sci">Class 11 - Sci</option>
                    </select>
                    <span className="material-symbols-outlined text-[18px] text-[#004ac6] pointer-events-none">
                      expand_more
                    </span>
                  </div>
                </div>

                {/* Session Date */}
                <div className="bg-[#f2f3ff] rounded-xl p-2 px-3 flex flex-col justify-center">
                  <span className="text-[10px] text-[#515f74] uppercase font-bold tracking-wider">
                    Session Date
                  </span>
                  <div className="flex items-center justify-between">
                    <input
                      type="date"
                      value={sessionDate}
                      onChange={(e) => setSessionDate(e.target.value)}
                      className="bg-transparent text-xs font-bold text-[#131b2e] focus:outline-none cursor-pointer w-full"
                    />
                    <span className="material-symbols-outlined text-[18px] text-[#004ac6] pointer-events-none">
                      calendar_today
                    </span>
                  </div>
                </div>
              </div>

              {/* Mode Toggle & Period Info */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-1 bg-[#eaedff] p-0.5 rounded-lg">
                  <button
                    className={`py-1 px-3 rounded-md text-xs font-bold transition-all cursor-pointer ${
                      sessionMode === 'full'
                        ? 'bg-white text-[#004ac6] shadow-xs'
                        : 'text-[#515f74] hover:text-[#131b2e]'
                    }`}
                    type="button"
                    onClick={() => {
                      setSessionMode('full');
                      onShowToast('Switched to Full Day Register');
                    }}
                  >
                    Full Day
                  </button>
                  <button
                    className={`py-1 px-3 rounded-md text-xs font-bold transition-all cursor-pointer ${
                      sessionMode === 'period'
                        ? 'bg-white text-[#004ac6] shadow-xs'
                        : 'text-[#515f74] hover:text-[#131b2e]'
                    }`}
                    type="button"
                    onClick={() => {
                      setSessionMode('period');
                      onShowToast('Switched to Period 3 (10:15 - 11:00 AM)');
                    }}
                  >
                    Period 3
                  </button>
                </div>
                <span className="text-xs text-[#515f74] font-medium flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#2563eb] inline-block animate-pulse"></span>
                  Roll Count: 40
                </span>
              </div>
            </div>
          </div>

          {/* Live Metrics Counter Strip */}
          <div className="px-4 overflow-x-auto scrollbar-none">
            <div className="flex gap-2 min-w-full">
              <div className="flex-1 min-w-[70px] bg-white rounded-xl p-2.5 flex flex-col items-center justify-center shadow-sm border border-[#eaedff]">
                <span className="text-[10px] text-[#515f74] font-semibold">Total</span>
                <span className="text-base font-bold text-[#131b2e]">40</span>
              </div>
              <div className="flex-1 min-w-[70px] bg-white rounded-xl p-2.5 flex flex-col items-center justify-center shadow-sm border border-[#eaedff]">
                <span className="text-[10px] text-[#15803d] font-semibold">Present</span>
                <span className="text-base font-bold text-[#15803d]">{presentCount}</span>
              </div>
              <div className="flex-1 min-w-[70px] bg-white rounded-xl p-2.5 flex flex-col items-center justify-center shadow-sm border border-[#eaedff]">
                <span className="text-[10px] text-[#ba1a1a] font-semibold">Absent</span>
                <span className="text-base font-bold text-[#ba1a1a]">{absentCount}</span>
              </div>
              <div className="flex-1 min-w-[70px] bg-white rounded-xl p-2.5 flex flex-col items-center justify-center shadow-sm border border-[#eaedff]">
                <span className="text-[10px] text-[#4338d9] font-semibold">Leave</span>
                <span className="text-base font-bold text-[#4338d9]">{leaveCount}</span>
              </div>
              <div className="flex-1 min-w-[70px] bg-white rounded-xl p-2.5 flex flex-col items-center justify-center shadow-sm border border-[#eaedff]">
                <span className="text-[10px] text-[#515f74] font-semibold">Half Day</span>
                <span className="text-base font-bold text-[#515f74]">{halfDayCount}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions Horizon */}
          <div className="px-4">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-0.5">
              <button
                className="min-h-[44px] shrink-0 bg-[#2563eb] text-white text-xs font-bold px-4 rounded-xl flex items-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer hover:bg-[#1d4ed8]"
                onClick={handleMarkAllPresent}
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">done_all</span>
                <span>Mark All Present</span>
              </button>
              <button
                className="min-h-[44px] shrink-0 bg-white text-[#131b2e] border border-[#eaedff] text-xs font-bold px-4 rounded-xl flex items-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer hover:bg-[#f2f3ff]"
                onClick={() =>
                  onShowToast(
                    `WhatsApp absentee alerts triggered for ${absentCount} guardians`,
                    'chat'
                  )
                }
                type="button"
              >
                <span className="material-symbols-outlined text-[18px] text-[#004ac6]">chat</span>
                <span>Notify Absentees</span>
              </button>
              <button
                className="min-h-[44px] w-11 shrink-0 bg-white text-[#515f74] border border-[#eaedff] rounded-xl flex items-center justify-center shadow-sm cursor-pointer hover:bg-[#f2f3ff]"
                onClick={() =>
                  onShowToast('Exporting attendance roll to Google Spreadsheet...', 'download')
                }
                type="button"
                aria-label="Export Data"
              >
                <span className="material-symbols-outlined text-[18px]">file_download</span>
              </button>
            </div>
          </div>

          {/* Register Header */}
          <div className="px-4 flex items-center justify-between text-[#515f74] pt-1">
            <span className="text-xs uppercase tracking-wider font-bold">Class Roster (40)</span>
            <div className="flex items-center gap-1 text-xs font-medium cursor-pointer hover:text-[#131b2e]">
              <span>Sort by Roll</span>
              <span className="material-symbols-outlined text-[16px]">swap_vert</span>
            </div>
          </div>

          {/* Student Register List */}
          <div className="px-4 space-y-2.5">
            {students.map((student) => (
              <div
                key={student.id}
                className="bg-white rounded-2xl p-3.5 shadow-[0_1px_4px_rgba(0,0,0,0.04)] border border-[#eaedff] flex flex-col gap-2.5 transition-all hover:border-[#2563eb]/30"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-8 h-8 rounded-lg bg-[#f2f3ff] flex items-center justify-center font-mono text-xs font-bold text-[#004ac6] shrink-0">
                      {student.rollNo}
                    </span>
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-[#e2e7ff] shrink-0 shadow-sm">
                      <img
                        className="w-full h-full object-cover"
                        alt={student.name}
                        src={student.avatarUrl}
                      />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-bold text-[#131b2e] truncate">
                        {student.name}
                      </span>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        {student.isDefaulter ? (
                          <span className="px-2 py-0.5 bg-[#ffdad6] text-[#ba1a1a] rounded-full text-[10px] font-bold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#ba1a1a] animate-pulse"></span>
                            Defaulter: {student.attendancePercent}%
                          </span>
                        ) : (
                          <>
                            <span className="text-xs text-[#515f74]">
                              Att: {student.attendancePercent}%
                            </span>
                            <span className="w-1 h-1 rounded-full bg-[#c3c6d7]"></span>
                            <span className="text-xs text-[#004ac6] font-medium">
                              {student.section}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp Direct */}
                  <button
                    aria-label={`WhatsApp parent of ${student.name}`}
                    className="min-h-[44px] min-w-[44px] flex items-center justify-center text-[#2563eb] hover:bg-[#eaedff] rounded-xl transition-colors cursor-pointer"
                    onClick={() =>
                      onShowToast(
                        `Opening WhatsApp dispatch for ${student.name} (${student.parentPhone})`,
                        'chat'
                      )
                    }
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[20px]">sms</span>
                  </button>
                </div>

                {/* 4-State Attendance Buttons */}
                <div className="grid grid-cols-4 gap-1.5 bg-[#f2f3ff] p-1 rounded-xl">
                  {/* P */}
                  <button
                    className={`min-h-[40px] rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      student.status === 'P'
                        ? 'bg-[#dcfce7] text-[#15803d] shadow-sm font-extrabold ring-1 ring-[#15803d]/30'
                        : 'text-[#515f74] hover:bg-white'
                    }`}
                    onClick={() => handleStatusChange(student.id, 'P')}
                    type="button"
                  >
                    P
                  </button>

                  {/* A */}
                  <button
                    className={`min-h-[40px] rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      student.status === 'A'
                        ? 'bg-[#ffdad6] text-[#ba1a1a] shadow-sm font-extrabold ring-1 ring-[#ba1a1a]/30'
                        : 'text-[#515f74] hover:bg-white'
                    }`}
                    onClick={() => handleStatusChange(student.id, 'A')}
                    type="button"
                  >
                    A
                  </button>

                  {/* L */}
                  <button
                    className={`min-h-[40px] rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      student.status === 'L'
                        ? 'bg-[#e2dfff] text-[#3323cc] shadow-sm font-extrabold ring-1 ring-[#3323cc]/30'
                        : 'text-[#515f74] hover:bg-white'
                    }`}
                    onClick={() => handleStatusChange(student.id, 'L')}
                    type="button"
                  >
                    L
                  </button>

                  {/* HD */}
                  <button
                    className={`min-h-[40px] rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      student.status === 'HD'
                        ? 'bg-[#dbe1ff] text-[#003ea8] shadow-sm font-extrabold ring-1 ring-[#003ea8]/30'
                        : 'text-[#515f74] hover:bg-white'
                    }`}
                    onClick={() => handleStatusChange(student.id, 'HD')}
                    type="button"
                  >
                    HD
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Sticky Batch Action Footer */}
          <div className="fixed bottom-16 left-0 right-0 p-3 z-30 pointer-events-none">
            <div className="max-w-md mx-auto pointer-events-auto">
              <button
                className="w-full min-h-[48px] bg-[#2563eb] text-white rounded-2xl shadow-xl hover:bg-[#1d4ed8] flex items-center justify-between px-5 text-sm font-bold active:scale-98 transition-all cursor-pointer"
                onClick={handleSaveAndSync}
                type="button"
              >
                <span className="flex items-center gap-2">
                  <span
                    className={`material-symbols-outlined text-[20px] ${
                      isSaving ? 'animate-spin' : ''
                    }`}
                  >
                    cloud_sync
                  </span>
                  <span>{isSaving ? 'Syncing with Cloud...' : 'Save & Sync Register'}</span>
                </span>
                <span className="bg-white/20 px-2.5 py-0.5 rounded-full text-xs font-bold font-mono">
                  {presentCount}/40 Present
                </span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Faculty Check-in View */
        <div className="flex flex-col space-y-3.5 animate-in fade-in duration-200">
          {/* Faculty Profile Summary */}
          <div className="px-4">
            <div className="bg-white rounded-2xl p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)] border border-[#eaedff] space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-[#e2e7ff] shrink-0 shadow-sm ring-1 ring-[#c3c6d7]">
                  <img
                    className="w-full h-full object-cover"
                    alt="Sarah Jenkins"
                    src={FACULTY_MEMBERS[0].avatarUrl}
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-bold text-[#131b2e]">
                    {FACULTY_MEMBERS[0].name}
                  </span>
                  <span className="text-xs text-[#515f74]">
                    {FACULTY_MEMBERS[0].title} • ID #{FACULTY_MEMBERS[0].id}
                  </span>
                </div>
              </div>

              {/* Punch Timers Bento */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="bg-[#f2f3ff] rounded-xl p-3 flex flex-col">
                  <span className="text-[10px] text-[#515f74] uppercase font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-[#004ac6]">
                      login
                    </span>{' '}
                    Check-In
                  </span>
                  <span className="text-base font-extrabold text-[#131b2e] mt-1">
                    {FACULTY_MEMBERS[0].checkInTime}
                  </span>
                  <span className="text-[11px] text-[#15803d] font-semibold mt-0.5">
                    Gate 2 Biometric • On Time
                  </span>
                </div>
                <div className="bg-[#f2f3ff] rounded-xl p-3 flex flex-col">
                  <span className="text-[10px] text-[#515f74] uppercase font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-[#4338d9]">
                      logout
                    </span>{' '}
                    Check-Out
                  </span>
                  <span className="text-base font-extrabold text-[#131b2e] mt-1">
                    {FACULTY_MEMBERS[0].checkOutTime}
                  </span>
                  <span className="text-[11px] text-[#515f74] mt-0.5">Scheduled Regular</span>
                </div>
              </div>

              <button
                className="w-full min-h-[44px] bg-[#004ac6] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-[#003ea8] active:scale-98 transition-all cursor-pointer shadow-sm"
                onClick={() =>
                  onShowToast(
                    'Geofence Verified: Biometric Punch Logged at 08:02 AM (Campus Gateway)',
                    'fingerprint'
                  )
                }
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">fingerprint</span>
                <span>Register Self Geofence Punch</span>
              </button>
            </div>
          </div>

          {/* Teacher Leave Balance Ledger */}
          <div className="px-4">
            <div className="bg-white rounded-2xl p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)] border border-[#eaedff] space-y-2">
              <span className="text-xs text-[#515f74] uppercase tracking-wider font-bold">
                Allocated Leave Entitlement
              </span>
              <div className="grid grid-cols-3 gap-2 pt-1">
                <div className="bg-[#f2f3ff] rounded-xl p-2.5 text-center flex flex-col">
                  <span className="text-[11px] text-[#515f74] font-medium">Casual (CL)</span>
                  <span className="text-lg font-bold text-[#131b2e]">
                    04<span className="text-xs font-normal text-[#515f74]">/08</span>
                  </span>
                </div>
                <div className="bg-[#f2f3ff] rounded-xl p-2.5 text-center flex flex-col">
                  <span className="text-[11px] text-[#515f74] font-medium">Sick (SL)</span>
                  <span className="text-lg font-bold text-[#131b2e]">
                    06<span className="text-xs font-normal text-[#515f74]">/10</span>
                  </span>
                </div>
                <div className="bg-[#f2f3ff] rounded-xl p-2.5 text-center flex flex-col">
                  <span className="text-[11px] text-[#515f74] font-medium">Earned (EL)</span>
                  <span className="text-lg font-bold text-[#131b2e]">
                    12<span className="text-xs font-normal text-[#515f74]">/15</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Department Faculty Daily Duty Status */}
          <div className="px-4 space-y-2">
            <span className="text-xs text-[#515f74] uppercase tracking-wider font-bold px-1">
              Mathematics Dept Staff Today
            </span>
            {FACULTY_MEMBERS.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-2xl p-3 shadow-sm border border-[#eaedff] flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#f2f3ff] flex items-center justify-center font-bold text-xs text-[#004ac6]">
                    {member.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#131b2e]">{member.name}</span>
                    <span className="text-[11px] text-[#515f74]">
                      {member.status === 'Present'
                        ? `In: ${member.checkInTime} • ${member.room}`
                        : 'Casual Leave (CL) • Approved'}
                    </span>
                  </div>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                    member.status === 'Present'
                      ? 'bg-[#dcfce7] text-[#15803d]'
                      : 'bg-[#e2dfff] text-[#3323cc]'
                  }`}
                >
                  {member.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
