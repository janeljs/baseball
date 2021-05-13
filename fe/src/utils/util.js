const actionType = {
  strike: "스트라이크",
  ball: "볼",
  hit: "안타",
};

const pitchResult = {
  isThreeStrike: (currS) => currS >= 2,
  isThreeOut: (currO) => currO >= 2,
  isFourBall: (currB) => currB >= 3,
};

const deepCopy = (arg) => JSON.parse(JSON.stringify(arg));

const getURL = (param) => `http://52.78.64.148/api/game/${param}`;

const isEqual = (team1, team2) => team1.name === team2.name;

const scoreParser = (scoreData) => {
  return scoreData.map((team) => {
    let arr = Array(15).fill("");
    let totalScore = 0;
    team.teamGameScore.forEach((obj, i) => {
      arr[i + 2] = obj.score;
      totalScore += obj.score;
    });
    arr[1] = team.teamName;
    arr[arr.length - 1] = totalScore;
    return arr;
  });
};

const dispatchAll = (stateArray, dispatch) => {
  stateArray.forEach((state) => dispatch(state));
};

const requestPost = async (path, bodyObject, dispatch, ...optionalState) => {
  console.log(bodyObject);
  const response = await fetch(path, {
    method: "post",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(bodyObject),
  });
  const gameData = await response.json();
  localStorage.setItem("matchId", gameData.matchId);

  const { expeditionTeam, homeTeam } = gameData;
  console.log(expeditionTeam);
  if (gameData.inning.cycle === "초") dispatch({ type: "currAttackTeam", team: deepCopy(expeditionTeam) });
  if (gameData.inning.cycle === "말") dispatch({ type: "currAttackTeam", team: deepCopy(homeTeam) });

  const stateArray = [
    ...optionalState,
    { type: "homeTeam", team: deepCopy(homeTeam) },
    { type: "expeditionTeam", team: deepCopy(expeditionTeam) },
    {
      type: "currPitcher",
      role: gameData.pitcher.role,
      name: gameData.pitcher.name,
      pitchCount: gameData.pitcher.pitchCount,
    },
    {
      type: "currHitter",
      role: gameData.hitter.role,
      playerBattingOrder: gameData.nextHitter.playerBattingOrder,
      teamId: gameData.nextHitter.teamId,
      historyList: deepCopy(gameData.nextHitter.historyList),
      name: gameData.hitter.name,
      plateAppearances: gameData.hitter.plateAppearances,
      hits: gameData.hitter.hits,
      lastAction: null,
    },
    {
      type: "currInning",
      currInning: deepCopy(gameData.inning),
    },
    {
      type: "currTeamLog",
      currTeamLog: deepCopy(gameData.teamLog.playerLog),
    },
    { type: "isResponseDone" },
  ];
  dispatchAll(stateArray, dispatch);
};

export { actionType, deepCopy, getURL, isEqual, scoreParser, requestPost, pitchResult };
