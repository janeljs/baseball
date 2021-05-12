// export const getURL = (param) => `http://52.78.64.148/${param}`;

const mockData = {
  matchId: 1,
  inning: {
    out: 0, // 전체 아웃인듯?
    inningNumber: 1,
    role: "수비",
    cycle: "초",
  },
  nextHitter: {
    playerBattingOrder: 2,
    teamId: 1,
    playerName: "eve",
    historyList: [],
  },
  leftTeam: {
    name: "Captain",
    totalScore: 0,
  },
  rightTeam: {
    name: "Twins",
    totalScore: 0,
  },
  pitcher: {
    role: "투수",
    name: "Jung",
    pitchCount: 0,
    plateAppearances: 0,
    hits: 0,
  },
  hitter: {
    role: "타자",
    name: "eve",
    pitchCount: 0,
    plateAppearances: 0,
    hits: 0,
  },
  teamLog: {
    playerLog: [
      {
        playerBattingOrder: 1,
        teamId: 1,
        lastAction: "아웃",
        playerName: "adela",
        historyList: [
          {
            id: 1,
            actionName: "S",
            strike: 1,
            ball: 0,
            out: 0,
          },
          {
            id: 2,
            actionName: "S",
            strike: 2,
            ball: 0,
            out: 0,
          },
          {
            id: 3,
            actionName: "S",
            strike: 3,
            ball: 0,
            out: 1,
          },
        ],
      },
    ],
  },
};
const nextData = {
  inning: {
    out: 0, // 전체 아웃인듯?
    inningNumber: 1,
    role: "수비",
    cycle: "초",
  },
  nextHitter: {
    playerBattingOrder: 3,
    teamId: 1,
    playerName: "eve2",
    historyList: [],
  },
  expeditionTeam: {
    name: "Captain",
    totalScore: 0,
  },
  homeTeam: {
    name: "Twins",
    totalScore: 0,
  },
  pitcher: {
    role: "투수",
    name: "Jung",
    pitchCount: 0,
    plateAppearances: 0,
    hits: 0,
  },
  hitter: {
    role: "타자",
    name: "eve2",
    pitchCount: 0,
    plateAppearances: 0,
    hits: 0,
  },
  teamLog: {
    playerLog: [
      {
        playerBattingOrder: 1,
        teamId: 1,
        playerName: "adela",
        lastAction: "아웃",
        historyList: [
          {
            id: 1,
            actionName: "S",
            strike: 1,
            ball: 0,
            out: 0,
          },
          {
            id: 2,
            actionName: "S",
            strike: 2,
            ball: 0,
            out: 0,
          },
          {
            id: 3,
            actionName: "S",
            strike: 3,
            ball: 0,
            out: 1,
          },
        ],
      },
      {
        playerBattingOrder: 2,
        teamId: 1,
        playerName: "eve",
        lastAction: "볼넷",
        historyList: [
          {
            id: 1,
            actionName: "B",
            strike: 0,
            ball: 1,
            out: 0,
          },
          {
            id: 2,
            actionName: "B",
            strike: 0,
            ball: 2,
            out: 0,
          },
          {
            id: 3,
            actionName: "B",
            strike: 0,
            ball: 3,
            out: 0,
          },
          {
            id: 4,
            actionName: "B",
            strike: 0,
            ball: 4,
            out: 0,
          },
        ],
      },
    ],
  },
};

const detailScoreData = [
  {
    teamName: "Captain",
    user: true,
    teamGameScore: [
      {
        inningNumber: 1,
        score: 0,
      },
      {
        inningNumber: 2,
        score: 0,
      },
      {
        inningNumber: 3,
        score: 0,
      },
      {
        inningNumber: 4,
        score: 0,
      },
      {
        inningNumber: 5,
        score: 0,
      },
      {
        inningNumber: 6,
        score: 0,
      },
      {
        inningNumber: 7,
        score: 0,
      },
      {
        inningNumber: 8,
        score: 0,
      },
      {
        inningNumber: 9,
        score: 0,
      },
    ],
  },
  {
    teamName: "Marvel",
    user: false,
    teamGameScore: [
      {
        inningNumber: 1,
        score: 0,
      },
      {
        inningNumber: 2,
        score: 0,
      },
      {
        inningNumber: 3,
        score: 0,
      },
      {
        inningNumber: 4,
        score: 0,
      },
      {
        inningNumber: 5,
        score: 0,
      },
      {
        inningNumber: 6,
        score: 0,
      },
      {
        inningNumber: 7,
        score: 0,
      },
      {
        inningNumber: 8,
        score: 0,
      },
      {
        inningNumber: 9,
        score: 0,
      },
    ],
  },
];

// const teamList = [
//   [
//     { id: 1, name: "Captain" },
//     { id: 3, name: "Twins" },
//   ],
//   [
//     { id: 5, name: "Rockets" },
//     { id: 2, name: "Marvel" },
//   ],
//   [
//     { id: 4, name: "Tigers" },
//     { id: 6, name: "Dodgers" },
//   ],
// ];

export { mockData, nextData, detailScoreData };
