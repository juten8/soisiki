import React, { useState } from 'react';
import { INVITATION_SAMPLE_DATA } from '../data/weddingVendorDispatchData';
import { 
  AlertCircle, 
  Calendar, 
  Check, 
  CheckCircle2, 
  Clock, 
  Copy, 
  ExternalLink, 
  FileText, 
  Heart, 
  Mail, 
  MapPin, 
  MessageSquare, 
  Phone, 
  Printer, 
  Send, 
  Share2, 
  Smartphone, 
  Sparkles, 
  Utensils,
  ArrowLeft,
  Building2
} from 'lucide-react';
import { AppMode } from '../types/quiz';

interface InvitationPreviewViewProps {
  onNavigate?: (mode: AppMode) => void;
}

export const InvitationPreviewView: React.FC<InvitationPreviewViewProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'paper' | 'postcard' | 'web'>('paper');
  const [copySuccess, setCopySuccess] = useState(false);

  const data = INVITATION_SAMPLE_DATA;

  const handleCopyWebUrl = () => {
    navigator.clipboard.writeText(data.webInvitation.urlSlug);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 font-sans">
      {/* Header */}
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
              <Mail className="w-3.5 h-3.5 text-stone-700" />
              第2工程：訃報発信 ＆ 会葬御礼設計
            </span>
            <span className="text-xs text-stone-500 font-medium hidden sm:inline">
              訃報連絡票 ＆ 会葬礼状 ＆ WEB訃報通知
            </span>
          </div>

          <div className="no-print flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
            >
              <Printer className="w-4 h-4 text-amber-300" />
              <span>礼状サンプルを印刷</span>
            </button>
          </div>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif-jp text-stone-900 tracking-tight flex items-center gap-2.5">
            <FileText className="w-7 h-7 text-stone-700" />
            <span>訃報連絡票 ＆ 会葬礼状 ＆ WEB訃報通知 リアルサンプル</span>
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm mt-1 max-w-4xl leading-relaxed">
            訃報は速やかさと正確さが命です。句読点（、。）を打たないしきたり、斎場名・開式時間の明記、返礼品引換券付き会葬礼状、そして親族や会社へLINE・メールで即時通知できる「WEB訃報案内」のフォーマットを網羅しています。
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="no-print flex flex-wrap gap-2 pt-2">
          <button
            onClick={() => setActiveTab('paper')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'paper'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>① 訃報連絡票・死亡通知状（FAX・書面サンプル）</span>
          </button>

          <button
            onClick={() => setActiveTab('postcard')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'postcard'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>② 会葬礼状 ＆ 返礼品引換券（句読点なし）</span>
          </button>

          <button
            onClick={() => setActiveTab('web')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'web'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
          >
            <Smartphone className="w-4 h-4 text-stone-700" />
            <span>③ WEB訃報案内（LINE・メール即時通知型）</span>
          </button>
        </div>
      </div>

      {/* TAB 1: 訃報通知状 */}
      {activeTab === 'paper' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-wrap items-center justify-between border-b border-stone-100 pb-3 gap-2">
              <span className="text-xs font-bold text-stone-800 bg-stone-100 px-2.5 py-1 rounded-md border border-stone-200">
                訃報連絡票 フォーマット（親族・会社・町内会送信用）
              </span>
              <span className="text-xs text-stone-500">
                ※ 弔事の礼法に基づき、本文中に句読点（、。）は使用しません
              </span>
            </div>

            <div className="max-w-2xl mx-auto p-8 sm:p-12 border-2 border-stone-300 rounded-xl bg-stone-50 text-stone-900 space-y-8 font-serif-jp">
              <div className="text-center space-y-2">
                <span className="text-xs tracking-widest text-stone-500 block font-sans">DEATH NOTICE & FUNERAL ANNOUNCEMENT</span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-widest text-stone-900 border-b-2 border-stone-800 pb-3 inline-block">
                  訃　　報
                </h2>
              </div>

              <div className="space-y-3 text-xs sm:text-sm leading-loose text-stone-800 text-center">
                <p className="font-semibold">{data.paperInvitation.seasonalGreeting}</p>
                {data.paperInvitation.bodyText.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>

              <div className="p-5 bg-white rounded-xl border border-stone-200 space-y-2 text-xs sm:text-sm text-center">
                <div className="text-base font-bold text-stone-900 font-sans">
                  {data.paperInvitation.dateStr}
                </div>
                <div className="space-y-1 text-stone-700 font-sans">
                  <div>{data.paperInvitation.ceremonyTime}</div>
                  <div className="font-bold text-stone-900">{data.paperInvitation.receptionTime}</div>
                </div>
                <div className="pt-2 border-t border-stone-200 text-stone-600 font-sans">
                  <div className="font-bold text-stone-900">{data.paperInvitation.venueName}</div>
                  <div className="text-xs text-stone-500">{data.paperInvitation.venueFloor}</div>
                </div>
              </div>

              <div className="text-center text-xs text-stone-700 bg-stone-100 p-2 rounded-lg border border-stone-200">
                {data.paperInvitation.rsvpDeadline}
              </div>

              <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row justify-between text-xs text-stone-700 gap-4">
                <div>
                  <span className="text-[10px] text-stone-400 block font-sans">故人様</span>
                  <div className="font-bold text-stone-900 text-sm mt-0.5">
                    {data.paperInvitation.groomsName}
                  </div>
                </div>
                <div className="sm:text-right">
                  <span className="text-[10px] text-stone-400 block font-sans">喪主</span>
                  <div className="font-bold text-stone-900 text-sm mt-0.5">
                    {data.paperInvitation.bridesName}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: 会葬礼状 ＆ 返礼品引換券 */}
      {activeTab === 'postcard' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-stone-100 pb-3">
              <h2 className="text-base font-bold font-serif-jp text-stone-900 flex items-center gap-2">
                <Mail className="w-5 h-5 text-stone-700" />
                <span>会葬礼状（会葬御礼） ＆ 返礼品引換券 サンプル</span>
              </h2>
            </div>

            <div className="max-w-xl mx-auto p-6 sm:p-8 border-2 border-stone-300 rounded-xl bg-white shadow-xs space-y-6 font-serif-jp text-xs leading-loose">
              <div className="text-center border-b border-stone-200 pb-3">
                <h3 className="text-lg font-bold text-stone-900">御　礼</h3>
              </div>

              <p>
                亡父 山田 一郎 儀 葬儀に際しましては<br />
                ご多用中にもかかわらず ご丁重なご会葬を賜り<br />
                かつ過分なるご香志をいただき 厚く御礼申し上げます
              </p>
              <p>
                略儀ながら 書中をもちまして謹んでご挨拶申し上げます
              </p>

              <div className="pt-4 border-t border-stone-200 flex justify-between text-[11px] text-stone-600">
                <div>令和八年十一月二十二日</div>
                <div className="text-right">
                  喪主 山田 太郎<br />
                  親族一同
                </div>
              </div>

              {/* Gift coupon strip */}
              <div className="p-3 bg-stone-50 rounded-lg border-2 border-dashed border-stone-300 text-center font-sans space-y-1">
                <span className="font-bold text-stone-900 block text-xs">【会葬御礼品 引換券】</span>
                <span className="text-[10px] text-stone-500">本券を受付返礼品コーナーにご提示ください。御礼の品をお渡しいたします。</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: WEB訃報案内 */}
      {activeTab === 'web' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-wrap items-center justify-between border-b border-stone-100 pb-3 gap-2">
              <h2 className="text-base font-bold font-serif-jp text-stone-900 flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-stone-700" />
                <span>スマホWEB訃報通知（LINE・メール送信型）プレビュー</span>
              </h2>

              <button
                onClick={handleCopyWebUrl}
                className="no-print inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-semibold border border-stone-300"
              >
                <Share2 className="w-3.5 h-3.5 text-stone-600" />
                <span>{copySuccess ? '訃報URLコピー完了！' : '訃報案内URLをコピー'}</span>
              </button>
            </div>

            <div className="max-w-sm mx-auto border-8 border-stone-800 rounded-3xl overflow-hidden shadow-xl bg-stone-50">
              <div className="bg-stone-800 text-white text-[10px] px-4 py-1 flex justify-between items-center font-mono">
                <span>10:00</span>
                <span>5G 100%</span>
              </div>

              <div className="p-5 space-y-4 text-center text-stone-900">
                <div className="w-14 h-14 rounded-full bg-stone-200 mx-auto flex items-center justify-center text-stone-700">
                  <Heart className="w-7 h-7 text-stone-600" />
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] tracking-widest text-stone-500 uppercase font-bold">
                    OBITUARY NOTICE
                  </span>
                  <h3 className="text-base font-bold font-serif-jp text-stone-950">
                    故 山田 一郎 儀 訃報
                  </h3>
                  <div className="text-xs text-stone-500 font-mono">享年85歳 令和8年11月19日逝去</div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-stone-200 text-xs text-left space-y-1.5 font-sans">
                  <div><strong>通夜式：</strong>11月21日（土）18:00〜</div>
                  <div><strong>告別式：</strong>11月22日（日）10:00〜</div>
                  <div><strong>式場：</strong>メモリアルホール大宮（本館2階）</div>
                  <div><strong>喪主：</strong>山田 太郎（長男）</div>
                </div>

                <div className="space-y-2 pt-1 text-xs">
                  <button className="w-full py-2.5 bg-stone-900 text-white font-bold rounded-xl text-xs hover:bg-stone-800">
                    式場地図（Googleマップ）を開く
                  </button>
                  <button className="w-full py-2 bg-white border border-stone-300 text-stone-700 font-semibold rounded-xl text-[11px]">
                    供花・弔電の手配はこちら
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
