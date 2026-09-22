export type AppScreen =
  | 'dashboard'
  | 'attendance'
  | 'syllabus'
  | 'marks'
  | 'sync'
  | 'students'
  | 'teachers'
  | 'reports'
  | 'settings';

export type UserRole = 'Teacher' | 'Admin' | 'Student';

export interface StudentMarkRecord {
  id: number;
  name: string;
  rollNo: string;
  rank: number;
  score: number;
  maxScore: number;
  percent: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'Fail';
  status: 'Passed' | 'Needs Help';
  avatarUrl: string;
  remarks?: string;
}

export type AttendanceStatus = 'P' | 'A' | 'L' | 'HD';

export interface StudentAttendanceRecord {
  id: number;
  name: string;
  rollNo: string;
  section: string;
  attendancePercent: number;
  status: AttendanceStatus;
  avatarUrl: string;
  parentPhone: string;
  isDefaulter?: boolean;
}

export interface SyllabusChapter {
  id: number;
  chapterNum: number;
  title: string;
  periodsAllotted: number;
  periodsConducted?: number;
  status: 'Completed' | 'In Progress' | 'Not Started';
  finishedDate?: string;
  notes?: string;
  homework?: string;
  nextTopic?: string;
  periodsLeft?: number;
}

export interface FacultyRecord {
  id: string;
  name: string;
  title: string;
  department: string;
  checkInTime: string;
  checkOutTime?: string;
  status: 'Present' | 'On Leave' | 'Late';
  room?: string;
  avatarUrl?: string;
}

export interface ToastState {
  id: number;
  message: string;
  icon?: string;
  type?: 'success' | 'info' | 'warning' | 'error';
}
