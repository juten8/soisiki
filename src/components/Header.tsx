import React, { useState } from 'react';
import { 
  AppMode, 
  CourseId, 
  UserProgressState 
} from '../types/quiz';
import { COURSES_DATA } from '../data/coursesData';
import { 
  Award, 
  BookOpen, 
  Bookmark, 
  CheckCircle2, 
  Flame, 
  HelpCircle, 
  Menu, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  X,
  FileText,
  Sparkles,
  GraduationCap,
  Calculator,
  Workflow,
  UtensilsCrossed,
  Utensils,
  Luggage,
  Truck,
  Mail,
  ShieldCheck,
  Building2,
  Users
} from 'lucide-react';

interface HeaderProps {
  currentMode: AppMode;
  setMode: (mode: AppMode) => void;
  selectedCourseId: CourseId;
  setSelectedCourseId: (courseId: CourseId) => void;
  userProgress: UserProgressState;
  setUserProgress: React.Dispatch<React.SetStateAction<UserProgressState>>;
  totalQuestionsCount: number;
  incorrectQuestionsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentMode,
  setMode,
  selectedCourseId,
  setSelectedCourseId,
  userProgress,
  setUserProgress,
  totalQuestionsCount,
  incorrectQuestionsCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(userProgress.studentName);

  const currentCourse = COURSES_DATA.find(c => c.id === selectedCourseId) || COURSES_DATA[0];

  const totalAnswered = Object.keys(userProgress.answeredQuestions).length;
  const totalCorrect = Object.values(userProgress.answeredQuestions).filter(q => q.correctCount > 0).length;
  const overallAccuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
  const bookmarkedCount = userProgress.bookmarkedQuestionIds.length;

  const toggleSound = () => {
    setUserProgress(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  };

  const saveName = () => {
    if (tempName.trim()) {
      setUserProgress(prev => ({ ...prev, studentName: tempName.trim() }));
    }
    setIsEditingName(false);
  };

  const navItems = [
    { mode: 'workflow' as AppMode, label: '実務三大工程', icon: Workflow, badge: '必修', highlight: true },
    { mode: 'estimate' as AppMode, label: '葬儀見積り・執行', icon: Calculator, badge: '三大工程連動', highlight: true },
    { mode: 'altar-setting' as AppMode, label: '祭壇・式場配置図面', icon: Utensils, badge: '4大葬儀形式', highlight: true },
    { mode: 'dispatch' as AppMode, label: '業者連絡票・供花荷札', icon: Truck, badge: '火葬場・寺院' },
    { mode: 'notice' as AppMode, label: '訃報連絡・会葬礼状', icon: Mail, badge: '句読点なし' },
    { mode: 'practical' as AppMode, label: '現場超実務マニュアル', icon: Luggage, badge: '焼香・お布施' },
    { mode: 'catering' as AppMode, label: '通夜振る舞い・精進落とし', icon: UtensilsCrossed, badge: '仕出し・陰膳' },
    { mode: 'seating' as AppMode, label: '親族席次・焼香順位', icon: Users, badge: '親族右・来賓左' },
    { mode: 'courses' as AppMode, label: '講義・技能審査基準', icon: BookOpen },
    { mode: 'exam' as AppMode, label: '本番模試', icon: Award },
    { mode: 'diploma' as AppMode, label: '修了証', icon: GraduationCap },
    { mode: 'vocab' as AppMode, label: '用語記述', icon: FileText },
    { 
      mode: 'weakness' as AppMode, 
      label: '弱点特訓', 
      icon: RotateCcw, 
      badge: incorrectQuestionsCount > 0 ? `${incorrectQuestionsCount}` : undefined 
    },
    { 
      mode: 'bookmarks' as AppMode, 
      label: '復習帳', 
      icon: Bookmark, 
      badge: bookmarkedCount > 0 ? `${bookmarkedCount}` : undefined 
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
      {/* Top Academic Bar */}
      <div className="bg-stone-50 border-b border-stone-200 text-stone-700 px-4 py-2 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium tracking-wide">
            <span className="inline-flex items-center gap-1 bg-stone-200 text-stone-800 px-2.5 py-0.5 rounded-full border border-stone-300 font-semibold text-[11px]">
              <ShieldCheck className="w-3 h-3 text-stone-700" />
              葬祭ディレクター技能審査基準準拠
            </span>
            <span className="hidden sm:inline text-stone-600 font-serif-jp">
              葬儀実務「三大工程」準備マニュアル ＆ 祭壇図面・見積り執行システム
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-stone-600">
            {/* Streak Counter */}
            <div className="flex items-center gap-1 text-stone-800 font-semibold" title="学習継続日数">
              <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
              <span>{userProgress.streakDays}日連続</span>
            </div>

            {/* Answered progress */}
            <div className="flex items-center gap-1.5 hidden md:flex text-stone-600">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>確認テスト習得: {totalCorrect}/{totalQuestionsCount}問 ({overallAccuracy}%)</span>
            </div>

            {/* Student Name */}
            <div className="flex items-center gap-1">
              {isEditingName ? (
                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    value={tempName}
                    onChange={e => setTempName(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && saveName()}
                    className="bg-white text-stone-900 text-xs px-2 py-0.5 rounded border border-stone-400 outline-none w-28 shadow-2xs"
                    placeholder="氏名を入力"
                    autoFocus
                  />
                  <button 
                    onClick={saveName} 
                    className="bg-stone-800 hover:bg-stone-900 text-white px-2 py-0.5 rounded text-[10px] font-semibold"
                  >
                    保存
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditingName(true)}
                  className="hover:text-stone-900 underline decoration-dotted flex items-center gap-1 text-stone-700"
                  title="クリックして受講者・担当者氏名を編集（ディプロマに反映されます）"
                >
                  <span>担当ディレクター:</span>
                  <span className="font-bold text-stone-900">{userProgress.studentName}</span>
                </button>
              )}
            </div>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              className="p-1 rounded hover:bg-stone-200 text-stone-500 hover:text-stone-900 transition-colors"
              title={userProgress.soundEnabled ? '効果音 ON (クリックでOFF)' : '効果音 OFF (クリックでON)'}
            >
              {userProgress.soundEnabled ? (
                <Volume2 className="w-3.5 h-3.5 text-stone-700" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-stone-400" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4 bg-white">
        {/* Logo and Brand */}
        <div 
          onClick={() => setMode('workflow')}
          className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-stone-900 text-amber-200 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
            <Building2 className="w-6 h-6 text-stone-100" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-stone-900 tracking-tight font-serif-jp">
                葬儀施行・準備マニュアル
              </h1>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-stone-100 text-stone-800 px-2 py-0.5 rounded-full border border-stone-300 hidden sm:inline-block">
                三大工程 完全網羅
              </span>
            </div>
            <p className="text-xs text-stone-500 hidden sm:block">
              ご臨終・搬送・安置 ➔ 納棺・通夜式 ➔ 告別式・出棺火葬・精進落とし
            </p>
          </div>
        </div>

        {/* Desktop Nav Items */}
        <nav className="hidden xl:flex items-center gap-1 overflow-x-auto py-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentMode === item.mode;
            return (
              <button
                key={item.mode}
                onClick={() => setMode(item.mode)}
                className={`relative px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-stone-900 text-white font-bold shadow-2xs'
                    : item.highlight
                    ? 'bg-stone-100/90 text-stone-900 hover:bg-stone-200 border border-stone-200'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-300' : 'text-stone-500'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    item.badge === '必修'
                      ? 'bg-amber-600 text-white'
                      : item.badge === '三大工程連動'
                      ? 'bg-stone-200 text-stone-900'
                      : 'bg-stone-200 text-stone-700'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Medium-screen fast bar */}
        <div className="hidden lg:flex xl:hidden items-center gap-1">
          {navItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const isActive = currentMode === item.mode;
            return (
              <button
                key={item.mode}
                onClick={() => setMode(item.mode)}
                className={`px-2 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 ${
                  isActive ? 'bg-stone-900 text-white font-bold' : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5 text-stone-700" />
                <span>{item.label}</span>
              </button>
            );
          })}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg text-stone-600 hover:bg-stone-100 text-xs font-medium flex items-center gap-1 border border-stone-200"
          >
            <span>他メニュー</span>
            <Menu className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => setMode('exam')}
            className="px-2.5 py-1.5 rounded-lg bg-stone-900 text-white text-xs font-semibold flex items-center gap-1 shadow-xs"
          >
            <Award className="w-3.5 h-3.5" />
            <span>模試</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Course Level Switcher Bar */}
      <div className="bg-stone-100/90 border-t border-stone-200/80 px-4 py-1.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1 text-stone-600 font-medium">
            <span className="text-[11px] text-stone-500">研修・技能審査区分:</span>
            <div className="flex items-center gap-1 bg-white p-0.5 rounded-lg border border-stone-200 shadow-2xs">
              {COURSES_DATA.map(course => {
                const isSelected = selectedCourseId === course.id;
                return (
                  <button
                    key={course.id}
                    onClick={() => {
                      setSelectedCourseId(course.id);
                    }}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                      isSelected
                        ? 'bg-stone-900 text-white shadow-xs font-semibold'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                    }`}
                  >
                    {course.id === 'basic' && '基礎科（全6講）'}
                    {course.id === 'director' && '葬祭ディレクター実務（全8講）'}
                    {course.id === 'master' && '葬祭マスター・経営（全4講）'}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="text-[11px] text-stone-800 font-medium flex items-center gap-1 truncate">
            <span className="font-semibold text-stone-700">
              {currentCourse.badgeTitle}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 p-4 space-y-2 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="text-xs font-semibold text-stone-400 px-2 pb-1">マニュアルメニュー</div>
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentMode === item.mode;
              return (
                <button
                  key={item.mode}
                  onClick={() => {
                    setMode(item.mode);
                    setMobileMenuOpen(false);
                  }}
                  className={`p-2.5 rounded-lg text-xs font-medium flex items-center gap-2 ${
                    isActive
                      ? 'bg-stone-900 text-white font-bold'
                      : 'bg-stone-50 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <Icon className="w-4 h-4 text-stone-700" />
                  <span className="truncate">{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto text-[10px] px-1 py-0.2 rounded-full bg-stone-200 text-stone-900 font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
