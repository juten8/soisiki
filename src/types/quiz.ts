/**
 * Types for 葬儀施行・準備マニュアル（三大工程完全網羅）
 * 葬祭ディレクター技能審査基準＆現場実務完全準拠
 */

export type CourseId = 'basic' | 'director' | 'master';

export interface CourseInfo {
  id: CourseId;
  title: string;
  badgeTitle: string;
  subtitle: string;
  description: string;
  targetLevel: string;
  hours: string;
  tuition: string;
  requirements: string;
  lectures: LectureInfo[];
  examPassingScore: number; // percentage, e.g. 70
  examTimeLimitMinutes: number; // e.g. 30
}

export interface LectureInfo {
  id: string; // e.g., 'basic-1'
  lectureNumber: number;
  title: string;
  focusTopics: string;
  description: string;
}

export type QuestionDifficulty = 'basic' | 'standard' | 'advanced';

export interface Question {
  id: string;
  courseId: CourseId;
  lectureId: string;
  category: string; // e.g. '法律・届出', '宗派別儀礼', '納棺・湯灌', '祭壇設営', '焼香作法', etc.
  difficulty: QuestionDifficulty;
  question: string;
  targetQuestionType: 'find_correct' | 'find_incorrect'; // 最も適切なものを選ぶ / 最も不適切なものを選ぶ
  options: string[];
  optionTruths: boolean[]; // whether each option 0..3 is factually true (○) or false (✕)
  correctIndex: number; // 0, 1, 2, or 3
  explanation: {
    correctPoint: string;
    detailedBreakdown: string[];
    proTip?: string; // 実務葬祭ディレクターのアドバイス
    examTip?: string; // 技能検定・学科の急所
  };
  tags: string[];
  workflowStage?: 1 | 2 | 3; // 葬儀実務3大工程（1: 臨終・安置・打合せ、2: 納棺・通夜式、3: 告別式・出棺火葬・精進落とし）
}

// 葬儀実務の「三大工程」
export type WorkflowStageNumber = 1 | 2 | 3;

export interface WorkflowMilestoneTask {
  id: string;
  title: string;
  timing: string;
  description: string;
  bereavedRisk: string; // 怠るとご遺族・喪主がどう困惑・失敗するか
  isMilestone?: boolean;
  relatedTool?: 'estimate' | 'seating' | 'altar-setting' | 'dispatch' | 'notice' | 'practical' | 'catering';
}

export interface WorkflowStageInfo {
  stageNumber: WorkflowStageNumber;
  id: string;
  timing: string; // e.g. "ご臨終〜搬送・安置・打合せ"
  title: string;
  tagline: string;
  leadSummary: string;
  bereavedWarning: string; // ご遺族が最も後悔・失敗しやすい最大の落とし穴
  coreTasks: WorkflowMilestoneTask[];
  examPoints: string[];
  practicalManners: string[];
}

export interface VocabQuestion {
  id: string;
  courseId: CourseId;
  category: string;
  question: string; // sentence with blank
  answer: string; // 正解の単語
  reading?: string; // ふりがな
  acceptableAnswers?: string[]; // aliases
  hint: string;
  explanation: string;
}

export interface CheatSheetTopic {
  id: string;
  title: string;
  icon: string;
  summary: string;
  items: {
    label: string;
    value: string;
    detail?: string;
    caution?: string;
  }[];
}

export interface UserProgressState {
  answeredQuestions: Record<string, { answeredCount: number; correctCount: number; lastAnsweredAt: number }>;
  bookmarkedQuestionIds: string[];
  passedCourses: Record<CourseId, { passedAt: number; score: number; candidateName: string; certificateId: string }>;
  streakDays: number;
  lastActiveDate: string;
  soundEnabled: boolean;
  studentName: string;
  studyViewMode?: 'four_sheet' | 'single_qa'; // User's preferred learning view
}

// 葬儀の形式
export type FuneralReligiousStyle = 'buddhist' | 'shinto' | 'christian' | 'secular'; // 仏式、神葬祭、キリスト教式、無宗教・お別れの会

// 会食・仕出し形式
export type FuneralCateringStyle = 'tsuya_buffet' | 'shojin_kaiseki' | 'bento' | 'tea_snack'; // 通夜振る舞い（大皿・寿司）、精進落とし（会席膳）、助六・折詰、茶菓

export interface CateringEquipmentItem {
  id: string;
  category: 'table_linen' | 'cutlery_glass' | 'kitchen_cooking' | 'reception_safe' | 'altar_offerings' | 'service_staff';
  name: string;
  unitPrice: number;
  perPersonRatio?: number;
  perTableRatio?: number;
  fixedQuantity?: number;
  unit: string;
  sparePct: number;
  cateringStyles?: FuneralCateringStyle[];
  description: string;
  bereavedRiskNote: string;
}

export type AppMode = 
  | 'workflow'        // 葬儀実務「三大工程」完全ロードマップ（臨終・安置 ➔ 納棺・通夜 ➔ 告別式・火葬・精進落とし）
  | 'estimate'        // 葬儀施行お見積り＆実務実行連動シート（祭壇・棺・骨壺・車両・ドライアイス・料理・返礼品・お布施）
  | 'altar-setting'   // 4大式場・祭壇配置図面（仏式祭壇、神葬祭祭壇、無宗教お別れの会、通夜振る舞い・精進落とし卓）
  | 'dispatch'        // 葬儀関係業者緊急連絡網（霊柩車、火葬場、生花祭壇、返礼品、仕出し料理、寺院等）＆ 配送荷札・供花札
  | 'notice'          // 訃報連絡票・死亡通知状・会葬礼状（句読点なし・お礼状・返礼品引換券・WEB訃報）
  | 'practical'       // 現場超実務マニュアル（忘れ物ゼロ点検、宗派別焼香作法、お布施・御車料、香典泥棒防止金庫、納棺副葬品OK/NG）
  | 'catering'        // 通夜振る舞い・精進落とし仕出し料理＆備品見積り
  | 'seating'         // 葬儀告別式・親族席次＆焼香順位シミュレーター（喪主・親族・世話役・一般会葬者）
  | 'courses'         // 葬祭ディレクター技能審査基準 自習・講義一覧
  | 'drill'           // 三大工程別 〇✕即時判定シート＆一問一答特訓
  | 'exam'            // 葬祭ディレクター本番模擬試験
  | 'weakness'        // 弱点特訓
  | 'bookmarks'       // 復習帳
  | 'vocab'           // 葬儀重要用語・漢字記述特訓（枕経、湯灌、戒名、野辺送り、収骨、忌明け等）
  | 'cheatsheet'      // 宗派別焼香回数・忌み言葉・諸手続きハンドブック
  | 'diploma';        // 葬祭ディレクター認定ディプロマ修了証
