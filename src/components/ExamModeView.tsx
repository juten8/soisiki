import React, { useState, useEffect } from 'react';
import { CourseId, Question, UserProgressState } from '../types/quiz';
import { COURSES_DATA } from '../data/coursesData';
import { QUESTIONS_DATA } from '../data/questionsData';
import { generateCertificateId } from '../utils/storage';
import { soundEffects } from '../utils/audio';
import confetti from 'canvas-confetti';
import { 
  AlertCircle, 
  ArrowLeft, 
  Award, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  FileCheck, 
  GraduationCap, 
  RotateCcw, 
  Sparkles, 
  XCircle,
  Building2
} from 'lucide-react';

interface ExamModeViewProps {
  selectedCourseId: CourseId;
  onBack: () => void;
  onGoToDiploma: () => void;
  userProgress: UserProgressState;
  setUserProgress: React.Dispatch<React.SetStateAction<UserProgressState>>;
}

export const ExamModeView: React.FC<ExamModeViewProps> = ({
  selectedCourseId,
  onBack,
  onGoToDiploma,
  userProgress,
  setUserProgress
}) => {
  const currentCourse = COURSES_DATA.find(c => c.id === selectedCourseId) || COURSES_DATA[0];

  const examQuestions = QUESTIONS_DATA.filter(q => q.courseId === selectedCourseId);
  const questionsToUse = examQuestions.length > 0 ? examQuestions : QUESTIONS_DATA.slice(0, 8);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [flagged, setFlagged] = useState<Record<number, boolean>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(currentCourse.examTimeLimitMinutes * 60);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  useEffect(() => {
    if (isSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeftSeconds(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted]);

  const currentQ = questionsToUse[currentIndex];

  const handleSelectOption = (optionIdx: number) => {
    if (isSubmitted) return;
    setAnswers(prev => ({ ...prev, [currentIndex]: optionIdx }));
  };

  const toggleFlag = (index: number) => {
    setFlagged(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const handleSubmitExam = () => {
    setIsConfirmModalOpen(false);
    setIsSubmitted(true);

    let correctCount = 0;
    questionsToUse.forEach((q, idx) => {
      if (answers[idx] === q.correctIndex) {
        correctCount += 1;
      }
    });

    const scorePct = Math.round((correctCount / questionsToUse.length) * 100);
    const passed = scorePct >= currentCourse.examPassingScore;

    if (passed) {
      if (userProgress.soundEnabled) {
        soundEffects.playFanfare();
      }
      confetti({
        particleCount: 100,
        spread: 60,
        origin: { y: 0.6 }
      });

      setUserProgress(prev => ({
        ...prev,
        passedCourses: {
          ...prev.passedCourses,
          [selectedCourseId]: {
            passedAt: Date.now(),
            score: scorePct,
            candidateName: prev.studentName,
            certificateId: prev.passedCourses[selectedCourseId]?.certificateId || generateCertificateId(selectedCourseId)
          }
        }
      }));
    } else {
      if (userProgress.soundEnabled) {
        soundEffects.playWrong();
      }
    }
  };

  const minutes = Math.floor(timeLeftSeconds / 60);
  const seconds = timeLeftSeconds % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  let correctCount = 0;
  questionsToUse.forEach((q, idx) => {
    if (answers[idx] === q.correctIndex) {
      correctCount += 1;
    }
  });
  const scorePct = questionsToUse.length > 0 ? Math.round((correctCount / questionsToUse.length) * 100) : 0;
  const isPassed = scorePct >= currentCourse.examPassingScore;
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6 font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-stone-900 text-white p-4 sm:p-5 rounded-2xl shadow-md border border-stone-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="bg-stone-800 text-amber-200 text-[10px] font-bold px-2 py-0.5 rounded border border-stone-700">
              葬祭ディレクター本番模擬試験
            </span>
            <span className="text-xs text-stone-400">合格基準: {currentCourse.examPassingScore}%以上</span>
          </div>
          <h2 className="text-base sm:text-lg font-bold font-serif-jp text-stone-100">
            {currentCourse.title}
          </h2>
        </div>

        {/* Timer & Controls */}
        <div className="flex items-center gap-3">
          {!isSubmitted ? (
            <>
              <div className="flex items-center gap-2 bg-stone-800 px-3 py-1.5 rounded-xl border border-stone-700 text-xs font-mono">
                <Clock className="w-4 h-4 text-amber-300" />
                <span className={`font-bold ${timeLeftSeconds < 300 ? 'text-rose-400 animate-pulse' : 'text-stone-100'}`}>
                  残り {timeFormatted}
                </span>
              </div>

              <button
                onClick={() => setIsConfirmModalOpen(true)}
                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-900 font-bold text-xs rounded-xl shadow-xs transition-all active:scale-95"
              >
                解答を提出する
              </button>
            </>
          ) : (
            <button
              onClick={onBack}
              className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-white font-medium text-xs rounded-xl flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>講義一覧に戻る</span>
            </button>
          )}
        </div>
      </div>

      {/* Result Card when Submitted */}
      {isSubmitted && (
        <div className={`p-6 sm:p-8 rounded-2xl border text-center space-y-5 animate-in zoom-in-95 duration-300 shadow-md ${
          isPassed 
            ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950' 
            : 'bg-rose-50/80 border-rose-300 text-rose-950'
        }`}>
          <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center shadow-sm bg-white">
            {isPassed ? (
              <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            ) : (
              <XCircle className="w-10 h-10 text-rose-600" />
            )}
          </div>

          <div className="space-y-2">
            <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
              isPassed ? 'bg-emerald-200 text-emerald-900' : 'bg-rose-200 text-rose-900'
            }`}>
              {isPassed ? '合格 PASS' : '不合格 FAIL'}
            </span>

            <h3 className="text-2xl sm:text-3xl font-bold font-serif-jp pt-1">
              {isPassed 
                ? 'おめでとうございます！葬祭ディレクター基準認定合格です！' 
                : '合格基準に届きませんでした。弱点項目を復習して再挑戦しましょう。'}
            </h3>

            <div className="flex items-center justify-center gap-6 pt-3 text-sm">
              <div>
                <span className="text-stone-500 text-xs block">得点率</span>
                <span className="text-3xl font-extrabold">{scorePct}%</span>
              </div>
              <div className="h-8 w-px bg-stone-300" />
              <div>
                <span className="text-stone-500 text-xs block">正答数</span>
                <span className="text-3xl font-extrabold">{correctCount} / {questionsToUse.length} 問</span>
              </div>
              <div className="h-8 w-px bg-stone-300" />
              <div>
                <span className="text-stone-500 text-xs block">合格ライン</span>
                <span className="text-3xl font-bold text-stone-700">{currentCourse.examPassingScore}%</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            {isPassed && (
              <button
                onClick={onGoToDiploma}
                className="px-6 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm shadow-md flex items-center gap-2 active:scale-95 transition-all"
              >
                <GraduationCap className="w-5 h-5 text-amber-200" />
                <span>公式認定ディプロマ（修了証）を表示・印刷</span>
              </button>
            )}

            <button
              onClick={() => {
                setIsSubmitted(false);
                setAnswers({});
                setFlagged({});
                setTimeLeftSeconds(currentCourse.examTimeLimitMinutes * 60);
                setCurrentIndex(0);
              }}
              className="px-5 py-3 rounded-xl bg-white hover:bg-stone-100 text-stone-800 font-bold text-sm border border-stone-300 flex items-center gap-2 shadow-2xs transition-all"
            >
              <RotateCcw className="w-4 h-4 text-stone-600" />
              <span>もう一度受験する</span>
            </button>
          </div>
        </div>
      )}

      {/* Question Palette Navigation Grid */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs space-y-2">
        <div className="flex items-center justify-between text-xs text-stone-500 pb-1">
          <span className="font-medium text-stone-700">問題一覧ナビゲーター</span>
          <span>解答済み: {answeredCount} / {questionsToUse.length} 問</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {questionsToUse.map((q, idx) => {
            const isAnsweredQ = answers[idx] !== undefined;
            const isCurrent = currentIndex === idx;
            const isFlagged = flagged[idx];

            let bg = 'bg-stone-100 text-stone-700 hover:bg-stone-200';
            if (isAnsweredQ) {
              bg = 'bg-stone-200 text-stone-900 font-bold border border-stone-400';
            }
            if (isSubmitted) {
              const isCorrectQ = answers[idx] === q.correctIndex;
              bg = isCorrectQ ? 'bg-emerald-100 text-emerald-900 border border-emerald-400 font-bold' : 'bg-rose-100 text-rose-900 border border-rose-400 font-bold';
            }

            return (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`relative w-8 h-8 rounded-lg text-xs font-medium transition-all ${bg} ${
                  isCurrent ? 'ring-2 ring-stone-900 ring-offset-1 font-bold' : ''
                }`}
              >
                {idx + 1}
                {isFlagged && !isSubmitted && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-500 border border-white" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Question Display */}
      {currentQ && (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-stone-900 text-white text-xs font-bold font-serif-jp">
                第 {currentIndex + 1} 問
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-stone-100 text-stone-800 text-xs font-medium">
                {currentQ.category}
              </span>
            </div>

            {!isSubmitted && (
              <button
                onClick={() => toggleFlag(currentIndex)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors ${
                  flagged[currentIndex] 
                    ? 'bg-amber-100 text-amber-900 border border-amber-300' 
                    : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
                }`}
              >
                <span>{flagged[currentIndex] ? '★ 見直しチェック中' : '☆ あとで見直す'}</span>
              </button>
            )}
          </div>

          <h3 className="text-base sm:text-lg font-bold text-stone-900 leading-relaxed font-serif-jp">
            {currentQ.question}
          </h3>

          {/* Options */}
          <div className="space-y-3 pt-2">
            {currentQ.options.map((option, optIdx) => {
              const isSelected = answers[currentIndex] === optIdx;
              const isCorrectOpt = optIdx === currentQ.correctIndex;

              let style = 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-800';
              if (isSelected) {
                style = 'bg-stone-100 border-stone-800 text-stone-950 font-medium ring-1 ring-stone-800';
              }

              if (isSubmitted) {
                if (isCorrectOpt) {
                  style = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-500/20';
                } else if (isSelected) {
                  style = 'bg-rose-50 border-rose-400 text-rose-950 ring-2 ring-rose-400/20';
                } else {
                  style = 'bg-stone-50/50 border-stone-200 text-stone-400 opacity-60';
                }
              }

              return (
                <button
                  key={optIdx}
                  disabled={isSubmitted}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 ${style} ${
                    !isSubmitted ? 'cursor-pointer' : 'cursor-default'
                  }`}
                >
                  <span className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center text-xs font-bold ${
                    isSelected ? 'bg-stone-900 text-white' : 'bg-stone-200 text-stone-700'
                  }`}>
                    {optIdx + 1}
                  </span>

                  <span className="text-xs sm:text-sm leading-relaxed flex-1 pt-0.5">
                    {option}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Detailed explanation when submitted */}
          {isSubmitted && (
            <div className="pt-6 border-t border-stone-200 space-y-4 animate-in fade-in duration-200">
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                <span className="font-bold text-xs text-stone-900 block font-serif-jp">
                  【正解：{currentQ.correctIndex + 1}】 解説と根拠
                </span>
                <p className="text-xs text-stone-800 font-medium leading-relaxed">
                  {currentQ.explanation.correctPoint}
                </p>
                <div className="space-y-1.5 pt-2 text-xs text-stone-600">
                  {currentQ.explanation.detailedBreakdown.map((item, idx) => (
                    <p key={idx} className="pl-3 border-l-2 border-stone-400">
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Prev / Next within Exam */}
          <div className="flex items-center justify-between pt-4 border-t border-stone-100">
            <button
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className={`px-4 py-2 rounded-lg text-xs font-medium flex items-center gap-1 ${
                currentIndex === 0 ? 'text-stone-300 cursor-not-allowed' : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>前の問題</span>
            </button>

            <span className="text-xs text-stone-400 font-mono">
              {currentIndex + 1} / {questionsToUse.length}
            </span>

            <button
              onClick={() => setCurrentIndex(prev => Math.min(questionsToUse.length - 1, prev + 1))}
              disabled={currentIndex === questionsToUse.length - 1}
              className={`px-4 py-2 rounded-lg text-xs font-medium flex items-center gap-1 ${
                currentIndex === questionsToUse.length - 1 ? 'text-stone-300 cursor-not-allowed' : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              <span>次の問題</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-stone-200">
            <div className="flex items-center gap-3 text-stone-800">
              <AlertCircle className="w-6 h-6" />
              <h4 className="text-base font-bold font-serif-jp text-stone-900">
                模擬試験の解答を提出しますか？
              </h4>
            </div>

            <div className="space-y-2 text-xs text-stone-600 bg-stone-50 p-3.5 rounded-xl border border-stone-200 font-mono">
              <div className="flex justify-between">
                <span>総問題数:</span>
                <span className="font-bold">{questionsToUse.length}問</span>
              </div>
              <div className="flex justify-between">
                <span>解答済み:</span>
                <span className="font-bold text-stone-900">{answeredCount}問</span>
              </div>
              <div className="flex justify-between">
                <span>未解答:</span>
                <span className={`font-bold ${questionsToUse.length - answeredCount > 0 ? 'text-rose-600' : 'text-stone-700'}`}>
                  {questionsToUse.length - answeredCount}問
                </span>
              </div>
              <div className="flex justify-between">
                <span>見直しチェック中:</span>
                <span className="font-bold text-stone-700">{Object.values(flagged).filter(Boolean).length}問</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsConfirmModalOpen(false)}
                className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100 text-xs font-medium"
              >
                まだ続ける
              </button>
              <button
                onClick={handleSubmitExam}
                className="px-5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs shadow-xs"
              >
                提出して採点する
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
