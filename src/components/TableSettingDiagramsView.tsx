import React, { useState } from 'react';
import { 
  TABLE_SETTING_DATA, 
  SettingStyleId, 
  TableItemHotspot 
} from '../data/tableSettingDiagramData';
import { AppMode } from '../types/quiz';
import { 
  AlertTriangle, 
  ArrowLeft, 
  Building2, 
  CheckCircle2, 
  Clock, 
  Compass, 
  Info, 
  Printer, 
  Ruler, 
  Sparkles, 
  Utensils, 
  UtensilsCrossed, 
  Workflow, 
  ZoomIn,
  Users,
  Church,
  Flame
} from 'lucide-react';

interface TableSettingDiagramsViewProps {
  onNavigate?: (mode: AppMode) => void;
  initialStyle?: SettingStyleId;
}

export const TableSettingDiagramsView: React.FC<TableSettingDiagramsViewProps> = ({
  onNavigate,
  initialStyle = 'buddhist'
}) => {
  const [activeStyle, setActiveStyle] = useState<SettingStyleId>(initialStyle);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [showRulerGuide, setShowRulerGuide] = useState<boolean>(true);
  const [activeTabSubView, setActiveTabSubView] = useState<'diagram' | 'sequence' | 'checklist'>('diagram');

  const currentData = TABLE_SETTING_DATA[activeStyle];
  const selectedItem = currentData.items.find(i => i.id === selectedItemId) || currentData.items[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 font-sans">
      {/* Breadcrumb Navigation */}
      <div className="no-print bg-white rounded-xl border border-stone-200 p-4 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-stone-600">
          <button
            onClick={() => onNavigate?.('workflow')}
            className="hover:text-stone-900 font-semibold flex items-center gap-1 transition-colors"
          >
            <Workflow className="w-3.5 h-3.5 text-stone-700" />
            <span>実務三大工程ロードマップ</span>
          </button>
          <span className="text-stone-300">/</span>
          <span className="text-stone-900 font-bold bg-stone-100 px-2.5 py-0.5 rounded-md border border-stone-200">
            第2工程・第3工程 式場設営 ＆ 祭壇配置
          </span>
          <span className="text-stone-300">/</span>
          <span className="text-stone-800 font-bold">
            4大葬儀式場・祭壇 ＆ 会食配置図面
          </span>
        </div>

        <div className="flex items-center gap-2">
          {onNavigate && (
            <button
              onClick={() => onNavigate('catering')}
              className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-xs font-semibold border border-stone-300 flex items-center gap-1.5 transition-colors"
            >
              <UtensilsCrossed className="w-3.5 h-3.5 text-stone-600" />
              <span>通夜振る舞い・精進落とし見積りへ</span>
            </button>
          )}
          <button
            onClick={handlePrint}
            className="px-3.5 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>A4図面印刷</span>
          </button>
        </div>
      </div>

      {/* Main Title Banner */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-100 text-stone-900 border border-stone-300 rounded-full text-xs font-bold">
            <Building2 className="w-3.5 h-3.5 text-stone-700" />
            <span>葬祭ディレクター技能審査規格準拠 式場・祭壇配置図面集</span>
          </div>
          <span className="text-xs text-stone-500 font-mono">
            厚生労働省認定 葬祭ディレクター技能審査基準準拠
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold font-serif-jp text-stone-900">
            {currentData.title}
          </h1>
          <p className="text-stone-700 text-sm font-semibold">
            {currentData.subtitle}
          </p>
          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed max-w-4xl">
            {currentData.leadExplanation}
          </p>
        </div>

        {/* 4 Grand Styles Tabs */}
        <div className="no-print pt-2 flex flex-wrap gap-2 border-t border-stone-100">
          {[
            { id: 'buddhist' as SettingStyleId, label: '① 仏式 祭壇・導師・焼香所', icon: '📿', badge: '生花祭壇・親族右／来賓左' },
            { id: 'shinto' as SettingStyleId, label: '② 神葬祭（神道葬儀）', icon: '⛩️', badge: '八足案・三種の神器・玉串案' },
            { id: 'secular' as SettingStyleId, label: '③ キリスト教・お別れの会', icon: '🕊️', badge: '献花台・メモリアルコーナー' },
            { id: 'catering_hall' as SettingStyleId, label: '④ 通夜振る舞い・精進落とし', icon: '🍱', badge: '導師最上座・陰膳・喪主最下座' },
          ].map(style => {
            const isActive = activeStyle === style.id;
            return (
              <button
                key={style.id}
                onClick={() => {
                  setActiveStyle(style.id);
                  setSelectedItemId(null);
                }}
                className={`flex-1 min-w-[200px] p-3 rounded-xl border text-left transition-all ${
                  isActive
                    ? 'bg-stone-900 text-white border-stone-950 shadow-xs'
                    : 'bg-white border-stone-200 hover:bg-stone-50 hover:border-stone-300'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-xs sm:text-sm">
                  <span>{style.icon}</span>
                  <span className={isActive ? 'text-amber-200 font-bold' : 'text-stone-800 font-medium'}>
                    {style.label}
                  </span>
                </div>
                <div className={`text-[11px] mt-1 ${isActive ? 'text-stone-300' : 'text-stone-500'}`}>
                  {style.badge}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Key Specifications & Dimension Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-2xs space-y-1">
          <div className="text-[11px] font-bold text-stone-500 uppercase flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-stone-700" />
            <span>式場・祭壇仕様</span>
          </div>
          <p className="text-xs sm:text-sm font-bold text-stone-900">
            {currentData.tableType}
          </p>
        </div>

        <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-2xs space-y-1">
          <div className="text-[11px] font-bold text-stone-500 uppercase flex items-center gap-1.5">
            <Ruler className="w-3.5 h-3.5 text-stone-700" />
            <span>動線・通路寸法規準</span>
          </div>
          <p className="text-xs sm:text-sm font-bold text-stone-900">
            {currentData.standardCoverSpace}
          </p>
        </div>

        <div className="bg-white rounded-xl border border-stone-300 bg-stone-50 p-4 shadow-2xs space-y-1">
          <div className="text-[11px] font-bold text-stone-700 uppercase flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-stone-700" />
            <span>最重要配置ルール</span>
          </div>
          <p className="text-xs sm:text-sm font-bold text-stone-900">
            {currentData.dimensionKeyRule}
          </p>
        </div>
      </div>

      {/* View Switcher: Diagram / Service Sequence / Checkpoints */}
      <div className="no-print flex items-center justify-between border-b border-stone-200 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTabSubView('diagram')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
              activeTabSubView === 'diagram'
                ? 'bg-stone-900 text-white'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            📐 俯瞰精密図面（インタラクティブ式場配置図）
          </button>
          <button
            onClick={() => setActiveTabSubView('sequence')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
              activeTabSubView === 'sequence'
                ? 'bg-stone-900 text-white'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            📜 儀礼式次第 ＆ 焼香進行シーケンス
          </button>
          <button
            onClick={() => setActiveTabSubView('checklist')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
              activeTabSubView === 'checklist'
                ? 'bg-stone-900 text-white'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            ⭐ 技能審査・現場点検 急所チェック
          </button>
        </div>

        {activeTabSubView === 'diagram' && (
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-xs font-medium text-stone-600 cursor-pointer">
              <input
                type="checkbox"
                checked={showRulerGuide}
                onChange={(e) => setShowRulerGuide(e.target.checked)}
                className="rounded border-stone-300 text-stone-800 focus:ring-stone-500"
              />
              <span className="flex items-center gap-1">
                <Ruler className="w-3.5 h-3.5 text-stone-500" />
                配置ガイド線を表示
              </span>
            </label>
          </div>
        )}
      </div>

      {/* SUBVIEW 1: INTERACTIVE DIAGRAM */}
      {activeTabSubView === 'diagram' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Interactive Blueprint */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-stone-200 p-4 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between text-xs text-stone-500 pb-2 border-b border-stone-100">
              <span className="flex items-center gap-1.5 font-bold text-stone-800">
                <ZoomIn className="w-4 h-4 text-stone-700" />
                式場・祭壇平面配置図（クリックして器具の詳細・寸法・検定急所を確認）
              </span>
              <span className="text-[11px] text-stone-800 bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
                ※ 祭壇向かって【右側＝親族席、左側＝来賓席】
              </span>
            </div>

            {/* SVG RENDERING FOR EACH STYLE */}
            <div className="w-full overflow-x-auto bg-stone-50/60 rounded-xl p-2 border border-stone-200">
              {activeStyle === 'buddhist' && (
                <BuddhistSettingSvg
                  items={currentData.items}
                  selectedItemId={selectedItem?.id}
                  onSelectItem={(id) => setSelectedItemId(id)}
                  showRulerGuide={showRulerGuide}
                />
              )}

              {activeStyle === 'shinto' && (
                <ShintoSettingSvg
                  items={currentData.items}
                  selectedItemId={selectedItem?.id}
                  onSelectItem={(id) => setSelectedItemId(id)}
                  showRulerGuide={showRulerGuide}
                />
              )}

              {activeStyle === 'secular' && (
                <SecularSettingSvg
                  items={currentData.items}
                  selectedItemId={selectedItem?.id}
                  onSelectItem={(id) => setSelectedItemId(id)}
                  showRulerGuide={showRulerGuide}
                />
              )}

              {activeStyle === 'catering_hall' && (
                <CateringHallSettingSvg
                  items={currentData.items}
                  selectedItemId={selectedItem?.id}
                  onSelectItem={(id) => setSelectedItemId(id)}
                  showRulerGuide={showRulerGuide}
                />
              )}
            </div>

            {/* Quick Item Buttons Carousel */}
            <div className="pt-2">
              <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-2">
                配置項目クイック選択一覧（全{currentData.items.length}品目）：
              </div>
              <div className="flex flex-wrap gap-1.5">
                {currentData.items.map(item => {
                  const isSelected = item.id === selectedItem?.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedItemId(item.id)}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                        isSelected
                          ? 'bg-stone-900 text-white shadow-2xs font-bold'
                          : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      {item.name.split('（')[0]}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Detailed Inspector Panel */}
          <div className="lg:col-span-4 space-y-4">
            {selectedItem ? (
              <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden sticky top-6">
                <div className="bg-stone-50 border-b border-stone-200 p-4 space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="px-2 py-0.5 bg-stone-200 text-stone-800 border border-stone-300 rounded font-bold">
                      {selectedItem.positionLabel}
                    </span>
                    <span className="text-stone-400 font-mono text-[10px]">
                      {selectedItem.category.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-base font-bold font-serif-jp text-stone-900 pt-1">
                    {selectedItem.name}
                  </h3>
                  {selectedItem.reading && (
                    <p className="text-[11px] text-stone-500">
                      読み：{selectedItem.reading}
                    </p>
                  )}
                  {selectedItem.enName && (
                    <p className="text-[11px] text-stone-400 font-mono italic">
                      {selectedItem.enName}
                    </p>
                  )}
                </div>

                <div className="p-4 space-y-4 text-xs">
                  {/* Dimension Rule */}
                  <div className="bg-stone-50 rounded-xl p-3 border border-stone-200 space-y-1">
                    <div className="font-bold text-stone-900 flex items-center gap-1.5">
                      <Ruler className="w-3.5 h-3.5 text-stone-700" />
                      <span>配置寸法・位置規準</span>
                    </div>
                    <p className="text-stone-800 text-xs leading-relaxed font-medium">
                      {selectedItem.dimensionRule}
                    </p>
                  </div>

                  {/* Purpose */}
                  <div className="space-y-1">
                    <div className="font-bold text-stone-700 flex items-center gap-1.5">
                      <Utensils className="w-3.5 h-3.5 text-stone-500" />
                      <span>用途・意義</span>
                    </div>
                    <p className="text-stone-600 leading-relaxed">
                      {selectedItem.purpose}
                    </p>
                  </div>

                  {/* Exam Tip */}
                  <div className="bg-amber-50/70 rounded-xl p-3 border border-amber-200 space-y-1">
                    <div className="font-bold text-amber-950 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                      <span>葬祭ディレクター技能審査の急所</span>
                    </div>
                    <p className="text-amber-900 leading-relaxed">
                      {selectedItem.examTip}
                    </p>
                  </div>

                  {/* Service Manner */}
                  <div className="space-y-1">
                    <div className="font-bold text-stone-700 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>現場ディレクターの作法・点検</span>
                    </div>
                    <p className="text-stone-600 leading-relaxed">
                      {selectedItem.serviceManner}
                    </p>
                  </div>

                  {/* NG Action */}
                  <div className="bg-rose-50 rounded-xl p-3 border border-rose-200 space-y-1">
                    <div className="font-bold text-rose-950 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-700" />
                      <span>厳禁マナー・配置NGミス</span>
                    </div>
                    <p className="text-rose-900 leading-relaxed">
                      {selectedItem.ngAction}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center text-stone-400 space-y-2">
                <Info className="w-8 h-8 mx-auto text-stone-300" />
                <p className="text-xs">左の図面から項目をクリックすると、配置寸法と試験の急所が表示されます。</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUBVIEW 2: SERVICE SEQUENCE */}
      {activeTabSubView === 'sequence' && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-stone-200 pb-4">
            <div className="space-y-1">
              <h2 className="text-lg font-bold font-serif-jp text-stone-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-stone-700" />
                <span>儀礼式次第 ＆ 焼香進行タイムライン</span>
              </h2>
              <p className="text-xs text-stone-500">
                開式から閉式、お別れの儀、出棺までの儀礼進行シーケンスです。
              </p>
            </div>
            <span className="text-xs font-bold text-stone-800 bg-stone-100 px-3 py-1 rounded-full border border-stone-200">
              全{currentData.serviceSequence.length}ステップ
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentData.serviceSequence.map((step, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 hover:bg-white hover:border-stone-400 transition-all space-y-2"
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-stone-900 text-white text-xs font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span className="font-bold text-stone-900 text-xs sm:text-sm">
                    {step}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBVIEW 3: CHECKPOINTS */}
      {activeTabSubView === 'checklist' && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="space-y-1 border-b border-stone-200 pb-4">
            <h2 className="text-lg font-bold font-serif-jp text-stone-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-stone-700" />
              <span>技能審査・現場配膳 必須チェックポイント</span>
            </h2>
            <p className="text-xs text-stone-500">
              技能審査実技試験で最も重視される減点防止項目と、開式30分前の現場点検項目です。
            </p>
          </div>

          <div className="space-y-3">
            {currentData.examImportantCheckpoints.map((cp, idx) => (
              <div 
                key={idx} 
                className="p-4 rounded-xl border border-stone-200 bg-stone-50/70 flex items-start gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-stone-200 text-stone-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  ✓
                </div>
                <div className="text-xs sm:text-sm text-stone-800 leading-relaxed font-medium">
                  {cp}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   SVG BLUEPRINTS FOR EACH FUNERAL STYLE
========================================================================= */

interface SvgProps {
  items: TableItemHotspot[];
  selectedItemId?: string;
  onSelectItem: (id: string) => void;
  showRulerGuide: boolean;
}

// 1. BUDDHIST FUNERAL HALL SVG
const BuddhistSettingSvg: React.FC<SvgProps> = ({
  selectedItemId,
  onSelectItem,
  showRulerGuide
}) => {
  return (
    <div className="relative w-full max-w-[800px] mx-auto select-none">
      <svg viewBox="0 0 800 500" className="w-full h-auto bg-white rounded-xl shadow-inner border border-stone-200">
        <rect x="0" y="0" width="800" height="500" fill="#fafaf9" />

        {/* Central Altar Area */}
        <g onClick={() => onSelectItem('bd-altar')} className="cursor-pointer hover:opacity-90">
          <rect x="200" y="50" width="400" height="140" rx="6" fill="#f5f5f4" stroke={selectedItemId === 'bd-altar' ? '#1c1917' : '#a8a29e'} strokeWidth={selectedItemId === 'bd-altar' ? 3 : 1.5} />
          {/* Flower tiers */}
          <path d="M 220 180 Q 400 70 580 180 Z" fill="#e7e5e4" stroke="#d6d3d1" />
          <text x="400" y="80" textAnchor="middle" fill="#78716c" fontSize="11" fontWeight="bold">
            生花祭壇（または白木祭壇）間口3.6m〜5.4m
          </text>
        </g>

        {/* Portrait of Deceased */}
        <g onClick={() => onSelectItem('bd-portrait')} className="cursor-pointer hover:opacity-90">
          <rect x="375" y="70" width="50" height="60" rx="3" fill="#ffffff" stroke={selectedItemId === 'bd-portrait' ? '#d97706' : '#1c1917'} strokeWidth={selectedItemId === 'bd-portrait' ? 3 : 1.5} />
          {/* Ribbon */}
          <polygon points="375,70 400,90 425,70" fill="#292524" />
          <circle cx="400" cy="100" r="14" fill="#e7e5e4" />
          <text x="400" y="103" textAnchor="middle" fill="#1c1917" fontSize="8" fontWeight="bold">遺影</text>
        </g>

        {/* Temporary Ihai Tablet */}
        <g onClick={() => onSelectItem('bd-ihai')} className="cursor-pointer hover:opacity-90">
          <rect x="390" y="135" width="20" height="35" rx="2" fill="#fef3c7" stroke={selectedItemId === 'bd-ihai' ? '#d97706' : '#b45309'} strokeWidth={selectedItemId === 'bd-ihai' ? 2.5 : 1} />
          <text x="400" y="156" textAnchor="middle" fill="#92400e" fontSize="7" fontWeight="bold">位牌</text>
        </g>

        {/* Coffin (Placed in front of Altar) */}
        <g onClick={() => onSelectItem('bd-coffin')} className="cursor-pointer hover:opacity-90">
          <rect x="320" y="175" width="160" height="40" rx="4" fill="#ffffff" stroke={selectedItemId === 'bd-coffin' ? '#d97706' : '#44403c'} strokeWidth={selectedItemId === 'bd-coffin' ? 3 : 1.5} />
          <rect x="385" y="180" width="30" height="15" rx="2" fill="#fafaf9" stroke="#a8a29e" />
          <text x="400" y="200" textAnchor="middle" fill="#1c1917" fontSize="10" fontWeight="bold">
            ご遺体安置・棺（コフィン）
          </text>
        </g>

        {/* Floral Stands on Left and Right Wings */}
        <g onClick={() => onSelectItem('bd-floral-tributes')} className="cursor-pointer hover:opacity-80">
          <rect x="80" y="70" width="80" height="130" rx="4" fill="#fafaf9" stroke="#78716c" strokeDasharray="3 2" />
          <text x="120" y="110" textAnchor="middle" fill="#78716c" fontSize="9" fontWeight="bold">供花スタンド</text>
          <text x="120" y="125" textAnchor="middle" fill="#a8a29e" fontSize="8">（親族・会社順）</text>

          <rect x="640" y="70" width="80" height="130" rx="4" fill="#fafaf9" stroke="#78716c" strokeDasharray="3 2" />
          <text x="680" y="110" textAnchor="middle" fill="#78716c" fontSize="9" fontWeight="bold">供花スタンド</text>
          <text x="680" y="125" textAnchor="middle" fill="#a8a29e" fontSize="8">（親族・会社順）</text>
        </g>

        {/* Priest (Doushi) Seat & Front Table */}
        <g onClick={() => onSelectItem('bd-doushi-seat')} className="cursor-pointer hover:opacity-90">
          <rect x="300" y="240" width="60" height="40" rx="4" fill="#fef3c7" stroke={selectedItemId === 'bd-doushi-seat' ? '#b45309' : '#d97706'} strokeWidth="2" />
          <text x="330" y="260" textAnchor="middle" fill="#92400e" fontSize="9" fontWeight="bold">導師席</text>
          <text x="330" y="272" textAnchor="middle" fill="#b45309" fontSize="7">（前机・木魚・鈴）</text>
        </g>

        {/* Incense Stand (Shokodai) */}
        <g onClick={() => onSelectItem('bd-incense-stand')} className="cursor-pointer hover:opacity-90">
          <rect x="365" y="280" width="70" height="35" rx="3" fill="#ffffff" stroke={selectedItemId === 'bd-incense-stand' ? '#b45309' : '#1c1917'} strokeWidth="2" />
          <circle cx="390" cy="297" r="8" fill="#e7e5e4" stroke="#44403c" />
          <circle cx="410" cy="297" r="6" fill="#fef08a" stroke="#ca8a04" />
          <text x="400" y="325" textAnchor="middle" fill="#1c1917" fontSize="9" fontWeight="bold">
            焼香台（立礼/座礼）
          </text>
        </g>

        {/* Right Side: Chief Mourner & Relatives Seats */}
        <g onClick={() => onSelectItem('bd-relatives-seat')} className="cursor-pointer hover:opacity-90">
          <rect x="500" y="270" width="220" height="150" rx="6" fill="#f5f5f4" stroke={selectedItemId === 'bd-relatives-seat' ? '#1c1917' : '#78716c'} strokeWidth="2" />
          <rect x="515" y="285" width="45" height="30" rx="3" fill="#1c1917" />
          <text x="537" y="304" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">喪主</text>
          
          <text x="610" y="304" fill="#1c1917" fontSize="10" fontWeight="bold">【向かって右側】親族席</text>
          <text x="515" y="340" fill="#78716c" fontSize="9">前列：遺族（配偶者・子供）</text>
          <text x="515" y="360" fill="#78716c" fontSize="9">後列：兄弟・伯父叔父・親族</text>
          <text x="515" y="400" fill="#b45309" fontSize="9" fontWeight="bold">※ 喪主から順に焼香へ誘導</text>
        </g>

        {/* Left Side: VIP & General Guests Seats */}
        <g onClick={() => onSelectItem('bd-guests-seat')} className="cursor-pointer hover:opacity-90">
          <rect x="80" y="270" width="220" height="150" rx="6" fill="#f5f5f4" stroke={selectedItemId === 'bd-guests-seat' ? '#1c1917' : '#78716c'} strokeWidth="2" />
          <rect x="235" y="285" width="50" height="30" rx="3" fill="#44403c" />
          <text x="260" y="304" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">来賓代表</text>

          <text x="95" y="304" fill="#1c1917" fontSize="10" fontWeight="bold">【向かって左側】来賓・一般席</text>
          <text x="95" y="340" fill="#78716c" fontSize="9">前列：弔辞者・会社役員・恩師</text>
          <text x="95" y="360" fill="#78716c" fontSize="9">後列：一般会葬者・町内会</text>
          <text x="95" y="400" fill="#0284c7" fontSize="9" fontWeight="bold">※ 外側通路へ一方通行で退場</text>
        </g>

        {/* One-Way Flow Guide */}
        {showRulerGuide && (
          <g>
            {/* Center Entrance */}
            <path d="M 400 450 L 400 330" stroke="#059669" strokeWidth="2.5" strokeDasharray="4 2" />
            <text x="400" y="445" textAnchor="middle" fill="#047857" fontSize="9" fontWeight="bold">
              ▲ 焼香入場（中央通路）
            </text>
            {/* Left/Right Exit lines */}
            <path d="M 360 300 L 190 300 L 190 450" fill="none" stroke="#2563eb" strokeWidth="2" strokeDasharray="4 2" />
            <path d="M 440 300 L 610 300 L 610 450" fill="none" stroke="#2563eb" strokeWidth="2" strokeDasharray="4 2" />
            <text x="190" y="465" textAnchor="middle" fill="#1d4ed8" fontSize="8" fontWeight="bold">
              ▼ 焼香後退場
            </text>
            <text x="610" y="465" textAnchor="middle" fill="#1d4ed8" fontSize="8" fontWeight="bold">
              ▼ 焼香後退場
            </text>
          </g>
        )}

        {/* Entrance Door */}
        <g onClick={() => onSelectItem('bd-reception-gate')} className="cursor-pointer hover:opacity-80">
          <rect x="330" y="460" width="140" height="20" rx="3" fill="#ffffff" stroke="#1c1917" strokeWidth="2" />
          <text x="400" y="474" textAnchor="middle" fill="#1c1917" fontSize="9" fontWeight="bold">
            式場出入口（ワンウェイ動線）
          </text>
        </g>
      </svg>
    </div>
  );
};

// 2. SHINTO FUNERAL (SHINSOUSAI) SVG
const ShintoSettingSvg: React.FC<SvgProps> = ({
  selectedItemId,
  onSelectItem,
  showRulerGuide
}) => {
  return (
    <div className="relative w-full max-w-[800px] mx-auto select-none">
      <svg viewBox="0 0 800 500" className="w-full h-auto bg-white rounded-xl shadow-inner border border-stone-200">
        <rect x="0" y="0" width="800" height="500" fill="#fafaf9" />

        {/* Shinto Altar (Hassoku-an) */}
        <g onClick={() => onSelectItem('st-altar')} className="cursor-pointer hover:opacity-90">
          <rect x="240" y="50" width="320" height="130" rx="4" fill="#ffffff" stroke={selectedItemId === 'st-altar' ? '#b45309' : '#78716c'} strokeWidth={selectedItemId === 'st-altar' ? 3 : 1.5} />
          {/* Shimenawa Rope */}
          <line x1="240" y1="65" x2="560" y2="65" stroke="#ca8a04" strokeWidth="3" />
          <text x="400" y="78" textAnchor="middle" fill="#854d0e" fontSize="9" fontWeight="bold">
            注連縄（しめなわ ＆ 紙垂）
          </text>
          <text x="400" y="95" textAnchor="middle" fill="#1c1917" fontSize="10" fontWeight="bold">
            白木八足案 祭壇
          </text>
        </g>

        {/* Three Sacred Treasures */}
        <g onClick={() => onSelectItem('st-sacred-treasures')} className="cursor-pointer hover:opacity-90">
          <circle cx="400" cy="115" r="16" fill="#f8fafc" stroke="#3b82f6" strokeWidth="2" />
          <text x="400" y="118" textAnchor="middle" fill="#1d4ed8" fontSize="8" fontWeight="bold">神鏡</text>
          {/* Sword and Jewel on left and right */}
          <line x1="365" y1="105" x2="365" y2="125" stroke="#64748b" strokeWidth="3" />
          <circle cx="435" cy="115" r="7" fill="#10b981" />
          <text x="400" y="140" textAnchor="middle" fill="#334155" fontSize="8">鏡・剣・勾玉（霊璽）</text>
        </g>

        {/* Shinsen Offerings */}
        <g onClick={() => onSelectItem('st-shinsen')} className="cursor-pointer hover:opacity-90">
          <rect x="290" y="145" width="220" height="30" rx="3" fill="#fef3c7" stroke="#d97706" />
          <text x="400" y="164" textAnchor="middle" fill="#92400e" fontSize="9" fontWeight="bold">
            神饌（米・酒・鯛・野菜・果物・塩・水）
          </text>
        </g>

        {/* Tamagushi Offering Table (Center) */}
        <g onClick={() => onSelectItem('st-tamagushi-an')} className="cursor-pointer hover:opacity-90">
          <rect x="340" y="260" width="120" height="40" rx="4" fill="#ffffff" stroke={selectedItemId === 'st-tamagushi-an' ? '#b45309' : '#047857'} strokeWidth="2.5" />
          {/* Green branch graphic */}
          <path d="M 370 280 Q 400 270 430 280" stroke="#059669" strokeWidth="4" />
          <text x="400" y="275" textAnchor="middle" fill="#065f46" fontSize="10" fontWeight="bold">
            玉串案（たまぐしあん）
          </text>
          <text x="400" y="292" textAnchor="middle" fill="#047857" fontSize="8">
            ※ 根元を祭壇に向けて奉奠
          </text>
        </g>

        {/* Shinto Priests Seat */}
        <g onClick={() => onSelectItem('st-saishu-seat')} className="cursor-pointer hover:opacity-90">
          <rect x="260" y="235" width="60" height="40" rx="4" fill="#ffffff" stroke="#44403c" strokeWidth="1.5" />
          <text x="290" y="255" textAnchor="middle" fill="#1c1917" fontSize="9" fontWeight="bold">斎主席</text>
          <text x="290" y="267" textAnchor="middle" fill="#78716c" fontSize="7">（神官・笏）</text>
        </g>

        {/* Temizu Water Basin at Door */}
        <g onClick={() => onSelectItem('st-temizu')} className="cursor-pointer hover:opacity-80">
          <rect x="100" y="440" width="120" height="40" rx="4" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
          <text x="160" y="458" textAnchor="middle" fill="#1e40af" fontSize="9" fontWeight="bold">
            手水所（ちょうず）
          </text>
          <text x="160" y="471" textAnchor="middle" fill="#3b82f6" fontSize="7">
            手と口を清めて入室
          </text>
        </g>

        {/* Shinobi-te Rule Callout */}
        <rect x="490" y="255" width="220" height="60" rx="6" fill="#fef2f2" stroke="#ef4444" strokeWidth="1.5" />
        <text x="600" y="275" textAnchor="middle" fill="#991b1b" fontSize="9" fontWeight="bold">
          ⚠️ 【絶対厳禁】忍び手（しのびて）
        </text>
        <text x="600" y="292" textAnchor="middle" fill="#b91c1c" fontSize="8">
          二拍手は「音を立てずに寸前で止める」
        </text>
        <text x="600" y="304" textAnchor="middle" fill="#7f1d1d" fontSize="7">
          （パンパン鳴らすのは祝祭のみ！）
        </text>
      </svg>
    </div>
  );
};

// 3. SECULAR / MEMORIAL FUNERAL SVG
const SecularSettingSvg: React.FC<SvgProps> = ({
  selectedItemId,
  onSelectItem
}) => {
  return (
    <div className="relative w-full max-w-[800px] mx-auto select-none">
      <svg viewBox="0 0 800 500" className="w-full h-auto bg-white rounded-xl shadow-inner border border-stone-200">
        <rect x="0" y="0" width="800" height="500" fill="#fafaf9" />

        {/* Memorial Floral Altar */}
        <g onClick={() => onSelectItem('sc-altar')} className="cursor-pointer hover:opacity-90">
          <rect x="250" y="50" width="300" height="120" rx="6" fill="#ffffff" stroke={selectedItemId === 'sc-altar' ? '#1c1917' : '#9333ea'} strokeWidth={selectedItemId === 'sc-altar' ? 3 : 1.5} />
          {/* Cross for Christian or Center Memorial Symbol */}
          <line x1="400" y1="65" x2="400" y2="105" stroke="#7e22ce" strokeWidth="4" />
          <line x1="385" y1="80" x2="415" y2="80" stroke="#7e22ce" strokeWidth="4" />
          <text x="400" y="130" textAnchor="middle" fill="#581c87" fontSize="10" fontWeight="bold">
            洋風フラワー祭壇 ＆ 十字架
          </text>
        </g>

        {/* Flower Offering Table (Kenkadai) */}
        <g onClick={() => onSelectItem('sc-kenkadai')} className="cursor-pointer hover:opacity-90">
          <rect x="330" y="260" width="140" height="40" rx="4" fill="#ffffff" stroke={selectedItemId === 'sc-kenkadai' ? '#b45309' : '#059669'} strokeWidth="2.5" />
          <text x="400" y="278" textAnchor="middle" fill="#047857" fontSize="10" fontWeight="bold">
            献花台（白百合・カーネーション）
          </text>
          <text x="400" y="292" textAnchor="middle" fill="#065f46" fontSize="8">
            ※ 茎を祭壇に向けて置く
          </text>
        </g>

        {/* Memorial Artifacts & Photo Gallery Display Table */}
        <g onClick={() => onSelectItem('sc-memorial-corner')} className="cursor-pointer hover:opacity-90">
          <rect x="80" y="200" width="160" height="100" rx="6" fill="#fdf4ff" stroke="#c084fc" strokeWidth="1.5" />
          <text x="160" y="225" textAnchor="middle" fill="#6b21a8" fontSize="10" fontWeight="bold">
            メモリアルコーナー
          </text>
          <text x="160" y="245" textAnchor="middle" fill="#7e22ce" fontSize="8">故人愛用品・趣味の道具</text>
          <text x="160" y="260" textAnchor="middle" fill="#7e22ce" fontSize="8">絵画・著書・写真パネル展示</text>
        </g>

        {/* Pulpit / Lectern */}
        <g onClick={() => onSelectItem('sc-clergy-podium')} className="cursor-pointer hover:opacity-80">
          <rect x="260" y="235" width="50" height="40" rx="3" fill="#ffffff" stroke="#44403c" strokeWidth="1.5" />
          <text x="285" y="255" textAnchor="middle" fill="#1c1917" fontSize="9" fontWeight="bold">講壇</text>
          <text x="285" y="267" textAnchor="middle" fill="#78716c" fontSize="7">（聖書・マイク）</text>
        </g>
      </svg>
    </div>
  );
};

// 4. CATERING HALL (SHOJIN OTOCHI & TSUYA BUFFET) SVG
const CateringHallSettingSvg: React.FC<SvgProps> = ({
  selectedItemId,
  onSelectItem,
  showRulerGuide
}) => {
  return (
    <div className="relative w-full max-w-[800px] mx-auto select-none">
      <svg viewBox="0 0 800 500" className="w-full h-auto bg-white rounded-xl shadow-inner border border-stone-200">
        <rect x="0" y="0" width="800" height="500" fill="#fafaf9" />

        {/* Tokonoma / Highest Honor Seat Wall (Top: y=50) */}
        <rect x="150" y="40" width="500" height="25" fill="#f5f5f4" stroke="#d6d3d1" />
        <text x="400" y="57" textAnchor="middle" fill="#78716c" fontSize="10" fontWeight="bold">
          ▲ 床の間・壁面側【最上座エリア】
        </text>

        {/* Priest Seat (Highest Honor) */}
        <g onClick={() => onSelectItem('ct-monk-seat')} className="cursor-pointer hover:opacity-90">
          <rect x="320" y="80" width="70" height="45" rx="4" fill="#fef3c7" stroke={selectedItemId === 'ct-monk-seat' ? '#b45309' : '#d97706'} strokeWidth="2.5" />
          <text x="355" y="102" textAnchor="middle" fill="#92400e" fontSize="9" fontWeight="bold">導師席</text>
          <text x="355" y="115" textAnchor="middle" fill="#b45309" fontSize="7">（僧侶・最上座）</text>
        </g>

        {/* Memorial Place for Deceased (Kagezen) */}
        <g onClick={() => onSelectItem('ct-kagezen')} className="cursor-pointer hover:opacity-90">
          <rect x="410" y="80" width="70" height="45" rx="4" fill="#1c1917" stroke={selectedItemId === 'ct-kagezen' ? '#f59e0b' : '#ca8a04'} strokeWidth="2" />
          <circle cx="445" cy="100" r="10" fill="#292524" stroke="#facc15" />
          <text x="445" y="103" textAnchor="middle" fill="#fef08a" fontSize="8" fontWeight="bold">陰膳</text>
          <text x="445" y="116" textAnchor="middle" fill="#ca8a04" fontSize="7">（故人の膳）</text>
        </g>

        {/* Relatives and Guest Dining Tables (Left and Right) */}
        <g onClick={() => onSelectItem('ct-relatives-table')} className="cursor-pointer hover:opacity-90">
          <rect x="120" y="160" width="220" height="190" rx="6" fill="#ffffff" stroke={selectedItemId === 'ct-relatives-table' ? '#1c1917' : '#a8a29e'} strokeWidth="1.5" />
          <text x="230" y="185" textAnchor="middle" fill="#1c1917" fontSize="10" fontWeight="bold">
            親族・世話役 会席膳列
          </text>
          <text x="230" y="200" textAnchor="middle" fill="#78716c" fontSize="8">
            一人一膳 会席膳（折敷）
          </text>

          <rect x="460" y="160" width="220" height="190" rx="6" fill="#ffffff" stroke={selectedItemId === 'ct-relatives-table' ? '#1c1917' : '#a8a29e'} strokeWidth="1.5" />
          <text x="570" y="185" textAnchor="middle" fill="#1c1917" fontSize="10" fontWeight="bold">
            親族・知人 会席膳列
          </text>
          <text x="570" y="200" textAnchor="middle" fill="#78716c" fontSize="8">
            通夜振る舞い大皿 / 個別膳
          </text>
        </g>

        {/* Kenpai Glass */}
        <g onClick={() => onSelectItem('ct-kenpai-glass')} className="cursor-pointer hover:opacity-80">
          <circle cx="280" cy="235" r="14" fill="#fefce8" stroke="#ca8a04" strokeWidth="2" />
          <text x="280" y="238" textAnchor="middle" fill="#854d0e" fontSize="7" fontWeight="bold">献杯</text>
        </g>

        {/* Chief Mourner Seat at Door (Lowest Seat) */}
        <g onClick={() => onSelectItem('ct-moshu-seat')} className="cursor-pointer hover:opacity-90">
          <rect x="360" y="410" width="80" height="40" rx="4" fill="#f5f5f4" stroke={selectedItemId === 'ct-moshu-seat' ? '#1c1917' : '#44403c'} strokeWidth="2.5" />
          <text x="400" y="428" textAnchor="middle" fill="#1c1917" fontSize="9" fontWeight="bold">喪主席</text>
          <text x="400" y="440" textAnchor="middle" fill="#78716c" fontSize="7">（出入口側 最下座）</text>
        </g>

        {/* Entrance Door */}
        <line x1="330" y1="465" x2="470" y2="465" stroke="#1c1917" strokeWidth="4" />
        <text x="400" y="482" textAnchor="middle" fill="#78716c" fontSize="10" fontWeight="bold">
          ▼ 会食室 出入口ドア（最下座側）
        </text>

        {/* Seating Protocol Guidance */}
        {showRulerGuide && (
          <text x="400" y="380" textAnchor="middle" fill="#047857" fontSize="9" fontWeight="bold">
            【席次鉄則】上座にお寺様・親族長老 ➔ 出入口の最下座にもてなす側の喪主が着席
          </text>
        )}
      </svg>
    </div>
  );
};
