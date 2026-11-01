/**
 * 葬儀マルチベンダー業者一覧連絡票 ＆ 配送先荷札・供花伝票 ＆ 訃報連絡状・会葬礼状データ
 * 葬儀施行・準備マニュアル
 */

// 1. 業者一覧連絡票（マルチベンダー緊急連絡網）
export interface VendorContactItem {
  id: string;
  category: string;
  companyName: string;
  contactPerson: string;
  phone: string;
  emergencyPhone: string;
  deliveryTime: string; // 搬入・到着予定時間
  roleDescription: string;
  status: 'confirmed' | 'pending' | 'arrived';
  checkNotes: string;
}

export const INITIAL_VENDOR_CONTACTS: VendorContactItem[] = [
  {
    id: 'v-crematorium',
    category: '火葬場・斎場',
    companyName: '公営 広域総合斎場・火葬管理事務所',
    contactPerson: '斎場管理課 炉前担当係長',
    phone: '03-3456-7890',
    emergencyPhone: '090-1111-2222',
    deliveryTime: '告別式当日 12:00炉前到着（厳守）',
    roleDescription: '火葬炉予約管理、告別室での納めの式、点火、待合室、収骨（骨揚げ）案内',
    status: 'confirmed',
    checkNotes: '【必携】死体火葬許可証原本の持参。心付け不要（公務員法により収賄禁止・完全不要）'
  },
  {
    id: 'v-hearse',
    category: '霊柩車・寝台車',
    companyName: '東都特殊寝台霊柩自動車 株式会社',
    contactPerson: '配車センター 主任ドライバー',
    phone: '03-1234-5678',
    emergencyPhone: '090-2222-3333',
    deliveryTime: '出棺45分前（10:45）式場車寄せ配車',
    roleDescription: '病院搬送（寝台車）および告別式出棺（洋型霊柩車・親族マイクロバス運行）',
    status: 'confirmed',
    checkNotes: '棺サイズ（長尺6.25尺対応）、喪主乗車席の確保、火葬場までの運行ルート確認済'
  },
  {
    id: 'v-temple',
    category: '寺院・宗教者',
    companyName: '宗教法人 菩提寺（大本山末寺）',
    contactPerson: '住職（ご導師） / 伴僧',
    phone: '03-5555-1111',
    emergencyPhone: '090-3333-4444',
    deliveryTime: '通夜17:15寺院控室着 / 告別式09:15着',
    roleDescription: '通夜式読経、葬儀告別式読経、引導・戒名授与、火葬炉前読経、繰上げ初七日読経',
    status: 'confirmed',
    checkNotes: 'お布施・戒名料・御車料・御膳料の準備。お茶出しは桜湯・昆布茶（煎茶NG）'
  },
  {
    id: 'v-flower-altar',
    category: '生花祭壇・供花',
    companyName: '株式会社 生花祭壇デザインスタジオ',
    contactPerson: '生花部 チーフディレクター',
    phone: '03-6666-2222',
    emergencyPhone: '090-4444-5555',
    deliveryTime: '通夜当日午前09:00設営完了',
    roleDescription: '生花祭壇ライン設営、遺影周り生花額、棺上花、親族・会社供花スタンド配列',
    status: 'confirmed',
    checkNotes: '供花名札の誤字脱字・親族順位（伯父叔父・本家等）の事前名札照合を完了'
  },
  {
    id: 'v-yukan',
    category: '湯灌・納棺師',
    companyName: '美粧納棺ケア 専門サービス',
    contactPerson: '認定納棺士 チームリーダー',
    phone: '03-7777-3333',
    emergencyPhone: '090-5555-6666',
    deliveryTime: '通夜当日午前10:30納棺開始',
    roleDescription: '湯灌の儀、洗髪・清拭、死化粧（エンゼルケア）、死装束（旅支度）、納棺立ち会い',
    status: 'confirmed',
    checkNotes: '宗派確認済（浄土真宗のため旅支度は行わず白寿衣とする旨を遺族と確認）'
  },
  {
    id: 'v-coffin-urn',
    category: '棺・骨壺・葬具',
    companyName: '日本葬具製造特販 株式会社',
    contactPerson: '物流配送センター 担当',
    phone: '03-8888-4444',
    emergencyPhone: '090-6666-7777',
    deliveryTime: '通夜前日17:00式場納品済',
    roleDescription: '高級布張彫刻棺、大理石骨壺（本骨箱・風呂敷）、白木仮位牌、後飾り段一式',
    status: 'confirmed',
    checkNotes: '故人身長（175cm）に合わせた大型棺確認済。骨壺名入れ彫刻チェック完了'
  },
  {
    id: 'v-dryice',
    category: '遺体保全',
    companyName: '東都保冷サプライ（24時間対応）',
    contactPerson: '保冷技術員',
    phone: '0120-333-888',
    emergencyPhone: '090-7777-8888',
    deliveryTime: '毎日朝夕2回 定期補充',
    roleDescription: '遺体保冷用ドライアイス交換（腹部・頸部重点処置・消臭シート施工）',
    status: 'confirmed',
    checkNotes: '出棺まで通算4回分（計40kg）補充スケジュールを組込み'
  },
  {
    id: 'v-catering',
    category: '仕出し・会食',
    companyName: '仕出し会席 割烹味心',
    contactPerson: '配達配膳部 主任',
    phone: '03-9999-5555',
    emergencyPhone: '090-8888-9999',
    deliveryTime: '通夜振る舞い17:30 / 精進落とし翌13:00',
    roleDescription: '通夜振る舞い寿司大皿・オードブル、精進落とし会席膳（陰膳付）、配膳人手配',
    status: 'confirmed',
    checkNotes: '故人の「陰膳（かげぜん）」1膳無料手配確認。アルコール・お茶ピッチャー配備'
  },
  {
    id: 'v-return-gifts',
    category: '返礼品・香典返し',
    companyName: '全国葬祭返礼品センター',
    contactPerson: '式場担当アドバイザー',
    phone: '0120-555-777',
    emergencyPhone: '090-9999-0000',
    deliveryTime: '通夜当日13:00納品（返品可能枠）',
    roleDescription: '会葬御礼（会葬礼状＋お茶/タオルセット）、香典返し当日返し（カタログギフト等）',
    status: 'confirmed',
    checkNotes: '予想会葬80名＋予備30個確保。未開封分は全数返品可能契約'
  },
  {
    id: 'v-director',
    category: '葬祭ディレクター',
    companyName: '総合葬祭プロデュース 本部指揮',
    contactPerson: '1級葬祭ディレクター（式場統括総監督）',
    phone: '03-4321-8765',
    emergencyPhone: '090-1234-5678',
    deliveryTime: '常時常駐（通夜〜告別式〜火葬完遂まで）',
    roleDescription: '三大工程全進行管理、司会台本、親族焼香案内、火葬場アテンド、後飾り設置',
    status: 'confirmed',
    checkNotes: '喪主・ご遺族の精神的ケア、弔電拝読順位、金庫防犯リレーの最終点検'
  }
];

// 2. 配送先・荷札（供花・供物・持込荷物のホテル斎場気付宛名伝票）
export interface ShippingSlipTemplate {
  facilityName: string; // 送付先斎場・寺院・ホテル
  banquetDepartment: string; // 担当部署・式場担当
  floorAndRoom: string; // 〇階 〇〇ホール 気付
  eventDate: string; // 通夜・告別式日時
  eventTime: string; // 開式時間
  coupleNames: string; // 故人名・喪主名
  deliveryDeadline: string; // 必着指定
  itemCategory: string; // 荷物品目
  boxCount: number; // 個数
  senderName: string; // 送り主
  senderPhone: string; // 送り主連絡先
  importantNotes: string; // 現場注意書き
}

export const DEFAULT_SHIPPING_SLIP: ShippingSlipTemplate = {
  facilityName: '総合斎場 メモリアルホール大宮',
  banquetDepartment: '葬祭式場課・供花受入窓口 気付',
  floorAndRoom: '本館2階「紫雲の間（しうんのま）」気付',
  eventDate: '通夜: 2026年11月21日 18:00 / 告別式: 11月22日 10:00',
  eventTime: '通夜開式 18:00（受付開始 17:00）',
  coupleNames: '故 山田 一郎 儀 葬儀告別式（喪主: 山田 太郎 殿）',
  deliveryDeadline: '【通夜当日 午前11:00必着（供花配列順確認のため時間厳守）】',
  itemCategory: '供花スタンド（生花） ＆ 供花芳名札（木札）一式',
  boxCount: 2,
  senderName: '株式会社フラワーデリバリー（担当：佐々木）',
  senderPhone: '090-5555-6666',
  importantNotes: '※他家葬儀との混同厳禁。受領後は直ちに2階「紫雲の間」生花担当者へ引き渡し、名札文字の照合を受けてください。'
};

// 3. 訃報連絡票・死亡通知状・会葬礼状サンプル
export interface InvitationSampleData {
  paperInvitation: {
    seasonalGreeting: string; // 時候の挨拶は弔事では不要（即用件）
    bodyText: string[]; // 本文（句読点なし・忌み言葉なし）
    dateStr: string;
    ceremonyTime: string;
    receptionTime: string;
    venueName: string;
    venueFloor: string;
    rsvpDeadline: string; // 供花・弔電締切
    groomsName: string; // 故人名
    bridesName: string; // 喪主名
    parentsNames: string; // 親族代表
  };
  replyPostcard: {
    returnAddress: string;
    recipientName: string;
    deadlineNotice: string;
    allergyQuestion: string;
    mannerTip: string;
  };
  webInvitation: {
    urlSlug: string;
    pageTitle: string;
    heroMessage: string;
    features: string[];
    modernAdvantages: string[];
  };
}

export const INVITATION_SAMPLE_DATA: InvitationSampleData = {
  paperInvitation: {
    seasonalGreeting: '亡父 山田 一郎 儀 かねてより病気療養中のところ 薬石効なく逝去いたしました',
    bodyText: [
      'ここに生前のご厚誼を深謝し 謹んでご通知申し上げます',
      '追って 通夜ならびに葬儀告別式は 仏式により下記のとおり執り行います',
      'ご多用中誠に恐縮ではございますが',
      'ご会葬賜りますようご案内申し上げます'
    ],
    dateStr: '通夜: 2026年11月21日（土）午後6時 ｜ 葬儀告別式: 11月22日（日）午前10時',
    ceremonyTime: '式場　メモリアルホール大宮 本館2階 紫雲の間',
    receptionTime: '火葬　11月22日 午前11時30分出棺 ➔ 市営斎場にて火葬',
    venueName: 'メモリアルホール大宮（埼玉県さいたま市大宮区1-2-3）',
    venueFloor: '式場直通電話: 048-123-4567 ｜ 駐車場完備（最寄り駅より送迎バス運行）',
    rsvpDeadline: '供花・弔電の受付締切：11月21日（土）午後1時まで',
    groomsName: '故 山田 一郎 儀（享年八十五歳）',
    bridesName: '喪主 山田 太郎（長男）',
    parentsNames: '親族一同 ｜ 葬儀委員長 株式会社〇〇 代表取締役 鈴木 健一'
  },
  replyPostcard: {
    returnAddress: '〒330-0001 埼玉県さいたま市大宮区1-2-3 メモリアルホール大宮気付',
    recipientName: '山田 太郎 行（※返信用ハガキ・弔電届）',
    deadlineNotice: '会葬御礼のハガキ・返礼品引換券です。本状を受付にご提示の上 お引き換えください。',
    allergyQuestion: '精進落とし（お斎）にご参列いただく親族様は、食物アレルギーや配慮事項をお知らせください。',
    mannerTip: '【会葬礼状のしきたり】会葬礼状や訃報案内には、お祝い事の招待状と同様に「句読点（、。）」を用いないのが古来からの正式な礼法です。'
  },
  webInvitation: {
    urlSlug: 'https://funeral.example.com/yamada-ichiro-fuhou',
    pageTitle: '故 山田 一郎 儀 訃報・葬儀ご案内（WEB訃報連絡）',
    heroMessage: '故 山田 一郎 儀 葬儀告別式のご案内',
    features: [
      'LINEやメールで親族・会社・知人へ即時一斉訃報送信（通夜当日の参列漏れを防止）',
      '式場アクセスマップ（Googleマップ直結）・ナビゲーション機能',
      'WEB供花・弔電・オンライン香典（弔慰金決済）受付機能の連動',
      '参列予定の事前通知・家族葬での参列辞退/香典辞退のスマートアナウンス'
    ],
    modernAdvantages: [
      '電話連絡網による聞き間違い（日時・式場名）をゼロにし、正確な情報を伝達',
      '供花や弔電の注文がスマホから1分で完結し、集計漏れ・芳名札誤字を防止',
      '家族葬で一般弔問を辞退する場合も、角を立てずに温かい言葉で案内可能'
    ]
  }
};
