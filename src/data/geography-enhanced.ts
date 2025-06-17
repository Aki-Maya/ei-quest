// Enhanced Geography Data for ShakaQuest
export interface Prefecture {
  id: number;
  name: string;
  capital: string;
  region: string;
  isCapitalDifferent: boolean;
}

export interface GeographyQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'multiple-choice' | 'fill-blank' | 'matching' | 'map-select';
}

export interface ClimateRegion {
  id: number;
  name: string;
  characteristics: string;
  regions: string[];
}

export interface IndustrialRegion {
  id: number;
  name: string;
  location: string;
  industries: string[];
  features: string;
}

// Original 47 Prefectures Data
export const prefectures: Prefecture[] = [
  // Hokkaido & Tohoku (7 prefectures)
  { id: 1, name: "北海道", capital: "札幌市", region: "北海道", isCapitalDifferent: true },
  { id: 2, name: "青森県", capital: "青森市", region: "東北", isCapitalDifferent: false },
  { id: 3, name: "岩手県", capital: "盛岡市", region: "東北", isCapitalDifferent: true },
  { id: 4, name: "宮城県", capital: "仙台市", region: "東北", isCapitalDifferent: true },
  { id: 5, name: "秋田県", capital: "秋田市", region: "東北", isCapitalDifferent: false },
  { id: 6, name: "山形県", capital: "山形市", region: "東北", isCapitalDifferent: false },
  { id: 7, name: "福島県", capital: "福島市", region: "東北", isCapitalDifferent: false },

  // Kanto (7 prefectures)
  { id: 8, name: "茨城県", capital: "水戸市", region: "関東", isCapitalDifferent: true },
  { id: 9, name: "栃木県", capital: "宇都宮市", region: "関東", isCapitalDifferent: true },
  { id: 10, name: "群馬県", capital: "前橋市", region: "関東", isCapitalDifferent: true },
  { id: 11, name: "埼玉県", capital: "さいたま市", region: "関東", isCapitalDifferent: true },
  { id: 12, name: "千葉県", capital: "千葉市", region: "関東", isCapitalDifferent: false },
  { id: 13, name: "東京都", capital: "東京", region: "関東", isCapitalDifferent: false },
  { id: 14, name: "神奈川県", capital: "横浜市", region: "関東", isCapitalDifferent: true },

  // Chubu (9 prefectures)
  { id: 15, name: "新潟県", capital: "新潟市", region: "中部", isCapitalDifferent: false },
  { id: 16, name: "富山県", capital: "富山市", region: "中部", isCapitalDifferent: false },
  { id: 17, name: "石川県", capital: "金沢市", region: "中部", isCapitalDifferent: true },
  { id: 18, name: "福井県", capital: "福井市", region: "中部", isCapitalDifferent: false },
  { id: 19, name: "山梨県", capital: "甲府市", region: "中部", isCapitalDifferent: true },
  { id: 20, name: "長野県", capital: "長野市", region: "中部", isCapitalDifferent: false },
  { id: 21, name: "岐阜県", capital: "岐阜市", region: "中部", isCapitalDifferent: false },
  { id: 22, name: "静岡県", capital: "静岡市", region: "中部", isCapitalDifferent: false },
  { id: 23, name: "愛知県", capital: "名古屋市", region: "中部", isCapitalDifferent: true },

  // Kansai (7 prefectures)
  { id: 24, name: "三重県", capital: "津市", region: "関西", isCapitalDifferent: true },
  { id: 25, name: "滋賀県", capital: "大津市", region: "関西", isCapitalDifferent: true },
  { id: 26, name: "京都府", capital: "京都市", region: "関西", isCapitalDifferent: false },
  { id: 27, name: "大阪府", capital: "大阪市", region: "関西", isCapitalDifferent: false },
  { id: 28, name: "兵庫県", capital: "神戸市", region: "関西", isCapitalDifferent: true },
  { id: 29, name: "奈良県", capital: "奈良市", region: "関西", isCapitalDifferent: false },
  { id: 30, name: "和歌山県", capital: "和歌山市", region: "関西", isCapitalDifferent: false },

  // Chugoku (5 prefectures)
  { id: 31, name: "鳥取県", capital: "鳥取市", region: "中国", isCapitalDifferent: false },
  { id: 32, name: "島根県", capital: "松江市", region: "中国", isCapitalDifferent: true },
  { id: 33, name: "岡山県", capital: "岡山市", region: "中国", isCapitalDifferent: false },
  { id: 34, name: "広島県", capital: "広島市", region: "中国", isCapitalDifferent: false },
  { id: 35, name: "山口県", capital: "山口市", region: "中国", isCapitalDifferent: false },

  // Shikoku (4 prefectures)
  { id: 36, name: "徳島県", capital: "徳島市", region: "四国", isCapitalDifferent: false },
  { id: 37, name: "香川県", capital: "高松市", region: "四国", isCapitalDifferent: true },
  { id: 38, name: "愛媛県", capital: "松山市", region: "四国", isCapitalDifferent: true },
  { id: 39, name: "高知県", capital: "高知市", region: "四国", isCapitalDifferent: false },

  // Kyushu & Okinawa (8 prefectures)
  { id: 40, name: "福岡県", capital: "福岡市", region: "九州", isCapitalDifferent: false },
  { id: 41, name: "佐賀県", capital: "佐賀市", region: "九州", isCapitalDifferent: false },
  { id: 42, name: "長崎県", capital: "長崎市", region: "九州", isCapitalDifferent: false },
  { id: 43, name: "熊本県", capital: "熊本市", region: "九州", isCapitalDifferent: false },
  { id: 44, name: "大分県", capital: "大分市", region: "九州", isCapitalDifferent: false },
  { id: 45, name: "宮崎県", capital: "宮崎市", region: "九州", isCapitalDifferent: false },
  { id: 46, name: "鹿児島県", capital: "鹿児島市", region: "九州", isCapitalDifferent: false },
  { id: 47, name: "沖縄県", capital: "那覇市", region: "九州", isCapitalDifferent: true }
];

// Climate Regions Data
export const climateRegions: ClimateRegion[] = [
  {
    id: 1,
    name: "太平洋岸式気候",
    characteristics: "夏暑く冬温暖、降水量は梅雨と台風の時期に多い",
    regions: ["関東", "東海", "関西", "瀬戸内"]
  },
  {
    id: 2,
    name: "日本海岸式気候",
    characteristics: "冬に雪が多く、夏は高温多湿",
    regions: ["東北日本海側", "北陸", "山陰"]
  },
  {
    id: 3,
    name: "内陸性気候",
    characteristics: "気温の日較差・年較差が大きい",
    regions: ["中央高地", "盆地"]
  },
  {
    id: 4,
    name: "瀬戸内式気候",
    characteristics: "年間を通じて雨が少なく温暖",
    regions: ["瀬戸内海沿岸"]
  },
  {
    id: 5,
    name: "南西諸島式気候",
    characteristics: "亜熱帯気候、台風の通り道",
    regions: ["沖縄", "奄美"]
  },
  {
    id: 6,
    name: "北海道式気候",
    characteristics: "冷涼で梅雨がない、積雪期間が長い",
    regions: ["北海道"]
  }
];

// Industrial Regions Data
export const industrialRegions: IndustrialRegion[] = [
  {
    id: 1,
    name: "京浜工業地帯",
    location: "東京湾沿岸",
    industries: ["機械工業", "化学工業", "印刷・出版"],
    features: "日本最大の工業地帯、重化学工業の中心"
  },
  {
    id: 2,
    name: "中京工業地帯",
    location: "愛知県・三重県",
    industries: ["自動車工業", "航空機工業", "機械工業"],
    features: "自動車工業の中心、トヨタ自動車"
  },
  {
    id: 3,
    name: "阪神工業地帯",
    location: "大阪湾沿岸",
    industries: ["鉄鋼業", "化学工業", "機械工業"],
    features: "鉄鋼業の中心、重化学工業"
  },
  {
    id: 4,
    name: "北九州工業地帯",
    location: "福岡県北部",
    industries: ["鉄鋼業", "化学工業"],
    features: "日本の重工業発祥の地"
  },
  {
    id: 5,
    name: "瀬戸内工業地域",
    location: "瀬戸内海沿岸",
    industries: ["石油化学工業", "鉄鋼業"],
    features: "石油化学コンビナート"
  },
  {
    id: 6,
    name: "京葉工業地域",
    location: "東京湾東岸",
    industries: ["鉄鋼業", "石油化学工業"],
    features: "埋立地に建設された臨海工業地域"
  }
];

// Enhanced Geography Questions
export const geographyQuestions: GeographyQuestion[] = [
  // Prefecture Questions
  {
    id: 1,
    question: "北海道の県庁所在地はどこですか？",
    options: ["函館市", "札幌市", "旭川市", "釧路市"],
    correct: 1,
    explanation: "北海道の県庁所在地は札幌市です。",
    category: "prefectures",
    difficulty: "easy",
    type: "multiple-choice"
  },
  {
    id: 2,
    question: "宮城県の県庁所在地はどこですか？",
    options: ["仙台市", "石巻市", "大崎市", "宮城市"],
    correct: 0,
    explanation: "宮城県の県庁所在地は仙台市です。",
    category: "prefectures",
    difficulty: "easy",
    type: "multiple-choice"
  },
  {
    id: 3,
    question: "神奈川県の県庁所在地はどこですか？",
    options: ["川崎市", "相模原市", "横浜市", "藤沢市"],
    correct: 2,
    explanation: "神奈川県の県庁所在地は横浜市です。",
    category: "prefectures",
    difficulty: "easy",
    type: "multiple-choice"
  },

  // Climate Questions
  {
    id: 4,
    question: "日本海側の冬の気候の特徴は何ですか？",
    options: ["乾燥している", "雪が多い", "台風が多い", "気温が高い"],
    correct: 1,
    explanation: "日本海側は冬に雪が多く降ります。これは日本海岸式気候の特徴です。",
    category: "climate",
    difficulty: "medium",
    type: "multiple-choice"
  },
  {
    id: 5,
    question: "瀬戸内海沿岸の気候の特徴は何ですか？",
    options: ["雨が多い", "雪が多い", "雨が少ない", "台風が多い"],
    correct: 2,
    explanation: "瀬戸内海沿岸は山に囲まれているため、年間を通じて雨が少ないです。",
    category: "climate",
    difficulty: "medium",
    type: "multiple-choice"
  },

  // Agriculture Questions
  {
    id: 6,
    question: "日本の穀倉地帯として知られる地域はどこですか？",
    options: ["関東平野", "東北地方", "九州地方", "四国地方"],
    correct: 1,
    explanation: "東北地方は米の生産が盛んで、日本の穀倉地帯と呼ばれています。",
    category: "agriculture",
    difficulty: "medium",
    type: "multiple-choice"
  },

  // Fishery Questions
  {
    id: 7,
    question: "日本三大漁港の一つはどこですか？",
    options: ["函館港", "銚子港", "下関港", "境港"],
    correct: 1,
    explanation: "銚子港（千葉県）は日本三大漁港の一つです。他に焼津港、八戸港があります。",
    category: "fishery",
    difficulty: "hard",
    type: "multiple-choice"
  },

  // Industry Questions
  {
    id: 8,
    question: "自動車工業で有名な工業地帯はどこですか？",
    options: ["京浜工業地帯", "中京工業地帯", "阪神工業地帯", "北九州工業地帯"],
    correct: 1,
    explanation: "中京工業地帯はトヨタ自動車をはじめとする自動車工業の中心地です。",
    category: "industry",
    difficulty: "medium",
    type: "multiple-choice"
  },

  // Traditional Crafts Questions
  {
    id: 9,
    question: "京都の伝統工芸品は何ですか？",
    options: ["南部鉄器", "西陣織", "津軽塗", "有田焼"],
    correct: 1,
    explanation: "西陣織は京都の代表的な伝統工芸品です。",
    category: "traditional-crafts",
    difficulty: "medium",
    type: "multiple-choice"
  },

  // Pollution Questions
  {
    id: 10,
    question: "四大公害病の一つである水俣病の原因物質は何ですか？",
    options: ["カドミウム", "水銀", "硫黄酸化物", "窒素酸化物"],
    correct: 1,
    explanation: "水俣病は水銀による公害病です。",
    category: "pollution",
    difficulty: "hard",
    type: "multiple-choice"
  },

  // Regional Questions
  {
    id: 11,
    question: "九州地方で最も人口が多い県はどこですか？",
    options: ["熊本県", "鹿児島県", "福岡県", "長崎県"],
    correct: 2,
    explanation: "福岡県は九州地方で最も人口が多い県です。",
    category: "regions",
    difficulty: "medium",
    type: "multiple-choice"
  }
];

// Utility functions
export const getQuestionsByCategory = (category: string): GeographyQuestion[] => {
  return geographyQuestions.filter(q => q.category === category);
};

export const getQuestionsByDifficulty = (difficulty: 'easy' | 'medium' | 'hard'): GeographyQuestion[] => {
  return geographyQuestions.filter(q => q.difficulty === difficulty);
};

export const getRandomQuestions = (count: number = 5): GeographyQuestion[] => {
  const shuffled = [...geographyQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const getCategories = (): string[] => {
  return [...new Set(geographyQuestions.map(q => q.category))];
};

export const getDifficulties = (): string[] => {
  return ['easy', 'medium', 'hard'];
};

export default {
  prefectures,
  climateRegions,
  industrialRegions,
  geographyQuestions,
  getQuestionsByCategory,
  getQuestionsByDifficulty,
  getRandomQuestions,
  getCategories,
  getDifficulties
};
