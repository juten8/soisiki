import React, { useState, useMemo } from 'react';
import { FuneralCateringStyle, CateringEquipmentItem } from '../types/quiz';
import { 
  BANQUET_STYLES_DATA, 
  CATERING_EQUIPMENT_MASTER, 
  calculateRequiredStaff,
  StaffRoleItem
} from '../data/cateringEquipmentData';
import { 
  AlertTriangle, 
  Building2, 
  Calendar, 
  Check, 
  CheckCircle2, 
  ChevronRight, 
  Clock, 
  FileCheck, 
  FileSpreadsheet, 
  FileText, 
  Flame, 
  HelpCircle, 
  Info, 
  Layers, 
  MapPin, 
  Printer, 
  Receipt, 
  RotateCcw, 
  ShieldCheck, 
  Sparkles, 
  Trash2, 
  UserCheck, 
  Users, 
  Utensils, 
  UtensilsCrossed, 
  Wine 
} from 'lucide-react';

interface CateringSimulatorProps {
  onOpenAltarSetting?: () => void;
}

export const CateringSimulator: React.FC<CateringSimulatorProps> = ({
  onOpenAltarSetting
}) => {
  // Event & Client Profile
  const [clientName, setClientName] = useState<string>('故 山田 一郎 儀 葬儀告別式（喪主: 山田 太郎 殿）');
  const [eventDate, setEventDate] = useState<string>('通夜: 2026年11月21日 18:00 / 告別式: 11月22日 10:00');
  const [venueName, setVenueName] = useState<string>('総合斎場 メモリアルホール大宮 2階会食室');
  const [quoteNumber] = useState<string>('EST-FUN-202611-042');

  // Simulation Parameters
  const [selectedStyle, setSelectedStyle] = useState<FuneralCateringStyle>('shojin_kaiseki');
  const [guestCount, setGuestCount] = useState<number>(50);
  const [tableCount, setTableCount] = useState<number>(7);
  
  // UI States
  const [activeView, setActiveView] = useState<'estimate' | 'manifest'>('estimate');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [checkedItemIds, setCheckedItemIds] = useState<Record<string, boolean>>({});

  const handleGuestCountChange = (val: number) => {
    setGuestCount(val);
    setTableCount(Math.max(2, Math.ceil(val / 8)));
  };

  const currentStyleInfo = BANQUET_STYLES_DATA.find(s => s.id === selectedStyle) || BANQUET_STYLES_DATA[0];

  const staffing = useMemo(() => {
    return calculateRequiredStaff(guestCount, tableCount);
  }, [guestCount, tableCount]);

  const applicableEquipment = useMemo(() => {
    return CATERING_EQUIPMENT_MASTER.filter(item => {
      if (!item.cateringStyles) return true;
      return item.cateringStyles.includes(selectedStyle);
    });
  }, [selectedStyle]);

  const equipmentDetails = useMemo(() => {
    return applicableEquipment.map(item => {
      let baseQty = 0;
      if (item.perPersonRatio !== undefined) {
        baseQty = guestCount * item.perPersonRatio;
      } else if (item.perTableRatio !== undefined) {
        baseQty = tableCount * item.perTableRatio;
      } else if (item.fixedQuantity !== undefined) {
        baseQty = item.fixedQuantity;
      }
      const totalWithSpare = Math.ceil(baseQty * (1 + item.sparePct));
      const spareQty = totalWithSpare - Math.ceil(baseQty);
      const amount = totalWithSpare * item.unitPrice;

      return {
        ...item,
        baseQty: Math.ceil(baseQty),
        spareQty,
        orderQty: totalWithSpare,
        amount
      };
    });
  }, [applicableEquipment, guestCount, tableCount]);

  const displayedEquipment = useMemo(() => {
    if (activeCategory === 'all') return equipmentDetails;
    if (activeCategory === 'staff') return [];
    return equipmentDetails.filter(item => item.category === activeCategory);
  }, [equipmentDetails, activeCategory]);

  const totalEquipmentCost = useMemo(() => {
    return equipmentDetails.reduce((sum, item) => sum + item.amount, 0);
  }, [equipmentDetails]);

  const totalStaffCost = staffing.totalStaffCost;
  const produceManagementFee = Math.round((totalEquipmentCost + totalStaffCost) * 0.10);
  const subtotalNet = totalEquipmentCost + totalStaffCost + produceManagementFee;
  const consumptionTax = Math.round(subtotalNet * 0.10);
  const grandTotal = subtotalNet + consumptionTax;

  const toggleItemCheck = (id: string) => {
    setCheckedItemIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCheckAll = (check: boolean) => {
    const updated = { ...checkedItemIds };
    applicableEquipment.forEach(item => {
      updated[item.id] = check;
    });
    staffing.staffItems.forEach(s => {
      updated[s.id] = check;
    });
    setCheckedItemIds(updated);
  };

  const allInspectableCount = applicableEquipment.length + staffing.staffItems.length;
  const checkedCount = [...applicableEquipment, ...staffing.staffItems].filter(item => checkedItemIds[item.id]).length;
  const progressPct = allInspectableCount > 0 ? Math.round((checkedCount / allInspectableCount) * 100) : 0;

  const categoryNames: Record<string, string> = {
    table_linen: '① 会食テーブル・リネン設備',
    cutlery_glass: '② 会席漆器・グラス・陰膳セット',
    kitchen_cooking: '③ 厨房保温・おしぼり温蔵設備',
    reception_safe: '④ 受付防犯・香典金庫備品',
    altar_offerings: '⑤ 切手盆・お布施手渡し用具'
  };

  const categories = [
    { id: 'all', label: '全明細（什器＋人件費）' },
    { id: 'table_linen', label: 'テーブル・リネン' },
    { id: 'cutlery_glass', label: '漆器・陰膳・グラス' },
    { id: 'kitchen_cooking', label: '厨房保温保冷' },
    { id: 'reception_safe', label: '香典金庫' },
    { id: 'staff', label: '配膳スタッフ人件費のみ' }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 font-sans">
      {/* Control Header */}
      <div className="no-print space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-6 rounded-2xl shadow-xs border border-stone-200">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-stone-100 text-stone-800 rounded-full text-[11px] font-bold border border-stone-300">
                <Sparkles className="w-3.5 h-3.5 text-stone-600" />
                葬祭ディレクター実務規格
              </span>
              <span className="text-xs text-stone-500 font-medium hidden sm:inline">
                通夜振る舞い・精進落とし仕出し会席
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold font-serif-jp text-stone-900 tracking-tight flex items-center gap-2">
              <Receipt className="w-6 h-6 text-stone-800" />
              <span>葬儀会食（通夜振る舞い・精進落とし）仕出し・配膳見積書</span>
            </h1>
            <p className="text-xs text-stone-600 max-w-3xl leading-relaxed">
              親族や参列者をおもてなしする通夜振る舞い寿司大皿、精進落とし会席膳、故人の陰膳、配膳人手配を自動積算します。
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-xl text-xs sm:text-sm shadow-xs transition-all"
            >
              <Printer className="w-4 h-4 text-amber-300" />
              <span>A4印刷・PDF出力</span>
            </button>
          </div>
        </div>

        {/* View Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-xl border border-stone-200 text-xs">
          <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg">
            <button
              onClick={() => setActiveView('estimate')}
              className={`px-3 py-1.5 rounded-md font-bold transition-all flex items-center gap-1.5 ${
                activeView === 'estimate'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>仕出し・配膳お見積書</span>
            </button>
            <button
              onClick={() => setActiveView('manifest')}
              className={`px-3 py-1.5 rounded-md font-bold transition-all flex items-center gap-1.5 ${
                activeView === 'manifest'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <FileCheck className="w-4 h-4" />
              <span>現場納品・配膳チェックシート</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[11px] text-stone-500">点検済:</span>
              <span className="font-bold text-xs font-mono ml-1 text-stone-900">
                {checkedCount} / {allInspectableCount} 項目（{progressPct}%）
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleCheckAll(true)}
                className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded text-[11px] font-semibold"
              >
                全点検完了
              </button>
              <button
                onClick={() => handleCheckAll(false)}
                className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-500 rounded text-[11px]"
              >
                解除
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Banquet Style Selector */}
      <div className="no-print space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
            会食スタイル選択（形式により必要漆器・陰膳・配膳人が切り替わります）
          </label>
          {onOpenAltarSetting && (
            <button
              onClick={onOpenAltarSetting}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 rounded-lg text-xs font-bold transition-colors"
            >
              <Utensils className="w-3.5 h-3.5 text-stone-700" />
              <span>会食室・陰膳配置図面を確認</span>
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {BANQUET_STYLES_DATA.map((style) => {
            const isSelected = style.id === selectedStyle;
            return (
              <button
                key={style.id}
                onClick={() => setSelectedStyle(style.id)}
                className={`p-3.5 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? 'bg-stone-900 text-white border-stone-950 shadow-md ring-2 ring-stone-900'
                    : 'bg-white hover:bg-stone-50 text-stone-800 border-stone-200 hover:border-stone-400 shadow-xs'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isSelected ? 'bg-stone-800 text-amber-200' : 'bg-stone-100 text-stone-600'
                    }`}>
                      {style.subname}
                    </span>
                    {isSelected && <Check className="w-4 h-4 text-amber-300" />}
                  </div>
                  <div className="text-sm font-bold font-serif-jp pt-0.5">
                    {style.name}
                  </div>
                  <p className={`text-[11px] leading-tight line-clamp-2 ${
                    isSelected ? 'text-stone-300' : 'text-stone-500'
                  }`}>
                    {style.tagline}
                  </p>
                </div>

                <div className={`mt-2 pt-1.5 border-t text-[10px] flex items-center justify-between ${
                  isSelected ? 'border-stone-800 text-amber-300' : 'border-stone-100 text-stone-400'
                }`}>
                  <span>{isSelected ? '選択中' : '選択して再計算'}</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Scale Sliders */}
      <div className="no-print bg-white rounded-2xl p-5 shadow-xs border border-stone-200 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-3">
          <h3 className="text-sm font-bold font-serif-jp text-stone-900 flex items-center gap-2">
            <Users className="w-4 h-4 text-stone-700" />
            <span>会食人数・配膳卓数設定</span>
          </h3>
          <div className="flex items-center gap-3 text-xs">
            <span className="text-stone-600">会食人数: <strong className="text-stone-900 font-mono">{guestCount}名</strong></span>
            <span className="text-stone-600">配膳卓数: <strong className="text-stone-900 font-mono">{tableCount}卓</strong></span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <span className="text-stone-600">会食想定人数（10〜120名）:</span>
              <span className="font-bold font-mono text-stone-900">{guestCount}名</span>
            </div>
            <input
              type="range"
              min={10}
              max={120}
              step={5}
              value={guestCount}
              onChange={(e) => handleGuestCountChange(parseInt(e.target.value))}
              className="w-full accent-stone-800 cursor-pointer"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between">
              <span className="text-stone-600">卓数設定（長机・円卓）:</span>
              <span className="font-bold font-mono text-stone-900">{tableCount} 卓</span>
            </div>
            <input
              type="range"
              min={2}
              max={15}
              step={1}
              value={tableCount}
              onChange={(e) => setTableCount(parseInt(e.target.value))}
              className="w-full accent-stone-800 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Formal Estimate Output Sheet */}
      <div className="bg-white rounded-2xl border border-stone-300 p-6 sm:p-8 shadow-xs space-y-8 text-stone-900">
        {/* Document Header */}
        <div className="border-b-2 border-stone-900 pb-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-[10px] sm:text-xs text-stone-500 tracking-widest font-mono">
                FUNERAL CATERING SPECIFICATION & SERVICE ROSTER
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif-jp tracking-tight text-stone-950 mt-1">
                通夜振る舞い・精進落とし 仕出し御見積書
              </h2>
              <div className="text-xs text-stone-600 font-medium">
                兼 陰膳・配膳スタッフ手配指示書
              </div>
            </div>

            <div className="text-right text-xs space-y-1 font-mono text-stone-700 bg-stone-50 p-3 rounded-lg border border-stone-200">
              <div><span className="text-stone-500">見積番号:</span> <span className="font-bold">{quoteNumber}</span></div>
              <div><span className="text-stone-500">発行日付:</span> 2026年10月31日</div>
              <div><span className="text-stone-500">担当葬祭ディレクター:</span> 式場責任者</div>
            </div>
          </div>

          {/* Client & Event Specs Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 text-xs">
            <div className="space-y-2 bg-stone-50/80 p-3.5 rounded-xl border border-stone-200">
              <div className="flex items-center gap-2">
                <span className="font-bold text-stone-500 shrink-0 w-24">ご遺族宛名:</span>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-white px-2 py-1 border border-stone-300 rounded font-serif-jp font-bold text-sm text-stone-900"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-stone-500 shrink-0 w-24">施行日時:</span>
                <input
                  type="text"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full bg-white px-2 py-1 border border-stone-300 rounded text-stone-800 font-mono"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-stone-500 shrink-0 w-24">会食会場:</span>
                <input
                  type="text"
                  value={venueName}
                  onChange={(e) => setVenueName(e.target.value)}
                  className="w-full bg-white px-2 py-1 border border-stone-300 rounded text-stone-800"
                />
              </div>
            </div>

            <div className="space-y-2 bg-stone-50 p-3.5 rounded-xl border border-stone-200">
              <div className="flex justify-between items-center text-xs">
                <span className="text-stone-700 font-bold">会食スタイル:</span>
                <span className="font-bold text-stone-900 font-serif-jp bg-stone-200 px-2 py-0.5 rounded">
                  {currentStyleInfo.name}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-stone-600">会食想定人数:</span>
                <span className="font-bold font-mono text-stone-900">{guestCount} 名様（陰膳1膳含む）</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-stone-600">専任配膳スタッフ:</span>
                <span className="font-bold font-mono text-stone-900">{staffing.totalStaff} 名（キャプテン・配膳人）</span>
              </div>
            </div>
          </div>
        </div>

        {/* Grand Total Display */}
        <div className="bg-stone-900 text-white rounded-xl p-5 shadow-xs space-y-3">
          <div className="flex justify-between items-center border-b border-stone-800 pb-2">
            <span className="text-xs uppercase tracking-wider text-amber-200 font-bold">
              会食仕出し御見積金額（税込総額）
            </span>
            <span className="text-[11px] text-stone-400">※陰膳・配膳料込</span>
          </div>

          <div className="flex items-baseline justify-between">
            <span className="text-xs text-stone-300 font-serif-jp">合計ご請求予定額:</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-200 font-mono">
              ¥ {grandTotal.toLocaleString()} <span className="text-xs text-stone-300 font-normal">（税込）</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 pt-2 border-t border-stone-800 text-xs">
            <div className="flex justify-between text-stone-300">
              <span>什器・食器・陰膳小計:</span>
              <span className="font-mono text-white">¥ {totalEquipmentCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-stone-300">
              <span>専任配膳スタッフ人件費:</span>
              <span className="font-mono text-white">¥ {totalStaffCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-stone-300">
              <span>施行管理・運搬費(10%):</span>
              <span className="font-mono text-white">¥ {produceManagementFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-stone-300">
              <span>消費税（10%）:</span>
              <span className="font-mono text-white">¥ {consumptionTax.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* View 1: Estimate Table */}
        {activeView === 'estimate' && (
          <div className="space-y-6">
            {activeCategory !== 'staff' && (
              <div className="overflow-x-auto rounded-xl border border-stone-300">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-stone-100 border-b border-stone-300 text-stone-800 font-bold">
                      <th className="py-2.5 px-3 w-10 text-center">No</th>
                      <th className="py-2.5 px-3 w-36">分類カテゴリ</th>
                      <th className="py-2.5 px-3">品名・仕様・規格</th>
                      <th className="py-2.5 px-3 text-right w-20">単価</th>
                      <th className="py-2.5 px-3 text-right w-20">発注数</th>
                      <th className="py-2.5 px-3 text-center w-12">単位</th>
                      <th className="py-2.5 px-3 text-right w-24">金額(税抜)</th>
                      <th className="py-2.5 px-3 text-center w-14">点検</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    {displayedEquipment.map((item, idx) => {
                      const isChecked = !!checkedItemIds[item.id];
                      return (
                        <tr key={item.id} className="hover:bg-stone-50">
                          <td className="py-2 px-3 text-center text-stone-400 font-mono">{idx + 1}</td>
                          <td className="py-2 px-3 font-semibold text-stone-600 text-[11px]">
                            {categoryNames[item.category] || item.category}
                          </td>
                          <td className="py-2 px-3">
                            <div className="font-bold text-stone-900">{item.name}</div>
                            <div className="text-[11px] text-stone-500">{item.description}</div>
                            <div className="text-[10px] text-rose-700 font-medium">⚠️ {item.bereavedRiskNote}</div>
                          </td>
                          <td className="py-2 px-3 text-right font-mono text-stone-700">¥{item.unitPrice.toLocaleString()}</td>
                          <td className="py-2 px-3 text-right font-mono font-bold text-stone-900">{item.orderQty}</td>
                          <td className="py-2 px-3 text-center text-stone-500">{item.unit}</td>
                          <td className="py-2 px-3 text-right font-mono font-bold text-stone-900">¥{item.amount.toLocaleString()}</td>
                          <td className="py-2 px-3 text-center">
                            <button
                              onClick={() => toggleItemCheck(item.id)}
                              className={`w-5 h-5 rounded flex items-center justify-center mx-auto border ${
                                isChecked ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-stone-300'
                              }`}
                            >
                              {isChecked && <Check className="w-3.5 h-3.5 stroke-3" />}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="bg-stone-100 font-bold border-t-2 border-stone-300 text-stone-900">
                      <td colSpan={6} className="py-2.5 px-3 text-right">什器・備品・陰膳小計（税抜）:</td>
                      <td className="py-2.5 px-3 text-right font-mono text-sm">¥{totalEquipmentCost.toLocaleString()}</td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}

            {/* Staff Table */}
            {(activeCategory === 'all' || activeCategory === 'staff') && (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold font-serif-jp text-stone-900">
                    専任配膳スタッフ・進行ディレクター人件費明細
                  </h3>
                  <span className="text-xs text-stone-500 font-mono">計 {staffing.totalStaff}名配置</span>
                </div>
                <div className="overflow-x-auto rounded-xl border border-stone-300">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-stone-100 border-b border-stone-300 text-stone-800 font-bold">
                        <th className="py-2 px-3 w-10 text-center">No</th>
                        <th className="py-2 px-3 w-48">役職</th>
                        <th className="py-2 px-3">職責</th>
                        <th className="py-2 px-3 text-right w-24">日当単価</th>
                        <th className="py-2 px-3 text-right w-16">人数</th>
                        <th className="py-2 px-3 text-right w-28">金額(税抜)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200">
                      {staffing.staffItems.map((st, idx) => (
                        <tr key={st.id} className="hover:bg-stone-50">
                          <td className="py-2 px-3 text-center text-stone-400 font-mono">{idx + 1}</td>
                          <td className="py-2 px-3 font-bold text-stone-900">{st.role}</td>
                          <td className="py-2 px-3 text-stone-600 text-[11px]">{st.duty}</td>
                          <td className="py-2 px-3 text-right font-mono">¥{st.unitRate.toLocaleString()}</td>
                          <td className="py-2 px-3 text-right font-mono font-bold">{st.count}名</td>
                          <td className="py-2 px-3 text-right font-mono font-bold">¥{st.amount.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-stone-100 font-bold border-t-2 border-stone-300 text-stone-900">
                        <td colSpan={5} className="py-2.5 px-3 text-right">配膳人件費小計（税抜）:</td>
                        <td className="py-2.5 px-3 text-right font-mono text-sm">¥{totalStaffCost.toLocaleString()}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* View 2: Manifest */}
        {activeView === 'manifest' && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {displayedEquipment.map(item => {
                const isChecked = !!checkedItemIds[item.id];
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleItemCheck(item.id)}
                    className={`p-3 rounded-xl border cursor-pointer flex items-start gap-3 transition-colors ${
                      isChecked ? 'bg-emerald-50/60 border-emerald-300' : 'bg-white border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 border ${
                      isChecked ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-stone-300 bg-white'
                    }`}>
                      {isChecked && <Check className="w-3.5 h-3.5 stroke-3" />}
                    </div>
                    <div>
                      <div className="flex justify-between items-center">
                        <span className={`text-xs font-bold ${isChecked ? 'line-through text-stone-400' : 'text-stone-900'}`}>{item.name}</span>
                        <span className="text-xs font-mono font-bold text-stone-800 ml-2">{item.orderQty} {item.unit}</span>
                      </div>
                      <div className="text-[11px] text-stone-500">{item.description}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
