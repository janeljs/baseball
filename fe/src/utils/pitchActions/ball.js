import { isEqual, pitchResult } from "../util";
const { isFourBall } = pitchResult;

const ball = (currSBO, currHitter, comparingTeams, dispatch, ...fns) => {
  const { currS, currB, currO } = currSBO;
  const { currAttackTeam, expeditionTeam, homeTeam } = comparingTeams;

  dispatch({ type: "currB", init: false, payload: 1 });

  let copiedPreStateOfHitter;

  if (!isFourBall(currB)) {
    copiedPreStateOfHitter = {
      ...currHitter,
      historyList: currHitter.historyList.concat({
        id: currHitter.historyList.length + 1,
        actionName: "ball",
        strike: currS,
        ball: currB + 1,
        out: currO,
      }),
    };
    // copyPreStateOfHitter.historyList.push({
    //   id: currHitter.historyList.length + 1,
    //   actionName: "ball",
    //   strike: currS,
    //   ball: currB + 1,
    //   out: currO,
    // });

    dispatch({
      type: "currHitter",
      ...copiedPreStateOfHitter,
    });
    return;
  }

  alert("볼넷임다~");
  copiedPreStateOfHitter = {
    ...currHitter,
    plateAppearances: currHitter.plateAppearances + 1,
    lastAction: "볼넷",
    historyList: currHitter.historyList.concat({
      id: currHitter.historyList.length + 1,
      actionName: "ball",
      strike: currS,
      ball: currB + 1,
      out: currO,
    }),
  };
  //   copyPreStateOfHitter.plateAppearances++;
  //   copyPreStateOfHitter.lastAction = "볼넷";
  //   copyPreStateOfHitter.historyList.push({
  //     id: currHitter.historyList.length + 1,
  //     actionName: "ball",
  //     strike: currS,
  //     ball: currB + 1,
  //     out: currO,
  //   });

  dispatch({
    type: "currHitter",
    ...copiedPreStateOfHitter,
  });

  fns.forEach((fn) => fn());

  if (isEqual(currAttackTeam, expeditionTeam)) {
    // 다이아몬드에 있는 선수 중 한명이 홈으로 들어와야지만 totalScore+1
    dispatch({ type: "expeditionTeam", team: { ...expeditionTeam } });
  } else {
    // 다이아몬드에 있는 선수 중 한명이 홈으로 들어와야지만 totalScore+1
    dispatch({ type: "homeTeam", team: { ...homeTeam } });
    // 데이터베이스에 다음 선수 정보 요청, 응답 받음 <- 이때 팀들의 totalScore도 데이터베이스에 저장함
  }
};
export default ball;
