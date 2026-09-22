import React from 'react';
import { FACULTY_MEMBERS } from '../../data/mockData';

interface FacultyScreenProps {
  onShowToast: (message: string, icon?: string) => void;
}

export const FacultyScreen: React.FC<FacultyScreenProps> = ({ onShowToast }) => {
  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto pt-2 pb-24 space-y-4 px-4">
      {/* Header card */}
      <section className="bg-white rounded-2xl p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)] border border-[#eaedff] space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#dbe1ff] text-[#004ac6] flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">badge</span>
            </div>
            <div>
              <span className="text-base font-bold text-[#131b2e] block leading-tight">
                Faculty & Staff Directory
              </span>
              <span className="text-xs text-[#515f74]">20 Active Department Educators</span>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-[#dcfce7] text-[#15803d] text-xs font-bold">
            18 Present Today
          </span>
        </div>
      </section>

      {/* Faculty List */}
      <section className="space-y-2.5">
        {FACULTY_MEMBERS.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-2xl p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)] border border-[#eaedff] flex items-center justify-between gap-3 hover:border-[#2563eb]/40 transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              {member.avatarUrl ? (
                <div className="w-11 h-11 rounded-full overflow-hidden bg-[#e2e7ff] shrink-0 shadow-sm ring-1 ring-[#c3c6d7]">
                  <img
                    className="w-full h-full object-cover"
                    alt={member.name}
                    src={member.avatarUrl}
                  />
                </div>
              ) : (
                <div className="w-11 h-11 rounded-full bg-[#f2f3ff] text-[#004ac6] flex items-center justify-center font-bold text-xs shrink-0">
                  {member.name.slice(0, 2).toUpperCase()}
                </div>
              )}
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-bold text-[#131b2e] truncate">{member.name}</span>
                <span className="text-xs text-[#515f74] mt-0.5">
                  {member.title} • {member.department}
                </span>
                <span className="text-[11px] text-[#004ac6] font-medium mt-0.5">
                  ID: #{member.id} • Room: {member.room || 'Main Block'}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1.5 shrink-0">
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  member.status === 'Present'
                    ? 'bg-[#dcfce7] text-[#15803d]'
                    : 'bg-[#e2dfff] text-[#3323cc]'
                }`}
              >
                {member.status}
              </span>
              <button
                className="text-xs text-[#004ac6] font-bold hover:underline cursor-pointer"
                onClick={() => onShowToast(`Duty timetable dispatched to ${member.name}`, 'schedule')}
                type="button"
              >
                Timetable
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
