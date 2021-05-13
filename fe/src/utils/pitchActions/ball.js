import { pitchResult } from "../util";
const { isFourBall } = pitchResult;

const ball = (diamondQueue, currAttackTeam, currSBO, currHitter, dispatch, ...fns) => {
  const { currS, currB, currO } = currSBO;

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

  dispatch({
    type: "currHitter",
    ...copiedPreStateOfHitter,
  });

  fns.forEach((fn) => fn());
};
export default ball;
