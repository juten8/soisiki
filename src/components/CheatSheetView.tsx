import React, { useState } from 'react';
import { CHEAT_SHEETS_DATA } from '../data/cheatSheetData';
import { 
  AlertTriangle, 
  ArrowLeft, 
  BookOpen, 
  HeartHandshake, 
  HelpCircle, 
  Scale, 
  Search, 
  ShieldCheck, 
  Sparkles, 
  TrendingUp,
  Building2
} from 'lucide-react';

interface CheatSheetViewProps {
  onBack: () => void;
}

export const CheatSheetView: React.FC<CheatSheetViewProps> = ({ onBack }) => {
  const [selectedTopicId, setSelectedTopicId] = useState(CHEAT_SHEETS_DATA[0].id);
  const [searchQuery, setSearchQuery] = useState('');

  const currentTopic = CHEAT_SHEETS_DATA.find(t => t.id === selectedTopicId) || CHEAT_SHEETS_DATA[0];

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Scale': return <Scale className="w-4 h-4 text-stone-700" />;
      case 'ShieldCheck': return <ShieldCheck className="w-4 h-4 text-stone-700" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4 text-stone-700" />;
      case 'HeartHandshake': return <HeartHandshake className="w-4 h-4 text-stone-700" />;
      default: return <BookOpen className="w-4 h-4 text-stone-700" />;
    }
  };

  const filteredAllItems = searchQuery.trim()
    ? CHEAT_SHEETS_DATA.flatMap(t => 
        t.items.filter(item => 
          item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.value.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (item.detail && item.detail.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (item.caution && item.caution.toLowerCase().includes(searchQuery.toLowerCase()))
        ).map(item => ({ ...item, topicTitle: t.title }))
      )
    : null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-stone-900 font-serif-jp flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-stone-700" />
              <span>葬儀重要用語・宗派別焼香 ＆ 諸手続きチートシート</span>
            </h2>
            <p className="text-xs text-stone-500">
              葬祭ディレクター技能審査・現場実務で必須となる最重要ポイントの要約集です
            </p>
          </div>
        </div>

        {/* Search bar */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="用語・宗派・法令を検索（例: 浄土真宗）"
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-stone-300 bg-white focus:ring-1 focus:ring-stone-600 outline-none"
          />
        </div>
      </div>

      {/* If Searching, show search results */}
      {filteredAllItems ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-stone-600">
            <span>検索結果: {filteredAllItems.length}件</span>
            <button
              onClick={() => setSearchQuery('')}
              className="text-stone-800 hover:underline"
            >
              検索をクリア
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAllItems.map((item, idx) => (
              <div key={idx} className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs space-y-2">
                <span className="text-[10px] text-stone-700 bg-stone-100 px-2 py-0.5 rounded border border-stone-200 font-medium">
                  {item.topicTitle}
                </span>
                <h4 className="text-sm font-bold text-stone-900 font-serif-jp">
                  {item.label}
                </h4>
                <div className="text-xs font-semibold text-stone-950 bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                  {item.value}
                </div>
                {item.detail && <p className="text-xs text-stone-600 leading-relaxed">{item.detail}</p>}
                {item.caution && (
                  <div className="text-xs text-rose-800 bg-rose-50 p-2 rounded-lg flex items-start gap-1.5 border border-rose-200">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                    <span>{item.caution}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Normal Category Tabs */
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {CHEAT_SHEETS_DATA.map(topic => {
              const isSelected = topic.id === selectedTopicId;
              return (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopicId(topic.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    isSelected
                      ? 'bg-stone-900 text-white shadow-xs'
                      : 'bg-white hover:bg-stone-50 text-stone-700 border border-stone-200'
                  }`}
                >
                  {renderIcon(topic.icon)}
                  <span>{topic.title}</span>
                </button>
              );
            })}
          </div>

          {/* Current Category Content */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="border-b border-stone-200 pb-4">
              <h3 className="text-base sm:text-lg font-bold text-stone-900 font-serif-jp flex items-center gap-2">
                {renderIcon(currentTopic.icon)}
                <span>{currentTopic.title}</span>
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                {currentTopic.summary}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentTopic.items.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-stone-50/70 p-4 sm:p-5 rounded-xl border border-stone-200 space-y-2.5 hover:shadow-xs transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs sm:text-sm font-bold text-stone-900 font-serif-jp">
                      {item.label}
                    </h4>
                  </div>

                  <div className="text-xs font-bold text-stone-950 bg-white p-3 rounded-lg border border-stone-200 shadow-2xs">
                    {item.value}
                  </div>

                  {item.detail && (
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {item.detail}
                    </p>
                  )}

                  {item.caution && (
                    <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-900 flex items-start gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                      <span>{item.caution}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
