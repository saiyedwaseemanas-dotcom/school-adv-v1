import React, { useState, useEffect } from 'react';
import { SyllabusChapter } from '../../types';

interface ChapterEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  chapter: SyllabusChapter | null;
  onSave: (updated: SyllabusChapter) => void;
}

export const ChapterEditModal: React.FC<ChapterEditModalProps> = ({
  isOpen,
  onClose,
  chapter,
  onSave,
}) => {
  const [status, setStatus] = useState<'Completed' | 'In Progress' | 'Not Started'>('Not Started');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [homework, setHomework] = useState('');

  useEffect(() => {
    if (chapter) {
      setStatus(chapter.status);
      setDate(chapter.finishedDate || '');
      setNotes(chapter.notes || '');
      setHomework(chapter.homework || '');
    }
  }, [chapter]);

  if (!isOpen || !chapter) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...chapter,
      status,
      finishedDate: date,
      notes,
      homework,
      periodsConducted:
        status === 'Completed'
          ? chapter.periodsAllotted
          : status === 'In Progress'
          ? Math.max(1, Math.floor(chapter.periodsAllotted * 0.6))
          : 0,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-[#283044]/40 backdrop-blur-sm z-50 flex items-end justify-center animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg rounded-t-3xl shadow-[0_-8px_30px_rgba(0,0,0,0.12)] p-5 flex flex-col gap-4 animate-in slide-in-from-bottom duration-300 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag Handle & Top Controls */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-1.5 rounded-full bg-[#dae2fd]"></div>
          <div className="w-full flex items-center justify-between pt-1">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-[#e2e7ff] text-[#004ac6] font-bold font-mono text-sm flex items-center justify-center">
                {chapter.chapterNum < 10 ? `0${chapter.chapterNum}` : chapter.chapterNum}
              </span>
              <span className="text-base font-bold text-[#131b2e]">{chapter.title}</span>
            </div>
            <button
              className="w-9 h-9 flex items-center justify-center rounded-full text-[#434655] hover:bg-[#eaedff] transition-colors cursor-pointer"
              onClick={onClose}
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* Edit Form */}
        <form className="flex flex-col gap-3.5" onSubmit={handleSubmit}>
          {/* Status Dropdown */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#515f74]">Teaching Status</label>
            <div className="relative flex items-center">
              <select
                className="w-full h-11 bg-[#f2f3ff] text-[#131b2e] text-sm font-semibold rounded-xl px-3.5 appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#004ac6] cursor-pointer"
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value as 'Completed' | 'In Progress' | 'Not Started')
                }
              >
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
                <option value="Not Started">Not Started</option>
              </select>
              <span className="material-symbols-outlined text-[20px] text-[#515f74] pointer-events-none absolute right-3">
                expand_more
              </span>
            </div>
          </div>

          {/* Completion Date */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#515f74]">
              Completion / Target Date
            </label>
            <input
              className="w-full h-11 bg-[#f2f3ff] text-[#131b2e] text-sm rounded-xl px-3.5 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#004ac6]"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          {/* Teacher Notes */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#515f74]">
              Teacher Notes & Observations
            </label>
            <textarea
              className="w-full bg-[#f2f3ff] text-[#131b2e] text-sm rounded-xl p-3 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#004ac6] resize-none"
              placeholder="e.g. Geometrical proofs clarified with worksheet 3..."
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          {/* Homework */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#515f74]">
              Assigned Homework or Task
            </label>
            <input
              className="w-full h-11 bg-[#f2f3ff] text-[#131b2e] text-sm rounded-xl px-3.5 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#004ac6]"
              placeholder="e.g. NCERT Ex 7.2 Questions 1-5"
              type="text"
              value={homework}
              onChange={(e) => setHomework(e.target.value)}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              className="flex-1 h-12 rounded-xl bg-[#eaedff] text-sm text-[#434655] hover:bg-[#dae2fd] transition-colors font-semibold cursor-pointer"
              onClick={onClose}
              type="button"
            >
              Cancel
            </button>
            <button
              className="flex-1 h-12 rounded-xl bg-[#004ac6] text-white text-sm hover:bg-[#003ea8] transition-colors font-bold shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
              type="submit"
            >
              <span className="material-symbols-outlined text-[18px]">check</span>
              <span>Update Tracker</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
