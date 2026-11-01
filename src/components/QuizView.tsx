import React, { useState, useEffect, useCallback } from 'react';
import { Question, UserProgressState } from '../types/quiz';
import { soundEffects } from '../utils/audio';
import { 
  AlertCircle, 
  ArrowLeft, 
  Bookmark, 
  Check, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  HelpCircle, 
  Lightbulb, 
  Lock, 
  RotateCcw, 
  Sparkles, 
  Unlock, 
  X, 
  XCircle 
} from 'lucide-react';

interface QuizViewProps {
  questions: Question[];
  title: string;
  subtitle?: string;
  onFinish: () => void;
  userProgress: UserProgressState;
  setUserProgress: React.Dispatch<React.SetStateAction<UserProgressState>>;
}

export const QuizView: React.FC<QuizViewProps> = ({
  questions,
  title,
  subtitle,
  onFinish,
  userProgress,
  setUserProgress
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [viewMode, setViewMode] = useState<'four_sheet' | 'single_qa'>(
    userProgress.studyViewMode || 'four_sheet'
  );

  const [singleStatementIndex, setSingleStatementIndex] = useState(0);

  const [statementJudgments, setStatementJudgments] = useState<
    Record<number, { selected: boolean; isCorrect: boolean } | null>
  >({ 0: null, 1: null, 2: null, 3: null });

  const currentQuestion = questions[currentQuestionIndex];
  const isBookmarked = currentQuestion ? userProgress.bookmarkedQuestionIds.includes(currentQuestion.id) : false;

  useEffect(() => {
    setStatementJudgments({ 0: null, 1: null, 2: null, 3: null });
    setSingleStatementIndex(0);
  }, [currentQuestionIndex]);

  const handleJudge = useCallback((optionIdx: number, userPickIsTrue: boolean) => {
    if (!currentQuestion) return;

    const actualTruth = currentQuestion.optionTruths[optionIdx];
    const isCorrect = userPickIsTrue === actualTruth;

    if (userProgress.soundEnabled) {
      if (isCorrect) {
        soundEffects.playCorrect();
      } else {
        soundEffects.playWrong();
      }
    }

    setStatementJudgments(prev => ({
      ...prev,
      [optionIdx]: { selected: userPickIsTrue, isCorrect }
    }));

    setUserProgress(prev => {
      const qId = currentQuestion.id;
      const prevRecord = prev.answeredQuestions[qId] || { answeredCount: 0, correctCount: 0, lastAnsweredAt: 0 };
      return {
        ...prev,
        answeredQuestions: {
          ...prev.answeredQuestions,
          [qId]: {
            answeredCount: prevRecord.answeredCount + 1,
            correctCount: isCorrect ? prevRecord.correctCount + 1 : prevRecord.correctCount,
            lastAnsweredAt: Date.now()
          }
        }
      };
    });
  }, [currentQuestion, userProgress.soundEnabled, setUserProgress]);

  const toggleBookmark = () => {
    if (!currentQuestion) return;
    const qId = currentQuestion.id;
    setUserProgress(prev => {
      const exists = prev.bookmarkedQuestionIds.includes(qId);
      return {
        ...prev,
        bookmarkedQuestionIds: exists
          ? prev.bookmarkedQuestionIds.filter(id => id !== qId)
          : [...prev.bookmarkedQuestionIds, qId]
      };
    });
  };

  const setStudyView = (mode: 'four_sheet' | 'single_qa') => {
    setViewMode(mode);
    setUserProgress(prev => ({ ...prev, studyViewMode: mode }));
  };

  const correctCount = [0, 1, 2, 3].filter(idx => statementJudgments[idx]?.isCorrect).length;
  const allFourCorrect = correctCount === 4;

  const handleNextQuestion = () => {
    if (!allFourCorrect) return;

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      onFinish();
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleResetCurrent = () => {
    setStatementJudgments({ 0: null, 1: null, 2: null, 3: null });
    setSingleStatementIndex(0);
  };

  if (!currentQuestion) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center space-y-4">
        <p className="text-stone-600">演習対象の問題がありません。</p>
        <button
          onClick={onFinish}
          className="px-5 py-2.5 bg-stone-900 text-white rounded-xl text-sm font-bold"
        >
          三大工程一覧に戻る
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6 font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-3">
        <div className="flex items-center gap-3">
          <button
            onClick={onFinish}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 px-3 py-1.5 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>三大工程一覧へ</span>
          </button>
          <div>
            <h2 className="text-xs sm:text-sm font-bold text-stone-900 font-serif-jp truncate max-w-sm sm:max-w-md">
              {title}
            </h2>
            {subtitle && <p className="text-[11px] text-stone-500">{subtitle}</p>}
          </div>
        </div>

        {/* View Mode Switcher and Bookmark */}
        <div className="flex items-center gap-2">
          <div className="bg-stone-100 p-0.5 rounded-xl border border-stone-200 text-xs flex items-center">
            <button
              onClick={() => setStudyView('four_sheet')}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                viewMode === 'four_sheet'
                  ? 'bg-stone-900 text-white font-bold shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              4題〇✕シート
            </button>
            <button
              onClick={() => setStudyView('single_qa')}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                viewMode === 'single_qa'
                  ? 'bg-stone-900 text-white font-bold shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              一問一答モード
            </button>
          </div>

          <button
            onClick={toggleBookmark}
            className={`p-2 rounded-lg text-xs font-medium flex items-center gap-1 transition-all ${
              isBookmarked
                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
            }`}
            title={isBookmarked ? 'ブックマーク解除' : '要復習ブックマークに追加'}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-600 text-amber-600' : ''}`} />
            <span className="hidden sm:inline">{isBookmarked ? '保存済' : '要復習'}</span>
          </button>
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs text-stone-600">
          <div className="flex items-center gap-2">
            <span className="font-bold text-stone-900 text-sm">
              問題セット {currentQuestionIndex + 1} / {questions.length}
            </span>
            {currentQuestion.workflowStage && (
              <span className="bg-stone-900 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                第{currentQuestion.workflowStage}工程
              </span>
            )}
            <span className="bg-stone-100 text-stone-800 text-[10px] font-bold px-2 py-0.5 rounded border border-stone-200">
              {currentQuestion.category}
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono">
            <span className="text-stone-500 text-[11px]">本問の記憶定着:</span>
            <span className={`font-bold px-2 py-0.5 rounded text-xs ${
              allFourCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-700'
            }`}>
              {correctCount} / 4 問正解
            </span>
          </div>
        </div>

        <div className="h-2 w-full bg-stone-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-stone-800 transition-all duration-300 rounded-full"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Master Theme Banner */}
      <div className="bg-stone-900 text-white p-5 rounded-2xl shadow-sm border border-stone-800 space-y-2">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="bg-stone-800 text-amber-200 px-2 py-0.5 rounded border border-stone-700 font-semibold text-[11px]">
            【葬祭実務テーマ】
          </span>
          <span className="text-stone-300 text-[11px]">
            {currentQuestion.targetQuestionType === 'find_correct'
              ? '形式：最も適切な記述（○）を1つ特定する論点'
              : '形式：最も不適切な記述（✕）を1つ特定する論点'}
          </span>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-stone-100 font-serif-jp leading-relaxed">
          {currentQuestion.question}
        </h3>

        <div className="text-[11px] text-stone-300 bg-white/10 p-2.5 rounded-xl border border-white/10 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span>
              <strong>学習ルール：</strong> 下の各選択肢（4問）について、右側のボックスで「○（正しい）」か「✕（誤り）」を判定してください。<strong>間違っていると次に進めません。その場で正解を選び直して完全に記憶してください。</strong>
            </span>
          </div>
        </div>
      </div>

      {/* VIEW MODE 1: 4題並列 〇✕即時判定シート */}
      {viewMode === 'four_sheet' ? (
        <div className="space-y-4">
          {currentQuestion.options.map((optionText, idx) => {
            const judgment = statementJudgments[idx];
            const isJudged = judgment !== null;
            const isCorrect = judgment?.isCorrect;
            const actualTruth = currentQuestion.optionTruths[idx];

            let rowBorder = 'border-stone-200 bg-white';
            let rightBoxBg = 'bg-stone-50 border-stone-200';

            if (isJudged) {
              if (isCorrect) {
                rowBorder = 'border-emerald-300 bg-emerald-50/20 ring-1 ring-emerald-400/30';
                rightBoxBg = 'bg-emerald-50 border-emerald-300';
              } else {
                rowBorder = 'border-rose-300 bg-rose-50/20 ring-1 ring-rose-400/30 animate-pulse';
                rightBoxBg = 'bg-rose-50 border-rose-300';
              }
            }

            return (
              <div
                key={idx}
                className={`p-4 sm:p-5 rounded-2xl border transition-all shadow-2xs flex flex-col md:flex-row items-stretch justify-between gap-4 ${rowBorder}`}
              >
                {/* LEFT SIDE: Statement & Explanation */}
                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-stone-900 text-white text-xs font-bold font-serif-jp flex items-center justify-center shrink-0">
                      肢 {idx + 1}
                    </span>

                    <span className="text-xs font-semibold text-stone-500">
                      第 {idx + 1} 肢の記述
                    </span>

                    {/* Status badge */}
                    {isJudged && (
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                        isCorrect ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-rose-100 text-rose-800 border border-rose-300'
                      }`}>
                        {isCorrect ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            ⭕️ 正解！ 記憶達成
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5 text-rose-600" />
                            ❌ 判定誤り！ 正解を選び直してください
                          </>
                        )}
                      </span>
                    )}

                    {!isJudged && (
                      <span className="text-[10px] text-stone-400 bg-stone-100 px-2 py-0.5 rounded">
                        未判定（右の○または✕を選択）
                      </span>
                    )}
                  </div>

                  <p className="text-sm sm:text-base font-medium text-stone-900 leading-relaxed font-serif-jp">
                    {optionText}
                  </p>

                  {/* Explanation */}
                  {isJudged && (
                    <div className={`p-3.5 rounded-xl border text-xs leading-relaxed animate-in fade-in duration-200 ${
                      isCorrect 
                        ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950' 
                        : 'bg-rose-50 border-rose-200 text-rose-950'
                    }`}>
                      <div className="font-bold flex items-center gap-1.5 pb-1">
                        <span>正解判定：</span>
                        <span className="text-sm font-extrabold underline decoration-2">
                          {actualTruth ? '⭕️ 【 正しい（○） 】' : '❌ 【 誤り（✕） 】'}
                        </span>
                        {!isCorrect && (
                          <span className="text-rose-700 ml-2 font-bold animate-bounce">
                            ⚠️ 右のボックスで「{actualTruth ? '○' : '✕'}」を押し直してください！
                          </span>
                        )}
                      </div>
                      <p className="text-stone-700 mt-1">
                        {currentQuestion.explanation.detailedBreakdown[idx] || currentQuestion.explanation.correctPoint}
                      </p>
                    </div>
                  )}
                </div>

                {/* RIGHT SIDE: Interactive Judgment Box */}
                <div className={`w-full md:w-56 shrink-0 p-3 rounded-xl border flex flex-col justify-center items-center gap-2 ${rightBoxBg}`}>
                  <span className="text-[11px] font-bold text-stone-600 uppercase tracking-wide">
                    ○ ✕ 判定ボックス
                  </span>

                  <div className="grid grid-cols-2 gap-2 w-full">
                    <button
                      onClick={() => handleJudge(idx, true)}
                      className={`py-3 px-2 rounded-xl font-bold text-sm sm:text-base transition-all flex flex-col items-center justify-center gap-1 active:scale-95 cursor-pointer shadow-2xs ${
                        judgment?.selected === true
                          ? isCorrect
                            ? 'bg-emerald-600 text-white ring-2 ring-emerald-600'
                            : 'bg-rose-600 text-white ring-2 ring-rose-600'
                          : 'bg-white hover:bg-stone-100 text-emerald-700 border-2 border-emerald-300'
                      }`}
                    >
                      <span className="text-xl leading-none">⭕️</span>
                      <span className="text-[11px]">正しい</span>
                    </button>

                    <button
                      onClick={() => handleJudge(idx, false)}
                      className={`py-3 px-2 rounded-xl font-bold text-sm sm:text-base transition-all flex flex-col items-center justify-center gap-1 active:scale-95 cursor-pointer shadow-2xs ${
                        judgment?.selected === false
                          ? isCorrect
                            ? 'bg-emerald-600 text-white ring-2 ring-emerald-600'
                            : 'bg-rose-600 text-white ring-2 ring-rose-600'
                          : 'bg-white hover:bg-stone-100 text-rose-700 border-2 border-rose-300'
                      }`}
                    >
                      <span className="text-xl leading-none">❌</span>
                      <span className="text-[11px]">誤り</span>
                    </button>
                  </div>

                  <div className="text-[11px] text-center font-bold h-5 flex items-center justify-center">
                    {isJudged ? (
                      isCorrect ? (
                        <span className="text-emerald-700 flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> 正解（記憶完了）
                        </span>
                      ) : (
                        <span className="text-rose-600 flex items-center gap-1 animate-pulse">
                          <X className="w-3.5 h-3.5" /> 判定ミス！再選択して
                        </span>
                      )
                    ) : (
                      <span className="text-stone-400">どちらかを選択</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* VIEW MODE 2: 一問一答スピード特訓 */
        <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-lg bg-stone-900 text-white text-xs font-bold font-serif-jp">
                肢 {singleStatementIndex + 1} / 4
              </span>
              <span className="text-xs text-stone-500 font-medium">
                一問一答 〇✕スピード記憶モード
              </span>
            </div>

            <div className="flex items-center gap-1">
              {[0, 1, 2, 3].map(i => {
                const isJ = statementJudgments[i];
                const isC = isJ?.isCorrect;
                return (
                  <button
                    key={i}
                    onClick={() => setSingleStatementIndex(i)}
                    className={`w-6 h-6 rounded-md text-xs font-bold transition-all ${
                      singleStatementIndex === i ? 'ring-2 ring-stone-900' : ''
                    } ${
                      isJ ? (isC ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white') : 'bg-stone-200 text-stone-600'
                    }`}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2 space-y-4">
              <div className="text-xs font-bold text-stone-800 bg-stone-100 px-2.5 py-1 rounded w-fit border border-stone-200">
                記述内容の真偽を右側で判定してください：
              </div>
              <p className="text-base sm:text-lg font-bold text-stone-900 leading-relaxed font-serif-jp">
                {currentQuestion.options[singleStatementIndex]}
              </p>

              {statementJudgments[singleStatementIndex] && (
                <div className={`p-4 rounded-xl border text-xs leading-relaxed animate-in fade-in ${
                  statementJudgments[singleStatementIndex]?.isCorrect
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                    : 'bg-rose-50 border-rose-300 text-rose-950'
                }`}>
                  <span className="font-bold text-sm block mb-1">
                    {statementJudgments[singleStatementIndex]?.isCorrect ? '⭕️ 正解です！' : '❌ 不正解！選び直して記憶してください'}
                  </span>
                  <p>
                    {currentQuestion.explanation.detailedBreakdown[singleStatementIndex] || currentQuestion.explanation.correctPoint}
                  </p>
                </div>
              )}
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col gap-3 justify-center items-center">
              <span className="text-xs font-bold text-stone-600">
                右側のボックスで解答
              </span>

              <button
                onClick={() => handleJudge(singleStatementIndex, true)}
                className="w-full py-4 rounded-xl border-2 border-emerald-400 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-extrabold text-lg flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer shadow-2xs"
              >
                <span className="text-2xl">⭕️</span>
                <span>正しい（○）</span>
              </button>

              <button
                onClick={() => handleJudge(singleStatementIndex, false)}
                className="w-full py-4 rounded-xl border-2 border-rose-400 bg-rose-50 hover:bg-rose-100 text-rose-900 font-extrabold text-lg flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer shadow-2xs"
              >
                <span className="text-2xl">❌</span>
                <span>誤り（✕）</span>
              </button>

              <div className="flex justify-between w-full pt-2">
                <button
                  onClick={() => setSingleStatementIndex(prev => Math.max(0, prev - 1))}
                  disabled={singleStatementIndex === 0}
                  className="px-2 py-1 text-xs text-stone-500 hover:text-stone-800 disabled:opacity-30"
                >
                  ← 前の肢
                </button>
                <button
                  onClick={() => setSingleStatementIndex(prev => Math.min(3, prev + 1))}
                  disabled={singleStatementIndex === 3}
                  className="px-2 py-1 text-xs text-stone-500 hover:text-stone-800 disabled:opacity-30"
                >
                  次の肢 →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Completion or Lock Bar */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-xs space-y-4">
        {allFourCorrect ? (
          <div className="space-y-4 animate-in zoom-in-95 duration-200">
            <div className="p-4 rounded-xl bg-emerald-50 border-2 border-emerald-400 text-emerald-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <Check className="w-6 h-6 stroke-3" />
                </div>
                <div>
                  <h4 className="font-bold text-sm sm:text-base text-emerald-900 font-serif-jp">
                    🎉 4問すべて正解！この実務論点を完全記憶・マスターしました！
                  </h4>
                  <p className="text-xs text-emerald-800 font-medium mt-0.5">
                    【本試験の結論】
                    {currentQuestion.targetQuestionType === 'find_correct' ? '最も適切な記述' : '最も不適切な記述'}
                    は <strong>【 肢 {currentQuestion.correctIndex + 1} 】</strong> です。
                  </p>
                </div>
              </div>

              <button
                onClick={handleNextQuestion}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all shrink-0 cursor-pointer"
              >
                <span>{currentQuestionIndex < questions.length - 1 ? '次の4問セットへ進む' : 'すべての演習を完了する'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {currentQuestion.explanation.proTip && (
                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                  <span className="font-bold text-stone-900 flex items-center gap-1 text-[11px]">
                    <Sparkles className="w-3.5 h-3.5 text-stone-600" />
                    葬祭ディレクターの急所アドバイス
                  </span>
                  <p className="text-stone-700 leading-relaxed">
                    {currentQuestion.explanation.proTip}
                  </p>
                </div>
              )}

              {currentQuestion.explanation.examTip && (
                <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1">
                  <span className="font-bold text-amber-950 flex items-center gap-1 text-[11px]">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-700" />
                    技能審査学科の暗記ポイント
                  </span>
                  <p className="text-stone-700 leading-relaxed">
                    {currentQuestion.explanation.examTip}
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-stone-100 border border-stone-300 text-stone-700 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="w-9 h-9 rounded-full bg-stone-300 text-stone-600 flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <span className="font-bold text-stone-800 text-sm block">
                  🔒 記憶ロック発動中（現在 {correctCount} / 4 問正解）
                </span>
                <span className="text-stone-500">
                  間違っていたり未回答の肢があります。すべて正解するまで次に進めません。
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                onClick={handleResetCurrent}
                className="px-3 py-2 rounded-xl bg-white hover:bg-stone-200 text-stone-700 text-xs font-semibold border border-stone-200 flex items-center gap-1"
                title="この4問を最初から解き直す"
              >
                <RotateCcw className="w-3.5 h-3.5 text-stone-500" />
                <span>やり直す</span>
              </button>

              <button
                disabled
                className="px-5 py-2.5 rounded-xl bg-stone-300 text-stone-500 font-bold text-xs cursor-not-allowed flex items-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>全問正解で次へ進めます</span>
              </button>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between text-xs pt-2 border-t border-stone-100">
          <button
            onClick={handlePrevQuestion}
            disabled={currentQuestionIndex === 0}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1 font-medium ${
              currentQuestionIndex === 0 ? 'text-stone-300 cursor-not-allowed' : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>前の4問セットへ</span>
          </button>

          <span className="text-stone-400 text-[11px]">
            全問正解すると自動的に次へ進むボタンがアンロックされます
          </span>

          <button
            onClick={handleResetCurrent}
            className="text-stone-500 hover:text-stone-800 flex items-center gap-1 text-[11px]"
          >
            <RotateCcw className="w-3 h-3" />
            <span>回答リセット</span>
          </button>
        </div>
      </div>
    </div>
  );
};
