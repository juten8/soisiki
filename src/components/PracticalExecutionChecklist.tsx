import React, { useState, useMemo } from 'react';
import { 
  PACKING_CHECKLIST_DATA, 
  SECT_INCENSE_MANNERS, 
  FUNERAL_RELATIVE_RULES, 
  OFUSE_GUIDELINES, 
  BURIAL_ITEMS_DATA, 
  FUNERAL_SECURITY_STEPS, 
  VENUE_WALKTHROUGH_CHECKLIST_DATA,
  VenueWalkthroughCheckItem,
  PackingCheckItem
} from '../data/practicalChecklistData';
import { 
  AlertOctagon, 
  AlertTriangle, 
  Building2,
  Check, 
  CheckCircle2, 
  ChevronRight, 
  Church,
  Clock, 
  Coins, 
  Compass,
  Crown, 
  DoorClosed,
  FileCheck2, 
  FileText, 
  Filter,
  Flame, 
  Gift, 
  GraduationCap, 
  Heart, 
  HelpCircle, 
  Info, 
  Key,
  Layers,
  Lock, 
  Luggage, 
  MessageSquare,
  PackageCheck,
  Printer, 
  RotateCcw, 
  Search, 
  ShieldAlert, 
  ShieldCheck, 
  Sparkles, 
  UserCheck, 
  Users, 
  UtensilsCrossed,
  Wine 
} from 'lucide-react';

interface PracticalExecutionChecklistProps {
  initialTab?: 'venue_walkthrough' | 'packing' | 'incense' | 'ofuse' | 'burial' | 'security' | 'relatives';
}

export const PracticalExecutionChecklist: React.FC<PracticalExecutionChecklistProps> = ({ initialTab }) => {
  const [activeTab, setActiveTab] = useState<
    'venue_walkthrough' | 'packing' | 'incense' | 'ofuse' | 'burial' | 'security' | 'relatives'
  >(initialTab || 'venue_walkthrough');

  // Walkthrough Checklist State
  const [checkedWalkthroughItems, setCheckedWalkthroughItems] = useState<Record<string, boolean>>({});
  const [ceremonyFilter, setCeremonyFilter] = useState<'all' | 'shinto' | 'chapel' | 'civil'>('all');
  const [walkthroughSearch, setWalkthroughSearch] = useState<string>('');

  const toggleWalkthroughItem = (itemKey: string) => {
    setCheckedWalkthroughItems(prev => ({
      ...prev,
      [itemKey]: !prev[itemKey]
    }));
  };

  const handleCheckAllStep = (step: VenueWalkthroughCheckItem, check: boolean) => {
    const updated = { ...checkedWalkthroughItems };
    step.targetCheckItems.forEach((_, idx) => {
      updated[`${step.id}-target-${idx}`] = check;
    });
    if (step.ceremonySpecific) {
      ['oath', 'threeCups', 'sacredSake', 'sacredBranch', 'weddingRings'].forEach(k => {
        updated[`${step.id}-shinto-${k}`] = check;
      });
      ['hymn', 'pastor', 'musicians', 'motherVeil', 'weddingRings'].forEach(k => {
        updated[`${step.id}-chapel-${k}`] = check;
      });
      ['moderator', 'weddingRings', 'oath'].forEach(k => {
        updated[`${step.id}-civil-${k}`] = check;
      });
    }
    setCheckedWalkthroughItems(updated);
  };

  const totalWalkthroughKeys = useMemo(() => {
    const keys: string[] = [];
    VENUE_WALKTHROUGH_CHECKLIST_DATA.forEach(step => {
      step.targetCheckItems.forEach((_, idx) => {
        keys.push(`${step.id}-target-${idx}`);
      });
      if (step.ceremonySpecific) {
        ['oath', 'threeCups', 'sacredSake', 'sacredBranch', 'weddingRings'].forEach(k => {
          keys.push(`${step.id}-shinto-${k}`);
        });
        ['hymn', 'pastor', 'musicians', 'motherVeil', 'weddingRings'].forEach(k => {
          keys.push(`${step.id}-chapel-${k}`);
        });
        ['moderator', 'weddingRings', 'oath'].forEach(k => {
          keys.push(`${step.id}-civil-${k}`);
        });
      }
    });
    return keys;
  }, []);

  const walkthroughCheckedCount = useMemo(() => {
    return totalWalkthroughKeys.filter(k => checkedWalkthroughItems[k]).length;
  }, [totalWalkthroughKeys, checkedWalkthroughItems]);

  const walkthroughPct = Math.round((walkthroughCheckedCount / (totalWalkthroughKeys.length || 1)) * 100);

  // Packing Checklist State
  const [checkedPackingIds, setCheckedPackingIds] = useState<Record<string, boolean>>({});
  const [packingCategoryFilter, setPackingCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const togglePackingCheck = (id: string) => {
    setCheckedPackingIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCheckAllPacking = (check: boolean) => {
    const updated = { ...checkedPackingIds };
    PACKING_CHECKLIST_DATA.forEach(item => {
      updated[item.id] = check;
    });
    setCheckedPackingIds(updated);
  };

  const packingCheckedCount = PACKING_CHECKLIST_DATA.filter(item => checkedPackingIds[item.id]).length;
  const packingProgressPct = Math.round((packingCheckedCount / PACKING_CHECKLIST_DATA.length) * 100);

  const filteredPackingItems = useMemo(() => {
    return PACKING_CHECKLIST_DATA.filter(item => {
      const matchCat = packingCategoryFilter === 'all' || item.category === packingCategoryFilter;
      const matchQuery = !searchQuery || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.detailNote.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.bereavedRisk.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [packingCategoryFilter, searchQuery]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 font-sans">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-100 text-stone-900 rounded-full text-xs font-extrabold border border-stone-300">
              <ShieldCheck className="w-4 h-4 text-stone-700" />
              現場実務直結・ミスゼロ執行
            </span>
            <span className="text-xs text-stone-500 font-medium hidden sm:inline">
              葬祭ディレクター 現場ミスゼロ執行マニュアル
            </span>
          </div>

          <button
            onClick={() => window.print()}
            className="no-print inline-flex items-center gap-1.5 px-3.5 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition-all"
          >
            <Printer className="w-4 h-4 text-amber-300" />
            <span>現場携行シート印刷</span>
          </button>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif-jp text-stone-900 tracking-tight">
            現場超実務・当日の忘れ物 ＆ 宗派別作法・防犯マニュアル
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm mt-1 leading-relaxed max-w-4xl">
            資格試験の机上の言葉遊びでは現場は回りません。式場到着順の現場巡回点検（入口看板・親族控室・式場祭壇・挙式3大様式・写真室・スタッフ打合せ・引き出物・受付金庫）、忘れ物ゼロ点検、宗派別焼香回数、お布施渡し方、副葬品OK/NG、香典泥棒防止など、<strong>現場でご遺族を絶対に失敗させない必須実務</strong>を完全網羅しました。
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="no-print flex flex-wrap gap-2 pt-2 border-t border-stone-100">
          {[
            { id: 'venue_walkthrough', label: '① 現場動線順 10大エリア巡回点検', icon: Compass, badge: `${walkthroughCheckedCount}/${totalWalkthroughKeys.length}` },
            { id: 'packing', label: '② 当日忘れ物ゼロ 持込品点検', icon: Luggage, badge: `${packingCheckedCount}/${PACKING_CHECKLIST_DATA.length}` },
            { id: 'incense', label: '③ 主要宗派別 焼香作法・忍び手', icon: Sparkles },
            { id: 'ofuse', label: '④ お布施・御車料・御膳料マナー', icon: Coins },
            { id: 'burial', label: '⑤ 納棺副葬品 OK/NG判定', icon: AlertOctagon },
            { id: 'security', label: '⑥ 香典泥棒防止 金庫リレー', icon: Lock },
            { id: 'relatives', label: '⑦ 親族肩書（伯父 vs 叔父）', icon: Users }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-stone-500'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isActive ? 'bg-stone-800 text-amber-200' : 'bg-stone-200 text-stone-700'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: 現場動線順 10大エリア巡回点検 */}
      {activeTab === 'venue_walkthrough' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-100 pb-4">
              <div>
                <h2 className="text-base font-bold font-serif-jp text-stone-900 flex items-center gap-2">
                  <Compass className="w-5 h-5 text-stone-700" />
                  <span>式場到着順・10大エリア完全巡回チェックリスト（開宴前指差し点検）</span>
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  入口案内板 ➔ 親族控室 ➔ 来賓控室 ➔ 披露宴会場 ➔ 挙式場（神前・チャペル・人前） ➔ 写真室 ➔ スタッフ打合せ ➔ 引き出物 ➔ 受付金庫 ➔ 宿泊室
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-stone-500">点検完了:</span>
                <span className="text-sm font-bold font-mono text-stone-900">
                  {walkthroughCheckedCount} / {totalWalkthroughKeys.length} 項目（{walkthroughPct}%)
                </span>
              </div>
            </div>

            {/* 10 Step Cards */}
            <div className="space-y-4">
              {VENUE_WALKTHROUGH_CHECKLIST_DATA.map((step) => {
                const allChecked = step.targetCheckItems.every((_, idx) => checkedWalkthroughItems[`${step.id}-target-${idx}`]);

                return (
                  <div key={step.id} className={`p-4 sm:p-5 rounded-xl border transition-all ${
                    allChecked ? 'bg-emerald-50/40 border-emerald-300' : 'bg-stone-50/40 border-stone-200 hover:border-stone-400'
                  }`}>
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200/80 pb-2 mb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-stone-900 text-white text-xs font-bold flex items-center justify-center shrink-0">
                          {step.stepNumber}
                        </span>
                        <h3 className="text-sm font-bold text-stone-900 font-serif-jp">
                          {step.zoneName}：{step.checkpointName}
                        </h3>
                        <span className="text-[11px] text-stone-500 font-mono">({step.timing})</span>
                      </div>

                      <button
                        onClick={() => handleCheckAllStep(step, !allChecked)}
                        className={`px-2.5 py-1 rounded text-xs font-semibold ${
                          allChecked ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
                        }`}
                      >
                        {allChecked ? '✓ 点検済' : '一括点検'}
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      {step.targetCheckItems.map((item, idx) => {
                        const k = `${step.id}-target-${idx}`;
                        const isChecked = !!checkedWalkthroughItems[k];
                        return (
                          <div
                            key={idx}
                            onClick={() => toggleWalkthroughItem(k)}
                            className={`p-3 rounded-lg border cursor-pointer flex items-start gap-2.5 transition-colors ${
                              isChecked ? 'bg-emerald-50 border-emerald-300' : 'bg-white border-stone-200 hover:bg-stone-50'
                            }`}
                          >
                            <div className={`w-4 h-4 rounded shrink-0 mt-0.5 border flex items-center justify-center text-[10px] ${
                              isChecked ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-stone-300 bg-white'
                            }`}>
                              {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <div className="space-y-0.5">
                              <span className={`font-bold block ${isChecked ? 'line-through text-stone-400' : 'text-stone-900'}`}>{item.label}</span>
                              <p className="text-stone-600 text-[11px] leading-relaxed">{item.description}</p>
                              <div className="text-[10px] text-stone-700 bg-stone-100 p-1 rounded font-medium mt-1">
                                💡 要諦: {item.criticalPoint}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3 text-[11px]">
                      <div className="p-2 bg-rose-50 text-rose-800 rounded border border-rose-100">
                        ⚠️ リスク: {step.dangerRisk}
                      </div>
                      <div className="p-2 bg-stone-100 text-stone-800 rounded border border-stone-200 font-medium">
                        🛡️ 鉄則: {step.failSafeRule}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: 当日忘れ物ゼロ 持込品点検 */}
      {activeTab === 'packing' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-100 pb-4">
              <div>
                <h2 className="text-base font-bold font-serif-jp text-stone-900 flex items-center gap-2">
                  <Luggage className="w-5 h-5 text-stone-700" />
                  <span>当日の忘れ物ゼロ！喪主・ご遺族・ディレクター持込品マスター</span>
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  火葬許可証、数珠、遺影写真、お布施、香典金庫など、全国の葬儀現場で頻発する忘れ物を100%遮断する点検シートです。
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-stone-500">点検完了:</span>
                <span className="text-sm font-bold font-mono text-stone-900">
                  {packingCheckedCount} / {PACKING_CHECKLIST_DATA.length} 項目（{packingProgressPct}%）
                </span>
                <button
                  onClick={() => handleCheckAllPacking(true)}
                  className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded text-xs"
                >
                  全点検
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {filteredPackingItems.map(item => {
                const isChecked = !!checkedPackingIds[item.id];
                return (
                  <div
                    key={item.id}
                    onClick={() => togglePackingCheck(item.id)}
                    className={`p-4 rounded-xl border cursor-pointer flex flex-col sm:flex-row sm:items-start justify-between gap-3 transition-colors ${
                      isChecked ? 'bg-emerald-50/50 border-emerald-300' : 'bg-white border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded shrink-0 mt-0.5 border flex items-center justify-center ${
                        isChecked ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-stone-300 bg-white'
                      }`}>
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>

                      <div className="space-y-1 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="bg-stone-100 text-stone-700 px-2 py-0.5 rounded font-bold text-[10px]">
                            対象: {item.target}
                          </span>
                          <span className="text-stone-500 text-[11px] font-mono">{item.timing}</span>
                        </div>
                        <h4 className={`text-sm font-bold ${isChecked ? 'line-through text-stone-400' : 'text-stone-900'}`}>{item.name}</h4>
                        <p className="text-stone-600 leading-relaxed">{item.detailNote}</p>
                      </div>
                    </div>

                    <div className="sm:max-w-xs shrink-0 bg-rose-50 p-2.5 rounded-lg border border-rose-100 text-[11px] text-rose-800">
                      ⚠️ 忘れた場合の事故：{item.bereavedRisk}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: 主要宗派別 焼香作法・忍び手 */}
      {activeTab === 'incense' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
            <div className="border-b border-stone-100 pb-3">
              <h2 className="text-base font-bold font-serif-jp text-stone-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-stone-700" />
                <span>主要宗派別 焼香回数 ＆ 線香の作法（おしいただく/おしいただかない）</span>
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                参列者から最も質問される焼香回数と所作。浄土真宗のおしいただかない作法や神葬祭のしのび手を即答できるようにします。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SECT_INCENSE_MANNERS.map((s, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-stone-200 bg-stone-50/40 space-y-2 text-xs">
                  <div className="flex justify-between items-center border-b border-stone-200 pb-2">
                    <span className="font-bold text-sm text-stone-900 font-serif-jp">{s.sectName}</span>
                    <span className="px-2 py-0.5 bg-stone-200 text-stone-800 rounded font-bold font-mono text-[11px]">
                      {s.incenseTimes}
                    </span>
                  </div>

                  <div className="space-y-1 text-stone-700 leading-relaxed">
                    <p><strong>線香の作法：</strong>{s.lineIncense}</p>
                    <p><strong>唱える言葉：</strong>{s.recitation}</p>
                    <p className="bg-white p-2 rounded border border-stone-200 text-[11px]">{s.mannerDetail}</p>
                    <div className="p-1.5 bg-rose-50 text-rose-800 rounded text-[10px] font-medium border border-rose-100">
                      {s.caution}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: お布施・御車料・御膳料マナー */}
      {activeTab === 'ofuse' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
            <div className="border-b border-stone-100 pb-3">
              <h2 className="text-base font-bold font-serif-jp text-stone-900 flex items-center gap-2">
                <Coins className="w-5 h-5 text-stone-700" />
                <span>寺院へのお布施・御車料・御膳料の相場 ＆ 切手盆での正式な手渡し作法</span>
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                お布施を手渡しで畳に滑らせるのは非礼。必ず切手盆または袱紗に乗せて差し出します。新札を使用してもマナー違反ではありません。
              </p>
            </div>

            <div className="space-y-3">
              {OFUSE_GUIDELINES.map((guide, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-2 text-xs">
                  <div className="flex flex-wrap justify-between items-center gap-2 border-b border-stone-200 pb-2">
                    <span className="font-bold text-sm text-stone-900 font-serif-jp">{guide.itemTitle}</span>
                    <span className="font-mono font-bold text-stone-800 bg-stone-100 px-2.5 py-0.5 rounded border border-stone-200">
                      相場: {guide.amountStandard}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-stone-700">
                    <div><strong>表書き：</strong>{guide.envelopeTitle}</div>
                    <div><strong>手渡す時期：</strong>{guide.timing}</div>
                  </div>
                  <p className="bg-white p-2.5 rounded-lg border border-stone-200 leading-relaxed text-stone-800">
                    {guide.mannerProtocol}
                  </p>
                  <div className="p-2 bg-rose-50 text-rose-800 rounded border border-rose-100 text-[11px] font-medium">
                    ⚠️ {guide.caution}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: 納棺副葬品 OK/NG判定 */}
      {activeTab === 'burial' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
            <div className="border-b border-stone-100 pb-3">
              <h2 className="text-base font-bold font-serif-jp text-stone-900 flex items-center gap-2">
                <AlertOctagon className="w-5 h-5 text-rose-600" />
                <span>納棺の儀・副葬品 OK / NG完全判定リスト（火葬炉事故・遺骨損傷防止）</span>
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                メガネや時計を入れると遺骨に溶けて焼き付きます。ペースメーカーは火葬炉内で爆発するため事前申告が絶対義務です。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {BURIAL_ITEMS_DATA.map((item, idx) => (
                <div key={idx} className={`p-3.5 rounded-xl border space-y-1.5 ${
                  item.isAllowed ? 'bg-emerald-50/40 border-emerald-300' : 'bg-rose-50/50 border-rose-300'
                }`}>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-stone-900 text-sm">{item.item}</span>
                    <span className={`px-2 py-0.5 rounded font-bold text-xs ${
                      item.isAllowed ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-600 text-white'
                    }`}>
                      {item.isAllowed ? '⭕️ 納棺OK' : '❌ 納棺厳禁'}
                    </span>
                  </div>
                  <p className="text-stone-700 leading-relaxed">{item.reason}</p>
                  <div className="bg-white p-2 rounded border border-stone-200 text-[11px] text-stone-600">
                    💡 代替提案: {item.alternativeProposal}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: 香典泥棒防止 金庫リレー */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
            <div className="border-b border-stone-100 pb-3">
              <h2 className="text-base font-bold font-serif-jp text-stone-900 flex items-center gap-2">
                <Lock className="w-5 h-5 text-stone-700" />
                <span>受付防犯・香典泥棒防止「金庫リレー」4つの鉄則ステップ</span>
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                通夜開式後に無人になった受付台を狙う香典泥棒を100%防止するための親族受け渡し手順です。
              </p>
            </div>

            <div className="space-y-3">
              {FUNERAL_SECURITY_STEPS.map(s => (
                <div key={s.step} className="p-4 rounded-xl border border-stone-200 bg-stone-50/40 space-y-1.5 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sm text-stone-900 font-serif-jp">
                      Step {s.step}：{s.phase}
                    </span>
                  </div>
                  <p className="bg-white p-2.5 rounded-lg border border-stone-200 text-stone-800 leading-relaxed font-medium">
                    {s.action}
                  </p>
                  <div className="text-[11px] text-rose-800 bg-rose-50 p-2 rounded border border-rose-100">
                    ⚠️ 遮断するリスク: {s.targetRisk}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: 親族肩書（伯父 vs 叔父） */}
      {activeTab === 'relatives' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
            <div className="border-b border-stone-100 pb-3">
              <h2 className="text-base font-bold font-serif-jp text-stone-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-stone-700" />
                <span>親族肩書・不祝儀袋の漢字表記「伯父・伯母」vs「叔父・叔母」の判定</span>
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                自分から見て年上か年下かではなく、<strong>「父母（または故人）から見て年上か年下か」</strong>で厳格に使い分けます。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {FUNERAL_RELATIVE_RULES.map((r, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-stone-200 bg-stone-50/40 space-y-2">
                  <div className="flex justify-between items-center border-b border-stone-200 pb-1.5">
                    <span className="font-bold text-sm text-stone-900 font-serif-jp">{r.relation}</span>
                    <span className="px-2.5 py-0.5 bg-stone-900 text-white rounded font-bold font-mono text-xs">{r.kanji}</span>
                  </div>
                  <p className="text-stone-700 leading-relaxed"><strong>定義：</strong>{r.definition}</p>
                  <div className="text-stone-800 bg-white p-2 rounded border border-stone-200 text-[11px]">
                    💡 席次・焼香順序: {r.seatingTip}
                  </div>
                  <div className="text-[10px] text-stone-500 font-mono">
                    実例：{r.example}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
