import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  CheckSquare, 
  DollarSign, 
  Download, 
  FileText, 
  Plus, 
  Printer, 
  RotateCcw, 
  Sparkles, 
  Trash2, 
  TrendingUp, 
  Users,
  Building2,
  ShieldCheck,
  Flame
} from 'lucide-react';

export interface EstimateItem {
  id: string;
  timing: string;
  task: string;
  price: number;
  qty: number;
  perGuest: boolean;
  manualQty?: boolean;
  completed: boolean;
  isCustom?: boolean;
  vendor?: string;
  deadline?: string;
  caution?: string;
}

const DEFAULT_ESTIMATE_ITEMS: EstimateItem[] = [
  // 第1工程（逝去・搬送・安置・日程決定）
  { 
    id: 'f-1', 
    timing: '第1工程：逝去直後', 
    task: 'ご遺体搬送 寝台車運行（病院・施設 ➔ 自宅または斎場安置室・10km圏内）', 
    price: 25000, 
    qty: 1, 
    perGuest: false, 
    completed: true,
    vendor: '提携寝台車運行会社',
    deadline: '逝去後1〜2時間',
    caution: '深夜早朝割増（2割）、長距離移動時のキロ数加算の有無を事前確認'
  },
  { 
    id: 'f-2', 
    timing: '第1工程：安置時', 
    task: 'ご遺体安置料（冷蔵安置保管庫または専用安置室・2泊3日分）', 
    price: 15000, 
    qty: 2, 
    perGuest: false, 
    completed: true,
    vendor: '斎場安置施設 / 自宅',
    deadline: '逝去当日',
    caution: '火葬場の空き状況や友引により安置日数が延びる場合の1日あたり追加料金を明示'
  },
  { 
    id: 'f-3', 
    timing: '第1工程：安置時', 
    task: '保冷用ドライアイス処置（1日分10kg × 2日分・冷却シート施工込）', 
    price: 8000, 
    qty: 2, 
    perGuest: false, 
    completed: true,
    vendor: 'ドライアイス専門供給会社',
    deadline: '毎日朝夕交換',
    caution: '腹部・頸部に確実に当てる。日数が延びる場合は追加手配必須'
  },
  { 
    id: 'f-4', 
    timing: '第1工程：安置時', 
    task: '枕飾り一式（白木机、香炉、線香、一本蝋燭、鈴、枕団子・一膳飯用具）', 
    price: 18000, 
    qty: 1, 
    perGuest: false, 
    completed: true,
    vendor: '葬儀社葬具部',
    deadline: '安置直後',
    caution: '浄土真宗では守り刀・一膳飯・枕団子は置かない（宗派教義に準拠）'
  },
  { 
    id: 'f-5', 
    timing: '第1工程：打合せ時', 
    task: '役所手続き代行（死亡届提出・死体火葬許可証の即日取得代行）', 
    price: 15000, 
    qty: 1, 
    perGuest: false, 
    completed: true,
    vendor: '葬祭ディレクター役所使者',
    deadline: '逝去当日中',
    caution: '届出人の認印（朱肉用・シャチハタ不可）を必ず預かり、許可証原本を喪主へ手渡し'
  },
  { 
    id: 'f-6', 
    timing: '第1工程：打合せ時', 
    task: '公営斎場 火葬料（市内料金・待合室使用料含む）', 
    price: 20000, 
    qty: 1, 
    perGuest: false, 
    completed: false,
    vendor: '公営火葬場事務所（立替金）',
    deadline: '火葬当日（実費立替）',
    caution: '市民料金（1万〜3万）と市外料金（5万〜10万）の確認。心付けは一切不要（収賄禁止）'
  },

  // 第2工程（納棺・通夜式・通夜振る舞い）
  { 
    id: 'f-7', 
    timing: '第2工程：通夜当日午前', 
    task: '湯灌の儀 ＆ 美粧死化粧（エンゼルケア） ＆ 旅支度（死装束一式）', 
    price: 85000, 
    qty: 1, 
    perGuest: false, 
    completed: false,
    vendor: '美粧納棺専門サービス',
    deadline: '通夜開始4時間前',
    caution: '故人のお顔の復元・爪切り・洗髪。浄土真宗は旅支度なしの白寿衣とする'
  },
  { 
    id: 'f-8', 
    timing: '第2工程：通夜当日午前', 
    task: '高級布張彫刻棺（高級ホワイトベルベット・窓付き・布団一式付）', 
    price: 120000, 
    qty: 1, 
    perGuest: false, 
    completed: false,
    vendor: '棺製造メーカー',
    deadline: '納棺時',
    caution: '故人身長（175cm以上は長尺6.25尺〜6.5尺棺）のサイズ確認'
  },
  { 
    id: 'f-9', 
    timing: '第2工程：通夜設営', 
    task: '生花祭壇（幅3.6m 2間・洋花百合＆白菊グラデーションデザイン）', 
    price: 380000, 
    qty: 1, 
    perGuest: false, 
    completed: false,
    vendor: '生花祭壇スタジオ',
    deadline: '通夜開始3時間前設営完了',
    caution: '故人の好きだった色を盛り込み、棺を中央に安置できるスペースを確保'
  },
  { 
    id: 'f-10', 
    timing: '第2工程：通夜設営', 
    task: '遺影写真（四つ切LED電照額 ＆ 額用弔リボン ＆ 手元用キャビネ写真）', 
    price: 35000, 
    qty: 1, 
    perGuest: false, 
    completed: false,
    vendor: '写真製版スタジオ',
    deadline: '通夜開始2時間前',
    caution: 'ピントのぼやけ確認。背景着せ替え・家紋入れの有無を遺族と最終校正'
  },
  { 
    id: 'f-11', 
    timing: '第2工程：通夜設営', 
    task: '白木仮位牌 ＆ 焼香用具一式（香炉、線香、抹香、香炭、敷紙）', 
    price: 15000, 
    qty: 1, 
    perGuest: false, 
    completed: false,
    vendor: '葬具部',
    deadline: '通夜開始1時間前',
    caution: '戒名の文字照合。香炭（火種）は開式20分前に点火して煙が立つ状態にする'
  },
  { 
    id: 'f-12', 
    timing: '第2工程：通夜受付', 
    task: '通夜・告別式 式場使用料（メインホール・親族控室・導師控室）', 
    price: 150000, 
    qty: 1, 
    perGuest: false, 
    completed: false,
    vendor: '総合斎場・セレモニーホール',
    deadline: '通夜〜告別式2日間',
    caution: '音響照明設備・空調光熱費・駐車場込みの明瞭精算'
  },
  { 
    id: 'f-13', 
    timing: '第2工程：通夜受付', 
    task: '会葬礼状 ＆ 返礼品（お茶・海苔ギフト・会葬御礼引換券付き）', 
    price: 700, 
    qty: 50, 
    perGuest: true, 
    completed: false,
    vendor: 'ギフトサロン（返品可能枠）',
    deadline: '通夜開始前',
    caution: '予想会葬数＋予備20個確保。未開封分は全数返品可能契約とする'
  },
  { 
    id: 'f-14', 
    timing: '第2工程：通夜振る舞い', 
    task: '通夜振る舞い料理（特選江戸前握り寿司大皿 ＆ 季節のオードブル）', 
    price: 3500, 
    qty: 30, 
    perGuest: false, 
    completed: false,
    vendor: '仕出し割烹',
    deadline: '通夜式結び30分前納品',
    caution: '弔問客の回転を見越し、参列者の約5〜6割相当分を大皿盛りで発注'
  },

  // 第3工程（告別式・出棺火葬・精進落とし・後飾り）
  { 
    id: 'f-15', 
    timing: '第3工程：告別式進行', 
    task: '葬儀告別式 専任プロ司会者（通夜・告別式2日間専任・弔電拝読）', 
    price: 55000, 
    qty: 1, 
    perGuest: false, 
    completed: false,
    vendor: '婚礼葬祭司会事務所',
    deadline: '告別式開式前',
    caution: '忌み言葉の排除、弔電読み上げ順位、親族焼香アナウンスの徹底'
  },
  { 
    id: 'f-16', 
    timing: '第3工程：出棺時', 
    task: 'お別れ花（出棺用切り花籠・棺いっぱいに敷き詰める生花一式）', 
    price: 45000, 
    qty: 1, 
    perGuest: false, 
    completed: false,
    vendor: '生花祭壇スタジオ',
    deadline: '告別式結び時',
    caution: '棺の蓋を開け、親族全員の手で故人の顔周り・胸元に花を敷き詰める'
  },
  { 
    id: 'f-17', 
    timing: '第3工程：出棺時', 
    task: '洋型高級霊柩車（キャデラック / リンカーン / センチュリー洋型運行）', 
    price: 50000, 
    qty: 1, 
    perGuest: false, 
    completed: false,
    vendor: '霊柩運行社',
    deadline: '出棺時刻（式場車寄せ）',
    caution: '喪主が助手席に位牌を抱えて乗車。火葬場までのルート事前確認'
  },
  { 
    id: 'f-18', 
    timing: '第3工程：出棺時', 
    task: '親族送迎マイクロバス（式場 ⇄ 火葬場 往復送迎・25名乗り）', 
    price: 38000, 
    qty: 1, 
    perGuest: false, 
    completed: false,
    vendor: 'バス配車センター',
    deadline: '出棺時刻',
    caution: '高齢親族の乗り降りを配慮。人数確認と忘れ物防止'
  },
  { 
    id: 'f-19', 
    timing: '第3工程：火葬収骨時', 
    task: '高級骨壺・骨箱（白磁金彩 / 九谷焼 / 本大理石・桐箱・包み風呂敷付）', 
    price: 28000, 
    qty: 1, 
    perGuest: false, 
    completed: false,
    vendor: '葬具部',
    deadline: '火葬場持参',
    caution: '東日本（7寸全収骨）と西日本（5寸〜6寸部分収骨）の地域規格を確認'
  },
  { 
    id: 'f-20', 
    timing: '第3工程：精進落とし', 
    task: '精進落とし会席膳（一人一膳高級会席・故人陰膳1膳無料サービス）', 
    price: 6000, 
    qty: 25, 
    perGuest: false, 
    completed: false,
    vendor: '仕出し割烹',
    deadline: '火葬場帰着時刻',
    caution: '献杯の静かな唱和（拍手厳禁）。最上座に僧侶、最下座に喪主を配席'
  },
  { 
    id: 'f-21', 
    timing: '第3工程：帰宅後', 
    task: '自宅用 後飾り段一式（四十九日中陰壇・二段または三段白木段・線香具）', 
    price: 25000, 
    qty: 1, 
    perGuest: false, 
    completed: false,
    vendor: '葬祭ディレクター設置',
    deadline: '帰宅当日夕方',
    caution: '四十九日の忌明け納骨まで自宅で遺骨・白木位牌・遺影を安置する祭壇'
  },
  { 
    id: 'f-22', 
    timing: '第3工程：全体統括', 
    task: '葬祭ディレクター 総合施行管理費（三大工程全般の総指揮・総監督料）', 
    price: 120000, 
    qty: 1, 
    perGuest: false, 
    completed: false,
    vendor: '総合葬祭プロデュース本部',
    deadline: '葬儀終了時',
    caution: '全ベンダー統括、進行遅延調整、ご遺族ケア、金庫防犯リレー管理まで完遂'
  }
];

export const EstimateSimulator: React.FC = () => {
  const [eventDate, setEventDate] = useState('2026-11-21');
  const [deceasedName, setDeceasedName] = useState('故 山田 一郎 儀 葬儀告別式（喪主: 山田 太郎 殿）');
  const [guestCount, setGuestCount] = useState<number>(50);
  const [deposit, setDeposit] = useState<number>(100000);
  const [items, setItems] = useState<EstimateItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('funeral_estimate_items_v2');
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return DEFAULT_ESTIMATE_ITEMS;
  });

  // Target profit margin (葬儀社適正粗利 35%)
  const [targetMarginPct, setTargetMarginPct] = useState<number>(35);

  const handleGuestCountChange = (newCount: number) => {
    const val = Math.max(1, newCount || 1);
    setGuestCount(val);
    setItems(prev => prev.map(item => {
      if (item.perGuest && !item.manualQty) {
        return { ...item, qty: val };
      }
      return item;
    }));
  };

  const handlePriceChange = (id: string, price: number) => {
    setItems(prev => prev.map(it => it.id === id ? { ...it, price: Math.max(0, price) } : it));
  };

  const handleQtyChange = (id: string, qty: number) => {
    setItems(prev => prev.map(it => it.id === id ? { ...it, qty: Math.max(0, qty), manualQty: true } : it));
  };

  const handleToggleCompleted = (id: string) => {
    setItems(prev => prev.map(it => it.id === id ? { ...it, completed: !it.completed } : it));
  };

  const handleAddItem = () => {
    const newItem: EstimateItem = {
      id: `custom-${Date.now()}`,
      timing: '随時追加手配',
      task: '特別供花・寺院追加・諸費用追加項目',
      price: 30000,
      qty: 1,
      perGuest: false,
      completed: false,
      isCustom: true
    };
    setItems(prev => [...prev, newItem]);
  };

  const handleDeleteItem = (id: string) => {
    setItems(prev => prev.filter(it => it.id !== id));
  };

  const handleReset = () => {
    if (window.confirm('葬儀見積り項目を初期標準状態にリセットしますか？')) {
      setItems(DEFAULT_ESTIMATE_ITEMS);
      setGuestCount(50);
      setDeposit(100000);
    }
  };

  // Calculations
  const subTotal = items.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const finalBalance = subTotal - deposit;
  const perGuestPrice = guestCount > 0 ? Math.round(subTotal / guestCount) : 0;

  const completedCount = items.filter(it => it.completed).length;
  const progressPercentage = items.length > 0 ? Math.round((completedCount / items.length) * 100) : 0;

  const estimatedCost = Math.round(subTotal * ((100 - targetMarginPct) / 100));
  const estimatedGrossProfit = subTotal - estimatedCost;
  const actualMarginPct = subTotal > 0 ? Math.round((estimatedGrossProfit / subTotal) * 100) : 0;

  // Save to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('funeral_estimate_items_v2', JSON.stringify(items));
      } catch {}
    }
  }, [items]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 font-sans">
      {/* Header Banner - Academic Clean Style */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-4">
          <div className="flex items-center gap-2">
            <span className="bg-stone-100 text-stone-800 text-xs font-bold px-3 py-1 rounded-full border border-stone-300 flex items-center gap-1.5">
              <Calculator className="w-3.5 h-3.5 text-stone-700" />
              葬祭実務仕様 施工指示連動
            </span>
            <span className="text-xs text-stone-500 hidden sm:inline">
              三大工程完全網羅 葬儀施行お見積り ＆ 現場執行チェックリスト
            </span>
          </div>

          <div className="no-print flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-all"
            >
              <Printer className="w-4 h-4 text-amber-300" />
              <span>見積書を印刷・PDF保存</span>
            </button>
            <button
              onClick={handleReset}
              className="p-2 bg-stone-100 hover:bg-stone-200 text-stone-600 rounded-xl transition-colors"
              title="初期標準値にリセット"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif-jp text-stone-900 tracking-tight">
            葬儀施行お見積り ＆ 三大工程連動シミュレーター
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm mt-1 leading-relaxed max-w-4xl">
            葬祭ディレクターとして現場を滞りなく仕切るための核心ツールです。
            寝台車搬送、安置、ドライアイス、生花祭壇、棺・骨壺、火葬料、会葬返礼品、通夜振る舞い寿司、精進落とし会席膳、後飾り段までの<strong>全22項目を三大工程に沿って完全自動積算</strong>します。
          </p>
        </div>
      </div>

      {/* Basic Inputs Card */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1">
            通夜・告別式 施行日
          </label>
          <input
            type="date"
            value={eventDate}
            onChange={e => setEventDate(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-stone-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1">
            故人様・喪主様名
          </label>
          <input
            type="text"
            value={deceasedName}
            onChange={e => setDeceasedName(e.target.value)}
            placeholder="例: 故 山田 一郎 儀（喪主: 山田 太郎 殿）"
            className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-stone-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center justify-between">
            <span>予想会葬人数（名）</span>
            <span className="text-[10px] text-stone-500 font-normal">※返礼品・料理連動</span>
          </label>
          <div className="relative">
            <Users className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="number"
              min="1"
              value={guestCount}
              onChange={e => handleGuestCountChange(parseInt(e.target.value, 10) || 1)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm font-bold text-stone-900 focus:ring-2 focus:ring-stone-500 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1">
            申込金・内受金（円）
          </label>
          <input
            type="number"
            step="10000"
            value={deposit}
            onChange={e => setDeposit(Math.max(0, parseInt(e.target.value, 10) || 0))}
            className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm font-bold text-stone-900 focus:ring-2 focus:ring-stone-500 outline-none"
          />
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs space-y-1">
          <span className="text-xs text-stone-500 font-medium block">お見積り総額（税込）</span>
          <span className="text-xl sm:text-2xl font-black text-stone-900 font-mono">
            {subTotal.toLocaleString()} <span className="text-xs font-normal text-stone-600">円</span>
          </span>
          <span className="text-[11px] text-stone-400 block">全{items.length}項目合算</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-300 bg-stone-50 shadow-xs space-y-1">
          <span className="text-xs text-stone-900 font-bold block">最終ご請求残金（精算額）</span>
          <span className="text-xl sm:text-2xl font-black text-stone-900 font-mono">
            {finalBalance.toLocaleString()} <span className="text-xs font-normal text-stone-700">円</span>
          </span>
          <span className="text-[10px] text-stone-500 block">
            内受金 {deposit.toLocaleString()}円 控除済
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs space-y-1">
          <span className="text-xs text-stone-500 font-medium block">会葬者1人あたり平均単価</span>
          <span className="text-xl sm:text-2xl font-black text-stone-800 font-mono">
            {perGuestPrice.toLocaleString()} <span className="text-xs font-normal text-stone-600">円/名</span>
          </span>
          <span className="text-[10px] text-stone-400 block">{guestCount}名会葬想定</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span className="font-medium">粗利シミュレーション</span>
            <span className="text-[10px] font-bold text-stone-700 bg-stone-100 px-1.5 py-0.2 rounded">
              適正粗利: 35%
            </span>
          </div>
          <span className="text-xl sm:text-2xl font-black text-stone-800 font-mono">
            約 {estimatedGrossProfit.toLocaleString()} <span className="text-xs font-normal text-stone-600">円 ({actualMarginPct}%)</span>
          </span>
          <span className="text-[10px] text-stone-400 block">葬祭事業適正粗利</span>
        </div>
      </div>

      {/* Main Estimate & Milestone Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3 bg-stone-50/80">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-stone-900 font-serif-jp flex items-center gap-2">
              <FileText className="w-4 h-4 text-stone-700" />
              <span>三大工程別 葬儀施行内訳明細（全22項目）</span>
            </h3>
            <p className="text-xs text-stone-500">
              各行の単価・数量は直接編集可能。会葬人数を変更すると返礼品や料理が自動計算されます。
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAddItem}
              className="px-3.5 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold flex items-center gap-1 shadow-xs transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>手配項目を追加</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-stone-100 text-stone-700 border-b border-stone-200 uppercase font-semibold">
                <th className="p-3 text-center w-12">完了</th>
                <th className="p-3 w-40">進行時期（三大工程）</th>
                <th className="p-3">手配業務・品目名称</th>
                <th className="p-3 text-right w-32">単価（円）</th>
                <th className="p-3 text-center w-24">数量</th>
                <th className="p-3 text-right w-36">小計（円）</th>
                <th className="p-3 text-center w-12 no-print">削除</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {items.map((item, idx) => {
                const sub = item.price * item.qty;
                return (
                  <tr
                    key={item.id}
                    className={`hover:bg-stone-50 transition-colors ${
                      item.completed ? 'bg-stone-50/70' : 'bg-white'
                    }`}
                  >
                    {/* Checkbox for Milestone Completed */}
                    <td className="p-3 text-center">
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => handleToggleCompleted(item.id)}
                        className="w-4 h-4 rounded text-stone-800 focus:ring-stone-500 cursor-pointer"
                        title="手配完了チェック"
                      />
                    </td>

                    {/* Milestone Timing */}
                    <td className="p-3 font-semibold text-stone-700 whitespace-nowrap">
                      <span className="bg-stone-100 text-stone-800 px-2 py-0.5 rounded text-[11px] border border-stone-200">
                        {item.timing}
                      </span>
                    </td>

                    {/* Task Description */}
                    <td className="p-3">
                      <div className="font-medium text-stone-900 leading-relaxed">
                        {item.task}
                      </div>
                      {item.perGuest && (
                        <span className="inline-block text-[10px] text-stone-600 bg-stone-100 px-1.5 py-0.2 rounded mt-0.5 border border-stone-200">
                          会葬人数連動（{guestCount}名）
                        </span>
                      )}
                    </td>

                    {/* Unit Price Input */}
                    <td className="p-3 text-right">
                      <input
                        type="number"
                        min="0"
                        step="100"
                        value={item.price}
                        onChange={e => handlePriceChange(item.id, parseFloat(e.target.value) || 0)}
                        className="w-full text-right px-2 py-1 rounded-lg border border-stone-300 font-mono text-xs font-semibold focus:ring-1 focus:ring-stone-500 outline-none"
                      />
                    </td>

                    {/* Quantity Input */}
                    <td className="p-3 text-center">
                      <input
                        type="number"
                        min="0"
                        value={item.qty}
                        onChange={e => handleQtyChange(item.id, parseFloat(e.target.value) || 0)}
                        className="w-16 text-center px-1.5 py-1 rounded-lg border border-stone-300 font-mono text-xs font-semibold focus:ring-1 focus:ring-stone-500 outline-none mx-auto"
                      />
                    </td>

                    {/* Subtotal */}
                    <td className="p-3 text-right font-bold text-stone-900 font-mono text-sm whitespace-nowrap">
                      {sub.toLocaleString()} 円
                    </td>

                    {/* Delete button (for custom added items) */}
                    <td className="p-3 text-center no-print">
                      {item.isCustom ? (
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="p-1 text-stone-400 hover:text-rose-600 rounded transition-colors"
                          title="項目を削除"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <span className="text-stone-300">-</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="bg-stone-900 text-white font-bold">
                <td colSpan={3} className="p-4 text-sm font-serif-jp">
                  総合計（葬儀施行お見積り総額・税込）
                </td>
                <td colSpan={3} className="p-4 text-right text-lg sm:text-xl font-mono text-amber-200">
                  {subTotal.toLocaleString()} 円
                </td>
                <td className="no-print"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* ESTIMATE-LINKED EXECUTION CHECKLIST */}
      <div className="bg-white rounded-2xl border-2 border-stone-300 p-6 sm:p-7 shadow-xs space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-stone-200 text-stone-900 rounded-full text-xs font-bold border border-stone-300">
                葬祭ディレクター品質保証
              </span>
              <span className="text-xs text-stone-500 font-medium">
                見積作成イコール現場執行の完全一体化
              </span>
            </div>
            <h3 className="text-xl font-bold font-serif-jp text-stone-900 flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-stone-700" />
              <span>見積もり連動 現場執行＆発注ディレクション・チェックリスト</span>
            </h3>
            <p className="text-xs text-stone-600 max-w-3xl leading-relaxed">
              「見積もりを作って満足し、火葬場や棺の手配が漏れる」のが最大の事故原因です。上記のお見積書に計上した全品目がそのまま発注・納品・点検チェックリストとして連動しています。
            </p>
          </div>

          <div className="bg-stone-900 text-white px-4 py-2.5 rounded-xl text-right">
            <span className="text-[10px] text-stone-400 block font-mono">施行手配進捗</span>
            <span className="text-lg font-bold text-amber-200 font-mono">
              {completedCount} / {items.length} 項目（{progressPercentage}%）
            </span>
          </div>
        </div>

        {/* Execution Items Table */}
        <div className="space-y-3">
          {items.map((item, idx) => {
            return (
              <div
                key={item.id}
                onClick={() => handleToggleCompleted(item.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col md:flex-row md:items-start justify-between gap-3 ${
                  item.completed
                    ? 'bg-stone-50/90 border-emerald-300'
                    : 'bg-stone-50/40 hover:bg-white border-stone-200 hover:border-stone-400'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 border ${
                    item.completed
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'border-stone-300 bg-white'
                  }`}>
                    {item.completed && <CheckSquare className="w-3.5 h-3.5 stroke-3" />}
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                        item.completed ? 'bg-stone-100 text-stone-500' : 'bg-stone-200 text-stone-800'
                      }`}>
                        {item.timing}
                      </span>
                      <span className={`text-sm font-bold ${item.completed ? 'line-through text-stone-400' : 'text-stone-900'}`}>
                        {item.task}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-stone-600 pt-0.5 font-mono">
                      <span>🏢 発注先：<strong className="text-stone-800">{item.vendor || '指定業者'}</strong></span>
                      <span>⏳ 確定締切：<strong className="text-stone-900">{item.deadline || '要確認'}</strong></span>
                      <span>💰 金額：¥{(item.price * item.qty).toLocaleString()}</span>
                    </div>

                    {item.caution && (
                      <div className="text-[11px] text-stone-700 bg-stone-100 p-2 rounded-lg border border-stone-200 font-medium mt-1">
                        ⚠️ 現場の急所＆事故防止：{item.caution}
                      </div>
                    )}
                  </div>
                </div>

                <div className="shrink-0 md:text-right pl-8 md:pl-0">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    item.completed
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-stone-200 text-stone-800'
                  }`}>
                    {item.completed ? '手配完了' : '手配中'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
