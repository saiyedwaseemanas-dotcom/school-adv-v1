import React from 'react';
import { StudentMarkRecord } from '../../types';

interface ReportCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  student?: StudentMarkRecord;
  onShowToast: (message: string, icon?: string) => void;
}

export const ReportCardModal: React.FC<ReportCardModalProps> = ({
  isOpen,
  onClose,
  student,
  onShowToast,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    onClose();
    onShowToast('Transmitting document to campus printer...', 'print');
  };

  const studentName = student ? student.name : 'Ananya Iyer';
  const rollNo = student ? student.rollNo : '10A01';
  const currentScore = student ? student.score : 49;
  const currentGrade = student ? student.grade : 'A+';

  return (
    <div className="fixed inset-0 z-50 bg-[#283044]/40 backdrop-blur-sm flex items-center justify-center p-3 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] border border-[#eaedff]">
        {/* Modal Header */}
        <div className="p-4 bg-[#f2f3ff] flex items-center justify-between border-b border-[#eaedff]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#dbe1ff] flex items-center justify-center text-[#004ac6]">
              <span className="material-symbols-outlined text-[20px]">school</span>
            </div>
            <div>
              <span className="text-base font-bold text-[#131b2e] block leading-tight">
                Academic Progress Report
              </span>
              <span className="text-xs text-[#515f74]">Academic Session 2024-25</span>
            </div>
          </div>
          <button
            className="w-9 h-9 rounded-lg flex items-center justify-center text-[#434655] hover:bg-[#eaedff] transition-colors cursor-pointer"
            onClick={onClose}
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Scrollable Document Canvas */}
        <div className="p-4 overflow-y-auto space-y-4 text-xs">
          {/* Student Info Card */}
          <div className="p-3 rounded-xl bg-[#f2f3ff] grid grid-cols-2 gap-2 text-[#131b2e]">
            <div>
              <span className="font-semibold text-[#515f74]">Student:</span>{' '}
              <span className="font-bold">{studentName}</span>
            </div>
            <div>
              <span className="font-semibold text-[#515f74]">Roll No:</span>{' '}
              <span className="font-bold">{rollNo}</span>
            </div>
            <div>
              <span className="font-semibold text-[#515f74]">Class:</span> X - Sec A
            </div>
            <div>
              <span className="font-semibold text-[#515f74]">Attendance:</span>{' '}
              <span className="text-[#15803d] font-bold">98.4%</span>
            </div>
          </div>

          {/* Grade Summary Table */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[#515f74] px-1 font-semibold text-[11px]">
              <span>Subject Evaluation</span>
              <span>Marks (Max 50)</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#f2f3ff] flex justify-between items-center text-[#131b2e]">
              <span className="font-medium">Science (Theory & Practicals)</span>
              <span className="font-bold text-[#004ac6]">
                {currentScore} ({currentGrade})
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#f2f3ff] flex justify-between items-center text-[#131b2e]">
              <span className="font-medium">Mathematics</span>
              <span className="font-bold text-[#4338d9]">47 (A+)</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#f2f3ff] flex justify-between items-center text-[#131b2e]">
              <span className="font-medium">English Literature</span>
              <span className="font-bold text-[#515f74]">48 (A+)</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#f2f3ff] flex justify-between items-center text-[#131b2e]">
              <span className="font-medium">Social Studies</span>
              <span className="font-bold text-[#515f74]">44 (A)</span>
            </div>
          </div>

          {/* Teacher Remarks */}
          <div className="p-3 rounded-xl bg-[#f2f3ff] space-y-1">
            <span className="text-[11px] text-[#515f74] font-semibold block uppercase tracking-wide">
              Class Teacher's Remarks:
            </span>
            <p className="text-[#131b2e] italic leading-relaxed text-[12px]">
              "Exceptional conceptual clarity in analytical sciences. Consistent classroom leadership,
              diligent assignment submission, and exemplary peer mentorship throughout this term."
            </p>
          </div>

          {/* Signature Lines */}
          <div className="pt-3 grid grid-cols-2 gap-4 text-center">
            <div className="space-y-1">
              <div className="h-9 flex items-center justify-center text-[#004ac6] italic font-serif text-[15px]">
                S. Jenkins
              </div>
              <div className="h-0.5 w-full bg-[#c3c6d7]/50"></div>
              <span className="text-[11px] text-[#515f74] font-medium block">
                Class Teacher Signature
              </span>
            </div>
            <div className="space-y-1">
              <div className="h-9 flex items-center justify-center text-[#4338d9] italic font-serif text-[15px]">
                M. R. Principal
              </div>
              <div className="h-0.5 w-full bg-[#c3c6d7]/50"></div>
              <span className="text-[11px] text-[#515f74] font-medium block">
                Principal Seal
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-[#f2f3ff] flex items-center justify-end gap-2 border-t border-[#eaedff]">
          <button
            className="px-4 py-2 rounded-lg text-[#515f74] hover:bg-[#eaedff] text-xs font-semibold cursor-pointer"
            onClick={onClose}
            type="button"
          >
            Close
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-[#004ac6] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm hover:bg-[#003ea8] transition-colors cursor-pointer"
            onClick={handlePrint}
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">print</span>
            <span>Print Card</span>
          </button>
        </div>
      </div>
    </div>
  );
};
