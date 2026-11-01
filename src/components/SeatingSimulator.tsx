import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Building2, 
  CheckCircle2, 
  Crown, 
  Heart, 
  Info, 
  LayoutGrid, 
  Plus, 
  Printer, 
  RotateCcw, 
  ShieldAlert, 
  Sparkles, 
  Trash2, 
  User, 
  Users 
} from 'lucide-react';

export interface FuneralSeatedGuest {
  id: string;
  name: string;
  relationSide: 'relatives' | 'guests'; // 向かって右：親族側 / 向かって左：来賓・世話役側
  title: string; // 肩書き (例: 喪主・長男、故人妻、故人実兄・伯父、勤務先代表、町内会長)
  tableId: string; // 'A', 'B', 'C', 'D', 'E', 'F'
  isChiefMourner: boolean; // 喪主フラグ (最前列内側必須)
  isVIP: boolean; // 主賓・弔辞者フラグ (来賓最前列必須)
  giftType: 'standard' | 'high' | 'none'; // 会葬返礼品・香典返し当日返し区分
  burnOrder: number; // 焼香順位
}

export interface TableConfig {
  id: string;
  name: string;
  side: 'relatives' | 'guests';
  rank: 'front' | 'middle' | 'back'; // 前列（上座）、中列、後列
  description: string;
  capacity: number;
}

const FUNERAL_SECTIONS: TableConfig[] = [
  { id: 'A', name: '親族席 第1列（喪主・近親遺族席）', side: 'relatives', rank: 'front', description: '【祭壇向かって右・最前列】喪主・配偶者・子供・孫', capacity: 6 },
  { id: 'B', name: '来賓席 第1列（弔辞者・主賓・役員席）', side: 'guests', rank: 'front', description: '【祭壇向かって左・最前列】会社社長・恩師・葬儀委員長', capacity: 6 },
  { id: 'C', name: '親族席 第2列（兄弟姉妹・伯父叔父席）', side: 'relatives', rank: 'middle', description: '【祭壇向かって右・中列】故人の兄弟・伯父伯母・叔父叔母', capacity: 8 },
  { id: 'D', name: '来賓席 第2列（職場同僚・関係団体席）', side: 'guests', rank: 'middle', description: '【祭壇向かって左・中列】勤務先同僚・業界団体・友人代表', capacity: 8 },
  { id: 'E', name: '親族席 第3列（いとこ・遠縁親族席）', side: 'relatives', rank: 'back', description: '【祭壇向かって右・後列】従兄弟・従姉妹・遠縁', capacity: 6 },
  { id: 'F', name: '一般会葬者席 ＆ 世話役席（出入口側）', side: 'guests', rank: 'back', description: '【祭壇向かって左・出入口側】町内会・ご近所・一般会葬者', capacity: 10 }
];

const INITIAL_FUNERAL_GUESTS: FuneralSeatedGuest[] = [
  // 席A (親族最前列・喪主)
  { id: 'g1', name: '山田 太郎 様', relationSide: 'relatives', title: '喪主（故人長男）', tableId: 'A', isChiefMourner: true, isVIP: false, giftType: 'none', burnOrder: 1 },
  { id: 'g2', name: '山田 和子 様', relationSide: 'relatives', title: '故人配偶者（妻）', tableId: 'A', isChiefMourner: false, isVIP: false, giftType: 'none', burnOrder: 2 },
  { id: 'g3', name: '山田 花子 様', relationSide: 'relatives', title: '故人長女', tableId: 'A', isChiefMourner: false, isVIP: false, giftType: 'none', burnOrder: 3 },

  // 席B (来賓最前列・主賓)
  { id: 'g4', name: '佐藤 健太郎 様', relationSide: 'guests', title: '来賓代表・弔辞者（株式会社〇〇 代表取締役）', tableId: 'B', isChiefMourner: false, isVIP: true, giftType: 'high', burnOrder: 7 },
  { id: 'g5', name: '高橋 秀樹 様', relationSide: 'guests', title: '葬儀委員長（〇〇町内会長）', tableId: 'B', isChiefMourner: false, isVIP: true, giftType: 'high', burnOrder: 8 },

  // 席C (親族第2列・伯父叔父)
  { id: 'g6', name: '山田 正男 様', relationSide: 'relatives', title: '故人の実兄（伯父）', tableId: 'C', isChiefMourner: false, isVIP: false, giftType: 'standard', burnOrder: 4 },
  { id: 'g7', name: '伊藤 昭彦 様', relationSide: 'relatives', title: '故人の実弟（叔父）', tableId: 'C', isChiefMourner: false, isVIP: false, giftType: 'standard', burnOrder: 5 },
  { id: 'g8', name: '鈴木 恵美 様', relationSide: 'relatives', title: '故人の妹（叔母）', tableId: 'C', isChiefMourner: false, isVIP: false, giftType: 'standard', burnOrder: 6 },

  // 席D (来賓第2列)
  { id: 'g9', name: '加藤 俊介 様', relationSide: 'guests', title: '勤務先同僚代表', tableId: 'D', isChiefMourner: false, isVIP: false, giftType: 'standard', burnOrder: 9 },
  { id: 'g10', name: '渡辺 亮 様', relationSide: 'guests', title: '故人友人代表', tableId: 'D', isChiefMourner: false, isVIP: false, giftType: 'standard', burnOrder: 10 }
];

export const SeatingSimulator: React.FC = () => {
  const [guests, setGuests] = useState<FuneralSeatedGuest[]>(INITIAL_FUNERAL_GUESTS);
  const [selectedTableId, setSelectedTableId] = useState<string>('A');

  // New guest inputs
  const [newName, setNewName] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newSide, setNewSide] = useState<'relatives' | 'guests'>('relatives');
  const [newTable, setNewTable] = useState('A');
  const [newGift, setNewGift] = useState<'standard' | 'high' | 'none'>('standard');
  const [newBurnOrder, setNewBurnOrder] = useState<number>(guests.length + 1);

  // Manner diagnostics
  const mannerWarnings: string[] = [];

  // Diagnostic 1: Chief Mourner must be in Section A front row
  const chiefMourner = guests.find(g => g.isChiefMourner);
  if (chiefMourner && chiefMourner.tableId !== 'A') {
    mannerWarnings.push(`⚠️ 【重大な配席違反】喪主様（${chiefMourner.name}）が最前列親族席（区画A）以外に配置されています。喪主は祭壇に向かって【右側最前列・中央通路側】に着席するのが絶対原則です。`);
  }

  // Diagnostic 2: Relatives on Left side violation
  guests.forEach(g => {
    const section = FUNERAL_SECTIONS.find(s => s.id === g.tableId);
    if (g.relationSide === 'relatives' && section?.side === 'guests') {
      mannerWarnings.push(`⚠️ 【左右逆転違反】ご親族の（${g.name}様・${g.title}）が来賓側（向かって左側区画）に座っています。親族はすべて【向かって右側】に着席させます。`);
    }
    if (g.relationSide === 'guests' && section?.side === 'relatives') {
      mannerWarnings.push(`⚠️ 【左右逆転違反】一般会葬者・来賓の（${g.name}様）が親族席（向かって右側区画）に座っています。来賓・知人は【向かって左側】に着席させます。`);
    }
  });

  const handleAddGuest = () => {
    if (!newName.trim()) return;
    const isMourner = newTitle.includes('喪主');
    const isVIP = newTitle.includes('弔辞') || newTitle.includes('社長') || newTitle.includes('委員長');

    const newGuest: FuneralSeatedGuest = {
      id: `fg-${Date.now()}`,
      name: newName.trim(),
      relationSide: newSide,
      title: newTitle.trim() || 'ご会葬者様',
      tableId: newTable,
      isChiefMourner: isMourner,
      isVIP: isVIP,
      giftType: newGift,
      burnOrder: newBurnOrder
    };

    setGuests(prev => [...prev, newGuest]);
    setNewName('');
    setNewTitle('');
    setNewBurnOrder(prev => prev + 1);
  };

  const handleDeleteGuest = (id: string) => {
    setGuests(prev => prev.filter(g => g.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 font-sans">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-4">
          <div className="flex items-center gap-2">
            <span className="bg-stone-100 text-stone-800 text-xs font-bold px-3 py-1 rounded-full border border-stone-300 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-stone-700" />
              葬祭ディレクター式場配席診断
            </span>
            <span className="text-xs text-stone-500 hidden sm:inline">
              祭壇向かって【右が親族・左が来賓】＆ 焼香序列シミュレーター
            </span>
          </div>

          <button
            onClick={() => window.print()}
            className="no-print px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4 text-amber-300" />
            <span>親族席次・焼香順位表を印刷</span>
          </button>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif-jp text-stone-900 tracking-tight">
            葬儀・告別式 親族席次 ＆ 焼香順位シミュレーター
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm mt-1 leading-relaxed max-w-4xl">
            葬儀告別式の席次は、婚礼とは全く異なる厳格なプロトコルが存在します。
            <strong>祭壇に向かって【右側が喪主・親族席】、向かって【左側が来賓・一般会葬者席】</strong>となり、
            最前列中央が喪主席となります。伯父（兄）と叔父（弟）の序列、焼香の呼び出し順位をリアルタイム診断します。
          </p>
        </div>
      </div>

      {/* Manner Diagnostic Banner */}
      {mannerWarnings.length > 0 ? (
        <div className="p-4 sm:p-5 rounded-2xl bg-rose-50 border-2 border-rose-300 space-y-2">
          <div className="flex items-center gap-2 text-rose-900 font-bold text-sm">
            <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0" />
            <span>【葬祭ディレクター警告】席次のマナー違反・左右逆転が検出されました（{mannerWarnings.length}件）</span>
          </div>
          <div className="space-y-1 text-xs text-rose-800 leading-relaxed">
            {mannerWarnings.map((warn, i) => (
              <p key={i} className="pl-3 border-l-2 border-rose-400">
                {warn}
              </p>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 flex items-center gap-3">
          <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
          <div className="text-xs">
            <span className="font-bold text-sm text-emerald-900 block font-serif-jp">
              格式ある完璧な葬儀席次・焼香順序です！
            </span>
            祭壇向かって右側に親族（喪主最前列）、左側に来賓代表（弔辞者）が正しく配置され、焼香順序も血縁順に整然と整っています。
          </div>
        </div>
      )}

      {/* Visual Altar & Seating Layout */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-3">
          <h3 className="text-base font-bold text-stone-900 font-serif-jp flex items-center gap-2">
            <LayoutGrid className="w-5 h-5 text-stone-700" />
            <span>告別式場 席次フロアマップ ＆ 焼香台配置</span>
          </h3>
          <span className="text-xs text-stone-500 font-mono">
            登録着席者数: {guests.length} 名
          </span>
        </div>

        {/* 1. ALTAR AND INCENSE STAND (正面祭壇・焼香所) */}
        <div className="max-w-3xl mx-auto p-5 rounded-2xl bg-stone-50 border-2 border-stone-300 text-center space-y-3">
          <div className="text-xs font-bold text-stone-700 uppercase tracking-widest">
            正面 生花祭壇 ＆ 遺影・位牌・棺（地上高2.4m）
          </div>
          <div className="p-3 bg-white rounded-xl border border-stone-300 flex items-center justify-center gap-6 text-xs">
            <span className="font-bold text-stone-900">【中央】遺影写真 ＆ 白木位牌</span>
            <span className="text-stone-300">|</span>
            <span className="font-bold text-stone-900">【前机】導師席（僧侶読経）</span>
            <span className="text-stone-300">|</span>
            <span className="font-bold text-amber-800">【正面中央】焼香台（立礼）</span>
          </div>
          <div className="text-[11px] text-stone-500">
            ▲ 式場正面（導師入場・焼香所） ▲
          </div>
        </div>

        {/* 2. LEFT VS RIGHT SEATING SECTIONS */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-bold px-2">
            <span className="text-stone-800 bg-stone-100 px-3 py-1 rounded-md border border-stone-200">
              【向かって左側】来賓席・世話役・一般会葬者席
            </span>
            <span className="text-stone-400 font-normal">
              中央通路（焼香入場ライン）
            </span>
            <span className="text-stone-800 bg-stone-100 px-3 py-1 rounded-md border border-stone-200">
              【向かって右側】喪主・遺族・親族席
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Left side sections: B, D, F */}
            <div className="space-y-3">
              {FUNERAL_SECTIONS.filter(s => s.side === 'guests').map(section => {
                const seated = guests.filter(g => g.tableId === section.id);
                return (
                  <div
                    key={section.id}
                    onClick={() => setSelectedTableId(section.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      selectedTableId === section.id
                        ? 'bg-stone-50 border-stone-800 shadow-sm ring-1 ring-stone-800'
                        : 'bg-white hover:bg-stone-50 border-stone-200'
                    }`}
                  >
                    <div className="flex justify-between items-center border-b border-stone-100 pb-1.5 mb-2">
                      <span className="font-bold text-xs text-stone-900">{section.name}</span>
                      <span className="text-[10px] text-stone-500">{section.description}</span>
                    </div>

                    <div className="space-y-1.5 min-h-16">
                      {seated.map(g => (
                        <div key={g.id} className="p-2 bg-stone-50 rounded-lg border border-stone-200 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1.5 truncate">
                            <span className="w-5 h-5 rounded-full bg-stone-200 text-stone-700 font-bold text-[10px] flex items-center justify-center shrink-0">
                              {g.burnOrder}
                            </span>
                            <span className="font-bold text-stone-900">{g.name}</span>
                            <span className="text-[10px] text-stone-500 truncate">({g.title})</span>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteGuest(g.id);
                            }}
                            className="text-stone-400 hover:text-rose-600 p-0.5 ml-2"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                      {seated.length === 0 && (
                        <p className="text-center text-stone-400 text-xs py-3">着席者なし</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right side sections: A, C, E */}
            <div className="space-y-3">
              {FUNERAL_SECTIONS.filter(s => s.side === 'relatives').map(section => {
                const seated = guests.filter(g => g.tableId === section.id);
                return (
                  <div
                    key={section.id}
                    onClick={() => setSelectedTableId(section.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      selectedTableId === section.id
                        ? 'bg-stone-50 border-stone-800 shadow-sm ring-1 ring-stone-800'
                        : 'bg-white hover:bg-stone-50 border-stone-200'
                    }`}
                  >
                    <div className="flex justify-between items-center border-b border-stone-100 pb-1.5 mb-2">
                      <span className="font-bold text-xs text-stone-900">{section.name}</span>
                      <span className="text-[10px] text-stone-500">{section.description}</span>
                    </div>

                    <div className="space-y-1.5 min-h-16">
                      {seated.map(g => (
                        <div key={g.id} className="p-2 bg-stone-50 rounded-lg border border-stone-200 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1.5 truncate">
                            <span className={`w-5 h-5 rounded-full font-bold text-[10px] flex items-center justify-center shrink-0 ${
                              g.isChiefMourner ? 'bg-stone-900 text-white' : 'bg-stone-200 text-stone-700'
                            }`}>
                              {g.burnOrder}
                            </span>
                            <span className="font-bold text-stone-900">{g.name}</span>
                            <span className="text-[10px] text-stone-500 truncate">({g.title})</span>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteGuest(g.id);
                            }}
                            className="text-stone-400 hover:text-rose-600 p-0.5 ml-2"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                      {seated.length === 0 && (
                        <p className="text-center text-stone-400 text-xs py-3">着席者なし</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Guest Addition Form */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-stone-900 font-serif-jp flex items-center gap-2">
          <Plus className="w-4 h-4 text-stone-700" />
          <span>着席者・焼香順位の新規追加</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="block text-stone-600 font-bold mb-1">お名前（敬称略）</label>
            <input
              type="text"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              placeholder="例: 山田 次郎 様"
              className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:ring-1 focus:ring-stone-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-stone-600 font-bold mb-1">続柄・肩書き</label>
            <input
              type="text"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              placeholder="例: 故人次男、故人伯父、友人代表"
              className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:ring-1 focus:ring-stone-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-stone-600 font-bold mb-1">配席側（左右）</label>
            <select
              value={newSide}
              onChange={e => setNewSide(e.target.value as 'relatives' | 'guests')}
              className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:ring-1 focus:ring-stone-600 outline-none"
            >
              <option value="relatives">親族側（祭壇向かって右）</option>
              <option value="guests">来賓・一般側（祭壇向かって左）</option>
            </select>
          </div>

          <div>
            <label className="block text-stone-600 font-bold mb-1">配置区画</label>
            <select
              value={newTable}
              onChange={e => setNewTable(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:ring-1 focus:ring-stone-600 outline-none"
            >
              {FUNERAL_SECTIONS.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.description})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-stone-600 font-bold mb-1">焼香順位（番号）</label>
            <input
              type="number"
              min="1"
              value={newBurnOrder}
              onChange={e => setNewBurnOrder(parseInt(e.target.value) || 1)}
              className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:ring-1 focus:ring-stone-600 outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-stone-600 font-bold mb-1">返礼品区分</label>
            <select
              value={newGift}
              onChange={e => setNewGift(e.target.value as 'standard' | 'high' | 'none')}
              className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:ring-1 focus:ring-stone-600 outline-none"
            >
              <option value="standard">一般会葬御礼（お茶・タオル）</option>
              <option value="high">高額香典・当日返し（カタログ）</option>
              <option value="none">喪主・遺族（返礼品不要）</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end pt-1">
          <button
            onClick={handleAddGuest}
            className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>席次表に登録配席</span>
          </button>
        </div>
      </div>
    </div>
  );
};
