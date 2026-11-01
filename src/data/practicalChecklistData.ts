/**
 * 葬儀施行・準備マニュアル 現場超実務チェックリスト＆マニュアルデータ
 * 葬祭ディレクター技能審査基準＆現場ミスゼロ完全準拠
 */

// 1. 当日の忘れ物防止チェックリスト（最重要品目）
export interface PackingCheckItem {
  id: string;
  category: 'critical_docs' | 'bereaved' | 'ceremony' | 'cash_ofuse' | 'reception_safe';
  target: string; // 喪主、ご遺族、葬祭ディレクター、受付
  name: string;
  importance: 'critical' | 'high' | 'medium';
  timing: string;
  bereavedRisk: string; // 忘れた場合どうなるか
  detailNote: string;
}

export const PACKING_CHECKLIST_DATA: PackingCheckItem[] = [
  // 書類・法的手続き
  {
    id: 'pack-kaso-cert',
    category: 'critical_docs',
    target: '喪主 / 葬祭ディレクター',
    name: '死体火葬許可証（原本） ＆ 死亡診断書コピー',
    importance: 'critical',
    timing: '火葬場出発前（必携）',
    bereavedRisk: '火葬場に許可証を持参し忘れると、法律上（墓埋法）火葬炉への遺体投入が100%拒否される。',
    detailNote: '役所から交付された原本を専用ファイルに保管し、出棺時にディレクターが喪主のカバンに入っているか指差し確認。'
  },
  {
    id: 'pack-inkan',
    category: 'critical_docs',
    target: '喪主 / 届出人',
    name: '届出人の認印（朱肉用・シャチハタ不可）',
    importance: 'critical',
    timing: '逝去当日役所手続き時',
    bereavedRisk: 'シャチハタや印鑑忘れで死亡届が不受理となり、火葬許可証が即日発行できなくなる。',
    detailNote: '百円均一の三文判でも可。朱肉を使って押印できる認印を常に携帯。'
  },
  {
    id: 'pack-photo',
    category: 'critical_docs',
    target: 'ご遺族',
    name: '遺影写真の原版データ（高画質デジカメデータまたは鮮明な紙写真）',
    importance: 'critical',
    timing: '逝去当日の打合せ時',
    bereavedRisk: '画質の粗い免許証写真しかなく、祭壇の大画面モニターや額縁でピントがぼやけて故人の尊厳が損なわれる。',
    detailNote: 'ピントが合っており、故人らしい自然な笑顔で胸から上が写っている写真を複数枚ピックアップ。'
  },

  // 現金・お布施・心付け
  {
    id: 'pack-ofuse',
    category: 'cash_ofuse',
    target: '喪主 / 施主',
    name: '寺院へのお布施（読経料・戒名料・御車料・御膳料）',
    importance: 'critical',
    timing: '通夜または告別式当日の導師挨拶時',
    bereavedRisk: 'お布施の準備を忘れ、お札を裸のまま手渡すなどの言語道断の非礼。',
    detailNote: '白無地の封筒（またはお布施専用袋）に「御布施」「御車料」「御膳料」と濃墨で楷書書き。新札で問題ありません。'
  },
  {
    id: 'pack-cash-safe',
    category: 'reception_safe',
    target: '葬祭ディレクター / 喪主親族',
    name: '受付用 鍵付き手提げ金庫 ＆ 香典保管袋',
    importance: 'critical',
    timing: '通夜・告別式の受付設営時',
    bereavedRisk: '金庫がないと数百万円の香典袋が受付机の上に放置され、香典泥棒に抜き取られる重大事件に。',
    detailNote: '鍵は必ず喪主または会計責任者の親族が所持。受付終了時に直ちに親族へ引き渡す「金庫リレー」を徹底。'
  },

  // 遺族・喪主の身なり
  {
    id: 'pack-juzu',
    category: 'bereaved',
    target: '喪主・親族全員',
    name: '本式数珠または略式数珠（宗派別念珠）',
    importance: 'critical',
    timing: '自宅出発時',
    bereavedRisk: '数珠を忘れ、焼香の席で手ぶらで合掌することになり親族一同から冷視される。',
    detailNote: '左手に持つのが基本。合掌の際は両手にかける（宗派別の作法に準拠）。'
  },
  {
    id: 'pack-mourning-wear',
    category: 'bereaved',
    target: 'ご遺族全員',
    name: '正式喪服（黒紋付羽織袴/モーニングまたはブラックスーツ） ＆ 黒ネクタイ ＆ 黒靴下・黒パンスト',
    importance: 'critical',
    timing: 'お支度入り時',
    bereavedRisk: '光沢のあるネクタイや白靴下、柄物ストッキングを着用してきて厳粛な場を壊す。',
    detailNote: 'ネクタイピンは外す。靴は光沢のない黒革靴（金具なし）。女性は黒無地ストッキング（20〜30デニール程度）。'
  },

  // 儀礼・出棺品
  {
    id: 'pack-ihai-bone',
    category: 'ceremony',
    target: '葬祭ディレクター / 喪主',
    name: '白木仮位牌 ＆ 骨壺・骨箱（風呂敷包み）',
    importance: 'critical',
    timing: '出棺時〜火葬場',
    bereavedRisk: '火葬場に骨壺を忘れていき、火葬後に収骨（骨揚げ）ができず立ち往生する。',
    detailNote: '出棺時の役割分担：喪主＝位牌、親族代表（次男・娘等）＝遺影、副喪主＝骨箱を両手で胸の高さに抱える。'
  },
  {
    id: 'pack-farewell-flowers',
    category: 'ceremony',
    target: '生花担当 / ディレクター',
    name: 'お別れ花（切り花籠・トレイ） ＆ 故人愛用の副葬品',
    importance: 'high',
    timing: '告別式結び直後',
    bereavedRisk: '花が不足して棺の中が寂しくなったり、金属やガラスの副葬品を誤って混入させて遺骨が損壊する。',
    detailNote: '金属、メガネ、分厚い辞書、ガラス、メロンなどの果物は火葬炉故障や遺骨付着の原因になるため完全排除。'
  }
];

// 2. 宗派別の焼香回数・作法完全早見表
export interface SectIncenseManner {
  sectName: string; // 宗派名
  incenseTimes: string; // 焼香の回数
  holdingHeadHigh: boolean; // 額（おしいただく）か否か
  lineIncense: string; // 線香の場合の本数・立て方・寝かせ方
  recitation: string; // 唱えるお題目・念仏
  mannerDetail: string; // 詳細作法
  caution: string; // やってはいけないタブー
}

export const SECT_INCENSE_MANNERS: SectIncenseManner[] = [
  {
    sectName: '浄土真宗 本願寺派（お西）',
    incenseTimes: '1回（つまんでそのまま香炉へ）',
    holdingHeadHigh: false,
    lineIncense: '1本を2〜3つに折り、灰の上に「寝かせる」（立てない）',
    recitation: '南無阿弥陀仏（なもあみだぶつ）',
    mannerDetail: '合掌礼拝 ➔ 抹香を右手の親指・人差し指・中指でつまみ、【額におしいただかず】にそのまま香炉に1回落とす ➔ 合掌して「南無阿弥陀仏」を称え、一礼。',
    caution: '【超頻出】浄土真宗はお西もお東も「額におしいただかない」！額にかざすと重大な作法誤りとなります。'
  },
  {
    sectName: '真宗 大谷派（お東）',
    incenseTimes: '2回（つまんでそのまま香炉へ）',
    holdingHeadHigh: false,
    lineIncense: '1本を折り、灰の上に「寝かせる」',
    recitation: '南無阿弥陀仏（なもあみだぶつ）',
    mannerDetail: '合掌礼拝 ➔ 抹香をつまみ、【額におしいただかず】そのまま香炉へ2回落とす ➔ 合掌して念仏を称え、一礼。',
    caution: 'お西は1回、お東は2回。いずれも線香は立てずに「寝かせる」のが浄土真宗の厳格な掟。'
  },
  {
    sectName: '曹洞宗（禅宗）',
    incenseTimes: '2回（1回目はおしいただき、2回目はそのまま）',
    holdingHeadHigh: true,
    lineIncense: '1本を真っ直ぐ「立てる」',
    recitation: '南無釈迦牟尼仏（なむしゃかむにぶつ）',
    mannerDetail: '1回目は抹香をつまんで額におしいただき（主香＝故人の供養）、2回目は額におしいただかずにそのまま香炉に落とす（従香＝香を絶やさないため）。',
    caution: '2回ともおしいただくのではなく、1回目のみおしいただくのが曹洞宗の正式作法。'
  },
  {
    sectName: '臨済宗（禅宗）',
    incenseTimes: '1回（丁寧におしいただく）',
    holdingHeadHigh: true,
    lineIncense: '1本を「立てる」',
    recitation: '南無釈迦牟尼仏（なむしゃかむにぶつ）',
    mannerDetail: '合掌一礼 ➔ 抹香をつまみ、額の高さまでおしいただいて祈念を込め、静かに香炉へ落とす ➔ 合掌一礼。',
    caution: '心を込めて静かに1回行うのが臨済宗の格式。'
  },
  {
    sectName: '真言宗（密教）',
    incenseTimes: '3回（身・口・意の三業を清める）',
    holdingHeadHigh: true,
    lineIncense: '3本を「立てる」（仏・法・僧、または身口意の象徴）',
    recitation: '南無大師遍照金剛（なむだいしへんじょうこんごう）',
    mannerDetail: '3回とも抹香をつまんで額におしいただいてから香炉へ落とす。三毒（貪・瞋・痴）を滅ぼし三業を清める意味。',
    caution: '線香は手前に1本、奥に2本の逆三角形に立てるのが正式。'
  },
  {
    sectName: '日蓮宗・法華宗',
    incenseTimes: '1回または3回（導師は3回、一般は1回も可）',
    holdingHeadHigh: true,
    lineIncense: '1本または3本を「立てる」',
    recitation: '南無妙法蓮華経（なむみょうほうれんげきょう）',
    mannerDetail: '合掌一礼 ➔ 抹香をつまんで額におしいただき香炉へ。お題目を心の中で唱える。',
    caution: '日蓮正宗などではおしいただかない流派もあるため、寺院の指示を事前確認。'
  },
  {
    sectName: '浄土宗',
    incenseTimes: '特に回数規定なし（一般に1〜3回）',
    holdingHeadHigh: true,
    lineIncense: '1本を立てる、または2つに折って寝かせる',
    recitation: '南無阿弥陀仏（なもあみだぶつ）',
    mannerDetail: '額におしいただいて香炉へ。会葬者が多い場合は1回で速やかに進める。',
    caution: '回数よりも念仏を称え極楽往生を願う心が重視される。'
  },
  {
    sectName: '神葬祭（神道葬儀）',
    incenseTimes: '焼香ではなく「玉串奉奠（たまぐしほうてん）」',
    holdingHeadHigh: false,
    lineIncense: '線香は用いない',
    recitation: '拝礼（二礼・二拍手【しのび手】・一礼）',
    mannerDetail: '榊を右手根元・左手葉先で受け取り ➔ 時計回りに回して根元を祭壇に向ける ➔ 二礼し、音を立てずに手を打つ「忍び手（しのびて）」で二拍手 ➔ 一礼。',
    caution: '【超重要】神前式（結婚式）と違い、神葬祭の柏手は「音を鳴らさない（しのび手）」！パンパンと音を鳴らすと重大な無作法。'
  },
  {
    sectName: 'キリスト教式（カトリック / プロテスタント）',
    incenseTimes: '焼香ではなく「献花（けんか）」',
    holdingHeadHigh: false,
    lineIncense: '線香は用いない',
    recitation: '黙祷（もくとう）',
    mannerDetail: '生花（白菊・カーネーション等）を両手で受け取り ➔ 献花台の前で時計回りに茎を祭壇（遺影）側に向けて置く ➔ 一礼して黙祷。',
    caution: '十字を切るのはカトリックのみ。プロテスタントでは十字を切らず静かに祈りを捧げる。'
  }
];

// 3. 親族肩書（伯父 vs 叔父）＆ 弔事の不祝儀袋マナー
export interface FuneralRelativeKanjiRule {
  relation: string;
  kanji: string;
  definition: string;
  bushugiTip: string; // 不祝儀袋の続柄表記
  seatingTip: string; // 席次・焼香順序
  example: string;
}

export const FUNERAL_RELATIVE_RULES: FuneralRelativeKanjiRule[] = [
  {
    relation: '故人から見て兄（おじ）',
    kanji: '伯父',
    definition: '父母または故人より年上の兄にあたる親族。「伯」は長男・兄を表す尊称。',
    bushugiTip: '香典袋の中袋や芳名録に書く際、「叔父」と書くと兄に対して重大な非礼となります。',
    seatingTip: '告別式の親族席および焼香順序は、叔父（弟）よりも伯父（兄）を上位に配席します。',
    example: '故人の実兄 ＝「故人の 伯父」'
  },
  {
    relation: '故人から見て姉（おば）',
    kanji: '伯母',
    definition: '父母または故人より年上の姉にあたる親族。「伯」は長女・姉を表す尊称。',
    bushugiTip: '不祝儀袋の親族書等で「叔母」と書き間違えやすいため、ディレクターが校正確認。',
    seatingTip: '親族席の最前列・中央寄りに配置。ご夫婦参列の場合は伯父の隣に着席。',
    example: '故人の実姉 ＝「故人の 伯母」'
  },
  {
    relation: '故人から見て弟（おじ）',
    kanji: '叔父',
    definition: '父母または故人より年下の弟にあたる親族。「叔」は弟・末を表す。',
    bushugiTip: '故人より年下であれば、いくら高齢であっても必ず「叔父」と書きます。',
    seatingTip: '伯父より下位（外側または後列）に着席・焼香順序を設定します。',
    example: '故人の実弟 ＝「故人の 叔父」'
  },
  {
    relation: '故人から見て妹（おば）',
    kanji: '叔母',
    definition: '父母または故人より年下の妹にあたる親族。「叔」は妹・末を表す。',
    bushugiTip: '香典袋・親族名簿の確認で「故人より年下なら叔父・叔母」と即座に助言します。',
    seatingTip: '親族席で伯母の後ろまたは外側に配席。',
    example: '故人の実妹 ＝「故人の 叔母」'
  },
  {
    relation: 'いとこ（年上・年下）',
    kanji: '従兄 / 従姉 / 従弟 / 従妹',
    definition: '故人または喪主から見て年上か年下かで漢字を厳密に使い分ける。',
    bushugiTip: '年上男性は「従兄」、年下男性は「従弟」。年上女性は「従姉」、年下女性は「従妹」。',
    seatingTip: '親族焼香順序において、叔父・叔母の後にいとこ世代が順番に焼香します。',
    example: '喪主より年上のいとこ男性 ＝「従兄」'
  }
];

// 4. お布施・御車料・御膳料の相場 ＆ 渡し方マナー
export interface OfuseGuideline {
  itemTitle: string;
  amountStandard: string;
  envelopeTitle: string; // 表書き
  timing: string;
  whoHandsIt: string;
  mannerProtocol: string;
  caution: string;
}

export const OFUSE_GUIDELINES: OfuseGuideline[] = [
  {
    itemTitle: '読経料・戒名料（主たるお布施）',
    amountStandard: '通夜・告別式通して 15万〜50万円（院号・居士等の格式により変動）',
    envelopeTitle: '「御布施」または「お布施」（水引なし白無地封筒、または黄白/白黒水引）',
    timing: '通夜または告別式の開式前、僧侶控室へのご挨拶時（または式後のお礼時）',
    whoHandsIt: '喪主（施主）が直接手渡し',
    mannerProtocol: '小さなお盆（切手盆）に乗せるか、袱紗（ふくさ）の上に広げて、僧侶から見て正面になる向きに両手で差し出す。「本日は故人〇〇のために温かいご読経を賜り、心より感謝申し上げます」と深々と一礼。',
    caution: '【重大マナー】手渡しで直接畳や机の上に滑らせたり、手から手へ直に渡すのは非礼！必ず切手盆または袱紗に乗せて差し出す。'
  },
  {
    itemTitle: '御車料（交通費）',
    amountStandard: '5,000円 〜 10,000円（タクシー代相当）',
    envelopeTitle: '「御車料」（白無地封筒・濃墨）',
    timing: '僧侶がお寺から自走・タクシーで会場に来られた場合',
    whoHandsIt: '喪主または受付責任者',
    mannerProtocol: 'お布施の封筒の下に重ねて切手盆に乗せてお渡しする。※葬儀社や親族が車で送迎した場合は不要。',
    caution: '送迎車を出しているのに御車料を二重で渡す必要はありません。'
  },
  {
    itemTitle: '御膳料（食事代）',
    amountStandard: '5,000円 〜 10,000円（会席料理代相当）',
    envelopeTitle: '「御膳料」（白無地封筒・濃墨）',
    timing: '通夜振る舞いや精進落としの会食を僧侶が辞退された場合',
    whoHandsIt: '喪主',
    mannerProtocol: '僧侶が会食に着席せずお帰りになる際、「心ばかりのお膳料でございます」と添えてお渡しする。',
    caution: '僧侶が精進落としを召し上がって同席された場合は、御膳料はお渡ししません（食事そのものがもてなしのため）。'
  },
  {
    itemTitle: '心付け（葬祭スタッフ・運転手等）',
    amountStandard: '3,000円 〜 5,000円（※公営火葬場職員への心付けは公務員法で収賄禁止・完全不要！）',
    envelopeTitle: '「志」または「御礼」（ポチ袋）',
    timing: '出棺時または火葬場到着時',
    whoHandsIt: '喪主親族',
    mannerProtocol: '民間斎場や霊柩車・マイクロバス運転手に渡す習慣がある地域のみ。公営火葬場では一切禁止されています。',
    caution: '【法令違反注意】公営斎場の職員に現金を渡すと「公務員への贈賄罪」に該当し受け取り拒否されます。'
  }
];

// 5. 納棺の儀・副葬品OK/NG判定マスター
export interface BurialItemCheck {
  item: string;
  isAllowed: boolean;
  category: 'burnable' | 'metal_danger' | 'pollution' | 'bone_damage';
  reason: string;
  alternativeProposal: string;
}

export const BURIAL_ITEMS_DATA: BurialItemCheck[] = [
  {
    item: '故人が愛用していた衣類（木綿・絹のシャツ・スーツ）',
    isAllowed: true,
    category: 'burnable',
    reason: '天然繊維は完全に灰になり、火葬炉に悪影響を与えません。',
    alternativeProposal: '金属ファスナーや大きなボタンはハサミで切り取ってから納棺します。'
  },
  {
    item: 'ご家族からの手紙・寄せ書き・写真',
    isAllowed: true,
    category: 'burnable',
    reason: '紙類は綺麗に燃え尽き、故人への最高の供養となります。',
    alternativeProposal: 'アルバムごと入れると分厚く燃え残るため、写真数枚を抜粋して手紙と一緒に胸元へ。'
  },
  {
    item: '好物の食べ物（お菓子・果物・タバコ等）',
    isAllowed: true,
    category: 'burnable',
    reason: '少量のお菓子やタバコ（マッチ・ライター除く）は燃焼可能です。',
    alternativeProposal: 'メロンやスイカ等の巨大果物は水分で不完全燃焼になるため、小さくカットして少量添えます。'
  },
  {
    item: 'メガネ・老眼鏡',
    isAllowed: false,
    category: 'bone_damage',
    reason: '【厳禁】ガラスレンズが熱で割れて飛び散り、金属フレームが溶けて遺骨に黒く焼き付きます。',
    alternativeProposal: '火葬後に骨壺のそばに置くか、後飾り祭壇（自宅）の遺影の前に供えます。'
  },
  {
    item: '腕時計・貴金属指輪・アクセサリー',
    isAllowed: false,
    category: 'bone_damage',
    reason: '【厳禁】溶けたプラチナやゴールドが遺骨に付着して骨上げができなくなり、電池が爆発する危険性。',
    alternativeProposal: '形見分けとしてご遺族が大切に受け継ぐか、自宅祭壇に安置します。'
  },
  {
    item: 'ライター・マッチ・スプレー缶・ペースメーカー',
    isAllowed: false,
    category: 'metal_danger',
    reason: '【爆発危険】火葬炉内で爆発し、炉の耐火煉瓦を破壊し火葬場職員が負傷する大事故。',
    alternativeProposal: '※ペースメーカー装着者は、必ず事前に火葬場事務所に申告しなければなりません！'
  },
  {
    item: '分厚い本・聖書・辞書・革靴',
    isAllowed: false,
    category: 'pollution',
    reason: '紙の束は酸素が届かず炭化して黒煙・大量の灰となり、白く美しい遺骨を汚してしまいます。',
    alternativeProposal: 'お気に入りの数ページのみをコピーして手紙のように添えます。'
  },
  {
    item: 'ビニール・プラスチック人形・ゴルフクラブ',
    isAllowed: false,
    category: 'pollution',
    reason: 'ダイオキシン等の有害ガスを発生させ、溶けたカーボン・樹脂が炉底に張り付きます。',
    alternativeProposal: '木製や紙製の代替品を納めるか、写真にして納棺します。'
  }
];

// 6. 受付防犯・香典泥棒防止「金庫リレー」手順
export interface FuneralSecurityStep {
  step: number;
  phase: string;
  action: string;
  targetRisk: string;
}

export const FUNERAL_SECURITY_STEPS: FuneralSecurityStep[] = [
  {
    step: 1,
    phase: '受付設営時（開場1時間前）',
    action: '頑丈な鍵付き手提げ金庫を受付台の下（足元の外から見えない位置）に設置。鍵は喪主または会計責任者の親族が所持。',
    targetRisk: '受付台の上にむき出しで香典袋を置くと、挨拶に気を取られた瞬間に置き引きされる。'
  },
  {
    step: 2,
    phase: '受付中（香典受領時）',
    action: '香典を受領したら切手盆で受け取り、お名前を確認。返礼品引換券をお渡ししたら、即座に足元の金庫へ投入して蓋を閉める。',
    targetRisk: '机の上に香典袋が積み上がると、盗難や紛失、床への落下事故が多発する。'
  },
  {
    step: 3,
    phase: '【最重要】受付クローズ時（開式10分前）',
    action: '受付終了の合図と同時に金庫を施錠。受付係（友人等）の手で、親族控室にいる喪主・親族会計係へ直接持参して手渡し（金庫リレー完了）。',
    targetRisk: '受付係が解散した後に、無人になった受付台に金庫が放置され持ち去られる最悪の事件を100%防止。'
  },
  {
    step: 4,
    phase: '式中〜お開き後',
    action: '金庫は親族控室の金庫ロッカー、または喪主の手元から離さず管理。通夜後・告別式後に中身を開封し香典帳と金額を突き合わせ照合。',
    targetRisk: '香典帳の金額と現金の不一致トラブルを未然に防止。'
  }
];


// ============================================================================
// 7. 当日現場動線順 最終点検チェックリスト（会場巡回ウォークスルー）
// ============================================================================
export interface CeremonyCheckDetails {
  shinto: {
    oath: string;
    threeCups: string;
    sacredSake: string;
    sacredBranch: string;
    weddingRings: string;
  };
  chapel: {
    hymn: string;
    pastor: string;
    musicians: string;
    motherVeil: string;
    weddingRings: string;
  };
  civil: {
    moderator: string;
    weddingRings: string;
    oath: string;
  };
}

export interface VenueWalkthroughCheckItem {
  stepNumber: number;
  id: string;
  zoneCode: 'ENTRANCE' | 'FAMILY_ROOM' | 'GUEST_ROOM' | 'BANQUET_HALL' | 'CEREMONY' | 'PHOTO_STUDIO' | 'STAFF_BRIEFING' | 'GIFTS_HIKIDEMONO' | 'RECEPTION_DESK' | 'STAY_ROOM';
  zoneName: string;
  checkpointName: string;
  timing: string;
  responsibleStaff: string;
  targetCheckItems: {
    label: string;
    description: string;
    criticalPoint: string;
  }[];
  ceremonySpecific?: CeremonyCheckDetails;
  dangerRisk: string;
  failSafeRule: string;
}

export const VENUE_WALKTHROUGH_CHECKLIST_DATA: VenueWalkthroughCheckItem[] = [
  {
    stepNumber: 1,
    id: 'step-1-entrance',
    zoneCode: 'ENTRANCE',
    zoneName: '① 入口・エントランス',
    checkpointName: '両家案内看板 ＆ 外看板誤字脱字チェック',
    timing: '開式2.5時間前（搬入完了直後・来館第1号前）',
    responsibleStaff: '総合葬祭ディレクター / 斎場インフォメーション責任者',
    targetCheckItems: [
      {
        label: '案内看板の文字・故人家名照合',
        description: '「故 〇〇家 御葬儀式場」の漢字・旧字体（髙・﨑・澁・齋など）の誤字脱字を原本と完全照合。',
        criticalPoint: '斎場側が作成した案内板の苗字変換ミスは葬儀全体の信用失墜に直結。'
      },
      {
        label: '式場・ホール・時間表示の正確性',
        description: '「〇階 〇〇ホール」「通夜 〇時開式 / 告別式 〇時開式」のプレートが進行表と合致しているか確認。',
        criticalPoint: '同斎場内で別葬家と時間が近い場合、別室への迷い込みを誘発。'
      },
      {
        label: '生花・花環・芳名板の掲示状態',
        description: '入口両脇の供花スタンド・花環の転倒防止、名札の脱落チェック。',
        criticalPoint: '強風等で花環が倒れる事故を防止。'
      }
    ],
    dangerRisk: '故人名の漢字誤字や会場ホール間違いがあると、弔問に来られた方が別室へ迷い込み遺族に大恥をかかせます。',
    failSafeRule: '名簿原本の文字を指差し「よし！」と声出し確認。'
  },
  {
    stepNumber: 2,
    id: 'step-2-family-room',
    zoneCode: 'FAMILY_ROOM',
    zoneName: '② 親族控室',
    checkpointName: '親族控室 お茶出し・着席順序チェック',
    timing: '開式2時間前（親族到着30分前）',
    responsibleStaff: '親族控室専任アテンド / ディレクター',
    targetCheckItems: [
      {
        label: '親族控室サイン ＆ 室名札確認',
        description: 'ご遺族・親族が迷わず入れるよう扉前に室名札が正しく掲示されているか。',
        criticalPoint: '一般参列者が誤って親族控室に入らないよう動線を区別。'
      },
      {
        label: 'お茶（桜湯・昆布茶）＆おしぼり配備',
        description: '温かいお茶とおしぼり、湯呑み茶碗の十分なストック確保。',
        criticalPoint: '出涸らしの茶ではなく、おもてなしの心で淹れたてを提供。'
      },
      {
        label: '喪主・親族の着付け・喪服点検',
        description: '着付け・ヘアセットの進行状況、数珠の所持、ネクタイ・靴下の確認。',
        criticalPoint: '開式直前に着付けが間に合わない事故を防止。'
      }
    ],
    dangerRisk: '親族控室の準備不足は遺族の不安と不満を生み、厳粛な式典の信頼を損ないます。',
    failSafeRule: '親族来館予定時刻の30分前にはエアコンとお茶の湯沸かしを完了。'
  },
  {
    stepNumber: 3,
    id: 'step-3-guest-room',
    zoneCode: 'GUEST_ROOM',
    zoneName: '③ 寺院（宗教者）控室',
    checkpointName: '宗教者控室 導師お迎え・お茶出し・お布施確認',
    timing: '開式1.5時間前（導師到着前）',
    responsibleStaff: '寺院専任アテンド / 葬祭ディレクター',
    targetCheckItems: [
      {
        label: '導師控室の清掃 ＆ お着替え衣紋掛け',
        description: 'ご住職が袈裟・法衣に着替えるための衣紋掛け、姿見、座布団の配置。',
        criticalPoint: '静かで清潔な個室空間の確保。'
      },
      {
        label: '桜湯・昆布茶 ＆ 高級茶菓の用意',
        description: '到着直後に温かいお茶とおしぼり、銘菓をお出しする。',
        criticalPoint: '煎茶ではなく桜湯・昆布茶をお出しするのが弔事の礼儀。'
      },
      {
        label: 'お布施（切手盆・袱紗）の事前確認',
        description: '喪主がお渡しするお布施・御車料・御膳料の封筒が揃っているか確認。',
        criticalPoint: '手渡しではなく必ず切手盆に乗せて差し出す作法を喪主と確認。'
      }
    ],
    dangerRisk: 'お寺様への失礼な対応や控室の不備は、戒名や今後の法要に関わる重大な軋轢を招きます。',
    failSafeRule: '住職到着時はディレクター自ら車寄せまでお出迎え。'
  },
  {
    stepNumber: 4,
    id: 'step-4-banquet-hall',
    zoneCode: 'BANQUET_HALL',
    zoneName: '④ 葬儀式場・祭壇',
    checkpointName: '生花祭壇・遺影・位牌・焼香台点検',
    timing: '開式2時間前〜開場45分前',
    responsibleStaff: '式場キャプテン / 葬祭ディレクター',
    targetCheckItems: [
      {
        label: '祭壇中央：遺影写真・白木位牌の配置',
        description: '遺影写真の水平・ピント、照明の反射防止、白木仮位牌の文字照合。',
        criticalPoint: '写真が傾いていたり戒名に誤字がないか原本照合。'
      },
      {
        label: '前机：導師用木魚・リン・経本セッティング',
        description: '木魚（右）、リン（左）、経本台、一本蝋燭、線香立ての配置。',
        criticalPoint: '住職の手の届く位置に整然と配置。'
      },
      {
        label: '焼香台：香炭着火 ＆ 抹香補充',
        description: '香炭（火種）を開式20分前に点火。抹香が十分に補充されているか。',
        criticalPoint: '炭に火がついておらず煙が出ない事故を100%防止。'
      },
      {
        label: '供花スタンド名札の親族・会社序列確認',
        description: '祭壇に近い内側・上段が親族、外側・下段が会社関係。',
        criticalPoint: '本家と分家の順序間違いによる親族間トラブルの防止。'
      }
    ],
    dangerRisk: '香炭の火がついていない、遺影が曲がっている、供花の名札順が間違っているなどの事故は式の品格を崩壊させます。',
    failSafeRule: '開式20分前に実際に抹香をひとつまみ落として煙と香りの立ち上がりを確認。'
  },
  {
    stepNumber: 5,
    id: 'step-5-ceremony',
    zoneCode: 'CEREMONY',
    zoneName: '⑤ 挙式場・宗教儀礼エリア',
    checkpointName: '宗派別 儀礼品・重要人物配置チェック',
    timing: '開式1時間前',
    responsibleStaff: '儀礼チーフ / 葬祭ディレクター',
    targetCheckItems: [
      {
        label: '【仏式】数珠・焼香台・導師席・親族席序列',
        description: '親族席（向かって右）、来賓席（向かって左）、喪主最前列内側。',
        criticalPoint: '親族と来賓の左右逆転配席を防止。'
      },
      {
        label: '【神葬祭】八足案・神饌・玉串・忍び手柏手案内',
        description: '白木祭壇、海川山野の神饌、玉串案、忍び手（音なし）の司会案内。',
        criticalPoint: '参列者がパンパン音を立てて拍手しないようアナウンス徹底。'
      },
      {
        label: '【キリスト教・無宗教】献花台・生花バスケット・メモリアル台',
        description: '献花用白百合・カーネーション、茎を祭壇に向け置く案内。',
        criticalPoint: '献花の動線（中央入場➔左右退場）の一方通行確認。'
      }
    ],
    ceremonySpecific: {
      shinto: {
        oath: '祭詞奏上台（白木案上に祭詞用巻物スタンバイ）',
        threeCups: '修祓用大麻（おおぬさ）と塩湯・散米',
        sacredSake: '御神酒（瓶子一対・お神酒注ぎ用具）',
        sacredBranch: '玉串用榊（新鮮な真榊・紙垂付）',
        weddingRings: '霊璽（白木御霊代・覆い被せ確認）'
      },
      chapel: {
        hymn: '賛美歌カード・式次第・聖書朗読箇所',
        pastor: '牧師/神父控室・説教台マイク調整',
        musicians: 'オルガニスト・音響PA音合わせ',
        motherVeil: '追悼キャンドル・点火ライター',
        weddingRings: '献花用生花バスケット（人数分＋予備20%）'
      },
      civil: {
        moderator: '無宗教お別れの会 司会シナリオ・BGMキューシート',
        weddingRings: '献花台・メモリアルメッセージカード',
        oath: '追悼ムービー上映プロジェクター・スクリーン確認'
      }
    },
    dangerRisk: '宗派の作法間違い（浄土真宗でおしいただかせる、神葬祭で音を鳴らして拍手させる等）は取り返しのつかない無作法となります。',
    failSafeRule: '宗派ごとの焼香回数・作法を司会者が焼香直前に端的にアナウンスする。'
  },
  {
    stepNumber: 6,
    id: 'step-6-photo-studio',
    zoneCode: 'PHOTO_STUDIO',
    zoneName: '⑥ 写真室・スタジオ',
    checkpointName: '親族集合写真 座り順ひな壇チェック',
    timing: '告別式前（または式後・出棺前）',
    responsibleStaff: 'チーフカメラマン / プロデューサー',
    targetCheckItems: [
      {
        label: '親族集合写真の整列ひな壇・座席表',
        description: '前列（喪主・配偶者・高齢親族）、中列・後列（兄弟・従兄弟）の着席順表。',
        criticalPoint: '整列に15分以上かかると出棺・火葬時刻に遅刻する。'
      },
      {
        label: 'ストロボ・スレーブ同調・撮影テスト',
        description: '大型ストロボ発光、予備カメラ・バッテリー残量確認。',
        criticalPoint: '親族40名が並んだ状態でストロボ不発事故をゼロにする。'
      }
    ],
    dangerRisk: '写真整列がもたつくと出棺時間が押し、火葬場の炉予約時刻に遅れる重大事故に直結します。',
    failSafeRule: '写真室入口に座席順表を貼り、名前を呼びながら即座に着席案内。'
  },
  {
    stepNumber: 7,
    id: 'step-7-staff-briefing',
    zoneCode: 'STAFF_BRIEFING',
    zoneName: '⑦ スタッフ直前打ち合わせ',
    checkpointName: 'キャプテン・司会者・配膳チーフ最終ミーティング',
    timing: '開場30分前（全スタッフ時計同期）',
    responsibleStaff: '総合葬祭ディレクター（主宰）',
    targetCheckItems: [
      {
        label: '司会者打ち合わせ（故人氏名・弔電拝読順）',
        description: '故人名・喪主名・弔電の会社名と役職名の読み方・フリガナ確認。',
        criticalPoint: '弔電の読み落としや名前誤読の撲滅。'
      },
      {
        label: '式場キャプテン・配膳チーフ連携',
        description: '通夜振る舞い・精進落としの料理出しタイミング、陰膳の配膳。',
        criticalPoint: '献杯の合図とドリンク提供の同期。'
      }
    ],
    dangerRisk: 'スタッフ間の連携ミスで、弔電が読まれない、料理が冷えるなどの失態が発生します。',
    failSafeRule: '時計の秒針を合わせ、進行表のカット可能バッファを共有しておく。'
  },
  {
    stepNumber: 8,
    id: 'step-8-gifts',
    zoneCode: 'GIFTS_HIKIDEMONO',
    zoneName: '⑧ 返礼品・香典返し点検',
    checkpointName: '会葬御礼品 ＆ 香典返し当日返し数量・返品枠チェック',
    timing: '開場1時間前',
    responsibleStaff: '返礼品担当スタッフ / ディレクター',
    targetCheckItems: [
      {
        label: '会葬御礼品（会葬礼状・お茶・海苔）の個数確認',
        description: '予想会葬数＋予備20〜30個のストック確認。',
        criticalPoint: '返礼品が途中で切れて会葬者に渡せない事故を防止。'
      },
      {
        label: '香典返し当日返し（高額用カタログギフト）の配備',
        description: '1万円以上の香典をいただいた方向けの当日返しセット。',
        criticalPoint: '受付係との引換券連携の確認。'
      }
    ],
    dangerRisk: '返礼品の品切れは会葬者に対する最大の不義理となります。',
    failSafeRule: '未開封分全数返品可能枠で余裕を持って納品させる。'
  },
  {
    stepNumber: 9,
    id: 'step-9-reception-desk',
    zoneCode: 'RECEPTION_DESK',
    zoneName: '⑨ 受付・防犯管理',
    checkpointName: '受付台 鍵付き金庫・香典リレー確認',
    timing: '受付開始30分前（受付友人集合時）',
    responsibleStaff: '受付担当キャプテン / ディレクター',
    targetCheckItems: [
      {
        label: '鍵付き手提げ金庫の配備 ＆ 鍵の親族保管',
        description: '受付足元に金庫をセット。香典袋は受領後即座に金庫へ投入。',
        criticalPoint: '机の上に香典を積み上げない。'
      },
      {
        label: '受付終了直後の「金庫リレー（親族への即時引き渡し）」',
        description: '受付クローズと同時に金庫を施錠し、親族控室の親族へ手渡し。',
        criticalPoint: '開式後に無人になった受付台に金庫を放置しない。'
      }
    ],
    dangerRisk: '香典泥棒による数百万円の盗難被害は一生消えない傷となります。',
    failSafeRule: '金庫リレーの手順を受付スタッフ全員に口頭復唱させる。'
  },
  {
    stepNumber: 10,
    id: 'step-10-stay-room',
    zoneCode: 'STAY_ROOM',
    zoneName: '⑩ 出棺・火葬場・宿泊控室確認',
    checkpointName: '霊柩車配車・火葬許可証原本・宿泊室キー確認',
    timing: '出棺45分前〜お見送り前',
    responsibleStaff: 'ディレクター / 斎場支配人',
    targetCheckItems: [
      {
        label: '【最重要】死体火葬許可証（原本）の所持指差し確認',
        description: '喪主のカバンの中に火葬許可証原本が入っているかディレクターが肉眼で確認。',
        criticalPoint: '原本を忘れると火葬が100%拒否される。'
      },
      {
        label: '霊柩車・親族マイクロバスの車寄せ配車',
        description: '出棺時刻の30分前に配車完了、棺積み込み経路の確保。',
        criticalPoint: '火葬炉の予約時刻に1分も遅れないタイムキープ。'
      },
      {
        label: '遺族宿泊室（夜伽・宿泊）の清掃・アメニティ確認',
        description: '通夜後の宿泊部屋の布団・エアコン・給湯器の動作確認。',
        criticalPoint: '悲しみと疲労のご遺族が安らかに夜を過ごせる環境。'
      }
    ],
    dangerRisk: '火葬許可証の持参忘れ、霊柩車の配車遅延は葬儀が崩壊する致命的事故です。',
    failSafeRule: '出棺直前に「火葬許可証、よし！」と喪主と共に指差し確認。'
  }
];
