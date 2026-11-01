import { CourseId, UserProgressState } from '../types/quiz';

const STORAGE_KEY = 'funeral_director_progress_v2';

export const INITIAL_PROGRESS: UserProgressState = {
  answeredQuestions: {},
  bookmarkedQuestionIds: [],
  passedCourses: {} as Record<CourseId, { passedAt: number; score: number; candidateName: string; certificateId: string }>,
  streakDays: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  soundEnabled: true,
  studentName: '葬祭ディレクター 担当者'
};

export function loadUserProgress(): UserProgressState {
  if (typeof window === 'undefined') return INITIAL_PROGRESS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_PROGRESS;
    const parsed = JSON.parse(raw);
    
    // Update streak logic
    const today = new Date().toISOString().split('T')[0];
    let streak = parsed.streakDays || 1;
    if (parsed.lastActiveDate) {
      const last = new Date(parsed.lastActiveDate);
      const curr = new Date(today);
      const diffDays = Math.round((curr.getTime() - last.getTime()) / (1000 * 3600 * 24));
      if (diffDays === 1) {
        streak += 1;
      } else if (diffDays > 1) {
        streak = 1;
      }
    }

    return {
      ...INITIAL_PROGRESS,
      ...parsed,
      streakDays: streak,
      lastActiveDate: today
    };
  } catch {
    return INITIAL_PROGRESS;
  }
}

export function saveUserProgress(state: UserProgressState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

export function generateCertificateId(courseId: CourseId): string {
  const year = new Date().getFullYear();
  const prefix = courseId === 'basic' ? 'FDC' : courseId === 'director' ? 'FDD' : 'FDM';
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  return `JFA-${year}-${prefix}-${randomDigits}`;
}
