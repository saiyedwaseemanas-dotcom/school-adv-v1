import React, { useState } from 'react';
import { StudentMarkRecord } from '../../types';
import { INITIAL_MARKS_RECORDS } from '../../data/mockData';
import { ReportCardModal } from '../modals/ReportCardModal';

interface MarksScreenProps {
  onShowToast: (message: string, icon?: string) => void;
}

export const MarksScreen: React.FC<MarksScreenProps> = ({ onShowToast }) => {
  const [selectedExam, setSelectedExam] = useState<'UT1' | 'UT2' | 'MidTerm' | 'Final'>('UT2');
  const [records, setRecords] = useState<StudentMarkRecord[]>(INITIAL_MARKS_RECORDS);
  const [analyticsView, setAnalyticsView] = useState<'subjects' | 'trend'>('subjects');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [modalStudent, setModalStudent] = useState<StudentMarkRecord | undefined>(undefined);

  // Update a student score interactively
  const handleScoreChange = (id: number, valStr: string) => {
    let score = parseFloat(valStr);
    if (isNaN(score)) score = 0;
    if (score > 50) score = 50;
    if (score < 0) score = 0;

    setRecords((prev) =>
      prev.map((rec) => {
        if (rec.id !== id) return rec;

        const percent = Math.round((score / rec.maxScore) * 100);
        let grade: 'A+' | 'A' | 'B' | 'C' | 'Fail' = 'Fail';
        let status: 'Passed' | 'Needs Help' = 'Passed';

        if (percent >= 90) {
          grade = 'A+';
        } else if (percent >= 80) {
          grade = 'A';
        } else if (percent >= 70) {
          grade = 'B';
        } else if (percent >= 50) {
          grade = 'C';
        } else {
          grade = 'Fail';
          status = 'Needs Help';
        }

        return {
          ...rec,
          score,
          percent,
          grade,
          status,
        };
      })
    );
  };

  const handleSaveMarks = () => {
    onShowToast('Marksheet saved and synced to database.', 'check_circle');
  };

  const handleImport = () => {
    onShowToast('Reading records from Google Sheets...', 'sync');
  };

  const handleExport = () => {
    onShowToast('Generating official PDF & Excel export...', 'file_download');
  };

  const openReportCard = (student: StudentMarkRecord) => {
    setModalStudent(student);
    setIsReportModalOpen(true);
  };

  // Compute live averages
  const avgScore = (
    records.reduce((acc, curr) => acc + curr.score, 0) / records.length
  ).toFixed(1);
  const passRate = Math.round(
    (records.filter((r) => r.status === 'Passed').length / records.length) * 100
  );

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto pt-2 pb-24 space-y-4">
      <div className="px-4 space-y-4">
        {/* Context Banner & Exam Filter Navigation */}
        <section className="bg-white p-4 rounded-2xl shadow-[0_1px_4px_rgba(0,0,0,0.04)] border border-[#eaedff] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="material-symbols-outlined text-[#004ac6] text-[20px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                assignment
              </span>
              <span className="text-base font-bold text-[#131b2e]">Evaluation Portal</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d5e3fc] text-[#3a485b]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#004ac6] animate-pulse"></span>
              <span className="text-xs font-bold">Active Grading</span>
            </div>
          </div>

          {/* Tab Switcher */}
          <div className="overflow-x-auto -mx-4 px-4 scrollbar-none py-0.5">
            <div className="flex items-center gap-2 min-w-max">
              <button
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedExam === 'UT1'
                    ? 'bg-[#2563eb] text-white shadow-sm'
                    : 'bg-[#f2f3ff] text-[#515f74] hover:bg-[#eaedff]'
                }`}
                onClick={() => {
                  setSelectedExam('UT1');
                  onShowToast('Loaded Unit Test 1 archived records');
                }}
                type="button"
              >
                Unit Test 1
              </button>
              <button
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  selectedExam === 'UT2'
                    ? 'bg-[#2563eb] text-white shadow-sm'
                    : 'bg-[#f2f3ff] text-[#515f74] hover:bg-[#eaedff]'
                }`}
                onClick={() => setSelectedExam('UT2')}
                type="button"
              >
                <span>Unit Test 2</span>
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
              </button>
              <button
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedExam === 'MidTerm'
                    ? 'bg-[#2563eb] text-white shadow-sm'
                    : 'bg-[#f2f3ff] text-[#515f74] hover:bg-[#eaedff]'
                }`}
                onClick={() => {
                  setSelectedExam('MidTerm');
                  onShowToast('Viewing Mid-Term schedule & blueprint');
                }}
                type="button"
              >
                Mid-Term
              </button>
              <button
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedExam === 'Final'
                    ? 'bg-[#2563eb] text-white shadow-sm'
                    : 'bg-[#f2f3ff] text-[#515f74] hover:bg-[#eaedff]'
                }`}
                onClick={() => {
                  setSelectedExam('Final');
                  onShowToast('Viewing Final Exam blueprint');
                }}
                type="button"
              >
                Final Exam
              </button>
            </div>
          </div>

          {/* Exam Configuration Pill Strip */}
          <div className="p-2.5 rounded-xl bg-[#f2f3ff] flex flex-wrap items-center justify-between gap-2 text-[#515f74] text-xs">
            <div className="flex items-center gap-1">
              <span className="font-bold text-[#131b2e]">Class:</span> 10-A
            </div>
            <span className="text-[#c3c6d7]">•</span>
            <div className="flex items-center gap-1">
              <span className="font-bold text-[#131b2e]">Subject:</span> Science
            </div>
            <span className="text-[#c3c6d7]">•</span>
            <div className="flex items-center gap-1">
              <span className="font-bold text-[#131b2e]">Max:</span> 50
            </div>
            <span className="text-[#c3c6d7]">•</span>
            <div className="flex items-center gap-1">
              <span className="font-bold text-[#131b2e]">Passing:</span> 18 pts
            </div>
          </div>
        </section>

        {/* Visual Highlights / Student of the Test Mosaic */}
        <div className="grid grid-cols-1">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#004ac6] to-[#4338d9] p-4 text-white shadow-md flex items-center justify-between">
            <div className="space-y-1.5 z-10 max-w-[62%]">
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-[10px] tracking-wider uppercase font-bold">
                <span className="material-symbols-outlined text-[13px]">military_tech</span> Class
                Topper
              </div>
              <p className="text-lg leading-tight font-extrabold line-clamp-1">Ananya Iyer</p>
              <p className="text-xs text-white/90">
                Score: <strong className="font-bold">49 / 50</strong> (98%) • Rank 1
              </p>
            </div>

            <div className="relative z-10 w-16 h-16 rounded-full overflow-hidden shadow-lg ring-2 ring-white/50 bg-white">
              <img
                className="w-full h-full object-cover"
                alt="Class Topper Ananya Iyer"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgX03Ju9uifP_EwggPCm8vO4Ekdrx7-yxZSNZhbrHE8A5nj0QIv34-P4AnW5mcngb4q4D-18M2Eqyzfwyufs8QLEEnj_QpBwvECpUBETd_K2QIJOVvbFkjxDaO2fCGK3hV6QZRg8HvpBlBGW795qxYe97ubTAaCrZmq7-WRL1HR9EWAu1iy3m2gy3bO5S2A0w8SJq_y9YowxDd9CQ4MyhAMMF7OQlm3xtusGNtBK8Rkzfmf5L4MP3rIw"
              />
            </div>

            {/* Abstract decorative SVG glow */}
            <svg
              className="absolute right-0 top-0 w-36 h-36 -mr-6 -mt-6 opacity-20 pointer-events-none"
              fill="currentColor"
              viewBox="0 0 100 100"
            >
              <circle cx="50" cy="50" r="45"></circle>
            </svg>
          </div>
        </div>

        {/* Summary Insights Bento Grid */}
        <section className="grid grid-cols-2 gap-3">
          <div className="bg-white p-4 rounded-2xl shadow-[0_1px_4px_rgba(0,0,0,0.04)] border border-[#eaedff] flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#515f74]">Class Avg</span>
              <div className="p-1.5 rounded-lg bg-[#f2f3ff] text-[#004ac6] flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">query_stats</span>
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-extrabold text-[#131b2e]">{avgScore}</span>
                <span className="text-xs text-[#515f74]">/ 50</span>
              </div>
              <div className="mt-1 flex items-center gap-1 text-xs font-bold text-[#004ac6]">
                <span className="material-symbols-outlined text-[14px]">trending_up</span>
                <span>78.8% benchmark</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow-[0_1px_4px_rgba(0,0,0,0.04)] border border-[#eaedff] flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#515f74]">Pass Rate</span>
              <div className="p-1.5 rounded-lg bg-[#d5e3fc] text-[#3a485b] flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">verified</span>
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-extrabold text-[#131b2e]">{passRate}%</span>
                <span className="text-xs text-[#515f74]">(38/40)</span>
              </div>
              <div className="mt-1 flex items-center gap-1 text-xs text-[#515f74]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ba1a1a]"></span>
                <span>2 remediation needed</span>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Operations Toolbar */}
        <div className="flex items-center justify-between gap-2">
          <button
            className="flex-1 min-h-[44px] px-4 rounded-xl bg-[#004ac6] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.98] transition-transform hover:bg-[#003ea8] cursor-pointer"
            onClick={handleSaveMarks}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">save</span>
            <span>Save Marks</span>
          </button>
          <button
            className="min-h-[44px] px-3.5 rounded-xl bg-white border border-[#eaedff] text-[#515f74] text-xs font-bold flex items-center justify-center gap-1 shadow-sm active:scale-[0.98] transition-transform hover:bg-[#f2f3ff] cursor-pointer"
            onClick={handleImport}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">upload_file</span>
            <span className="hidden sm:inline">Import</span>
          </button>
          <button
            className="min-h-[44px] px-3.5 rounded-xl bg-white border border-[#eaedff] text-[#515f74] text-xs font-bold flex items-center justify-center gap-1 shadow-sm active:scale-[0.98] transition-transform hover:bg-[#f2f3ff] cursor-pointer"
            onClick={handleExport}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>

        {/* Interactive Marksheet Records */}
        <section className="space-y-2.5">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-[#131b2e]">Grade Register</span>
              <span className="px-2 py-0.5 rounded-full bg-[#e2e7ff] text-[#004ac6] text-[11px] font-bold">
                5 of 40
              </span>
            </div>
            <span className="text-xs text-[#515f74] font-medium">Max: 50 Marks</span>
          </div>

          {/* Cards List */}
          <div className="space-y-2.5">
            {records.map((rec) => {
              const isNeedsHelp = rec.status === 'Needs Help';
              return (
                <article
                  key={rec.id}
                  className="p-4 rounded-2xl bg-white shadow-[0_1px_4px_rgba(0,0,0,0.04)] border border-[#eaedff] space-y-3 relative overflow-hidden"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#e2e7ff] shrink-0 shadow-sm">
                        <img
                          className="w-full h-full object-cover"
                          alt={rec.name}
                          src={rec.avatarUrl}
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-bold text-[#131b2e] truncate">
                            {rec.name}
                          </span>
                          <span
                            className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                              rec.rank === 1
                                ? 'bg-[#e2dfff] text-[#3323cc]'
                                : 'bg-[#e2e7ff] text-[#004ac6]'
                            }`}
                          >
                            #{rec.rank}
                          </span>
                        </div>
                        <p className="text-xs text-[#515f74] mt-0.5">Roll No: {rec.rollNo}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        className="text-[#004ac6] hover:bg-[#f2f3ff] p-1.5 rounded-lg text-xs font-semibold cursor-pointer"
                        onClick={() => openReportCard(rec)}
                        title="View printable progress report"
                      >
                        <span className="material-symbols-outlined text-[18px]">feed</span>
                      </button>

                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          isNeedsHelp
                            ? 'bg-[#ffdad6] text-[#ba1a1a]'
                            : 'bg-[#d5e3fc] text-[#3a485b]'
                        }`}
                      >
                        {rec.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-1 items-end">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#515f74] mb-1">
                        Score (/50)
                      </label>
                      <input
                        className={`w-full h-11 px-2.5 rounded-xl bg-[#f2f3ff] font-bold text-base outline-none focus:bg-white focus:ring-2 focus:ring-[#004ac6] transition-all text-center ${
                          isNeedsHelp ? 'text-[#ba1a1a]' : 'text-[#131b2e]'
                        }`}
                        max="50"
                        min="0"
                        type="number"
                        value={rec.score}
                        onChange={(e) => handleScoreChange(rec.id, e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#f2f3ff] h-11">
                      <span className="text-[10px] text-[#515f74]">Percent</span>
                      <span
                        className={`text-sm font-bold ${
                          isNeedsHelp ? 'text-[#ba1a1a]' : 'text-[#131b2e]'
                        }`}
                      >
                        {rec.percent}%
                      </span>
                    </div>

                    <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#f2f3ff] h-11">
                      <span className="text-[10px] text-[#515f74]">Grade</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                          rec.grade === 'A+'
                            ? 'bg-[#e2dfff] text-[#3323cc]'
                            : rec.grade === 'A'
                            ? 'bg-[#dbe1ff] text-[#003ea8]'
                            : rec.grade === 'B'
                            ? 'bg-[#d5e3fc] text-[#3a485b]'
                            : rec.grade === 'C'
                            ? 'bg-[#e2e7ff] text-[#004ac6]'
                            : 'bg-[#ffdad6] text-[#ba1a1a]'
                        }`}
                      >
                        {rec.grade}
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Student Progress & Comparative Analytics Section */}
        <section className="p-4 rounded-2xl bg-white shadow-[0_1px_4px_rgba(0,0,0,0.04)] border border-[#eaedff] space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-bold text-[#131b2e] block">
                Analytics & Progression
              </span>
              <span className="text-xs text-[#515f74]">Benchmark comparative trends</span>
            </div>
            <div className="p-2 rounded-xl bg-[#f2f3ff] text-[#004ac6]">
              <span className="material-symbols-outlined text-[20px]">bar_chart</span>
            </div>
          </div>

          {/* Segmented View Selector */}
          <div className="p-1 rounded-xl bg-[#f2f3ff] flex items-center gap-1 text-xs">
            <button
              className={`flex-1 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                analyticsView === 'subjects'
                  ? 'bg-white text-[#004ac6] shadow-sm'
                  : 'text-[#515f74] hover:text-[#131b2e]'
              }`}
              onClick={() => setAnalyticsView('subjects')}
              type="button"
            >
              Subject Comparison
            </button>
            <button
              className={`flex-1 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                analyticsView === 'trend'
                  ? 'bg-white text-[#004ac6] shadow-sm'
                  : 'text-[#515f74] hover:text-[#131b2e]'
              }`}
              onClick={() => setAnalyticsView('trend')}
              type="button"
            >
              UT1 → Midterm Trend
            </button>
          </div>

          {/* View 1: Subject Averages */}
          {analyticsView === 'subjects' ? (
            <div className="space-y-3 pt-1 animate-in fade-in duration-200">
              <div className="flex items-center justify-between text-[#515f74] text-xs font-semibold px-1">
                <span>Curriculum Subject</span>
                <span>Class Average (/50)</span>
              </div>

              <div className="space-y-2.5">
                {/* Science (Active) */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#004ac6] flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#004ac6]"></span> Science (Current)
                    </span>
                    <span className="font-bold text-[#131b2e]">42.0 pts</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-[#eaedff] overflow-hidden">
                    <div className="h-full rounded-full bg-[#004ac6]" style={{ width: '84%' }}></div>
                  </div>
                </div>

                {/* English */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#131b2e] flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#4338d9]"></span> English
                    </span>
                    <span className="font-bold text-[#131b2e]">44.0 pts</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-[#eaedff] overflow-hidden">
                    <div className="h-full rounded-full bg-[#4338d9]" style={{ width: '88%' }}></div>
                  </div>
                </div>

                {/* Social Studies */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#131b2e] flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#515f74]"></span> Social Studies
                    </span>
                    <span className="font-bold text-[#131b2e]">39.0 pts</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-[#eaedff] overflow-hidden">
                    <div className="h-full rounded-full bg-[#515f74]" style={{ width: '78%' }}></div>
                  </div>
                </div>

                {/* Mathematics */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#131b2e] flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#d5e3fc]"></span> Mathematics
                    </span>
                    <span className="font-bold text-[#131b2e]">38.0 pts</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-[#eaedff] overflow-hidden">
                    <div className="h-full rounded-full bg-[#8fa4c7]" style={{ width: '76%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* View 2: Trendline Progression View */
            <div className="space-y-3 pt-1 animate-in fade-in duration-200">
              <div className="p-3 rounded-xl bg-[#f2f3ff] flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#131b2e] block">Cohort Flightpath</span>
                  <span className="text-[11px] text-[#515f74]">
                    +6.2% expected trajectory towards Midterm
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#d5e3fc] text-[#3a485b] text-xs font-bold">
                  Positive
                </span>
              </div>

              <div className="relative w-full h-36 flex items-end justify-between px-6 pb-2 pt-6 bg-[#f2f3ff] rounded-2xl">
                {/* Step 1: UT1 */}
                <div className="flex flex-col items-center gap-1.5 z-10">
                  <span className="text-xs font-bold text-[#131b2e]">36.8</span>
                  <div className="w-9 h-16 rounded-t-lg bg-[#d2d9f4] flex items-center justify-center"></div>
                  <span className="text-xs text-[#515f74] font-medium">UT-1</span>
                </div>

                {/* Line SVG connector */}
                <div className="absolute inset-x-10 top-8 bottom-8 pointer-events-none">
                  <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 240 60">
                    <path
                      d="M 20 40 L 120 20 L 220 5"
                      stroke="#004ac6"
                      strokeDasharray="4 4"
                      strokeLinecap="round"
                      strokeWidth="3"
                    ></path>
                  </svg>
                </div>

                {/* Step 2: UT2 */}
                <div className="flex flex-col items-center gap-1.5 z-10">
                  <span className="text-xs font-bold text-[#004ac6]">39.4</span>
                  <div className="w-9 h-20 rounded-t-lg bg-[#004ac6] flex items-center justify-center shadow-sm"></div>
                  <span className="text-xs font-bold text-[#004ac6]">UT-2</span>
                </div>

                {/* Step 3: Projected Midterm */}
                <div className="flex flex-col items-center gap-1.5 z-10">
                  <span className="text-xs font-bold text-[#5d55f3]">42.8*</span>
                  <div className="w-9 h-24 rounded-t-lg bg-[#5d55f3] flex items-center justify-center"></div>
                  <span className="text-xs text-[#515f74] font-medium">Midterm</span>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Report Card Preview CTA Card */}
        <section className="p-4 rounded-2xl bg-white shadow-[0_1px_4px_rgba(0,0,0,0.04)] border border-[#eaedff] space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#d5e3fc] flex items-center justify-center text-[#0d1c2e] shrink-0">
              <span className="material-symbols-outlined text-[22px]">feed</span>
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-sm font-bold text-[#131b2e] block">Printable Report Card</span>
              <span className="text-xs text-[#515f74]">Official institutional layout with remarks</span>
            </div>
          </div>
          <button
            className="w-full min-h-[44px] px-4 rounded-xl bg-[#eaedff] text-[#004ac6] text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#dae2fd] transition-colors cursor-pointer"
            onClick={() => {
              setModalStudent(records[0]);
              setIsReportModalOpen(true);
            }}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">preview</span>
            <span>View Sample Printable Report Card</span>
          </button>
        </section>
      </div>

      {/* Printable Report Card Modal */}
      <ReportCardModal
        isOpen={isReportModalOpen}
        student={modalStudent}
        onClose={() => setIsReportModalOpen(false)}
        onShowToast={onShowToast}
      />
    </div>
  );
};
