import React, { useState, useEffect } from 'react';
import { 
  AppMode, 
  CourseId, 
  Question, 
  UserProgressState,
  WorkflowStageNumber
} from './types/quiz';
import { COURSES_DATA } from './data/coursesData';
import { QUESTIONS_DATA } from './data/questionsData';
import { WORKFLOW_STAGES_DATA } from './data/workflowStagesData';
import { loadUserProgress, saveUserProgress, INITIAL_PROGRESS } from './utils/storage';

import { Header } from './components/Header';
import { CourseOverview } from './components/CourseOverview';
import { WorkflowTimelineView } from './components/WorkflowTimelineView';
import { QuizView } from './components/QuizView';
import { ExamModeView } from './components/ExamModeView';
import { VocabularyDrillView } from './components/VocabularyDrillView';
import { CheatSheetView } from './components/CheatSheetView';
import { DiplomaView } from './components/DiplomaView';
import { EstimateSimulator } from './components/EstimateSimulator';
import { SeatingSimulator } from './components/SeatingSimulator';
import { CateringSimulator } from './components/CateringSimulator';
import { PracticalExecutionChecklist } from './components/PracticalExecutionChecklist';
import { VendorDispatchView } from './components/VendorDispatchView';
import { InvitationPreviewView } from './components/InvitationPreviewView';
import { TableSettingDiagramsView } from './components/TableSettingDiagramsView';

import { 
  Award, 
  BookOpen, 
  Bookmark, 
  CheckCircle2, 
  FileText, 
  HelpCircle, 
  RotateCcw, 
  Trash2,
  Building2,
  ShieldCheck
} from 'lucide-react';

export default function App() {
  const [userProgress, setUserProgress] = useState<UserProgressState>(() => loadUserProgress());
  const [currentMode, setMode] = useState<AppMode>('workflow');
  const [selectedCourseId, setSelectedCourseId] = useState<CourseId>('basic');
  const [activeLectureId, setActiveLectureId] = useState<string | null>(null);
  const [activeStageNumber, setActiveStageNumber] = useState<WorkflowStageNumber | null>(null);

  // Auto-save user progress to localStorage
  useEffect(() => {
    saveUserProgress(userProgress);
  }, [userProgress]);

  // Compute stats
  const totalQuestionsCount = QUESTIONS_DATA.length;

  const incorrectQuestions = QUESTIONS_DATA.filter(q => {
    const record = userProgress.answeredQuestions[q.id];
    return record && record.answeredCount > record.correctCount;
  });

  const bookmarkedQuestions = QUESTIONS_DATA.filter(q => 
    userProgress.bookmarkedQuestionIds.includes(q.id)
  );

  // Stage question counts for the 3 Grand Stages (三大工程)
  const stageQuestionCounts: Record<WorkflowStageNumber, number> = {
    1: QUESTIONS_DATA.filter(q => q.workflowStage === 1).length,
    2: QUESTIONS_DATA.filter(q => q.workflowStage === 2).length,
    3: QUESTIONS_DATA.filter(q => q.workflowStage === 3).length,
  };

  // Handlers
  const handleStartLectureDrill = (lectureId: string) => {
    setActiveStageNumber(null);
    setActiveLectureId(lectureId);
    setMode('drill');
  };

  const handleStartStageDrill = (stageNumber: WorkflowStageNumber) => {
    setActiveStageNumber(stageNumber);
    setActiveLectureId(null);
    setMode('drill');
  };

  const handleStartCourseExam = (courseId: CourseId) => {
    setSelectedCourseId(courseId);
    setMode('exam');
  };

  const handleStartVocabDrill = () => {
    setMode('vocab');
  };

  // Determine questions for drill mode
  let drillQuestions: Question[] = [];
  let drillTitle = '';
  let drillSubtitle = '';

  if (currentMode === 'drill') {
    if (activeStageNumber) {
      drillQuestions = QUESTIONS_DATA.filter(q => q.workflowStage === activeStageNumber);
      const stageInfo = WORKFLOW_STAGES_DATA.find(s => s.stageNumber === activeStageNumber);
      drillTitle = stageInfo ? stageInfo.title : `第${activeStageNumber}工程演習`;
      drillSubtitle = stageInfo ? `【時期：${stageInfo.timing}】${stageInfo.tagline}` : '実務三大工程 特訓問題';
    } else if (activeLectureId) {
      drillQuestions = QUESTIONS_DATA.filter(q => q.lectureId === activeLectureId);
      const currentCourse = COURSES_DATA.find(c => c.id === selectedCourseId);
      const lecture = currentCourse?.lectures.find(l => l.id === activeLectureId);
      drillTitle = lecture ? `第${lecture.lectureNumber}講：${lecture.title}` : '講義演習';
      drillSubtitle = currentCourse?.title || '';
    } else {
      drillQuestions = QUESTIONS_DATA.filter(q => q.courseId === selectedCourseId);
      drillTitle = COURSES_DATA.find(c => c.id === selectedCourseId)?.title || '講義演習';
    }
  } else if (currentMode === 'weakness') {
    drillQuestions = incorrectQuestions.length > 0 ? incorrectQuestions : QUESTIONS_DATA.slice(0, 5);
    drillTitle = '弱点克服・誤答問題特訓';
    drillSubtitle = `間違えた問題 (${incorrectQuestions.length}問) を徹底的に復習して完全マスター`;
  } else if (currentMode === 'bookmarks') {
    drillQuestions = bookmarkedQuestions.length > 0 ? bookmarkedQuestions : QUESTIONS_DATA.slice(0, 3);
    drillTitle = '要復習ブックマーク問題帳';
    drillSubtitle = `保存した問題 (${bookmarkedQuestions.length}問) の集中見直し`;
  }

  const handleResetData = () => {
    if (window.confirm('学習履歴・認定記録・ブックマークを初期化しますか？')) {
      setUserProgress({ ...INITIAL_PROGRESS, studentName: userProgress.studentName });
      setMode('workflow');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-100/60 text-stone-900 font-sans selection:bg-stone-300">
      {/* Top Header */}
      <Header
        currentMode={currentMode}
        setMode={setMode}
        selectedCourseId={selectedCourseId}
        setSelectedCourseId={setSelectedCourseId}
        userProgress={userProgress}
        setUserProgress={setUserProgress}
        totalQuestionsCount={totalQuestionsCount}
        incorrectQuestionsCount={incorrectQuestions.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {currentMode === 'workflow' && (
          <WorkflowTimelineView
            onStartStageDrill={handleStartStageDrill}
            onOpenEstimate={() => setMode('estimate')}
            onOpenSeating={() => setMode('seating')}
            onOpenCatering={() => setMode('catering')}
            onOpenPractical={() => setMode('practical')}
            onOpenDispatch={() => setMode('dispatch')}
            onOpenNotice={() => setMode('notice')}
            onOpenAltarSetting={() => setMode('altar-setting')}
            onBackToCourses={() => setMode('courses')}
            stageQuestionCounts={stageQuestionCounts}
          />
        )}

        {currentMode === 'altar-setting' && (
          <TableSettingDiagramsView onNavigate={(mode) => setMode(mode)} />
        )}

        {currentMode === 'courses' && (
          <CourseOverview
            selectedCourseId={selectedCourseId}
            setSelectedCourseId={setSelectedCourseId}
            onStartLectureDrill={handleStartLectureDrill}
            onStartCourseExam={handleStartCourseExam}
            onStartVocabDrill={handleStartVocabDrill}
            onOpenEstimate={() => setMode('estimate')}
            onOpenSeating={() => setMode('seating')}
            onOpenWorkflow={() => setMode('workflow')}
            userProgress={userProgress}
          />
        )}

        {currentMode === 'practical' && (
          <PracticalExecutionChecklist />
        )}

        {currentMode === 'dispatch' && (
          <VendorDispatchView onNavigate={(mode) => setMode(mode)} />
        )}

        {currentMode === 'notice' && (
          <InvitationPreviewView onNavigate={(mode) => setMode(mode)} />
        )}

        {currentMode === 'catering' && (
          <CateringSimulator onOpenAltarSetting={() => setMode('altar-setting')} />
        )}

        {currentMode === 'estimate' && (
          <EstimateSimulator />
        )}

        {currentMode === 'seating' && (
          <SeatingSimulator />
        )}

        {(currentMode === 'drill' || currentMode === 'weakness' || currentMode === 'bookmarks') && (
          <QuizView
            questions={drillQuestions}
            title={drillTitle}
            subtitle={drillSubtitle}
            onFinish={() => {
              if (activeStageNumber) {
                setMode('workflow');
              } else {
                setMode('courses');
              }
            }}
            userProgress={userProgress}
            setUserProgress={setUserProgress}
          />
        )}

        {currentMode === 'exam' && (
          <ExamModeView
            selectedCourseId={selectedCourseId}
            onBack={() => setMode('courses')}
            onGoToDiploma={() => setMode('diploma')}
            userProgress={userProgress}
            setUserProgress={setUserProgress}
          />
        )}

        {currentMode === 'vocab' && (
          <VocabularyDrillView
            onBack={() => setMode('courses')}
            userProgress={userProgress}
          />
        )}

        {currentMode === 'cheatsheet' && (
          <CheatSheetView onBack={() => setMode('courses')} />
        )}

        {currentMode === 'diploma' && (
          <DiplomaView
            selectedCourseId={selectedCourseId}
            setSelectedCourseId={setSelectedCourseId}
            onBack={() => setMode('courses')}
            userProgress={userProgress}
            setUserProgress={setUserProgress}
          />
        )}
      </main>

      {/* Academic Institutional Footer */}
      <footer className="no-print bg-white text-stone-600 text-xs py-8 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-stone-900 font-serif-jp font-bold text-sm flex items-center justify-center sm:justify-start gap-2">
              <Building2 className="w-4 h-4 text-stone-700" />
              <span>葬儀施行・準備マニュアル（三大工程完全網羅）</span>
              <span className="text-[11px] font-normal text-stone-800 bg-stone-100 px-2 py-0.5 rounded-full border border-stone-300">
                実務三大工程 × 見積り・祭壇図面・進行連動
              </span>
            </div>
            <p className="text-stone-500 text-[11px]">
              厚生労働省認定 葬祭ディレクター技能審査基準および葬儀社実務現場マニュアル完全準拠
            </p>
          </div>

          <div className="flex items-center gap-4 text-stone-500">
            <button
              onClick={handleResetData}
              className="text-stone-500 hover:text-rose-600 flex items-center gap-1 text-[11px] transition-colors"
              title="学習データを初期化"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>データ初期化</span>
            </button>
            <span className="text-stone-300">|</span>
            <span className="text-[11px] text-stone-500">
              © 2026 Funeral Director Professional Manual System
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
