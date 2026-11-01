import React, { useState } from 'react';
import { VocabQuestion, UserProgressState } from '../types/quiz';
import { VOCAB_QUESTIONS_DATA } from '../data/vocabData';
import { soundEffects } from '../utils/audio';
import { 
  ArrowLeft, 
  Check, 
  ChevronRight, 
  Eye, 
  FileText, 
  HelpCircle, 
  Lightbulb, 
  RotateCcw, 
  Sparkles, 
  X,
  Building2
} from 'lucide-react';

interface VocabularyDrillViewProps {
  onBack: () => void;
  userProgress: UserProgressState;
}

export const VocabularyDrillView: React.FC<VocabularyDrillViewProps> = ({
  onBack,
  userProgress
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const currentQ = VOCAB_QUESTIONS_DATA[currentIndex];

  const handleCheckAnswer = () => {
    if (!userInput.trim() || isAnswered || !currentQ) return;

    const normalizedInput = userInput.trim().replace(/\s+/g, '');
    const isMatch = [
      currentQ.answer,
      currentQ.reading,
      ...(currentQ.acceptableAnswers || [])
    ].some(ans => ans && ans.replace(/\s+/g, '') === normalizedInput);

    setIsAnswered(true);
    setScore(prev => ({
      correct: isMatch ? prev.correct + 1 : prev.correct,
      total: prev.total + 1
    }));

    if (userProgress.soundEnabled) {
      if (isMatch) {
        soundEffects.playCorrect();
      } else {
        soundEffects.playWrong();
      }
    }
  };

  const handleRevealAnswer = () => {
    if (isAnswered) return;
    setIsAnswered(true);
    setScore(prev => ({
      ...prev,
      total: prev.total + 1
    }));
    if (userProgress.soundEnabled) {
      soundEffects.playWrong();
    }
  };

  const handleNext = () => {
    if (currentIndex < VOCAB_QUESTIONS_DATA.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setUserInput('');
      setIsAnswered(false);
      setShowHint(false);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setUserInput('');
    setIsAnswered(false);
    setShowHint(false);
    setScore({ correct: 0, total: 0 });
  };

  const normalizedInput = userInput.trim().replace(/\s+/g, '');
  const isMatch = currentQ
    ? [currentQ.answer, currentQ.reading, ...(currentQ.acceptableAnswers || [])].some(
        ans => ans && ans.replace(/\s+/g, '') === normalizedInput
      )
    : false;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6 font-sans">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-stone-200 pb-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 px-3 py-1.5 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>カリキュラムに戻る</span>
        </button>

        <div className="text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider bg-stone-100 text-stone-800 px-2 py-0.5 rounded-full border border-stone-300">
            葬祭ディレクター技能審査
          </span>
          <h2 className="text-sm sm:text-base font-bold text-stone-900 font-serif-jp">
            葬儀重要用語・漢字記述特訓
          </h2>
        </div>

        <div className="text-right text-xs">
          <span className="text-stone-400 block text-[10px]">正答率</span>
          <span className="font-bold text-stone-800">
            {score.total > 0 ? `${Math.round((score.correct / score.total) * 100)}%` : '--'} ({score.correct}/{score.total})
          </span>
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-stone-500">
          <span>問題 {currentIndex + 1} / {VOCAB_QUESTIONS_DATA.length}</span>
          <span>進捗: {Math.round(((currentIndex + 1) / VOCAB_QUESTIONS_DATA.length) * 100)}%</span>
        </div>
        <div className="h-2 w-full bg-stone-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-stone-800 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / VOCAB_QUESTIONS_DATA.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Card */}
      {currentQ && (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-0.5 rounded-md bg-stone-900 text-white text-xs font-bold font-serif-jp">
              【用語記述 第{currentIndex + 1}問】
            </span>
            <span className="text-xs font-medium text-stone-600 bg-stone-100 px-2 py-0.5 rounded">
              {currentQ.category}
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-stone-900 leading-relaxed font-serif-jp">
            {currentQ.question}
          </h3>

          {/* Input Field */}
          <div className="space-y-3 pt-2">
            <label className="block text-xs font-semibold text-stone-600">
              空欄に入る最も適切な葬祭専門用語を入力してください：
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                disabled={isAnswered}
                value={userInput}
                onChange={e => setUserInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleCheckAnswer()}
                placeholder="例: 枕経 または まくらぎょう"
                className="flex-1 px-4 py-3 rounded-xl border border-stone-300 text-sm font-medium focus:ring-1 focus:ring-stone-600 outline-none transition-all disabled:bg-stone-100"
              />
              <button
                disabled={isAnswered || !userInput.trim()}
                onClick={handleCheckAnswer}
                className="px-5 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 disabled:opacity-50 text-white font-bold text-xs sm:text-sm shadow-xs transition-all cursor-pointer"
              >
                回答する
              </button>
            </div>

            {/* Hint & Reveal Controls */}
            {!isAnswered && (
              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="text-xs text-stone-700 hover:text-stone-900 flex items-center gap-1 font-medium"
                >
                  <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                  <span>{showHint ? 'ヒントを隠す' : 'ヒントを見る'}</span>
                </button>

                <button
                  onClick={handleRevealAnswer}
                  className="text-xs text-stone-500 hover:text-stone-800 flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>答えを見る</span>
                </button>
              </div>
            )}

            {showHint && !isAnswered && (
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-800 flex items-start gap-2 animate-in fade-in">
                <Sparkles className="w-4 h-4 text-stone-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">ヒント:</span> {currentQ.hint}
                </div>
              </div>
            )}
          </div>

          {/* Explanation upon answering */}
          {isAnswered && (
            <div className="pt-6 border-t border-stone-200 space-y-4 animate-in fade-in duration-200">
              <div className={`p-4 rounded-xl flex items-center gap-3 ${
                isMatch ? 'bg-emerald-50 text-emerald-950 border border-emerald-300' : 'bg-rose-50 text-rose-950 border border-rose-300'
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm text-white shrink-0 ${
                  isMatch ? 'bg-emerald-600' : 'bg-rose-600'
                }`}>
                  {isMatch ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                </div>

                <div className="text-xs sm:text-sm">
                  <div className="font-bold">
                    正解： <span className="text-base text-stone-900">{currentQ.answer}</span>
                    {currentQ.reading && (
                      <span className="text-xs text-stone-600 ml-1.5 font-normal">
                        （よみ：{currentQ.reading}）
                      </span>
                    )}
                  </div>
                  {userInput.trim() && (
                    <div className="text-xs text-stone-600 mt-0.5">
                      あなたの入力： 「{userInput.trim()}」
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2 text-xs">
                <span className="font-bold text-stone-900 block font-serif-jp">
                  解説と出題ポイント
                </span>
                <p className="text-stone-700 leading-relaxed">
                  {currentQ.explanation}
                </p>
              </div>

              <div className="flex justify-end pt-2">
                {currentIndex < VOCAB_QUESTIONS_DATA.length - 1 ? (
                  <button
                    onClick={handleNext}
                    className="px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition-all active:scale-95"
                  >
                    <span>次の単語問題へ</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xs"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>最初からもう一度特訓する</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
