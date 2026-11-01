import { FuneralCateringStyle, CateringEquipmentItem } from '../types/quiz';

export interface BanquetStyleInfo {
  id: FuneralCateringStyle;
  name: string;
  subname: string;
  tagline: string;
  description: string;
  characteristics: string[];
  equipmentFocus: string[];
  cateringCaution: string;
  themeParkSuitability: string;
}

export const BANQUET_STYLES_DATA: BanquetStyleInfo[] = [
  {
    id: 'tsuya_buffet',
    name: '通夜振る舞い形式',
    subname: '大皿料理・江戸前握り寿司・煮物・オードブル',
    tagline: '弔問客への「お清め」と感謝。長居せず一口箸をつける大皿形式',
    description: '通夜式終了後、弔問に訪れた会葬者や親族・世話役を別室でおもてなしする伝統儀礼。大皿の寿司や煮物、天ぷら、オードブルを囲み、故人を偲ぶ思い出を語り合います。',
    characteristics: [
      '大皿の「特選握り寿司（助六含む）」と「季節の和洋オードブル・煮物盛り合わせ」が中心',
      '弔問客は長居せず15〜20分程度で一口箸をつけ、次の人に席を譲るのが正統マナー',
      '故人の供養とお清めの意味を持つ日本酒（お清め酒・冷酒/熱燗）やビール、温かい緑茶',
      '回転が速いため、小皿・割り箸・グラスの補充と迅速な下膳（バッシング）が必須'
    ],
    equipmentFocus: [
      '大皿料理用プラッター（寿司桶・オードブル大皿・角大皿）',
      '取り皿（銘々小皿・深小皿＝人数×3〜4枚）',
      '取り分け用菜箸・サーバートング・醤油差し・小皿',
      '徳利・お猪口、ビールタンブラー、湯呑み茶碗',
      '保温湯煎器（お吸い物・茶碗蒸し等の温菜用）'
    ],
    cateringCaution: '会葬者数が当日の天候や関係先により大きく変動するため、寿司・オードブルは追加・調整が利く体制を整える。アレルギー表示を小皿コーナーに明示。',
    themeParkSuitability: '一般葬や参列者の多い通夜で最も円滑に機能する標準フォーマット。'
  },
  {
    id: 'shojin_kaiseki',
    name: '精進落とし形式（お斎・会席膳）',
    subname: '個別の高級会席膳 ＆ 故人への「陰膳（かげぜん）」',
    tagline: '火葬・収骨後に親族と寺院をもてなす。献杯（静かな唱和）と感謝の膳',
    description: '告別式・出棺・火葬・骨揚げ・繰り上げ初七日法要をすべて終えた後、最後までお付き合いいただいた親族、世話役、ご住職（僧侶）の労をねぎらう正式な会席宴席。',
    characteristics: [
      '一人一膳ずつの「高級会席膳（折敷・松花堂または懐石重・椀物・ステーキ・天ぷら）」',
      '故人の席を上座中央に設け、同じ料理をお供えする「陰膳（かげぜん）」が必須',
      '席次は最上座がご導師（僧侶）、次いで親族・世話役、最も出入口に近い最下座が喪主・遺族',
      '開宴時に親族代表による「献杯（けんぱい・拍手厳禁）」を執り行う'
    ],
    equipmentFocus: [
      '会席膳・折敷（漆調長角膳・松花堂木箱）',
      '故人専用「陰膳セット（漆塗り陰膳椀・ミニ位牌スタンド）」',
      '献杯用冷酒杯（またはグラス）',
      '吸物椀（蒔絵椀）、温製ステーキ皿、茶碗蒸し器',
      '急須・湯呑みセット、おしぼりトレイ'
    ],
    cateringCaution: '僧侶が会食に同席しない場合は、食事代の代わりに「御膳料（5,000〜10,000円）」をお布施と共に必ず包んでお渡しする。',
    themeParkSuitability: '家族葬・親族中心の葬儀で最も満足度が高く、心ゆくまで故人を偲べる必須スタイル。'
  },
  {
    id: 'bento',
    name: '折詰弁当・お持ち帰り助六形式',
    subname: '感染症対策・遠方親族・火葬待機時間用',
    tagline: '会食を行わず折り詰め弁当と返礼品を手渡す衛生・時短スタイル',
    description: 'コロナ禍以降定着した、会食室での密を避けて高級折詰弁当（二段重・助六寿司）と小瓶のお酒/お茶を袋に入れてお持ち帰りいただく現代スタイル。',
    characteristics: [
      '一人前の二段会席折詰弁当（保冷剤入り・衛生密閉包装）',
      '持ち帰り用手提げ紙袋（マチ付き・シックな色合い）',
      '火葬場の控室（炉の待ち時間約1時間）での軽食・つまみとしても活用可能',
      '高齢者や遠方からの参列者が帰りの新幹線等で食べられる利便性'
    ],
    equipmentFocus: [
      '保冷ボックス・蓄冷剤（夏場の食中毒防止）',
      '折詰用手提げ袋・お茶ペットボトル・個包装お手拭き',
      '火葬場控室用 紙コップ・個包装紙皿・ダストボックス'
    ],
    cateringCaution: '常温放置による食中毒を厳重警戒。賞味期限の明記と保冷剤の同梱を必須とする。',
    themeParkSuitability: '短時間で終わらせたい一日葬や、直葬・火葬式での親族軽食に最適。'
  },
  {
    id: 'tea_snack',
    name: '通夜茶菓・夜伽（よとぎ）軽食形式',
    subname: '遺族控室での夜通しの見守り・朝食手配',
    tagline: '故人の傍らで夜を明かす「夜伽」。サンドイッチ・おにぎり・温かい汁物',
    description: '通夜終了後、遺族が安置室や控室で故人と過ごす最後の夜（夜伽・よとぎ）を支える軽食・朝食サポート。翌朝の告別式に備える大切なエネルギー補給です。',
    characteristics: [
      '深夜に手軽につまめる個包装サンドイッチ、おにぎり、お茶漬けセット',
      '夜間の冷え込みを防ぐ温かい味噌汁・豚汁ケトル保温',
      '電気ポット、ドリップコーヒー、日本茶ティーバッグ、紙コップ・紙皿',
      '翌朝の告別式前の軽朝食（モーニングブレッド・スープ）へのスライド対応'
    ],
    equipmentFocus: [
      'スープウォーマーケトル（味噌汁・スープ用）',
      '大容量電気ポット（3L〜5L）',
      '使い捨てカトラリー・ペーパーボウル・ペーパーナプキン',
      '冷蔵庫（控室備え付けまたはポータブルクーラー）'
    ],
    cateringCaution: '翌朝の告別式準備の邪魔にならないよう、深夜のゴミは分別して早朝に回収・片付けを完了させる。',
    themeParkSuitability: '斎場併設の親族宿泊控室（バスルーム・ベッド完備）での夜伽に不可欠。'
  }
];

export const CATERING_EQUIPMENT_MASTER: CateringEquipmentItem[] = [
  // 1. テーブル＆リネン類
  {
    id: 'eq-tbl-round',
    category: 'table_linen',
    name: '通夜振る舞い用 円卓テーブル（直径180cm / 8名掛）',
    unitPrice: 3200,
    perTableRatio: 1,
    unit: '台',
    sparePct: 0.1,
    cateringStyles: ['tsuya_buffet'],
    description: '通夜振る舞い室に配置する大皿料理用円卓。回転が速いためクロスは撥水タイプ。',
    bereavedRiskNote: 'テーブルが足りないと弔問に来てくださった方が立ち往生して帰ってしまう。'
  },
  {
    id: 'eq-tbl-kaiseki',
    category: 'table_linen',
    name: '精進落とし用 会席長机 ＆ 肘掛け椅子（一人一膳配膳用）',
    unitPrice: 2800,
    perTableRatio: 1,
    unit: '台',
    sparePct: 0.1,
    cateringStyles: ['shojin_kaiseki'],
    description: '精進落としの会席膳を一人一膳ずつゆったり配置するテーブルと、足腰の楽な椅子。',
    bereavedRiskNote: '狭すぎるとお盆同士がぶつかり、お酒をこぼす事故が起きる。'
  },
  {
    id: 'eq-linen-cloth',
    category: 'table_linen',
    name: 'テーブルクロス（弔事用ダークグレー / 白無地）',
    unitPrice: 2200,
    perTableRatio: 1,
    unit: '枚',
    sparePct: 0.2,
    description: '落ち着いた色合いの撥水クロス。予備20%はお醤油やお酒こぼし時の即時交換用。',
    bereavedRiskNote: '汚れたクロスをそのまま放置すると不衛生で故人の供養に泥を塗る。'
  },

  // 2. 食器・グラス・漆器類
  {
    id: 'eq-kagezen-set',
    category: 'cutlery_glass',
    name: '故人専用 陰膳（かげぜん）漆器五ツ椀セット',
    unitPrice: 5000,
    fixedQuantity: 1,
    unit: '組',
    sparePct: 0.0,
    cateringStyles: ['shojin_kaiseki', 'tsuya_buffet'],
    description: '故人にお供えする親碗（ご飯）、汁碗（吸物）、平碗、壷碗、高坏の本格精進料理器。箸は故人から見て手前にセット。',
    bereavedRiskNote: '故人の席を用意し忘れると「誰のための供養か」と親族から激怒される。'
  },
  {
    id: 'eq-dish-sushi-platter',
    category: 'cutlery_glass',
    name: '大皿プラッター・寿司桶（5人前盛用）',
    unitPrice: 1200,
    perTableRatio: 2,
    unit: '枚',
    sparePct: 0.15,
    cateringStyles: ['tsuya_buffet'],
    description: '通夜振る舞いの握り寿司やオードブルを美しく盛り付ける特大皿。',
    bereavedRiskNote: '大皿が割れたり不足すると料理の差し替え出しがストップする。'
  },
  {
    id: 'eq-dish-meimei',
    category: 'cutlery_glass',
    name: '銘々取り皿（深小皿 ＆ 醤油豆皿）',
    unitPrice: 80,
    perPersonRatio: 3.0,
    unit: '枚',
    sparePct: 0.2,
    cateringStyles: ['tsuya_buffet', 'shojin_kaiseki'],
    description: '料理を取り分けるための清潔な小皿。一人平均3枚消費するため人数×3枚を積算。',
    bereavedRiskNote: '取り皿が切れると醤油で汚れた皿を使い回す無作法になる。'
  },
  {
    id: 'eq-glass-kenpai',
    category: 'cutlery_glass',
    name: '献杯用グラス（冷酒杯 ＆ ビール一口タンブラー）',
    unitPrice: 150,
    perPersonRatio: 2.0,
    unit: '個',
    sparePct: 0.2,
    cateringStyles: ['shojin_kaiseki', 'tsuya_buffet'],
    description: '精進落とし開宴時の「献杯」用。お酒が飲めない人用のウーロン茶グラスも兼ねる。',
    bereavedRiskNote: 'グラス不足で献杯の合図に間に合わない重大な段取りミス。'
  },
  {
    id: 'eq-chopsticks-mourning',
    category: 'cutlery_glass',
    name: '弔事用お箸（利休箸 / 白木箸・蓮水引箸袋）',
    unitPrice: 90,
    perPersonRatio: 1.0,
    unit: '膳',
    sparePct: 0.25,
    description: '祝い箸（柳箸）とは異なり、弔事用の清潔な利休白木箸。',
    bereavedRiskNote: '誤って婚礼用紅白水引の祝い箸を出してしまうと前代未聞の言語道断な大事故。'
  },

  // 3. 厨房調理・保温保冷設備
  {
    id: 'eq-soup-warmer',
    category: 'kitchen_cooking',
    name: '電気式スープウォーマー（味噌汁・お吸い物保温用）',
    unitPrice: 4000,
    fixedQuantity: 2,
    unit: '台',
    sparePct: 0.0,
    description: '熱いお吸い物や赤出汁を80℃で保温する業務用ケトル。',
    bereavedRiskNote: '冷え切った汁物を出すと料理全体の評価が一気に落ちる。'
  },
  {
    id: 'eq-rice-cooker',
    category: 'kitchen_cooking',
    name: '業務用保温電子ジャー（白米・炊き込みご飯用）',
    unitPrice: 5000,
    fixedQuantity: 1,
    unit: '台',
    sparePct: 0.0,
    description: 'ご飯を常に温かい状態でキープする大型ジャー。',
    bereavedRiskNote: 'ご飯がカピカピに乾燥してしまう事故を防止。'
  },
  {
    id: 'eq-hot-towel-warmer',
    category: 'kitchen_cooking',
    name: 'おしぼり温蔵庫（ホットキャビ ＆ 白無地布おしぼり）',
    unitPrice: 4500,
    fixedQuantity: 1,
    unit: '台',
    sparePct: 0.2,
    description: '着席した参列者に最初に手渡すアツアツのおしぼり。',
    bereavedRiskNote: '冷たいおしぼりや紙ナプキンだけでは冬場の参列者をもてなせない。'
  },

  // 4. 受付・防犯設備
  {
    id: 'eq-safe-cash',
    category: 'reception_safe',
    name: '受付用 鍵付き手提げ金庫（香典保管専用）',
    unitPrice: 3000,
    fixedQuantity: 2,
    unit: '台',
    sparePct: 0.0,
    description: '通夜・告別式の受付で数百万円の香典袋を即座に施錠投入する金庫。',
    bereavedRiskNote: '金庫がないと受付台の上に香典が山積みになり香典泥棒の標的に。'
  },

  // 5. 祭壇・供物用備品
  {
    id: 'eq-altar-tray',
    category: 'altar_offerings',
    name: '切手盆（漆塗り祝儀・不祝儀受け盆）',
    unitPrice: 1500,
    fixedQuantity: 3,
    unit: '枚',
    sparePct: 0.0,
    description: '寺院へのお布施手渡し、および受付での香典受領時に使用する格調ある漆塗り盆。',
    bereavedRiskNote: '手渡しでお布施やお札を渡すのは重大な非礼。'
  }
];

export interface StaffRoleItem {
  id: string;
  role: string;
  count: number;
  unitRate: number; // 日当単価 (円)
  amount: number;   // count * unitRate
  description: string;
  duty: string;
}

// 葬儀・会食スタッフ人数計算ロジック（葬祭バンケット標準配置基準）
export function calculateRequiredStaff(guestCount: number, tableCount: number) {
  const funeralDirector = 1; // 1級葬祭ディレクター（総監督）
  const serviceCaptain = 1;  // 会食サービスキャプテン
  const tableWaiters = Math.max(2, Math.ceil(tableCount * 0.5)); // 卓付配膳スタッフ
  const kitchenRunners = Math.max(1, Math.ceil(guestCount / 35)); // 厨房・お皿洗いランナー
  const receptionAttendant = 1; // 受付金庫番・クローク補助
  const monkAttendant = 1; // 導師（寺院住職）専任アテンド

  const totalStaff = funeralDirector + serviceCaptain + tableWaiters + kitchenRunners + receptionAttendant + monkAttendant;

  const staffItems: StaffRoleItem[] = [
    {
      id: 'staff-director',
      role: '1級葬祭ディレクター（式場総監督）',
      count: funeralDirector,
      unitRate: 45000,
      amount: funeralDirector * 45000,
      description: '通夜・告別式・火葬・精進落としの全進行を統括指揮する最高責任者',
      duty: 'ご遺族ケア、寺院対応、進行遅延調整、火葬場連絡、金庫リレー立ち合い'
    },
    {
      id: 'staff-captain',
      role: '会食サービスキャプテン',
      count: serviceCaptain,
      unitRate: 32000,
      amount: serviceCaptain * 32000,
      description: '通夜振る舞い・精進落とし室の配膳統括。献杯・挨拶のタイミング管理',
      duty: '開宴・献杯・料理出し・陰膳配膳の進行同期'
    },
    {
      id: 'staff-waiters',
      role: 'テーブル配膳スタッフ（お斎配膳人）',
      count: tableWaiters,
      unitRate: 20000,
      amount: tableWaiters * 20000,
      description: '会席膳のサーブ、お酌、お吸い物・温菜の提供、空き皿下膳',
      duty: '各卓の食事ペース配慮、お茶・お酒の補充、アレルギー対応'
    },
    {
      id: 'staff-runner',
      role: '厨房バックヤードランナー・洗い場',
      count: kitchenRunners,
      unitRate: 18000,
      amount: kitchenRunners * 18000,
      description: '仕出し会席の温め・盛り付け補助、配膳台への料理運搬、ゴミ回収',
      duty: '料理温度（80℃以上）の管理、漆器の丁寧な洗浄拭き上げ'
    },
    {
      id: 'staff-reception',
      role: '受付・クローク・金庫管理スタッフ',
      count: receptionAttendant,
      unitRate: 18000,
      amount: receptionAttendant * 18000,
      description: '香典受領の補助、手荷物預かり、親族への金庫引き渡し立ち合い',
      duty: '香典袋の紛失盗難防止、返礼品引換券の過不足チェック'
    },
    {
      id: 'staff-monk',
      role: '導師（ご住職）専任アテンドスタッフ',
      count: monkAttendant,
      unitRate: 22000,
      amount: monkAttendant * 22000,
      description: '寺院控室の桜湯・お茶出し、前机への経本運搬、御膳料手渡しアテンド',
      duty: '住職の到着・着替え・入退場誘導、最上座席へのエスコート'
    }
  ];

  const totalStaffCost = staffItems.reduce((sum, item) => sum + item.amount, 0);

  return {
    funeralDirector,
    serviceCaptain,
    tableWaiters,
    kitchenRunners,
    receptionAttendant,
    monkAttendant,
    totalStaff,
    staffItems,
    totalStaffCost
  };
}
