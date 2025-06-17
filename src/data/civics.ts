// Civics Data for ShakaQuest
export interface CivicsQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'multiple-choice' | 'fill-blank' | 'matching' | 'map-select';
}

export interface ConstitutionPrinciple {
  id: number;
  name: string;
  description: string;
  details: string[];
}

export interface GovernmentBranch {
  id: number;
  name: string;
  role: string;
  leader: string;
  keyFunctions: string[];
}

// Japanese Constitution Principles
export const constitutionPrinciples: ConstitutionPrinciple[] = [
  {
    id: 1,
    name: "国民主権",
    description: "国の政治の最終決定権は国民にある",
    details: [
      "主権とは国の政治の在り方を最終的に決める力",
      "国会議員は国民の代表",
      "選挙権は国民主権の具体的な表れ"
    ]
  },
  {
    id: 2,
    name: "基本的人権の尊重",
    description: "人間として生まれながらに持つ権利を保障する",
    details: [
      "自由権：身体の自由、精神の自由、経済活動の自由",
      "平等権：法の下の平等、差別の禁止",
      "社会権：生存権、教育を受ける権利、労働者の権利",
      "参政権：選挙権、被選挙権",
      "請求権：裁判を受ける権利、国家賠償請求権"
    ]
  },
  {
    id: 3,
    name: "平和主義",
    description: "戦争を放棄し、平和な世界の実現を目指す",
    details: [
      "憲法第9条で戦争放棄を規定",
      "戦力の不保持",
      "交戦権の否認",
      "自衛隊の存在をめぐる議論"
    ]
  }
];

// Government Branches (三権分立)
export const governmentBranches: GovernmentBranch[] = [
  {
    id: 1,
    name: "立法府（国会）",
    role: "法律を作る",
    leader: "議長",
    keyFunctions: [
      "法律の制定",
      "予算の審議",
      "内閣総理大臣の指名",
      "条約の承認",
      "内閣不信任決議"
    ]
  },
  {
    id: 2,
    name: "行政府（内閣）",
    role: "政治を行う",
    leader: "内閣総理大臣",
    keyFunctions: [
      "法律の執行",
      "予算案の作成",
      "外交の実施",
      "公務員の任免",
      "衆議院の解散"
    ]
  },
  {
    id: 3,
    name: "司法府（裁判所）",
    role: "法に基づいて裁判する",
    leader: "最高裁判所長官",
    keyFunctions: [
      "法律の解釈・適用",
      "違憲立法審査権",
      "刑事・民事裁判",
      "司法行政",
      "裁判官の弾劾"
    ]
  }
];

// Civics Questions
export const civicsQuestions: CivicsQuestion[] = [
  {
    id: 1,
    question: "日本国憲法の三大原則は何ですか？",
    options: ["国民主権、基本的人権の尊重、平和主義", "民主主義、自由主義、平和主義", "国民主権、法の支配、平和主義", "基本的人権、法の下の平等、平和主義"],
    correct: 0,
    explanation: "日本国憲法の三大原則は「国民主権」「基本的人権の尊重」「平和主義」です。",
    category: "constitution",
    difficulty: "easy",
    type: "multiple-choice"
  },
  {
    id: 2,
    question: "国民主権とは何ですか？",
    options: ["国民が政治家を選ぶこと", "国の政治の最終決定権が国民にあること", "国民が法律を作ること", "国民が裁判を行うこと"],
    correct: 1,
    explanation: "国民主権とは、国の政治の在り方を最終的に決める力が国民にあることです。",
    category: "constitution",
    difficulty: "medium",
    type: "multiple-choice"
  },
  {
    id: 3,
    question: "三権分立の「三権」に含まれないものはどれですか？",
    options: ["立法権", "行政権", "司法権", "選挙権"],
    correct: 3,
    explanation: "三権分立は立法権（国会）、行政権（内閣）、司法権（裁判所）の三つです。",
    category: "government",
    difficulty: "easy",
    type: "multiple-choice"
  },
  {
    id: 4,
    question: "国会の権限でないものはどれですか？",
    options: ["法律の制定", "予算の審議", "内閣総理大臣の指名", "違憲立法審査"],
    correct: 3,
    explanation: "違憲立法審査権は裁判所の権限です。",
    category: "government",
    difficulty: "medium",
    type: "multiple-choice"
  },
  {
    id: 5,
    question: "内閣の長は誰ですか？",
    options: ["内閣官房長官", "内閣総理大臣", "国会議長", "最高裁判所長官"],
    correct: 1,
    explanation: "内閣の長は内閣総理大臣です。",
    category: "government",
    difficulty: "easy",
    type: "multiple-choice"
  },
  {
    id: 6,
    question: "日本国憲法第9条で定められているのは何ですか？",
    options: ["国民主権", "基本的人権", "戦争放棄", "三権分立"],
    correct: 2,
    explanation: "憲法第9条では戦争放棄（平和主義）が定められています。",
    category: "constitution",
    difficulty: "medium",
    type: "multiple-choice"
  },
  {
    id: 7,
    question: "基本的人権に含まれないものはどれですか？",
    options: ["自由権", "平等権", "社会権", "国家権"],
    correct: 3,
    explanation: "基本的人権には自由権、平等権、社会権、参政権、請求権などがあります。",
    category: "human-rights",
    difficulty: "medium",
    type: "multiple-choice"
  },
  {
    id: 8,
    question: "衆議院と参議院のうち、より強い権限を持つのはどちらですか？",
    options: ["衆議院", "参議院", "同じ", "場合による"],
    correct: 0,
    explanation: "衆議院の優越により、衆議院の方が強い権限を持ちます。",
    category: "government",
    difficulty: "medium",
    type: "multiple-choice"
  },
  {
    id: 9,
    question: "最高裁判所の権限として正しいものはどれですか？",
    options: ["法律の制定", "予算の作成", "違憲立法審査", "外交の実施"],
    correct: 2,
    explanation: "最高裁判所は違憲立法審査権を持ちます。",
    category: "government",
    difficulty: "medium",
    type: "multiple-choice"
  },
  {
    id: 10,
    question: "地方自治の基本原則として正しいものはどれですか？",
    options: ["中央集権", "住民自治と団体自治", "官僚制", "君主制"],
    correct: 1,
    explanation: "地方自治は住民自治と団体自治が基本原則です。",
    category: "local-government",
    difficulty: "hard",
    type: "multiple-choice"
  },
  {
    id: 11,
    question: "国際連合の本部はどこにありますか？",
    options: ["ロンドン", "パリ", "ニューヨーク", "ジュネーブ"],
    correct: 2,
    explanation: "国際連合の本部はアメリカのニューヨークにあります。",
    category: "international",
    difficulty: "easy",
    type: "multiple-choice"
  },
  {
    id: 12,
    question: "国際連合安全保障理事会の常任理事国の数は？",
    options: ["3カ国", "5カ国", "7カ国", "10カ国"],
    correct: 1,
    explanation: "安全保障理事会の常任理事国は5カ国（米・露・中・英・仏）です。",
    category: "international",
    difficulty: "medium",
    type: "multiple-choice"
  },
  {
    id: 13,
    question: "日本の選挙権年齢は何歳からですか？",
    options: ["16歳", "18歳", "20歳", "25歳"],
    correct: 1,
    explanation: "2016年から選挙権年齢は18歳に引き下げられました。",
    category: "elections",
    difficulty: "easy",
    type: "multiple-choice"
  },
  {
    id: 14,
    question: "消費税は何税に分類されますか？",
    options: ["直接税", "間接税", "地方税", "特別税"],
    correct: 1,
    explanation: "消費税は商品やサービスに課される間接税です。",
    category: "economics",
    difficulty: "medium",
    type: "multiple-choice"
  },
  {
    id: 15,
    question: "労働三権に含まれないものはどれですか？",
    options: ["団結権", "団体交渉権", "争議権", "参政権"],
    correct: 3,
    explanation: "労働三権は団結権、団体交渉権、争議権です。",
    category: "labor",
    difficulty: "hard",
    type: "multiple-choice"
  },
  {
    id: 16,
    question: "日本の国会は何院制ですか？",
    options: ["一院制", "二院制", "三院制", "四院制"],
    correct: 1,
    explanation: "日本の国会は衆議院と参議院からなる二院制です。",
    category: "government",
    difficulty: "easy",
    type: "multiple-choice"
  },
  {
    id: 17,
    question: "環境権は新しい人権の一つですが、これが重要視される理由は？",
    options: ["経済発展のため", "公害問題の発生", "国際化の進展", "情報化社会の発達"],
    correct: 1,
    explanation: "環境権は公害問題の発生により重要視されるようになりました。",
    category: "human-rights",
    difficulty: "hard",
    type: "multiple-choice"
  },
  {
    id: 18,
    question: "内閣不信任決議案を提出できるのはどこですか？",
    options: ["衆議院", "参議院", "最高裁判所", "内閣"],
    correct: 0,
    explanation: "内閣不信任決議案は衆議院のみが提出できます。",
    category: "government",
    difficulty: "medium",
    type: "multiple-choice"
  },
  {
    id: 19,
    question: "日本の地方公共団体の種類として正しいものはどれですか？",
    options: ["都道府県と市町村", "都府県と市区町村", "都道府県と市区町村", "都道府県と市"],
    correct: 0,
    explanation: "地方公共団体は都道府県と市町村に分かれます。",
    category: "local-government",
    difficulty: "medium",
    type: "multiple-choice"
  },
  {
    id: 20,
    question: "世界人権宣言が採択されたのはいつですか？",
    options: ["1945年", "1948年", "1950年", "1951年"],
    correct: 1,
    explanation: "世界人権宣言は1948年に国際連合で採択されました。",
    category: "international",
    difficulty: "hard",
    type: "multiple-choice"
  }
];

// Utility functions
export const getQuestionsByCategory = (category: string): CivicsQuestion[] => {
  return civicsQuestions.filter(q => q.category === category);
};

export const getQuestionsByDifficulty = (difficulty: 'easy' | 'medium' | 'hard'): CivicsQuestion[] => {
  return civicsQuestions.filter(q => q.difficulty === difficulty);
};

export const getRandomQuestions = (count: number = 5): CivicsQuestion[] => {
  const shuffled = [...civicsQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const getCategories = (): string[] => {
  return [...new Set(civicsQuestions.map(q => q.category))];
};

export default {
  constitutionPrinciples,
  governmentBranches,
  civicsQuestions,
  getQuestionsByCategory,
  getQuestionsByDifficulty,
  getRandomQuestions,
  getCategories
};
