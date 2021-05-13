const initialValue = {
  myTeam: null,
  counterTeam: null,
  homeTeam: null,
  expeditionTeam: null,
  currInning: null,
  currPitcher: null,
  currHitter: null,
  currTeamLog: null,
  currS: 0,
  currB: 0,
  currH: 0,
  currO: 0,
  isResponseDone: false,
  currAttackTeam: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "myTeam":
      return { ...state, myTeam: { id: action.id, name: action.name } };
    case "counterTeam":
      return { ...state, counterTeam: { id: action.id, name: action.name } };
    case "homeTeam":
      return { ...state, homeTeam: action.team };
    case "expeditionTeam":
      return { ...state, expeditionTeam: action.team };
    case "currInning":
      return { ...state, currInning: action.currInning };
    case "currPitcher":
      return {
        ...state,
        currPitcher: {
          role: action.role,
          name: action.name,
          pitchCount: action.pitchCount,
        },
      };
    case "currHitter":
      return {
        ...state,
        currHitter: {
          role: action.role,
          playerBattingOrder: action.playerBattingOrder,
          teamId: action.teamId,
          historyList: action.historyList,
          name: action.name,
          plateAppearances: action.plateAppearances,
          hits: action.hits,
          lastAction: action.lastAction,
        },
      };
    case "currTeamLog":
      return { ...state, currTeamLog: action.currTeamLog };
    case "currS":
      return { ...state, currS: action.init ? 0 : state.currS + action.payload };
    case "currB":
      return { ...state, currB: action.init ? 0 : state.currB + action.payload };
    case "currH":
      return { ...state, currH: action.init ? 0 : state.currH + action.payload };
    case "currO":
      return { ...state, currO: action.init ? 0 : state.currO + action.payload };
    case "isResponseDone":
      return { ...state, isResponseDone: true };
    case "currAttackTeam":
      return { ...state, currAttackTeam: action.team };
  }
}

export { initialValue, reducer };
