import type { Katakana } from "../types/Katakana";

export const KATAKANAS: Katakana[] = [
  // Vogais
  {
    id: "a", symbol: "ア", strokeCount: 2, difficulty: "easy", template: [
      {
        points: [
          {
            "x": 0,
            "y": 1
          },
          {
            "x": 1,
            "y": 0
          }
        ],
      },
    ],
  },
  { id: "i", symbol: "イ", strokeCount: 2, difficulty: "easy", template: [] },
  { id: "u", symbol: "ウ", strokeCount: 3, difficulty: "easy", template: [] },
  { id: "e", symbol: "エ", strokeCount: 3, difficulty: "easy", template: [] },
  { id: "o", symbol: "オ", strokeCount: 3, difficulty: "easy", template: [] },

  // K
  { id: "ka", symbol: "カ", strokeCount: 2, difficulty: "easy", template: [] },
  { id: "ki", symbol: "キ", strokeCount: 3, difficulty: "medium", template: [] },
  { id: "ku", symbol: "ク", strokeCount: 2, difficulty: "easy", template: [] },
  { id: "ke", symbol: "ケ", strokeCount: 3, difficulty: "medium", template: [] },
  { id: "ko", symbol: "コ", strokeCount: 2, difficulty: "easy", template: [] },

  // S
  { id: "sa", symbol: "サ", strokeCount: 3, difficulty: "medium", template: [] },
  { id: "shi", symbol: "シ", strokeCount: 3, difficulty: "medium", template: [] },
  { id: "su", symbol: "ス", strokeCount: 2, difficulty: "easy", template: [] },
  { id: "se", symbol: "セ", strokeCount: 2, difficulty: "easy", template: [] },
  { id: "so", symbol: "ソ", strokeCount: 2, difficulty: "easy", template: [] },

  // T
  { id: "ta", symbol: "タ", strokeCount: 3, difficulty: "medium", template: [] },
  { id: "chi", symbol: "チ", strokeCount: 3, difficulty: "medium", template: [] },
  { id: "tsu", symbol: "ツ", strokeCount: 3, difficulty: "hard", template: [] },
  { id: "te", symbol: "テ", strokeCount: 3, difficulty: "medium", template: [] },
  { id: "to", symbol: "ト", strokeCount: 2, difficulty: "easy", template: [] },

  // N
  { id: "na", symbol: "ナ", strokeCount: 2, difficulty: "easy", template: [] },
  { id: "ni", symbol: "ニ", strokeCount: 2, difficulty: "easy", template: [] },
  { id: "nu", symbol: "ヌ", strokeCount: 2, difficulty: "medium", template: [] },
  { id: "ne", symbol: "ネ", strokeCount: 4, difficulty: "hard", template: [] },
  { id: "no", symbol: "ノ", strokeCount: 1, difficulty: "easy", template: [] },

  // H
  { id: "ha", symbol: "ハ", strokeCount: 2, difficulty: "easy", template: [] },
  { id: "hi", symbol: "ヒ", strokeCount: 2, difficulty: "medium", template: [] },
  { id: "fu", symbol: "フ", strokeCount: 1, difficulty: "easy", template: [] },
  { id: "he", symbol: "ヘ", strokeCount: 1, difficulty: "easy", template: [] },
  { id: "ho", symbol: "ホ", strokeCount: 4, difficulty: "hard", template: [] },

  // M
  { id: "ma", symbol: "マ", strokeCount: 2, difficulty: "easy", template: [] },
  { id: "mi", symbol: "ミ", strokeCount: 3, difficulty: "hard", template: [] },
  { id: "mu", symbol: "ム", strokeCount: 2, difficulty: "medium", template: [] },
  { id: "me", symbol: "メ", strokeCount: 2, difficulty: "easy", template: [] },
  { id: "mo", symbol: "モ", strokeCount: 3, difficulty: "medium", template: [] },

  // Y
  { id: "ya", symbol: "ヤ", strokeCount: 2, difficulty: "medium", template: [] },
  { id: "yu", symbol: "ユ", strokeCount: 2, difficulty: "easy", template: [] },
  { id: "yo", symbol: "ヨ", strokeCount: 3, difficulty: "easy", template: [] },

  // R
  { id: "ra", symbol: "ラ", strokeCount: 2, difficulty: "easy", template: [] },
  { id: "ri", symbol: "リ", strokeCount: 2, difficulty: "easy", template: [] },
  { id: "ru", symbol: "ル", strokeCount: 2, difficulty: "medium", template: [] },
  { id: "re", symbol: "レ", strokeCount: 1, difficulty: "easy", template: [] },
  { id: "ro", symbol: "ロ", strokeCount: 3, difficulty: "easy", template: [] },

  // W
  { id: "wa", symbol: "ワ", strokeCount: 2, difficulty: "medium", template: [] },
  { id: "wo", symbol: "ヲ", strokeCount: 3, difficulty: "hard", template: [] },

  // N
  {
    id: "n", symbol: "ン", strokeCount: 2, difficulty: "medium", template: [{
      points: [
        {
          "x": 0.15246636771300448,
          "y": 0.18644067796610167
        },
        {
          "x": 0.08520179372197305,
          "y": 0.29943502824858753
        },
        {
          "x": 0.06726457399103135,
          "y": 0.36723163841807915
        },
        {
          "x": 0.06726457399103135,
          "y": 0.423728813559322
        },
        {
          "x": 0.06726457399103135,
          "y": 0.5254237288135594
        },
        {
          "x": 0.05829596412556055,
          "y": 0.615819209039548
        },
        {
          "x": 0.06726457399103135,
          "y": 0.7683615819209039
        },
        {
          "x": 0.10762331838565019,
          "y": 0.9152542372881355
        },
        {
          "x": 0.1614349775784753,
          "y": 0.9548022598870056
        },
        {
          "x": 0.23766816143497754,
          "y": 0.9830508474576272
        },
        {
          "x": 0.34080717488789236,
          "y": 1
        },
        {
          "x": 0.515695067264574,
          "y": 0.943502824858757
        },
        {
          "x": 0.7264573991031391,
          "y": 0.8135593220338982
        },
        {
          "x": 0.865470852017937,
          "y": 0.6949152542372881
        },
        {
          "x": 0.9686098654708519,
          "y": 0.5536723163841808
        },
        {
          "x": 1,
          "y": 0.3107344632768362
        },
        {
          "x": 0.9775784753363228,
          "y": 0.14124293785310735
        },
        {
          "x": 0.9192825112107623,
          "y": 0.07909604519774015
        },
        {
          "x": 0.8430493273542602,
          "y": 0.05084745762711866
        },
        {
          "x": 0.7757847533632287,
          "y": 0.028248587570621493
        },
        {
          "x": 0.695067264573991,
          "y": 0.011299435028248584
        },
        {
          "x": 0.6188340807174887,
          "y": 0
        },
        {
          "x": 0.5246636771300447,
          "y": 0
        },
        {
          "x": 0.4573991031390135,
          "y": 0
        },
        {
          "x": 0.37668161434977576,
          "y": 0.028248587570621493
        },
        {
          "x": 0.23766816143497754,
          "y": 0.10734463276836165
        },
        {
          "x": 0.17040358744394618,
          "y": 0.15254237288135597
        },
        {
          "x": 0.15246636771300448,
          "y": 0.15819209039548018
        },
        {
          "x": 0.06726457399103135,
          "y": 0.21468926553672316
        },
        {
          "x": 0.01345291479820625,
          "y": 0.27118644067796616
        },
        {
          "x": 0.00448430493273545,
          "y": 0.33898305084745767
        },
        {
          "x": 0,
          "y": 0.4124293785310735
        }
      ],
    },]
  },
];