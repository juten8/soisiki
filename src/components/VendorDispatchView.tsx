import React, { useState } from 'react';
import { 
  INITIAL_VENDOR_CONTACTS, 
  DEFAULT_SHIPPING_SLIP,
  VendorContactItem,
  ShippingSlipTemplate
} from '../data/weddingVendorDispatchData';
import { AppMode } from '../types/quiz';
import { 
  AlertTriangle, 
  Building2, 
  Check, 
  CheckCircle2, 
  Clock, 
  Copy, 
  Download, 
  ExternalLink, 
  FileText, 
  Mail, 
  MapPin, 
  PackageCheck, 
  Phone, 
  PhoneCall, 
  Plus, 
  Printer, 
  ShieldAlert, 
  ShieldCheck, 
  Sparkles, 
  Trash2, 
  Truck, 
  Users,
  ArrowLeft
} from 'lucide-react';

interface VendorDispatchViewProps {
  onNavigate?: (mode: AppMode) => void;
}

export const VendorDispatchView: React.FC<VendorDispatchViewProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'contacts' | 'shipping'>('contacts');

  const [vendors, setVendors] = useState<VendorContactItem[]>(INITIAL_VENDOR_CONTACTS);
  const [vendorCategoryFilter, setVendorCategoryFilter] = useState<string>('all');
  
  const [slip, setSlip] = useState<ShippingSlipTemplate>(DEFAULT_SHIPPING_SLIP);
  const [copySuccess, setCopySuccess] = useState(false);

  const toggleVendorStatus = (id: string) => {
    setVendors(prev => prev.map(v => {
      if (v.id === id) {
        const nextStatus: VendorContactItem['status'] = 
          v.status === 'confirmed' ? 'arrived' : v.status === 'arrived' ? 'pending' : 'confirmed';
        return { ...v, status: nextStatus };
      }
      return v;
    }));
  };

  const filteredVendors = vendors.filter(v => {
    if (vendorCategoryFilter === 'all') return true;
    return v.category.includes(vendorCategoryFilter);
  });

  const arrivedCount = vendors.filter(v => v.status === 'arrived').length;
  const confirmedCount = vendors.filter(v => v.status === 'confirmed').length;

  const handleCopyLabelText = () => {
    const text = `【送付先（お届け先）】
〒330-0001 埼玉県さいたま市大宮区1-2-3
${slip.facilityName}
${slip.floorAndRoom}
${slip.banquetDepartment}
TEL: 048-123-4567

【施行日時】
${slip.eventDate}

【該当ご葬儀 宴席名】
${slip.coupleNames}

【必着指定】
${slip.deliveryDeadline}

【内容品目】
${slip.itemCategory}（計${slip.boxCount}箱）

【送り主】
${slip.senderName} TEL: ${slip.senderPhone}

※${slip.importantNotes}`;

    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 font-sans">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-4">
          <div className="flex items-center gap-2">
            {onNavigate && (
              <button
                onClick={() => onNavigate('workflow')}
                className="inline-flex items-center gap-1 text-xs text-stone-500 hover:text-stone-900 transition-colors mr-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>実務三大工程へ</span>
              </button>
            )}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-100 text-stone-800 rounded-full text-xs font-bold border border-stone-300">
              <ShieldCheck className="w-3.5 h-3.5 text-stone-700" />
              葬祭実務・現場緊急連絡網
            </span>
            <span className="text-xs text-stone-500 font-medium hidden sm:inline">
              全マルチベンダー緊急ホットライン ＆ 斎場気付供花荷札
            </span>
          </div>

          <div className="no-print flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
            >
              <Printer className="w-4 h-4 text-amber-300" />
              <span>当日携行リストを印刷</span>
            </button>
          </div>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif-jp text-stone-900 tracking-tight flex items-center gap-2.5">
            <Truck className="w-7 h-7 text-stone-800" />
            <span>葬儀業者一覧連絡票 ＆ 配送先荷札・送り状（斎場気付・必着指示書）</span>
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm mt-1 max-w-4xl leading-relaxed">
            斎場や火葬場には同日に多数の葬儀が行われ、生花や荷物が集中します。<strong>「何月何日何時開式の故人名・喪主名宛、何階何ホール気付、午前中必着」</strong>と正確に明記しなければ、供花や返礼品が他家の葬儀に誤配される重大事故が発生します。また、霊柩車・火葬場・寺院・湯灌師へ1秒で通話できる緊急連絡網を完備します。
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="no-print flex flex-wrap gap-2 pt-2">
          <button
            onClick={() => setActiveTab('contacts')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'contacts'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
          >
            <PhoneCall className="w-4 h-4" />
            <span>① 葬儀関係業者一覧連絡票（全社緊急ホットライン）</span>
            <span className="text-[10px] bg-stone-800 text-stone-200 px-1.5 py-0.2 rounded-full font-mono">
              {vendors.length}社
            </span>
          </button>

          <button
            onClick={() => setActiveTab('shipping')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'shipping'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
          >
            <PackageCheck className="w-4 h-4" />
            <span>② 配送先荷札・供花伝票（斎場気付・時間厳守ラベル）</span>
          </button>
        </div>
      </div>

      {/* TAB 1: Contacts Table */}
      {activeTab === 'contacts' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-100 pb-4">
              <div>
                <h2 className="text-base font-bold font-serif-jp text-stone-900 flex items-center gap-2">
                  <Users className="w-5 h-5 text-stone-700" />
                  <span>全関係者マルチベンダー当日緊急連絡票（火葬場・霊柩車・寺院・生花・湯灌・仕出し）</span>
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  到着遅延・車両トラブル・追加発生時に直ちに通話可能な緊急連絡先一覧です。
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-xs bg-stone-50 px-3 py-1.5 rounded-lg border border-stone-200 font-mono">
                  <span>到着・配備済: <strong className="text-emerald-700">{arrivedCount}</strong></span>
                  <span className="mx-2 text-stone-300">|</span>
                  <span>手配確定: <strong className="text-stone-900">{confirmedCount}</strong></span>
                </div>
              </div>
            </div>

            {/* Filter buttons */}
            <div className="no-print flex flex-wrap gap-1.5 text-xs">
              {['all', '火葬場', '霊柩車', '寺院', '生花', '湯灌', '棺', '保冷', '仕出し', '返礼品', 'ディレクター'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setVendorCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                    vendorCategoryFilter === cat
                      ? 'bg-stone-900 text-white font-bold'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
                  }`}
                >
                  {cat === 'all' ? '全業種' : cat}
                </button>
              ))}
            </div>

            {/* Vendor Table */}
            <div className="overflow-x-auto rounded-xl border border-stone-200">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-stone-100 text-stone-800 border-b border-stone-200 font-bold">
                    <th className="py-2.5 px-3 w-28">業種・役割</th>
                    <th className="py-2.5 px-3 w-56">企業名 / 担当者氏名</th>
                    <th className="py-2.5 px-3 w-36">代表TEL / 緊急携帯</th>
                    <th className="py-2.5 px-3 w-36">搬入・集合予定</th>
                    <th className="py-2.5 px-3">担当職務 ＆ 心付け・重要確認事項</th>
                    <th className="py-2.5 px-3 text-center w-20">状況</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {filteredVendors.map((vendor) => (
                    <tr key={vendor.id} className="hover:bg-stone-50 transition-colors">
                      <td className="py-3 px-3 font-semibold text-stone-700">
                        <span className="px-2 py-0.5 bg-stone-100 text-stone-800 rounded text-[11px] border border-stone-200">
                          {vendor.category}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-bold text-stone-900">{vendor.companyName}</div>
                        <div className="text-stone-600 text-[11px] flex items-center gap-1 mt-0.5">
                          <Users className="w-3 h-3 text-stone-400" />
                          <span>{vendor.contactPerson}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 font-mono text-[11px] space-y-0.5">
                        <div className="flex items-center gap-1 text-stone-600">
                          <Phone className="w-3 h-3 text-stone-400" />
                          <span>{vendor.phone}</span>
                        </div>
                        <div className="flex items-center gap-1 text-stone-900 font-bold">
                          <PhoneCall className="w-3 h-3 text-stone-700" />
                          <span>{vendor.emergencyPhone}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 font-mono text-stone-700 text-[11px]">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-stone-400" />
                          <span>{vendor.deliveryTime}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 space-y-1">
                        <p className="text-stone-800 leading-relaxed font-medium">
                          {vendor.roleDescription}
                        </p>
                        <div className="text-[11px] text-stone-600 bg-stone-50 p-1.5 rounded border border-stone-200">
                          💡 {vendor.checkNotes}
                        </div>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <button
                          onClick={() => toggleVendorStatus(vendor.id)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${
                            vendor.status === 'arrived'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : vendor.status === 'confirmed'
                              ? 'bg-blue-100 text-blue-800 border border-blue-300'
                              : 'bg-stone-200 text-stone-800 border border-stone-300'
                          }`}
                        >
                          {vendor.status === 'arrived' && '✓ 到着済'}
                          {vendor.status === 'confirmed' && '手配確定'}
                          {vendor.status === 'pending' && '確認中'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Shipping Slip */}
      {activeTab === 'shipping' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-4">
              <div>
                <h2 className="text-lg font-bold font-serif-jp text-stone-900 flex items-center gap-2">
                  <PackageCheck className="w-5 h-5 text-stone-700" />
                  <span>供花・供物・持込荷物の配送先荷札（斎場気付・必着指示書）</span>
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  生花店、花環業者、返礼品メーカー、遺品持込用の公式配送ラベルです。
                </p>
              </div>

              <div className="no-print flex items-center gap-2">
                <button
                  onClick={handleCopyLabelText}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-semibold transition-colors"
                >
                  <Copy className="w-3.5 h-3.5 text-stone-600" />
                  <span>{copySuccess ? 'コピー完了！' : '伝票テキストをコピー'}</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold shadow-xs"
                >
                  <Printer className="w-3.5 h-3.5 text-amber-300" />
                  <span>A4荷札ラベルとして印刷</span>
                </button>
              </div>
            </div>

            {/* Editable Fields Form */}
            <div className="no-print grid grid-cols-1 md:grid-cols-2 gap-4 text-xs bg-stone-50 p-4 rounded-xl border border-stone-200">
              <div className="space-y-2">
                <label className="font-bold text-stone-700 block">施設名・斎場名:</label>
                <input
                  type="text"
                  value={slip.facilityName}
                  onChange={(e) => setSlip({ ...slip, facilityName: e.target.value })}
                  className="w-full bg-white px-2.5 py-1.5 border border-stone-300 rounded font-bold"
                />
              </div>

              <div className="space-y-2">
                <label className="font-bold text-stone-700 block">階数・ホール名（〇〇ホール 気付）:</label>
                <input
                  type="text"
                  value={slip.floorAndRoom}
                  onChange={(e) => setSlip({ ...slip, floorAndRoom: e.target.value })}
                  className="w-full bg-white px-2.5 py-1.5 border border-stone-300 rounded font-bold text-stone-900"
                />
              </div>

              <div className="space-y-2">
                <label className="font-bold text-stone-700 block">施行日時（通夜・告別式時間）:</label>
                <input
                  type="text"
                  value={slip.eventDate}
                  onChange={(e) => setSlip({ ...slip, eventDate: e.target.value })}
                  className="w-full bg-white px-2.5 py-1.5 border border-stone-300 rounded font-mono"
                />
              </div>

              <div className="space-y-2">
                <label className="font-bold text-stone-700 block">該当ご葬儀（故人名・喪主名）:</label>
                <input
                  type="text"
                  value={slip.coupleNames}
                  onChange={(e) => setSlip({ ...slip, coupleNames: e.target.value })}
                  className="w-full bg-white px-2.5 py-1.5 border border-stone-300 rounded font-bold"
                />
              </div>

              <div className="space-y-2">
                <label className="font-bold text-stone-700 block">必着指定日時（重要）:</label>
                <input
                  type="text"
                  value={slip.deliveryDeadline}
                  onChange={(e) => setSlip({ ...slip, deliveryDeadline: e.target.value })}
                  className="w-full bg-white px-2.5 py-1.5 border border-rose-300 rounded font-bold text-rose-700"
                />
              </div>

              <div className="space-y-2">
                <label className="font-bold text-stone-700 block">内容品目（供花・供物・盛籠等）:</label>
                <input
                  type="text"
                  value={slip.itemCategory}
                  onChange={(e) => setSlip({ ...slip, itemCategory: e.target.value })}
                  className="w-full bg-white px-2.5 py-1.5 border border-stone-300 rounded"
                />
              </div>
            </div>

            {/* Official Label Display Box */}
            <div className="border-4 border-double border-stone-900 p-6 sm:p-8 rounded-xl bg-white space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-stone-900 pb-4 gap-2">
                <div>
                  <span className="text-[10px] text-stone-500 font-mono tracking-widest block">
                    FUNERAL CEREMONY OFFICIAL LOGISTICS TAG
                  </span>
                  <h3 className="text-2xl font-extrabold font-serif-jp text-stone-950">
                    葬儀式場 専用配送ラベル（斎場気付 荷札）
                  </h3>
                  <div className="text-xs text-rose-700 font-bold">
                    ⚠️ 他の葬家・一般荷物との混同厳禁（供花・生花祭壇専用便）
                  </div>
                </div>

                <div className="text-right font-mono text-xs border border-rose-300 bg-rose-50 p-2.5 rounded-lg text-rose-950 font-bold">
                  {slip.deliveryDeadline}
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-stone-50 rounded-xl border border-stone-300 space-y-2">
                  <span className="text-[10px] text-stone-500 uppercase tracking-wider block font-bold">
                    【送り先（お届け先）】
                  </span>
                  <div className="text-xl sm:text-2xl font-bold font-serif-jp text-stone-900">
                    {slip.facilityName}
                  </div>
                  <div className="text-lg sm:text-xl font-bold text-stone-950 font-serif-jp border-b border-stone-300 pb-2">
                    {slip.floorAndRoom}（{slip.banquetDepartment}）
                  </div>
                  <div className="text-xs text-stone-600 font-mono">
                    〒330-0001 埼玉県さいたま市大宮区1-2-3 ｜ 代表TEL: 048-123-4567
                  </div>
                </div>

                <div className="p-4 bg-stone-50 rounded-xl border-2 border-stone-400 space-y-1">
                  <span className="text-[10px] text-stone-700 uppercase tracking-wider block font-bold">
                    【該当ご葬儀 宴席名】
                  </span>
                  <div className="text-2xl sm:text-3xl font-extrabold font-serif-jp text-stone-950">
                    {slip.coupleNames}
                  </div>
                  <div className="text-xs text-stone-700 font-bold pt-1 font-mono">
                    施行日時：{slip.eventDate}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                    <span className="text-stone-500 block text-[10px]">内容品目</span>
                    <span className="font-bold text-stone-900 text-sm">{slip.itemCategory}</span>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                    <span className="text-stone-500 block text-[10px]">配送総個数</span>
                    <span className="font-bold text-stone-900 text-sm font-mono">{slip.boxCount} 基 / 個口</span>
                  </div>
                </div>

                <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-stone-500">発送元（荷主）:</span>
                    <span className="font-bold text-stone-800">{slip.senderName}（{slip.senderPhone}）</span>
                  </div>
                  <div className="text-[11px] text-rose-800 pt-1 border-t border-stone-200 font-medium">
                    ⚠️ 取扱注意：{slip.importantNotes}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
