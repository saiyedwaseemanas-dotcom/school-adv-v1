import React, { useState } from 'react';
import { SyllabusChapter } from '../../types';
import { INITIAL_SYLLABUS_CHAPTERS } from '../../data/mockData';
import { ChapterEditModal } from '../modals/ChapterEditModal';

interface SyllabusScreenProps {
  onShowToast: (message: string, icon?: string) => void;
}

export const SyllabusScreen: React.FC<SyllabusScreenProps> = ({ onShowToast }) => {
  const [selectedClass, setSelectedClass] = useState('10-A');
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');
  const [chapters, setChapters] = useState<SyllabusChapter[]>(INITIAL_SYLLABUS_CHAPTERS);
  const [isSyncing, setIsSyncing] = useState(false);
  const [editingChapter, setEditingChapter] = useState<SyllabusChapter | null>(null);

  const subjects = [
    { name: 'Mathematics', icon: 'calculate' },
    { name: 'Science', icon: 'biotech' },
    { name: 'English', icon: 'translate' },
    { name: 'Social Science', icon: 'public' },
    { name: 'Hindi', icon: 'auto_stories' },
  ];

  // Dynamic progress stats
  const completedCount = chapters.filter((c) => c.status === 'Completed').length;
  const totalChapters = 12; // 12 in the curriculum as in screenshot
  const completionPercent = Math.round((completedCount / totalChapters) * 100);

  const handleSyncSyllabus = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      onShowToast('12 Chapters synchronized with Google Spreadsheet!', 'cloud_done');
    }, 1200);
  };

  const handleSaveChapter = (updated: SyllabusChapter) => {
    setChapters((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    onShowToast(`Updated "${updated.title}" status to ${updated.status}`, 'check_circle');
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto pt-2 pb-24 space-y-4">
      {/* Interactive Top Sub-Header & Selector Bar */}
      <section className="px-4 flex flex-col gap-2.5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 bg-[#f2f3ff] px-3 py-1.5 rounded-xl shadow-xs border border-[#eaedff]">
            <span className="material-symbols-outlined text-[18px] text-[#004ac6]">groups</span>
            <span className="text-xs text-[#515f74] font-bold">Grade & Section:</span>
            <div className="relative inline-flex items-center">
              <select
                className="appearance-none bg-transparent text-xs text-[#004ac6] font-bold pr-5 focus:outline-none cursor-pointer"
                value={selectedClass}
                onChange={(e) => {
                  setSelectedClass(e.target.value);
                  onShowToast(`Viewing Syllabus for Class ${e.target.value}`);
                }}
              >
                <option value="10-A">Class 10-A</option>
                <option value="10-B">Class 10-B</option>
                <option value="9-A">Class 9-A</option>
                <option value="11-Sci">Class 11-Sci</option>
              </select>
              <span className="material-symbols-outlined text-[16px] text-[#004ac6] pointer-events-none absolute right-0">
                expand_more
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-[#eaedff] px-3 py-1.5 rounded-full text-[#515f74] text-xs font-semibold">
            <span className="material-symbols-outlined text-[14px]">event</span>
            <span>Term 1 (2024-25)</span>
          </div>
        </div>

        {/* Subject Filter Pills Horizontal Scroll */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
          {subjects.map((subj) => {
            const isActive = selectedSubject === subj.name;
            return (
              <button
                key={subj.name}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#004ac6] text-white shadow-sm'
                    : 'bg-[#f2f3ff] text-[#515f74] hover:bg-[#eaedff] hover:text-[#131b2e]'
                }`}
                type="button"
                onClick={() => {
                  setSelectedSubject(subj.name);
                  onShowToast(`Switched syllabus view to ${subj.name}`);
                }}
              >
                <span
                  className="material-symbols-outlined text-[16px]"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {subj.icon}
                </span>
                <span>{subj.name}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
              </button>
            );
          })}
        </div>
      </section>

      {/* Main Tracking Overview */}
      <div className="px-4 flex flex-col gap-4">
        {/* Overall Subject Progress Card */}
        <section className="bg-white rounded-2xl p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)] border border-[#eaedff] relative overflow-hidden space-y-3">
          {/* Decorative Color Gradient Strip */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#004ac6] via-[#5d55f3] to-[#d5e3fc]"></div>

          <div className="flex items-start justify-between gap-2 pt-1">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-[#131b2e]">{selectedSubject}</span>
                <span className="px-2 py-0.5 rounded-md bg-[#e2e7ff] font-mono text-[#004ac6] font-semibold text-[11px]">
                  MTH-101
                </span>
              </div>
              <span className="text-xs text-[#515f74] flex items-center gap-1 mt-0.5 font-medium">
                <span className="material-symbols-outlined text-[14px] text-[#4338d9]">person</span>
                Sarah Jenkins • Class Teacher & Mentor
              </span>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-col items-end">
              <div className="flex items-baseline gap-0.5">
                <span className="text-2xl font-extrabold text-[#004ac6] leading-none">
                  {completionPercent}
                </span>
                <span className="text-sm font-bold text-[#004ac6]">%</span>
              </div>
              <span className="text-[11px] font-semibold text-[#515f74]">
                {completedCount} of {totalChapters} Ch.
              </span>
            </div>
          </div>

          {/* Progress Bar with Milestones */}
          <div className="flex flex-col gap-1.5 pt-1">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-[#131b2e]">
                Completed: {completedCount} Chapters
              </span>
              <span className="text-[#ba1a1a] font-bold flex items-center gap-1 text-xs">
                <span className="material-symbols-outlined text-[14px]">flag</span>
                Target: 80% (Mid-Term)
              </span>
            </div>

            {/* Composite Track */}
            <div className="relative w-full h-3 bg-[#e2e7ff] rounded-full overflow-hidden">
              <div
                className="absolute left-0 top-0 bottom-0 bg-[#004ac6] rounded-full transition-all duration-700"
                style={{ width: `${completionPercent}%` }}
              ></div>
              {/* 80% Target Marker */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-[#ba1a1a] rounded-full z-10"
                style={{ left: '80%' }}
                title="80% Midterm target"
              ></div>
            </div>

            <div className="flex justify-between items-center text-[10px] text-[#515f74] px-0.5 font-medium">
              <span>Term Kickoff (Jul 01)</span>
              <span className="text-[#ba1a1a] font-bold">Goal (Nov 15)</span>
              <span>Finals (Mar 10)</span>
            </div>
          </div>

          {/* Milestone Cards */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className="bg-[#f2f3ff] p-2.5 rounded-xl flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#dbe1ff] flex items-center justify-center text-[#004ac6]">
                <span className="material-symbols-outlined text-[18px]">calendar_clock</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] text-[#515f74] font-medium">Target Date</span>
                <span className="text-xs font-bold text-[#131b2e] truncate">Nov 15, 2024</span>
              </div>
            </div>

            <div className="bg-[#f2f3ff] p-2.5 rounded-xl flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#d5e3fc] flex items-center justify-center text-[#3a485b]">
                <span className="material-symbols-outlined text-[18px]">timelapse</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] text-[#515f74] font-medium">Time Left</span>
                <span className="text-xs font-bold text-[#131b2e] truncate">21 Teaching Days</span>
              </div>
            </div>
          </div>

          {/* Pacing Alert */}
          {completionPercent < 80 && (
            <div className="p-3 bg-[#ffdad6]/60 rounded-xl flex items-start gap-2.5 border border-[#ffdad6]">
              <div className="p-1 rounded-md bg-[#ba1a1a] text-white flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[16px]">priority_high</span>
              </div>
              <div className="flex flex-col text-[#93000a]">
                <span className="text-xs font-bold leading-tight">
                  Pacing Alert: Behind Schedule
                </span>
                <p className="text-[11px] text-[#93000a]/90 mt-0.5 leading-snug">
                  Currently at <strong>{completionPercent}%</strong> completion. To meet the
                  institutional mandate of <strong>80% before the Mid-Term Examination</strong> on
                  Nov 15, pace must accelerate by ~2 periods/week.
                </p>
              </div>
            </div>
          )}
        </section>

        {/* Syllabus Chapter Matrix & Controls */}
        <section className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-[#131b2e]">Curriculum Units</span>
              <span className="w-5 h-5 rounded-full bg-[#d5e3fc] text-[#3a485b] font-mono text-[11px] font-bold flex items-center justify-center">
                {chapters.length}
              </span>
            </div>
            <button
              className="text-xs px-2.5 py-1 rounded-lg bg-[#eaedff] text-[#004ac6] font-bold flex items-center gap-1 cursor-pointer hover:bg-[#dae2fd]"
              onClick={() => onShowToast('Detailed breakdown view activated.')}
              type="button"
            >
              <span className="material-symbols-outlined text-[15px]">unfold_more</span>
              <span>Expand Details</span>
            </button>
          </div>

          {/* Chapters List */}
          <div className="space-y-2.5">
            {chapters.map((ch) => {
              const isInProgress = ch.status === 'In Progress';
              const isCompleted = ch.status === 'Completed';

              return (
                <article
                  key={ch.id}
                  className={`bg-white rounded-2xl p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)] border transition-all cursor-pointer relative overflow-hidden hover:shadow-md ${
                    isInProgress
                      ? 'border-[#f59e0b] shadow-[0_4px_14px_rgba(245,158,11,0.12)]'
                      : 'border-[#eaedff]'
                  }`}
                  onClick={() => setEditingChapter(ch)}
                >
                  {/* Active Amber Pacing Strip for In Progress */}
                  {isInProgress && (
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#f59e0b]"></div>
                  )}

                  <div className={`flex items-start justify-between gap-2 ${isInProgress ? 'pl-2' : ''}`}>
                    <div className="flex items-start gap-3 min-w-0">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-bold font-mono text-xs ${
                          isInProgress
                            ? 'bg-[#fef3c7] text-[#b45309]'
                            : isCompleted
                            ? 'bg-[#e2e7ff] text-[#004ac6]'
                            : 'bg-[#f2f3ff] text-[#515f74]'
                        }`}
                      >
                        {ch.chapterNum < 10 ? `0${ch.chapterNum}` : ch.chapterNum}
                      </div>

                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-sm font-bold text-[#131b2e] truncate">{ch.title}</h3>
                          {isInProgress && (
                            <span className="w-2 h-2 rounded-full bg-[#f59e0b] animate-ping"></span>
                          )}
                        </div>
                        <span
                          className={`text-xs ${
                            isInProgress ? 'text-[#b45309] font-medium' : 'text-[#515f74]'
                          }`}
                        >
                          {isInProgress
                            ? `${ch.periodsConducted || 3} of ${ch.periodsAllotted} Periods conducted (60%)`
                            : isCompleted && ch.finishedDate
                            ? `${ch.periodsAllotted} Periods • Done: ${ch.finishedDate}`
                            : `${ch.periodsAllotted} Teaching Periods allotted`}
                        </span>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 shrink-0 ${
                        isCompleted
                          ? 'bg-[#dbe1ff] text-[#004ac6]'
                          : isInProgress
                          ? 'bg-[#fef3c7] text-[#b45309]'
                          : 'bg-[#f2f3ff] text-[#515f74]'
                      }`}
                    >
                      <span
                        className="material-symbols-outlined text-[15px]"
                        style={isCompleted ? { fontVariationSettings: "'FILL' 1" } : undefined}
                      >
                        {isCompleted
                          ? 'check_circle'
                          : isInProgress
                          ? 'pending'
                          : 'radio_button_unchecked'}
                      </span>
                      <span>{isCompleted ? 'Completed' : isInProgress ? 'In Progress' : 'Pending'}</span>
                    </span>
                  </div>

                  {/* Expanded Meta Info if Completed or In Progress */}
                  {isCompleted && ch.notes && (
                    <div className="mt-2.5 pt-2 bg-[#f2f3ff]/70 p-2.5 rounded-xl flex flex-col gap-1 text-xs">
                      <div className="flex items-center justify-between text-[#515f74]">
                        <span className="flex items-center gap-1 text-[#004ac6] font-semibold">
                          <span className="material-symbols-outlined text-[14px]">event_available</span>
                          Finished: {ch.finishedDate || 'July 2024'}
                        </span>
                        {ch.homework && (
                          <span className="bg-[#d5e3fc] px-2 py-0.5 rounded text-[#3a485b] font-semibold text-[10px]">
                            {ch.homework}
                          </span>
                        )}
                      </div>
                      <p className="text-[#515f74] italic line-clamp-1">"{ch.notes}"</p>
                    </div>
                  )}

                  {isInProgress && (
                    <div className="pl-2 flex flex-col gap-2 mt-2">
                      <div className="w-full bg-[#e2e7ff] h-2 rounded-full overflow-hidden">
                        <div className="bg-[#f59e0b] h-full rounded-full" style={{ width: '60%' }}></div>
                      </div>
                      <div className="bg-[#f2f3ff] p-2.5 rounded-xl flex flex-col gap-1 text-xs">
                        <div className="flex items-center justify-between text-[#131b2e]">
                          <span className="font-bold text-[#b45309] flex items-center gap-1">
                            <span className="material-symbols-outlined text-[15px] text-[#f59e0b]">
                              arrow_forward
                            </span>
                            Next up: {ch.nextTopic || 'Section formula derivation'}
                          </span>
                          <span className="font-mono text-[11px] text-[#515f74] font-medium">
                            {ch.periodsLeft || 2} periods left
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[#515f74] pt-1">
                          <span className="text-[11px]">HW: {ch.homework || 'Ex 7.2 Q 1 to 5'}</span>
                          <span className="text-[#004ac6] font-bold text-xs flex items-center gap-0.5">
                            <span>Update</span>
                            <span className="material-symbols-outlined text-[14px]">edit</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        {/* Teacher Insights / Quick Visual Prompt Card */}
        <section className="bg-white rounded-2xl p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)] border border-[#eaedff] flex items-center gap-3 overflow-hidden">
          <img
            className="w-16 h-16 rounded-xl object-cover shrink-0"
            alt="Mid-Term Syllabus Target"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGLTmZCZLJb-o2vb32QsghftwCHpPHtIUwnwDUpWBnloK0YEXtdaGKqPuyf1AMbb7skXeI7XDedmCsWf3etMthaQjDG8CXkhH9ScmbI--hOK9LGA8sfEarAI3WjXUqSSquNk9m85aXxOuyBZTzeQf5ADv7C7u4yAv1Cqz_4mR2M0Gjub7ggbBUDlY3EQ2Pqr64_OLEr3ixo1kmlyz-Fi4NtwJP1jEdjcIKWt-BpoO6GEfR_HihMQVJ3g"
          />
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold text-[#131b2e] truncate">
              Mid-Term Syllabus Target
            </span>
            <p className="text-xs text-[#515f74] line-clamp-2 mt-0.5 leading-snug">
              Target encompasses Chapters 1 through 8. Complete Coordinate Geometry & Trigonometry basics by Nov 15.
            </p>
          </div>
        </section>
      </div>

      {/* Floating Sticky Action Button: Google Sheets Sync */}
      <div className="fixed bottom-20 left-0 right-0 px-4 flex justify-center z-30 pointer-events-none">
        <button
          className="pointer-events-auto bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-bold px-5 py-3 rounded-full shadow-[0_8px_20px_rgba(37,99,235,0.35)] flex items-center gap-2.5 transition-all transform active:scale-95 cursor-pointer"
          onClick={handleSyncSyllabus}
          type="button"
        >
          <span
            className={`material-symbols-outlined text-[20px] ${isSyncing ? 'animate-spin' : ''}`}
          >
            sync
          </span>
          <span>Sync Syllabus to Sheets</span>
          <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-mono uppercase font-bold tracking-wider">
            Live
          </span>
        </button>
      </div>

      {/* Chapter Edit Modal */}
      <ChapterEditModal
        isOpen={editingChapter !== null}
        chapter={editingChapter}
        onClose={() => setEditingChapter(null)}
        onSave={handleSaveChapter}
      />
    </div>
  );
};
