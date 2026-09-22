import React, { useState } from 'react';
import { INITIAL_MARKS_RECORDS } from '../../data/mockData';
import { ReportCardModal } from '../modals/ReportCardModal';

interface ReportsScreenProps {
  onShowToast: (message: string, icon?: string) => void;
}

export const ReportsScreen: React.FC<ReportsScreenProps> = ({ onShowToast }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(INITIAL_MARKS_RECORDS[0]);

  const reportPacks = [
    {
      title: 'Term 1 Mid-Term Comprehensive Dossier',
      desc: 'Aggregated report card with marks, rank, teacher remarks, and attendance %.',
      badge: 'Board Standard',
      icon: 'description',
    },
    {
      title: 'Defaulter Attendance Notice Pack',
      desc: 'Official SMS & physical letters for guardians of students under 75% attendance.',
      badge: 'Action Required',
      icon: 'warning',
    },
    {
      title: 'Curriculum Velocity & Pacing Audit',
      desc: 'Comparative department completion metrics against the Nov 15 Mid-Term milestone.',
      badge: 'Faculty Admin',
      icon: 'insights',
    },
  ];

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto pt-2 pb-24 space-y-4 px-4">
      {/* Header */}
      <section className="bg-white rounded-2xl p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)] border border-[#eaedff] space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#dbe1ff] text-[#004ac6] flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">assessment</span>
            </div>
            <div>
              <span className="text-base font-bold text-[#131b2e] block leading-tight">
                Institutional Reports & Transcripts
              </span>
              <span className="text-xs text-[#515f74]">Official academic certificates and audits</span>
            </div>
          </div>
        </div>
      </section>

      {/* Report Packs */}
      <section className="space-y-3">
        {reportPacks.map((pack, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)] border border-[#eaedff] flex flex-col gap-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#f2f3ff] text-[#004ac6] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[22px]">{pack.icon}</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#131b2e]">{pack.title}</h3>
                  <span className="text-xs text-[#515f74]">{pack.desc}</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#eaedff] text-[#004ac6] text-[10px] font-bold shrink-0">
                {pack.badge}
              </span>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-[#eaedff]">
              <button
                className="text-xs font-bold text-[#004ac6] hover:underline flex items-center gap-1 cursor-pointer"
                onClick={() => {
                  setSelectedStudent(INITIAL_MARKS_RECORDS[0]);
                  setIsModalOpen(true);
                }}
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">visibility</span>
                <span>Preview Template</span>
              </button>
              <button
                className="px-3 py-1.5 bg-[#004ac6] text-white rounded-xl text-xs font-bold hover:bg-[#003ea8] transition-colors cursor-pointer flex items-center gap-1.5"
                onClick={() => onShowToast(`Generated batch PDF for "${pack.title}"`, 'download')}
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">print</span>
                <span>Generate Batch PDF</span>
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Modal */}
      <ReportCardModal
        isOpen={isModalOpen}
        student={selectedStudent}
        onClose={() => setIsModalOpen(false)}
        onShowToast={onShowToast}
      />
    </div>
  );
};
