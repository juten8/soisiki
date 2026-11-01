import React, { useState } from 'react';
import { WORKFLOW_STAGES_DATA } from '../data/workflowStagesData';
import { WorkflowStageNumber, WorkflowStageInfo } from '../types/quiz';
import { 
  AlertTriangle, 
  ArrowLeft, 
  ArrowRight, 
  Calendar, 
  Calculator, 
  CheckCircle2, 
  ChevronRight, 
  Clock, 
  HelpCircle, 
  Layers, 
  Sparkles, 
  Users, 
  Workflow, 
  BookOpen, 
  Compass,
  Heart,
  UtensilsCrossed,
  Utensils,
  Luggage,
  Truck,
  Mail,
  ShieldCheck,
  Building2,
  Lock
} from 'lucide-react';

interface WorkflowTimelineViewProps {
  onStartStageDrill: (stageNumber: WorkflowStageNumber) => void;
  onOpenEstimate: () => void;
  onOpenSeating: () => void;
  onOpenCatering?: () => void;
  onOpenPractical?: () => void;
  onOpenDispatch?: () => void;
  onOpenNotice?: () => void;
  onOpenAltarSetting?: () => void;
  onBackToCourses: () => void;
  stageQuestionCounts: Record<WorkflowStageNumber, number>;
}

export const WorkflowTimelineView: React.FC<WorkflowTimelineViewProps> = ({
  onStartStageDrill,
  onOpenEstimate,
  onOpenSeating,
  onOpenCatering,
  onOpenPractical,
  onOpenDispatch,
  onOpenNotice,
  onOpenAltarSetting,
  onBackToCourses,
  stageQuestionCounts,
}) => {
  const [activeStageNumber, setActiveStageNumber] = useState<WorkflowStageNumber>(1);
  const activeStage: WorkflowStageInfo = WORKFLOW_STAGES_DATA.find(s => s.stageNumber === activeStageNumber) || WORKFLOW_STAGES_DATA[0];

  const handleNextStage = () => {
    if (activeStageNumber < 3) {
      setActiveStageNumber((activeStageNumber + 1) as WorkflowStageNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevStage = () => {
    if (activeStageNumber > 1) {
      setActiveStageNumber((activeStageNumber - 1) as WorkflowStageNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header breadcrumb & introduction */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onBackToCourses}
            className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>技能審査基準・講義一覧へ戻る</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-stone-200 text-stone-800 rounded-full text-xs font-semibold">
              <Compass className="w-3.5 h-3.5 text-stone-700" />
              葬祭ディレクター必修 実務三大工程
            </span>
          </div>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif-jp text-stone-900 tracking-tight flex items-center gap-2.5">
            <Workflow className="w-7 h-7 text-stone-800" />
            <span>葬儀施行実務「三大工程」準備ロードマップ</span>
          </h1>
          <p className="text-stone-600 text-sm mt-1 max-w-3xl leading-relaxed">
            葬儀の現場は一瞬の迷いも許されません。ご遺族の深い悲しみに寄り添いながら、
            <span className="font-semibold text-stone-900">「①臨終・搬送安置・寺院日程決定 ➔ ②納棺・通夜式・通夜振る舞い ➔ ③告別式・出棺火葬・精進落とし」</span>
            の三大工程を確実に執行するための公式準備マニュアルです。
          </p>
        </div>
      </div>

      {/* Practical Execution Quick Banner */}
      {onOpenPractical && (
        <div className="bg-white border-2 border-stone-300 text-stone-900 p-4 sm:p-5 rounded-2xl shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold tracking-widest text-stone-900 bg-stone-200 px-2 py-0.5 rounded-full border border-stone-300 uppercase">
                現場ミスゼロ・実務執行
              </span>
              <span className="text-xs text-stone-500 font-serif-jp">
                言葉遊び・単なるクイズからの完全脱却
              </span>
            </div>
            <div className="text-base font-bold font-serif-jp text-stone-900 flex items-center gap-2">
              <Luggage className="w-5 h-5 text-stone-700" />
              <span>当日忘れ物ゼロ（火葬許可証・数珠）・宗派別焼香・お布施マナー・香典防犯金庫</span>
            </div>
            <p className="text-xs text-stone-600">
              火葬許可証原本の持参、浄土真宗でおしいただかない焼香、お布施の切手盆渡し、副葬品の燃えない物排除を即時確認
            </p>
          </div>
          <button
            onClick={onOpenPractical}
            className="shrink-0 px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-xl text-xs shadow-xs transition-all flex items-center gap-1.5"
          >
            <span>現場超実務マニュアルを開く</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 3 Grand Stages Interactive Stepper / Navigation (三大工程) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {WORKFLOW_STAGES_DATA.map((stage) => {
          const isActive = stage.stageNumber === activeStageNumber;
          const qCount = stageQuestionCounts[stage.stageNumber] || 0;

          return (
            <button
              key={stage.id}
              onClick={() => setActiveStageNumber(stage.stageNumber)}
              className={`p-5 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                isActive
                  ? 'bg-stone-900 text-white border-stone-950 shadow-md ring-2 ring-stone-900'
                  : 'bg-white hover:bg-stone-50 text-stone-800 border-stone-200 hover:border-stone-400 shadow-2xs'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-stone-800 text-amber-200 border border-stone-700' : 'bg-stone-100 text-stone-600'
                  }`}>
                    第{stage.stageNumber}工程
                  </span>
                  <span className={`text-[11px] font-semibold flex items-center gap-1 ${
                    isActive ? 'text-stone-300' : 'text-stone-500'
                  }`}>
                    <HelpCircle className="w-3 h-3" />
                    確認テスト{qCount}問
                  </span>
                </div>

                <div className="text-base font-bold font-serif-jp leading-snug pt-1">
                  {stage.stageNumber === 1 && '逝去・搬送安置・寺院日程決定'}
                  {stage.stageNumber === 2 && '納棺の儀 〜 通夜式・通夜振る舞い'}
                  {stage.stageNumber === 3 && '葬儀告別式 〜 出棺火葬・精進落とし'}
                </div>

                <p className={`text-xs line-clamp-2 ${isActive ? 'text-stone-300' : 'text-stone-500'}`}>
                  {stage.timing}
                </p>
              </div>

              <div className={`mt-4 pt-2.5 border-t text-[11px] flex items-center justify-between ${
                isActive ? 'border-stone-800 text-amber-300 font-semibold' : 'border-stone-100 text-stone-400'
              }`}>
                <span>{isActive ? '現在表示中' : 'クリックして詳細表示'}</span>
                <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'rotate-90 text-amber-300' : ''}`} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Stage Detailed Card */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
        {/* Stage Header Banner */}
        <div className="bg-stone-50 border-b border-stone-200 text-stone-900 p-6 sm:p-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="px-3 py-1 bg-stone-200 text-stone-800 border border-stone-300 rounded-full text-xs font-bold tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-stone-600" />
              進行時期：{activeStage.timing}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onStartStageDrill(activeStage.stageNumber)}
                className="px-3.5 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold shadow-2xs transition-all flex items-center gap-1.5"
                title="確認用セルフチェック問題"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-300" />
                <span>第{activeStage.stageNumber}工程 確認テスト（{stageQuestionCounts[activeStage.stageNumber] || 0}問）</span>
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold font-serif-jp text-stone-900 leading-tight">
              {activeStage.title}
            </h2>
            <p className="text-stone-700 text-sm font-semibold">
              💡 {activeStage.tagline}
            </p>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed max-w-4xl pt-1">
              {activeStage.leadSummary}
            </p>
          </div>

          {/* Quick Action Hub for Active Stage */}
          <div className="pt-2 flex flex-wrap items-center gap-2.5">
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
              連動実務ツール:
            </span>
            
            {activeStage.stageNumber === 1 && (
              <>
                <button
                  onClick={onOpenEstimate}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span>葬儀見積り・祭壇/火葬料シミュレーター</span>
                </button>
                {onOpenDispatch && (
                  <button
                    onClick={onOpenDispatch}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 rounded-lg text-xs font-semibold transition-colors"
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>寝台車・火葬場・寺院緊急連絡網</span>
                  </button>
                )}
                {onOpenPractical && (
                  <button
                    onClick={onOpenPractical}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 rounded-lg text-xs font-semibold transition-colors"
                  >
                    <Luggage className="w-3.5 h-3.5" />
                    <span>北枕安置・枕飾り・ドライアイス実務</span>
                  </button>
                )}
              </>
            )}

            {activeStage.stageNumber === 2 && (
              <>
                {onOpenNotice && (
                  <button
                    onClick={onOpenNotice}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>訃報連絡票・死亡通知・会葬礼状</span>
                  </button>
                )}
                {onOpenAltarSetting && (
                  <button
                    onClick={onOpenAltarSetting}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 rounded-lg text-xs font-semibold transition-colors"
                  >
                    <Utensils className="w-3.5 h-3.5" />
                    <span>生花祭壇・遺影・焼香台配置図面</span>
                  </button>
                )}
                {onOpenCatering && (
                  <button
                    onClick={onOpenCatering}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 rounded-lg text-xs font-semibold transition-colors"
                  >
                    <UtensilsCrossed className="w-3.5 h-3.5" />
                    <span>通夜振る舞い寿司・仕出し見積り</span>
                  </button>
                )}
                {onOpenPractical && (
                  <button
                    onClick={onOpenPractical}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 rounded-lg text-xs font-semibold transition-colors"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>香典防犯金庫リレー ＆ 納棺副葬品OK/NG</span>
                  </button>
                )}
              </>
            )}

            {activeStage.stageNumber === 3 && (
              <>
                <button
                  onClick={onOpenSeating}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>親族席次・焼香順位シミュレーター</span>
                </button>
                {onOpenPractical && (
                  <button
                    onClick={onOpenPractical}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 rounded-lg text-xs font-semibold transition-colors"
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>火葬許可証・骨揚げ・お布施渡し</span>
                  </button>
                )}
                {onOpenCatering && (
                  <button
                    onClick={onOpenCatering}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 rounded-lg text-xs font-semibold transition-colors"
                  >
                    <UtensilsCrossed className="w-3.5 h-3.5" />
                    <span>精進落とし会席膳 ＆ 陰膳配膳</span>
                  </button>
                )}
                <button
                  onClick={onOpenEstimate}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 rounded-lg text-xs font-semibold transition-colors"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span>最終葬儀施行精算チェックリスト</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Bereaved Family Warning Box */}
        <div className="p-6 sm:p-8 bg-rose-50/70 border-b border-rose-100">
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 mt-0.5">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-rose-950 flex items-center gap-2">
                <span>葬祭ディレクター厳重警告：ご遺族が最も後悔・失敗しやすい最大の落とし穴</span>
              </h3>
              <p className="text-xs sm:text-sm text-rose-900 leading-relaxed font-sans">
                {activeStage.bereavedWarning}
              </p>
            </div>
          </div>
        </div>

        {/* Tasks Checklist & Milestone Flow */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold font-serif-jp text-stone-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-stone-700" />
              <span>第{activeStage.stageNumber}工程の実務マイルストーン＆タスク実行順序</span>
            </h3>
            <span className="text-xs text-stone-500">全{activeStage.coreTasks.length}タスク</span>
          </div>

          <div className="space-y-4">
            {activeStage.coreTasks.map((task, idx) => (
              <div 
                key={task.id}
                className="p-4 sm:p-5 rounded-xl border border-stone-200 hover:border-stone-400 bg-stone-50/40 hover:bg-white transition-all space-y-3"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-stone-900 text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <h4 className="text-sm font-bold text-stone-900">
                      {task.title}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-medium px-2 py-0.5 bg-stone-200/80 text-stone-700 rounded-md">
                      {task.timing}
                    </span>
                    {task.isMilestone && (
                      <span className="text-[11px] font-bold px-2 py-0.5 bg-stone-200 text-stone-900 rounded-md border border-stone-300">
                        必須マイルストーン
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-stone-700 leading-relaxed pl-8">
                  {task.description}
                </p>

                {/* Risk and direct tool linking */}
                <div className="pl-8 pt-1 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="text-rose-700/90 text-[11px] flex items-center gap-1 font-medium bg-rose-50 px-2.5 py-1 rounded-md">
                    <span>⚠️ 怠った場合のリスク：</span>
                    <span>{task.bereavedRisk}</span>
                  </div>

                  {task.relatedTool === 'estimate' && (
                    <button
                      onClick={onOpenEstimate}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-md text-xs font-semibold border border-stone-300 transition-colors"
                    >
                      <Calculator className="w-3.5 h-3.5 text-stone-700" />
                      <span>葬儀見積もりで確認</span>
                    </button>
                  )}

                  {task.relatedTool === 'seating' && (
                    <button
                      onClick={onOpenSeating}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-md text-xs font-semibold border border-stone-300 transition-colors"
                    >
                      <Users className="w-3.5 h-3.5 text-stone-700" />
                      <span>親族席次・焼香順位で確認</span>
                    </button>
                  )}

                  {task.relatedTool === 'altar-setting' && onOpenAltarSetting && (
                    <button
                      onClick={onOpenAltarSetting}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-md text-xs font-semibold border border-stone-300 transition-colors"
                    >
                      <Utensils className="w-3.5 h-3.5 text-stone-700" />
                      <span>祭壇配置図面で確認</span>
                    </button>
                  )}

                  {task.relatedTool === 'practical' && onOpenPractical && (
                    <button
                      onClick={onOpenPractical}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-md text-xs font-semibold border border-stone-300 transition-colors"
                    >
                      <Compass className="w-3.5 h-3.5 text-stone-700" />
                      <span>現場超実務マニュアルで確認</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Exam & Practical Manners Knowledge Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div className="p-4 rounded-xl bg-stone-100/70 border border-stone-200 space-y-2">
              <h4 className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-stone-700" />
                <span>葬祭ディレクター技能審査 頻出ポイント</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-stone-700">
                {activeStage.examPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-stone-700 font-bold">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-stone-100/70 border border-stone-200 space-y-2">
              <h4 className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-rose-600" />
                <span>ご遺族への配慮・現場プロフェッショナルマナー</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-stone-700">
                {activeStage.practicalManners.map((manner, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-rose-600 font-bold">•</span>
                    <span>{manner}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Stage Action & Stepping */}
          <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={handlePrevStage}
              disabled={activeStageNumber === 1}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium border ${
                activeStageNumber === 1
                  ? 'opacity-40 cursor-not-allowed bg-stone-100 text-stone-400 border-stone-200'
                  : 'bg-white hover:bg-stone-50 text-stone-800 border-stone-300'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>前の工程へ</span>
            </button>

            <button
              onClick={() => onStartStageDrill(activeStage.stageNumber)}
              className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-bold shadow-xs hover:shadow-sm transition-all flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-amber-300" />
              <span>第{activeStage.stageNumber}工程の確認テスト（{stageQuestionCounts[activeStage.stageNumber] || 0}問）</span>
            </button>

            <button
              onClick={handleNextStage}
              disabled={activeStageNumber === 3}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium border ${
                activeStageNumber === 3
                  ? 'opacity-40 cursor-not-allowed bg-stone-100 text-stone-400 border-stone-200'
                  : 'bg-white hover:bg-stone-50 text-stone-800 border-stone-300'
              }`}
            >
              <span>次の工程へ</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
