/**
 * 葬儀4大式場・祭壇 ＆ 会食配置図面データ
 * 1. 仏式（生花祭壇・本尊・位牌・焼香台・導師席・親族席配置）
 * 2. 神葬祭（神道祭壇・三種の神器・神饌・玉串奉奠所・神官席配置）
 * 3. キリスト教式 / 無宗教お別れの会（メモリアル祭壇・献花台・追悼写真コーナー）
 * 4. 通夜振る舞い ＆ 精進落とし会食室（会席膳・故人陰膳・献杯上座配置）
 */

export type SettingStyleId = 'buddhist' | 'shinto' | 'secular' | 'catering_hall';

export interface TableItemHotspot {
  id: string;
  name: string;
  reading?: string;
  enName?: string;
  category: 'altar' | 'incense' | 'seats' | 'offering' | 'reception_door' | 'plate';
  positionLabel: string;
  dimensionRule: string; // 寸法ルール・配置規準
  purpose: string; // 用途・対象
  examTip: string; // 葬祭ディレクター検定対策の急所
  serviceManner: string; // ディレクター・スタッフの現場マナー
  ngAction: string; // やってはいけないNG作法・配置ミス
  svgCoords: {
    cx?: number;
    cy?: number;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    rotation?: number;
  };
}

export interface TableSettingData {
  id: SettingStyleId;
  title: string;
  subtitle: string;
  banquetConcept: string;
  tableType: string;
  standardCoverSpace: string;
  dimensionKeyRule: string;
  leadExplanation: string;
  serviceSequence: string[];
  examImportantCheckpoints: string[];
  items: TableItemHotspot[];
  buffetStations?: {
    step: number;
    zoneName: string;
    equipment: string;
    flowOrder: string;
    hygienePoint: string;
  }[];
}

export const TABLE_SETTING_DATA: Record<SettingStyleId, TableSettingData> = {
  buddhist: {
    id: 'buddhist',
    title: '仏式葬儀 祭壇・導師席・焼香所 配置図面',
    subtitle: '仏式生花祭壇・位牌・遺影・前机・焼香台・親族席の厳格な配置プロトコル',
    banquetConcept: '日本の葬儀の約9割を占める伝統的な仏式葬儀告別式。本尊・仮位牌を中心とし、導師席（僧侶）、焼香所、喪主・親族席（向かって右）、来賓・世話役席（向かって左）の秩序ある配置を完全網羅。',
    tableType: '式場中央祭壇（間口3.6m〜5.4m・2〜3間幅） ＆ 焼香机・親族会葬者席',
    standardCoverSpace: '導師席・焼香台間：約1.8m〜2.0m ／ 席間通路幅：1.2m以上確保',
    dimensionKeyRule: '祭壇中央最上段にご本尊・遺影・仮位牌を直線配置。焼香台は祭壇正面中央（導師席の手前または左右）。',
    leadExplanation: '仏式葬儀では、正面中央に生花祭壇または白木祭壇を据え、祭壇中央に遺影写真と仮位牌（白木位牌）を安置します。祭壇に向かって【右側が喪主・親族席】、向かって【左側が来賓・世話役・一般会葬者席】となり、導師席は祭壇の正面やや左寄りに前机と共に配置します。',
    serviceSequence: [
      '1. 導師入場（参列者一同起立または合掌で迎える）',
      '2. 開式の辞（司会者アナウンス）',
      '3. 読経（経文の奉読・引導渡し）',
      '4. 弔辞拝読 ＆ 弔電奉読',
      '5. 導師焼香 ➔ 喪主焼香 ➔ 遺族・親族焼香',
      '6. 一般会葬者焼香（焼香案内スタッフのアテンド）',
      '7. 導師退場（一同合掌・礼拝）',
      '8. 閉式の辞 ➔ 最後のお別れの儀（棺への別れ花入れ）'
    ],
    examImportantCheckpoints: [
      '【親族席の配置（左右原則）】祭壇に向かって【右側＝親族席（喪主先頭）】、【左側＝来賓・世話役席】。逆にするのは重大な配席ミス。',
      '【位牌と遺影の配置】祭壇中央の最も高い位置に遺影写真、その直前に白木仮位牌を祀る（本尊を祀る宗派では本尊が最上段中央）。',
      '【焼香台の高さと炭】立ったまま焼香する「立礼焼香」では机の高さ約70cm、座って焼香する「座礼焼香」では机の高さ約30cm。香炉の抹香と香炭の火種を開式20分前に点火。',
      '【導師机（前机）】木魚、リン（鐘）、経本、香炉、一本蝋燭、花立を導師の手元に過不足なくセッティング。',
      '【動線のワンウェイ】会葬者の焼香動線は「中央通路から焼香台へ進み、焼香後は外側通路を通って自席または出口へ抜ける」一方通行が鉄則。'
    ],
    items: [
      {
        id: 'bd-altar',
        name: '生花祭壇（または白木祭壇）',
        reading: 'せいかさいだん',
        enName: 'Floral Funeral Altar (Main Altar)',
        category: 'altar',
        positionLabel: '式場正面中央',
        dimensionRule: '間口2間〜3間（約3.6m〜5.4m）、高さ約2.4m〜2.7m。中央を高く左右対称に設営。',
        purpose: '故人の霊を祀り、成仏を祈る式場最大の象徴。生前好んだ色や波・山・雲のラインを描く。',
        examTip: '白木祭壇は釘を使わず組み立てる伝統宮型。近年は温かみのある生花祭壇が主流。',
        serviceManner: '萎れや水漏れがないか開式前に全生花を点検。棺を中央に安置できるスペースを確保。',
        ngAction: '水が滴り落ちたり、文字や家紋が傾いてセッティングされること。',
        svgCoords: { cx: 400, cy: 120, width: 320, height: 90 }
      },
      {
        id: 'bd-portrait',
        name: '遺影写真 ＆ 額縁リボン（電照額）',
        reading: 'いえいしゃしん',
        enName: 'Portrait of the Deceased (Framed Photo)',
        category: 'altar',
        positionLabel: '祭壇中央最上段',
        dimensionRule: '祭壇の中央中心線上、目線より高い位置（地上高約1.8m〜2.0m）。四つ切サイズ（またはLED電照パネル）。',
        purpose: '会葬者全員が故人の面影を偲び、合掌礼拝するための中心対象。黒白または紫の弔用リボンをかける。',
        examTip: 'ピントの鮮明さ、視線が会葬者に向いているかが重要。額の角度をやや前傾（約5度）させると光の反射を防げる。',
        serviceManner: '額縁用ガラスに指紋やホコリがないか専用クロスで拭き清める。',
        ngAction: '照明スポットが反射して故人の顔が白飛びして見えなくなる照明セッティング。',
        svgCoords: { cx: 400, cy: 95, width: 45, height: 55 }
      },
      {
        id: 'bd-ihai',
        name: '白木仮位牌（戒名・法名板）',
        reading: 'しらきかりいはい',
        enName: 'White Wood Temporary Mortuary Tablet (Ihai)',
        category: 'altar',
        positionLabel: '遺影写真の直前中央',
        dimensionRule: '遺影写真の直前中央。高さ約30cm〜45cm。',
        purpose: '住職より授かった戒名（法名・法号）と俗名・享年が墨書きされた四十九日までの仮位牌。出棺時に喪主が持つ。',
        examTip: '四十九日の法要（忌明け）まではこの白木位牌を用い、法要後に本位牌（黒漆塗位牌）へと魂入れ替えを行う。',
        serviceManner: '戒名の文字（院号・居士・信士等）に誤字脱字がないか住職と事前原本照合。',
        ngAction: '位牌が傾いたり、転倒するような不安定な置き方をすること。',
        svgCoords: { cx: 400, cy: 140, width: 22, height: 35 }
      },
      {
        id: 'bd-coffin',
        name: 'ご遺体安置・棺（コフィン）',
        reading: 'ひつぎ（かん）',
        enName: 'Casket / Coffin with Floral Cover',
        category: 'altar',
        positionLabel: '祭壇前中央壇上',
        dimensionRule: '祭壇の中央手前。長さ6尺（180cm）〜6.25尺。頭を北（または西）に向けて安置。',
        purpose: '故人が眠る棺。桐棺や高級布張棺。上に棺上花束や白い布を掛ける。',
        examTip: '最後のお別れの儀では、この棺を親族の手の届く高さ（中央）に引き出し、蓋を開けて別れ花を敷き詰める。',
        serviceManner: 'ドライアイスの効き目を点検し、結露が棺の外に漏れないよう配慮。',
        ngAction: '棺の頭足を逆にして安置すること（頭が祭壇向かって右または北が基本）。',
        svgCoords: { cx: 400, cy: 180, width: 140, height: 40 }
      },
      {
        id: 'bd-doushi-seat',
        name: '導師席（ご住職・僧侶席 ＆ 前机）',
        reading: 'どうしせき ＆ まえづくえ',
        enName: 'Head Priest Seat (Doushi Chair & Table)',
        category: 'seats',
        positionLabel: '祭壇正面やや左寄り',
        dimensionRule: '祭壇前の中央やや左。導師用肘掛け椅子、前机（幅90cm×高65cm）。木魚・リン・香炉をセット。',
        purpose: '読経・授戒・引導を司る導師が着席する最上座。伴僧がいる場合は左右後方に伴僧席を配置。',
        examTip: '前机の上には「木魚（右側）」「リン（左側）」「柄香炉または置香炉」「線香・一本蝋燭」をセット。',
        serviceManner: '導師が入室する際、アテンドが椅子を引き、座布団の位置を整えて一礼。',
        ngAction: '木魚のバチや経本を机から落とすような狭いセッティング。',
        svgCoords: { cx: 330, cy: 260, width: 50, height: 40 }
      },
      {
        id: 'bd-incense-stand',
        name: '焼香台（焼香机 ＆ 香炉・抹香・香炭）',
        reading: 'しょうこうだい',
        enName: 'Incense Stand (Shoko Table, Charcoal, Incense Powder)',
        category: 'incense',
        positionLabel: '祭壇正面中央・参列者通路前',
        dimensionRule: '机の高さ約70cm（立礼焼香用）。机の上に金箔・陶器の香炉、抹香入れ、お盆、敷紙。',
        purpose: '喪主、親族、一般会葬者が故人に煙を手向け、心身を清めて冥福を祈るための台。',
        examTip: '【超重要】香炭（火種）は開式の20〜30分前に着火し、白く灰を被るまで十分に熱しておく。火力が弱いと煙が立たない。',
        serviceManner: '焼香スタッフが脇に控え、抹香がこぼれたら小箒ですぐに掃き清める。',
        ngAction: '炭に火がついておらず、抹香を落としても煙も香りも出ない冷え切った香炉の放置。',
        svgCoords: { cx: 400, cy: 290, width: 70, height: 35 }
      },
      {
        id: 'bd-relatives-seat',
        name: '喪主席 ＆ 遺族・親族席（向かって右側列）',
        reading: 'もしゅせき ＆ しんぞくせき',
        enName: 'Chief Mourner & Bereaved Family Seats (Right Side)',
        category: 'seats',
        positionLabel: '祭壇に向かって【右側エリア】',
        dimensionRule: '最前列の最内側（通路側）が喪主席。続いて配偶者、長男、長女、兄弟、親族の順に配席。',
        purpose: '故人と血縁の深い遺族・親族が着席するエリア。',
        examTip: '【鉄則】「右が親族、左が来賓」。焼香も喪主から順に親族席の前列から行われる。',
        serviceManner: '足の不自由な高齢親族には最前列通路側の椅子を案内し、立ち座りをサポート。',
        ngAction: '喪主を親族席の末席や後ろの列に座らせてしまう重大な配席ミス。',
        svgCoords: { cx: 560, cy: 340, width: 140, height: 90 }
      },
      {
        id: 'bd-guests-seat',
        name: '来賓席 ＆ 世話役・一般会葬者席（向かって左側列）',
        reading: 'らいひんせき ＆ いっぱんかいそうしゃせき',
        enName: 'VIP Guests & General Attendees Seats (Left Side)',
        category: 'seats',
        positionLabel: '祭壇に向かって【左側エリア】',
        dimensionRule: '最前列通路側が主賓（会社社長・恩師・友人代表・葬儀委員長）。後方に一般会葬者。',
        purpose: '会社関係者、友人、知人、町内会関係者が着席するエリア。',
        examTip: '弔辞（お別れの言葉）を述べる来賓は、すぐにマイクへ進みやすい最前列通路側に配置する。',
        serviceManner: '会葬者が多い場合は立ち見案内または焼香誘導スタッフがスムーズに誘導。',
        ngAction: '親族と一般来賓を同じ列に混在させて座らせ、焼香順序を混乱させること。',
        svgCoords: { cx: 240, cy: 340, width: 140, height: 90 }
      },
      {
        id: 'bd-floral-tributes',
        name: '供花・供物スタンド配列（親族順・会社順）',
        reading: 'きょうか・くもつスタンド',
        enName: 'Floral Tributes & Offerings (Ranked Stand Line)',
        category: 'offering',
        positionLabel: '祭壇の左右両サイド・壁面沿い',
        dimensionRule: '祭壇に近い上段内側が喪主・兄弟親族、外側・下段が会社・友人。名札文字は縦書き。',
        purpose: '親族や関係先から贈られた生花スタンドや盛籠。故人への弔意を表す。',
        examTip: '【最頻出トラブル】供花名札の誤字（会社名や氏名）と並び順の序列ミス。本家を外側に置くと大クレーム。',
        serviceManner: '開式前に名札の漢字（髙、﨑等）と序列一覧表を喪主・親族代表と指差し確認。',
        ngAction: '届いた順に適当に並べて親族の序列をバラバラにすること。',
        svgCoords: { cx: 100, cy: 160, width: 70, height: 110 }
      },
      {
        id: 'bd-reception-gate',
        name: '式場出入口 ＆ 焼香動線（ワンウェイ・一方通行）',
        reading: 'しきじょうでいりぐち',
        enName: 'Entrance Door & One-Way Incense Flow',
        category: 'reception_door',
        positionLabel: '式場後方中央または左右',
        dimensionRule: '扉幅1.8m以上。中央から入り、焼香後は左右の外側通路へ抜ける一方通行ライン。',
        purpose: '会葬者がスムーズに入退場し、焼香時の渋滞や逆流を防ぐ動線。',
        examTip: '中央で向かい合ってすれ違うと喪服同士がぶつかり数珠が切れる事故が起きるためワンウェイを徹底。',
        serviceManner: 'ドアマンが厳粛に開閉。開式中は静かに閉扉し、焼香時に半開して誘導。',
        ngAction: '焼香した人が同じ中央通路を逆走して戻り、これから焼香する人と正面衝突すること。',
        svgCoords: { cx: 400, cy: 470, width: 160, height: 25 }
      }
    ]
  },

  shinto: {
    id: 'shinto',
    title: '神葬祭（神道葬儀）祭壇・神官席・玉串所 配置図面',
    subtitle: '神道祭壇・三種の神器・神饌（海川山野の幸）・玉串奉奠・しのび手作法',
    banquetConcept: '故人を神様（家の守護神・氏神）としてお祀りする神道の伝統葬儀。仏教と全く異なる祭壇構成、海川山野の神饌盛り付け、玉串奉奠所、音を立てない「しのび手」作法を完全網羅。',
    tableType: '白木神道祭壇（三段〜五段白木八足案） ＆ 玉串案（たまぐしあん）',
    standardCoverSpace: '神官（斎主）席と祭壇間：約2.0m ／ 玉串案スペース：幅120cm',
    dimensionKeyRule: '祭壇中央に鏡・剣・勾玉（三種の神器）、米・酒・塩・水、魚・鳥・野菜・果物の神饌を供進。玉串案を正面に配置。',
    leadExplanation: '神葬祭（しんそうさい）では仏具（線香、ロウソク、数珠、抹香）は一切用いず、榊（さかき）と白木、三種の神器を用います。拝礼は「二礼・二拍手【音を鳴らさない忍び手】・一礼」です。手水（ちょうず）の儀を経て式場へ入場します。',
    serviceSequence: [
      '1. 手水（ちょうず）の儀（式場入口で手と口を清める）',
      '2. 斎主（神官）・祭員 入場',
      '3. 修祓（しゅばつ・お祓いの儀）➔ 一同頭を下げて祓いを受ける',
      '4. 降神の儀（こうしんのぎ・神霊を招く・一同平伏）',
      '5. 献饌（けんせん・神饌を供える）',
      '6. 祭詞奏上（さいしそうじょう・故人の功績を称え守護神となるよう祈る）',
      '7. 弔辞・弔電奉読',
      '8. 玉串奉奠（たまぐしほうてん・斎主 ➔ 喪主 ➔ 遺族 ➔ 会葬者／二礼二拍手しのび手一礼）',
      '9. 撤饌（てっせん）➔ 昇神の儀（しょうしんのぎ）➔ 斎主退場'
    ],
    examImportantCheckpoints: [
      '【拍手の絶対ルール（しのび手）】神葬祭の二拍手は「音を立てずに寸前で止める【忍び手（しのびて）】」。柏手をパンパンと鳴らすのは神社参拝（祝祭）の作法であり、弔事の神葬祭では重大なタブー！',
      '【数珠の禁止】神葬祭には「数珠（じゅず）」は一切持参しない（仏具のため）。',
      '【神饌の並び順】米（中央最上位）、酒、魚（タイ等の丸魚）、鳥、野菜、果物、塩・水の順に八足案へ供進。',
      '【手水の儀】式場入場前に、柄杓で左手、右手、口をすすぎ、懐紙で口元を拭く潔斎を行う。',
      '【御霊前と表書き】神葬祭の不祝儀袋は「御霊前」「御神前」「御玉串料」（白黒または双銀水引）。蓮の花の絵柄入り袋は仏教専用のため絶対NG。'
    ],
    items: [
      {
        id: 'st-altar',
        name: '白木神道祭壇（八足案・案段）',
        reading: 'しらきしんとうさいだん（はっそくあん）',
        enName: 'Shinto Shira-ki Altar (Hassoku-an Stages)',
        category: 'altar',
        positionLabel: '式場正面中央',
        dimensionRule: '白木（檜・白松）の八本足の台（八足案）。三段または五段。紙垂（しで）を巡らせた注連縄を張る。',
        purpose: '神霊となった故人を祀る清浄無垢な祭壇。',
        examTip: '仏式のきらびやかな金箔や黒漆とは対照的に、無塗装の清らかな白木のみで構成される。',
        serviceManner: '注連縄（しめなわ）の紙垂の向き、榊の葉の瑞々しさを確認。',
        ngAction: '仏具（お鈴、線香立て、数珠掛け）を祭壇に置くこと。',
        svgCoords: { cx: 400, cy: 110, width: 280, height: 80 }
      },
      {
        id: 'st-sacred-treasures',
        name: '三種の神器（鏡・剣・勾玉） ＆ 遺影',
        reading: 'さんしゅのじんぎ',
        enName: 'Three Sacred Treasures (Mirror, Sword, Jewel)',
        category: 'altar',
        positionLabel: '祭壇中央最上段',
        dimensionRule: '最上段中央に八咫鏡（神鏡）、左右に天叢雲剣（木剣）、八坂瓊勾玉を配置。',
        purpose: '神道の最高神聖の象徴。鏡に故人の御霊（みたま）が宿るとされる。',
        examTip: '仏式の位牌に相当するものが「霊璽（れいじ・御霊代）」。白木で作られ、普段は覆い（蓋）が被せられている。',
        serviceManner: '霊璽を素手で直に触れず、白手袋または袱紗を用いて恭しく扱う。',
        ngAction: '霊璽の覆いを勝手に開けて中を覗き見ること。',
        svgCoords: { cx: 400, cy: 90, width: 50, height: 50 }
      },
      {
        id: 'st-shinsen',
        name: '神饌（しんせん・海川山野の供物）',
        reading: 'しんせん（お供え物）',
        enName: 'Shinto Food Offerings (Rice, Sake, Fish, Fruits, Salt, Water)',
        category: 'offering',
        positionLabel: '祭壇の中段・三方の上',
        dimensionRule: '白木三方（さんぽう）に美しく盛る。中央奥に洗米、左右に御神酒（瓶子・へいし）、手前に魚・野菜・果物。',
        purpose: '神様に捧げる自然の恵み（米、酒、鮮魚、乾物、季節の野菜、果物、塩、水）。',
        examTip: '仏教の精進料理と異なり、神道では「鯛（丸魚）」や「鴨・鳥」などの生魚・肉類も神饌として正式にお供えされる。',
        serviceManner: '魚の頭を神前に向け、三方の折敷の継ぎ目が手前にならない向きを確認。',
        ngAction: '傷んだ野菜や変色した刺身をお供えすること。',
        svgCoords: { cx: 400, cy: 145, width: 200, height: 35 }
      },
      {
        id: 'st-tamagushi-an',
        name: '玉串案（たまぐしあん・玉串奉奠台）',
        reading: 'たまぐしあん',
        enName: 'Tamagushi Table (Sacred Cleyera Branch Offering Table)',
        category: 'incense',
        positionLabel: '祭壇正面中央（仏式の焼香台の位置）',
        dimensionRule: '白木の八足台（幅約120cm×高70cm）。奉奠用の新鮮な榊（玉串）を神官脇から受け取って捧げる。',
        purpose: '参列者が神前へ進み、玉串を捧げて故人の安寧を祈る台。',
        examTip: '玉串の捧げ方：右手根元・左手葉先 ➔ 時計回りに90度回し祈念 ➔ さらに時計回りに回して【根元を祭壇に向けて】案上へ捧げる。',
        serviceManner: '玉串案の上が捧げられた榊で溢れないよう、式中に神官補助が整然と整える。',
        ngAction: '玉串を反時計回り（左回り）に回したり、葉先を祭壇に向けて捧げること。',
        svgCoords: { cx: 400, cy: 280, width: 80, height: 35 }
      },
      {
        id: 'st-saishu-seat',
        name: '斎主席 ＆ 祭員席（神官席）',
        reading: 'さいしゅせき（しんかんせき）',
        enName: 'Chief Shinto Priest Seat (Saishu Chair & Table)',
        category: 'seats',
        positionLabel: '祭壇正面やや左寄り',
        dimensionRule: '白木の椅子。斎主（チーフ神官）1名、祭員（アシスタント神官）1〜2名。雅楽奏者（伶人）席。',
        purpose: '祝詞・祭詞を奏上し、儀礼を執り行う神職の席。',
        examTip: '神官は狩衣（かりぎぬ）や白張（はくちょう）などの神職装束を着用し、笏（しゃく）を持つ。',
        serviceManner: '神職の入退場時に一同起立して頭を下げるよう司会が促す。',
        ngAction: '神官の進行動線をカメラマンやスタッフが横切ること。',
        svgCoords: { cx: 310, cy: 250, width: 55, height: 40 }
      },
      {
        id: 'st-temizu',
        name: '手水所（ちょうずどころ・潔斎具一式）',
        reading: 'ちょうずどころ',
        enName: 'Water Basin for Purification (Temizu Bucket & Ladle)',
        category: 'reception_door',
        positionLabel: '式場入口ドア外側',
        dimensionRule: '手水桶、竹柄杓、受け桶、白懐紙（ペーパータオル）。',
        purpose: '式場に入る前に、世俗の穢れを水で清める儀式。柄杓一杯の水で左手、右手、口をすすぐ。',
        examTip: '神葬祭では死を「穢れ（気枯れ）」として捉えるため、式場に入る前の手水清めが絶対に欠かせない。',
        serviceManner: '手水番スタッフが柄杓に水を注ぎ、会葬者に懐紙を手渡して案内する。',
        ngAction: '柄杓に直接口をつけて水を飲むこと（必ず左手に水を受けて口をすすぐ）。',
        svgCoords: { cx: 200, cy: 460, width: 60, height: 35 }
      }
    ]
  },

  secular: {
    id: 'secular',
    title: 'キリスト教式 ＆ 無宗教「お別れの会」配置図面',
    subtitle: '十字架・キャンドル祭壇・献花台（カーネーション/白百合）・メモリアルコーナー',
    banquetConcept: 'カトリック・プロテスタントのキリスト教式、および特定の宗教儀礼を行わない「無宗教・お別れの会（シビルウェディング葬）」。献花台を中心とし、故人の愛用品・写真パネルを展示するメモリアルコーナーを完全網羅。',
    tableType: '洋風フラワー祭壇 ＆ 献花台（幅150cm） ＆ メモリアル展示テーブル',
    standardCoverSpace: '献花台前動線幅：2.0m以上確保（献花の一方通行フロー）',
    dimensionKeyRule: 'キリスト教式は十字架・聖書・キャンドルを正面。無宗教はお別れメッセージコーナーと献花台（白百合・白カーネーション）を配置。',
    leadExplanation: 'キリスト教式（神のもとへ召される感謝と復活の祈り）および無宗教葬では、焼香の代わりに「献花（けんか）」を行います。生花を両手で受け取り、茎を祭壇側に向けて献花台に捧げ、静かに黙祷します。',
    serviceSequence: [
      '1. 参列者入場 ➔ 追悼BGM（故人愛用のクラシック・ジャズ・賛美歌）',
      '2. 司式者入場（キリスト教式：神父/牧師、無宗教：司会者アナウンス）',
      '3. 聖書朗読 / 追悼ムービー上映（生前の歩み・功績紹介）',
      '4. 祈祷 / 追悼の言葉（友人・代表者によるスピーチ）',
      '5. 弔電紹介',
      '6. 献花（けんか・遺族 ➔ 親族 ➔ 一般参列者／茎を祭壇に向けて献花台へ）',
      '7. 黙祷（一同起立または着席にて深く頭を下げる）',
      '8. 喪主挨拶 ➔ 棺へのお別れ花入れ ➔ 出棺'
    ],
    examImportantCheckpoints: [
      '【カトリックとプロテスタントの違い】カトリックは「神父（司祭）」が司式し、死を「永遠の命への移行」とする。プロテスタントは「牧師」が司式し、死を「地上での役目を終え神の身元へ帰る安息」とする。',
      '【献花の持ち方・作法】花（白菊・百合・カーネーション等）を右手で花側・左手で茎を支えて受け取る ➔ 献花台の前で一礼 ➔ 【時計回りに回して茎を祭壇に向けて】献花台に置く ➔ 一礼して黙祷。',
      '【お悔やみの言葉】キリスト教では「ご冥福をお祈りします（仏教用語）」は使わない。「安らかなお眠りをお祈りいたします」「主の平安をお祈りいたします」と述べる。',
      '【不祝儀袋の表書き】「お花料（御花料）」「御ミサ料（カトリック）」「忌慰料（プロテスタント）」。百合の花や十字架柄の袋を用い、蓮の花柄は避ける。'
    ],
    items: [
      {
        id: 'sc-altar',
        name: '洋風生花祭壇 ＆ 十字架（またはメモリアルシンボル）',
        reading: 'ようふうせいかさいだん',
        enName: 'Christian / Secular Memorial Floral Altar',
        category: 'altar',
        positionLabel: '式場正面中央',
        dimensionRule: '白百合、バラ、カスミソウなど洋花中心。カトリック/プロテスタントでは中央に十字架を掲げる（無宗教では十字架なし）。',
        purpose: '神への感謝と、故人の生前の個性・輝きを表現する祭壇。',
        examTip: 'カトリックの十字架には「キリスト像」が付いていることが多く、プロテスタントの十字架にはキリスト像はなくシンプルな十字架のみ。',
        serviceManner: '生花の香りとライティングの調和を点検。',
        ngAction: 'プロテスタントの式場にキリスト像付き十字架を勝手に設置すること。',
        svgCoords: { cx: 400, cy: 110, width: 280, height: 80 }
      },
      {
        id: 'sc-kenkadai',
        name: '献花台（けんかだい ＆ 献花カゴ）',
        reading: 'けんかだい',
        enName: 'Flower Offering Table (Kenkadai)',
        category: 'incense',
        positionLabel: '祭壇正面中央（焼香台の位置）',
        dimensionRule: '長机に白いクロスを敷く。手前に献花用生花（白カーネーション等）を盛ったバスケットを配置。',
        purpose: '参列者が1本ずつ生花を受け取り、故人に捧げて祈る台。',
        examTip: '【作法】献花台に置く時は必ず「茎側を祭壇（遺影）に向け、花びらを手前に向ける」。焼香と違い煙は出ない。',
        serviceManner: '献花アテンドスタッフが花を両手で丁寧に手渡し、順序よく誘導する。',
        ngAction: '花を投げ入れたり、茎を手前に向けて逆さに置くこと。',
        svgCoords: { cx: 400, cy: 280, width: 90, height: 35 }
      },
      {
        id: 'sc-memorial-corner',
        name: 'メモリアル展示コーナー（愛用品・趣味・写真パネル）',
        reading: 'メモリアルてんじコーナー',
        enName: 'Memorial Memory Table (Personal Artifacts & Photo Gallery)',
        category: 'offering',
        positionLabel: '式場壁面またはホワイエロビー',
        dimensionRule: '長机2台（幅3.6m）。故人の著書、絵画、楽器、ゴルフ道具、勲章、思い出のアルバムを展示。',
        purpose: '無宗教葬やお別れの会で最も重視される、故人の人生の軌跡を会葬者に語りかける空間。',
        examTip: '著作権や肖像権、貴重品の盗難防止に配慮し、アクリルケースや見守りスタッフを配置。',
        serviceManner: '展示品のキャプションプレート（説明文）を綺麗に清書して添える。',
        ngAction: '高価な貴金属や現金を無防備に展示台に放置すること。',
        svgCoords: { cx: 120, cy: 260, width: 100, height: 60 }
      },
      {
        id: 'sc-clergy-podium',
        name: '説教台（講壇 / 司式者スタンドマイク）',
        reading: 'せっきょうだい（こうだん）',
        enName: 'Pulpit / Lectern for Pastor / Priest / MC',
        category: 'seats',
        positionLabel: '祭壇の向かって左側',
        dimensionRule: '木製講壇（高さ約110cm）。聖書、式次第、マイクをセット。',
        purpose: '神父・牧師が説教を行い、または司会者がお別れの会の進行を行う台。',
        examTip: 'キリスト教式では聖書朗読が行われるため、照明（ピンスポット）の当たり具合を確認。',
        serviceManner: '神父や牧師のお名前と宗派（日本キリスト教団、聖公会等）を事前確認。',
        ngAction: 'マイクのコードに足を引っ掛けて台を倒す事故。',
        svgCoords: { cx: 280, cy: 240, width: 45, height: 40 }
      }
    ]
  },

  catering_hall: {
    id: 'catering_hall',
    title: '通夜振る舞い ＆ 精進落とし会食室 配膳図面',
    subtitle: '会席膳・陰膳（かげぜん）・献杯席・僧侶最上座プロトコル配置',
    banquetConcept: '通夜後の「通夜振る舞い（大皿料理・寿司・お清め）」および火葬後の「精進落とし（会席膳・お斎）」。最上座に導師（僧侶）、次いで親族・世話役、最も出入口に近い最下座に喪主・遺族が座る「もてなす側の礼儀」を完全網羅。',
    tableType: '会食個室（和室座卓 または 洋室円卓/長机・20〜50名収容）',
    standardCoverSpace: '1名あたり会席膳幅：約65cm〜70cm ／ 席間ピッチ：45cm以上',
    dimensionKeyRule: '床の間・奥が最上座（僧侶・住職席）。出入口側が最下座（喪主・施主席）。中央最上段に故人の「陰膳」を配置。',
    leadExplanation: '葬儀の会食は単なる宴会ではなく、故人を偲び、参列や読経への感謝を伝える儀式です。席次は一般的な宴会と全く同じく「もてなす側の喪主が一番下の席（末席）」に着席し、お寺様を一番上座（床の間前）にお迎えします。故人の席には「陰膳（かげぜん）」を一膳供えます。',
    serviceSequence: [
      '1. 親族・参列者の着席案内（上座から順にご案内）',
      '2. 導師（僧侶）のご案内・最上座着席',
      '3. 喪主による御礼の挨拶（通夜式・火葬滞りなく終了した感謝）',
      '4. 献杯（けんぱい・親族代表または世話役が音頭／※拍手・祝杯厳禁）',
      '5. 会食歓談スタート（故人の思い出を静かに語り合う）',
      '6. 僧侶へのお伺い・お帰り時のお見送り（御膳料・御車料の手渡し）',
      '7. 喪主による結びの挨拶 ➔ 散会・後飾り段設置（自宅）へ'
    ],
    examImportantCheckpoints: [
      '【精進落としの席次序列】最上座＝僧侶（住職）、次席＝親族の長老・世話役、中座＝親族・友人、最下座（出入口側）＝喪主・遺族。喪主が上座に座るのは重大な非礼！',
      '【献杯（けんぱい）の作法】「献杯」と静かに発声し、杯を目の高さに掲げて口をつける。グラス同士をカチカチぶつけ合ったり、拍手をしてはならない。',
      '【陰膳（かげぜん）の設置】故人にも同じ料理（または精進陰膳）を一膳用意し、祭壇側または上座中央に箸を手前に向けて供える。',
      '【御膳料の発生条件】僧侶が会食に同席せずお帰りになる場合のみ、食事代の代わりに「御膳料（5,000〜10,000円）」を包んで渡す。同席して食べた場合は御膳料は不要。',
      '【通夜振る舞いと精進落としの違い】通夜振る舞いは「大皿・寿司など一口つまむ程度で長居しない」。精進落としは「火葬後に全員で個別の会席膳を囲み労をねぎらう」。'
    ],
    items: [
      {
        id: 'ct-monk-seat',
        name: '導師席（僧侶・住職 最上座席）',
        reading: 'どうしせき（そうりょさいじょうざ）',
        enName: 'Head Priest Seat (Highest Honored Seat)',
        category: 'seats',
        positionLabel: '部屋の最奥・床の間前（最上座）',
        dimensionRule: '出入口から最も遠い奥の中央。最も上質な座布団または肘掛け椅子。',
        purpose: '儀礼を執り行ってくださったご住職に感謝を込めてもてなす席。',
        examTip: '【鉄則】僧侶が最上座。もし僧侶が同席しない場合は、親族の最年長者や世話役代表が繰り上がって最上座に着く。',
        serviceManner: 'お飲み物のお好みを一番最初にお伺いし、お酌は喪主が直々に行う。',
        ngAction: '僧侶を出入口の近くの下座に座らせること。',
        svgCoords: { cx: 400, cy: 110, width: 70, height: 45 }
      },
      {
        id: 'ct-kagezen',
        name: '故人の席 ＆ 陰膳（かげぜん一式）',
        reading: 'かげぜん',
        enName: 'Memorial Place for Deceased (Kagezen Meal)',
        category: 'offering',
        positionLabel: '導師席の脇または上座中央',
        dimensionRule: '故人の遺影・小位牌、お線香、そして参列者と同じ料理を一膳セッティング。箸は故人から見て手前に配置。',
        purpose: '「故人と共に最後の食事をいただく」という日本古来の供養の膳。',
        examTip: '陰膳の箸の向きは「故人から見て手前（自分たちから見ると奥向き）」になるように置く。',
        serviceManner: '食事の進行に合わせて陰膳の蓋を開け、お酒を注いでお供えする。',
        ngAction: '故人の席を用意せず、忘れ去られたように会食を始めること。',
        svgCoords: { cx: 480, cy: 110, width: 60, height: 45 }
      },
      {
        id: 'ct-moshu-seat',
        name: '喪主席 ＆ 遺族席（出入口側 最下座）',
        reading: 'もしゅせき（さいげざ・すえせき）',
        enName: 'Chief Mourner Seat (Lowest Seat near Door)',
        category: 'seats',
        positionLabel: '部屋の出入口に最も近い末席',
        dimensionRule: '出入口ドアのすぐ手前。参列者全員を見渡せる位置。',
        purpose: 'ゲストをもてなし、配膳やお酌の指示を出し、最後にお見送りをするホストの席。',
        examTip: '【超重要】婚礼と同じく、葬儀でも「喪主・主催者は最下座」。上座に座ることは絶対に許されない。',
        serviceManner: '喪主が席を立ってお寺様や親族へお酌・挨拶に回りやすい動線を確保。',
        ngAction: '喪主が上座の床の間の前にふんぞり返って座ること。',
        svgCoords: { cx: 400, cy: 430, width: 80, height: 45 }
      },
      {
        id: 'ct-relatives-table',
        name: '親族・来賓 会席膳（個別の膳 / 円卓）',
        reading: 'しんぞく・らいひん かいせきぜん',
        enName: 'Relatives Dining Table & Individual Kaiseki Tray',
        category: 'plate',
        positionLabel: '導師席と喪主席の間の左右列',
        dimensionRule: '左右に対面して並ぶ長机または円卓。1人につき会席長角盆（幅65cm）。折敷に料理を配膳。',
        purpose: '火葬を終えた親族が精進料理（または現代の肉魚を含む会席）をいただき労をねぎらう。',
        examTip: '本来は「四十九日までは肉魚を断つ（精進料理）」であったが、現代は「火葬後に精進明けとして通常の豪華な会席を食べる」のが主流。',
        serviceManner: '温かい天ぷらや吸物、ステーキを出来立ての温度で順次サーブ。',
        ngAction: '大声で騒いだり、宴会のようにカラオケを流すこと。',
        svgCoords: { cx: 280, cy: 270, width: 140, height: 110 }
      },
      {
        id: 'ct-kenpai-glass',
        name: '献杯用グラス（冷酒杯またはワイングラス）',
        reading: 'けんぱいようグラス',
        enName: 'Kenpai Glass (Toast of Condolence - Silent)',
        category: 'incense',
        positionLabel: '各膳の右手前',
        dimensionRule: '日本酒またはウーロン茶を注ぐ。',
        purpose: '開宴時の「献杯」の唱和に使用。',
        examTip: '【絶対マナー】乾杯ではないので「グラスを合わせない」「拍手しない」「大声を出さない」。静かに杯を掲げて口をつける。',
        serviceManner: '献杯の音頭を取る親族代表の直前までに、全員のグラスにお酒/ウーロン茶を注ぎ終えておく。',
        ngAction: '「かんぱーい！」と叫んで拍手喝采すること（重大なマナー違反）。',
        svgCoords: { cx: 340, cy: 220, width: 25, height: 25 }
      }
    ]
  }
};
