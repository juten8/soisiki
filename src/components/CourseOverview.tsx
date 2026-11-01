import React from 'react';
import { CourseId, LectureInfo, UserProgressState } from '../types/quiz';
import { COURSES_DATA } from '../data/coursesData';
import { QUESTIONS_DATA } from '../data/questionsData';
import { 
  Award, 
  BookOpen, 
  CheckCircle2, 
  ChevronRight, 
  Clock, 
  FileCheck, 
  GraduationCap, 
  Play, 
  Sparkles, 
  Target, 
  TrendingUp, 
  Users,
  Workflow,
  Compass,
  Building2
} from 'lucide-react';

interface CourseOverviewProps {
  selectedCourseId: CourseId;
  setSelectedCourseId: (id: CourseId) => void;
  onStartLectureDrill: (lectureId: string) => void;
  onStartCourseExam: (courseId: CourseId) => void;
  onStartVocabDrill: () => void;
  onOpenEstimate?: () => void;
  onOpenSeating?: () => void;
  onOpenWorkflow?: () => void;
  userProgress: UserProgressState;
}

export const CourseOverview: React.FC<CourseOverviewProps> = ({
  selectedCourseId,
  setSelectedCourseId,
  onStartLectureDrill,
  onStartCourseExam,
  onStartVocabDrill,
  onOpenEstimate,
  onOpenSeating,
  onOpenWorkflow,
  userProgress
}) => {
  const currentCourse = COURSES_DATA.find(c => c.id === selectedCourseId) || COURSES_DATA[0];

  const courseQuestions = QUESTIONS_DATA.filter(q => q.courseId === selectedCourseId);
  const totalCourseQuestions = courseQuestions.length;

  const answeredInCourse = courseQuestions.filter(q => {
    const record = userProgress.answeredQuestions[q.id];
    return record && record.correctCount > 0;
  }).length;

  const courseMasteryPct = totalCourseQuestions > 0 
    ? Math.round((answeredInCourse / totalCourseQuestions) * 100) 
    : 0;

  const isPassed = !!userProgress.passedCourses[selectedCourseId];

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 py-6 font-sans">
      {/* 3 Grand Stages Roadmap Callout Banner */}
      {onOpenWorkflow && (
        <div className="bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 text-white rounded-2xl p-5 sm:p-6 shadow-md border border-stone-700">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-0.5 rounded-full bg-stone-800 text-amber-200 border border-stone-700">
                <Compass className="w-3.5 h-3.5 text-amber-300" />
                <span>【葬祭ディレクター必修】葬儀施行の全体フローをまず把握！</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold font-serif-jp text-white">
                葬儀施行実務「三大工程」準備ロードマップ
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed font-sans">
                ①臨終・搬送安置・寺院日程決定 ➔ ②納棺・通夜式・通夜振る舞い ➔ ③告別式・出棺火葬・精進落とし。この三大工程の骨格を把握して初めて、見積りも祭壇設営も焼香案内もミスなく執行できるようになります。
              </p>
            </div>

            <button
              onClick={onOpenWorkflow}
              className="px-5 py-3 bg-stone-100 hover:bg-stone-200 text-stone-900 rounded-xl font-bold text-xs shadow-xs flex items-center justify-center gap-2 shrink-0 transition-all cursor-pointer"
            >
              <Workflow className="w-4 h-4 text-stone-900" />
              <span>実務三大工程ロードマップを開く</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-white border border-stone-200 text-stone-900 p-6 sm:p-8 shadow-xs">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 text-stone-800 border border-stone-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-stone-600" />
            厚生労働省認定 葬祭ディレクター技能審査基準準拠
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif-jp tracking-tight text-stone-950 leading-tight">
            {currentCourse.title}
          </h2>

          <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-light">
            {currentCourse.subtitle}
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
            <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-200">
              <span className="text-stone-500 block text-[10px]">修得講義数</span>
              <span className="font-bold text-stone-900 text-sm">{currentCourse.lectures.length} 講義</span>
            </div>
            <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-200">
              <span className="text-stone-500 block text-[10px]">演習問題数</span>
              <span className="font-bold text-stone-900 text-sm">{totalCourseQuestions} 問（四肢択一）</span>
            </div>
            <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-200">
              <span className="text-stone-500 block text-[10px]">合格基準スコア</span>
              <span className="font-bold text-stone-900 text-sm">{currentCourse.examPassingScore}% 以上</span>
            </div>
            <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-200">
              <span className="text-stone-500 block text-[10px]">認定ステータス</span>
              <span className={`font-bold text-sm flex items-center gap-1 ${isPassed ? 'text-emerald-700' : 'text-stone-600'}`}>
                {isPassed ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    修了認定済
                  </>
                ) : (
                  '未受験'
                )}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <button
              onClick={() => onStartCourseExam(selectedCourseId)}
              className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm shadow-xs flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
            >
              <Award className="w-4 h-4 text-amber-300" />
              <span>本番模擬試験を受ける（合格でディプロマ発行）</span>
            </button>

            {onOpenEstimate && (
              <button
                onClick={onOpenEstimate}
                className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 font-bold text-sm flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>📊 葬儀見積り・施行執行シミュレーター</span>
              </button>
            )}

            {onOpenSeating && (
              <button
                onClick={onOpenSeating}
                className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 font-bold text-sm flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>👥 親族席次・焼香順位表</span>
              </button>
            )}

            <button
              onClick={onStartVocabDrill}
              className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 font-medium text-sm flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <FileCheck className="w-4 h-4 text-stone-600" />
              <span>重要用語・漢字記述特訓</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3 Qualification Courses Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-stone-900 font-serif-jp flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-stone-700" />
              公式認定 3段階葬祭ディレクター研修区分
            </h3>
            <p className="text-xs text-stone-500">
              基礎実務から1級・2級実技、葬儀社経営・マネジメントまでを段階別に履修できます
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {COURSES_DATA.map((course) => {
            const isSelected = course.id === selectedCourseId;
            const cQuestions = QUESTIONS_DATA.filter(q => q.courseId === course.id);
            const cAnswered = cQuestions.filter(q => userProgress.answeredQuestions[q.id]?.correctCount > 0).length;
            const cProgress = cQuestions.length > 0 ? Math.round((cAnswered / cQuestions.length) * 100) : 0;
            const cPassed = !!userProgress.passedCourses[course.id];

            return (
              <div
                key={course.id}
                onClick={() => setSelectedCourseId(course.id)}
                className={`relative rounded-2xl p-5 cursor-pointer transition-all border text-left flex flex-col justify-between ${
                  isSelected
                    ? 'bg-stone-50 border-stone-800 shadow-sm ring-2 ring-stone-900/20'
                    : 'bg-white hover:bg-stone-50 border-stone-200 shadow-2xs'
                }`}
              >
                {cPassed && (
                  <div className="absolute top-3 right-3 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-300 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    修了認定
                  </div>
                )}

                <div className="space-y-3">
                  <div className="text-[11px] font-semibold text-stone-800 tracking-wide uppercase bg-stone-100 px-2 py-0.5 rounded w-fit border border-stone-200">
                    {course.badgeTitle}
                  </div>

                  <h4 className="text-base font-bold text-stone-900 font-serif-jp">
                    {course.title}
                  </h4>

                  <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                    {course.subtitle}
                  </p>

                  <div className="space-y-1.5 text-[11px] text-stone-500 pt-2 border-t border-stone-200/70">
                    <div className="flex items-center justify-between">
                      <span className="text-stone-400">期間・講数:</span>
                      <span className="font-medium text-stone-700">{course.hours}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-stone-400">受講料目安:</span>
                      <span className="font-medium text-stone-700">{course.tuition}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-stone-400">講義数:</span>
                      <span className="font-semibold text-stone-900">{course.lectures.length} 講義</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-3 border-t border-stone-200">
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="text-stone-500">学習進捗</span>
                    <span className="font-bold text-stone-900">{cProgress}%</span>
                  </div>
                  <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden border border-stone-200">
                    <div 
                      className="h-full bg-stone-800 rounded-full transition-all duration-500"
                      style={{ width: `${cProgress}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lecture List */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-3">
          <div>
            <h3 className="text-xl font-bold text-stone-900 font-serif-jp flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-stone-700" />
              <span>{currentCourse.title} カリキュラム講義一覧</span>
            </h3>
            <p className="text-xs text-stone-500">
              各回の講義テーマをクリックして、実践的な四肢択一問題と詳細解説で反復演習できます
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-600 font-medium">コース習得度:</span>
            <span className="text-xs font-bold text-stone-800 bg-stone-200 px-2 py-0.5 rounded-full border border-stone-300">
              {courseMasteryPct}% 完了
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3.5">
          {currentCourse.lectures.map((lecture: LectureInfo) => {
            const lectureQuestions = QUESTIONS_DATA.filter(q => q.lectureId === lecture.id);
            const lectureAnswered = lectureQuestions.filter(q => userProgress.answeredQuestions[q.id]?.correctCount > 0).length;
            const isLectureComplete = lectureQuestions.length > 0 && lectureAnswered === lectureQuestions.length;

            return (
              <div
                key={lecture.id}
                className={`p-4 sm:p-5 rounded-xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  isLectureComplete
                    ? 'bg-emerald-50/40 border-emerald-300/80 shadow-2xs'
                    : 'bg-white hover:bg-stone-50 border-stone-200 shadow-xs'
                }`}
              >
                <div className="space-y-2 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-stone-900 text-white text-xs font-bold">
                      第{lecture.lectureNumber}講
                    </span>

                    <h4 className="text-base font-bold text-stone-900 font-serif-jp">
                      {lecture.title}
                    </h4>

                    {isLectureComplete && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        全問習得済
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {lecture.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px]">
                    <span className="text-stone-400 font-medium">重点科目:</span>
                    <span className="text-stone-800 font-medium bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
                      {lecture.focusTopics}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-stone-100">
                  <div className="text-right text-xs">
                    <span className="text-stone-400 block text-[10px]">問題数</span>
                    <span className="font-semibold text-stone-700">
                      {lectureAnswered} / {lectureQuestions.length} 問
                    </span>
                  </div>

                  <button
                    onClick={() => onStartLectureDrill(lecture.id)}
                    className="px-4 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 active:scale-95 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>演習を始める</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
