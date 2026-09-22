import React, { useState } from 'react';
import { INITIAL_MARKS_RECORDS } from '../../data/mockData';

interface StudentsDirectoryScreenProps {
  onShowToast: (message: string, icon?: string) => void;
}

export const StudentsDirectoryScreen: React.FC<StudentsDirectoryScreenProps> = ({
  onShowToast,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('All');

  const students = [
    ...INITIAL_MARKS_RECORDS,
    {
      id: 6,
      name: 'Aarav Sharma',
      rollNo: '10A06',
      rank: 5,
      score: 41,
      maxScore: 50,
      percent: 82,
      grade: 'A' as const,
      status: 'Passed' as const,
      avatarUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuA-oDyVhMWz9hRvZISFYjg6p4qTQ6LgH1Hl3c2lMQwWMqpRFzgPopeEs_JZxnYdoeguBlX4pqudPlvJ201IXQlmmCGyXS5KtlqUSXaKDthC65AXiVGQu5vgNIot6LDZqDTrpwWUH2hA9VayMAK5RINfryqB0nYlUKrBbTbFVZEktA5zvf9KK1f2oN8mvAm4MMqExHblck4gLmOlIgPhY2HUNo5HxS4KTZI4Detc06-M5uMC3K6EubSlWQ',
      remarks: 'Consistent homework submission and class participation.',
    },
    {
      id: 7,
      name: 'Ishita Sen',
      rollNo: '10A07',
      rank: 6,
      score: 45,
      maxScore: 50,
      percent: 90,
      grade: 'A+' as const,
      status: 'Passed' as const,
      avatarUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuC7OHd4cvzlYQcdolJBXHHTzNFzgwTousjUmcVk64WHIi4hbawhFljaEGlvBGL90TJ-xj1m5eQ6Xf--JB7JSO2ZtcepJcesu13vZuwy9XaBVW2lsqDIAcAB1YjfXIccX0tQLBUhJgWZKs77e48r6PfbX9tje-tv3nfYKBGYEgnJk0_9kzXT8uBp5HWoldWQ-Grcv2-ZxqmC3QJsH3LzoJgcRRXPi10SctjPuJSvw-odJlxW3Kqe_DMEZg',
      remarks: 'Excels in lab practicals and experimental physics.',
    },
  ];

  const filtered = students.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.rollNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto pt-2 pb-24 space-y-4 px-4">
      {/* Header card */}
      <section className="bg-white rounded-2xl p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)] border border-[#eaedff] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#dbe1ff] text-[#004ac6] flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">school</span>
            </div>
            <div>
              <span className="text-base font-bold text-[#131b2e] block leading-tight">
                Students Directory
              </span>
              <span className="text-xs text-[#515f74]">142 Enrolled Students across Sections</span>
            </div>
          </div>
          <button
            className="px-3 py-1.5 rounded-xl bg-[#004ac6] text-white text-xs font-bold hover:bg-[#003ea8] cursor-pointer"
            onClick={() => onShowToast('Student enrollment form opened', 'person_add')}
          >
            + Enroll Student
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex gap-2">
          <div className="flex-1 relative flex items-center bg-[#f2f3ff] rounded-xl px-3 border border-[#eaedff]">
            <span className="material-symbols-outlined text-[18px] text-[#515f74]">search</span>
            <input
              type="text"
              placeholder="Search by student name or roll..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 bg-transparent text-xs text-[#131b2e] px-2 focus:outline-none"
            />
          </div>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="bg-[#f2f3ff] text-xs font-bold text-[#131b2e] rounded-xl px-3 border border-[#eaedff] focus:outline-none cursor-pointer"
          >
            <option value="All">All Classes</option>
            <option value="10-A">Class 10-A</option>
            <option value="10-B">Class 10-B</option>
            <option value="9-A">Class 9-A</option>
          </select>
        </div>
      </section>

      {/* Students List */}
      <section className="space-y-2.5">
        {filtered.map((student) => (
          <div
            key={student.id}
            className="bg-white rounded-2xl p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)] border border-[#eaedff] flex items-center justify-between gap-3 hover:border-[#2563eb]/40 transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-11 h-11 rounded-full overflow-hidden bg-[#e2e7ff] shrink-0 shadow-sm">
                <img
                  className="w-full h-full object-cover"
                  alt={student.name}
                  src={student.avatarUrl}
                />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-[#131b2e] truncate">{student.name}</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#f2f3ff] text-[#004ac6] text-[10px] font-bold">
                    #{student.rank}
                  </span>
                </div>
                <span className="text-xs text-[#515f74] mt-0.5">
                  Roll: {student.rollNo} • Class 10-A • Score: {student.score}/50 ({student.percent}%)
                </span>
              </div>
            </div>

            <button
              className="min-h-[36px] px-3 bg-[#f2f3ff] text-[#004ac6] hover:bg-[#dbe1ff] rounded-xl text-xs font-bold shrink-0 transition-colors cursor-pointer"
              onClick={() => onShowToast(`Loaded complete academic dossier for ${student.name}`, 'visibility')}
              type="button"
            >
              View Profile
            </button>
          </div>
        ))}
      </section>
    </div>
  );
};
