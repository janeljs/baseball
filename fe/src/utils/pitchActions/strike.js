import { pitchResult } from "../util";
import { out } from "./out";

const { isThreeStrike } = pitchResult;

const strike = (currSBO, currHitter, dispatch) => {
  const { currS, currB, currO } = currSBO;
  if (isThreeStrike) {
    out(currO, currHitter, dispatch);
    return;
  }
  dispatch({ type: "currS", init: false, payload: 1 });

  const copyPreStateOfHitter = { ...currHitter };
  copyPreStateOfHitter.historyList.push({
    id: currHitter.historyList.length + 1,
    actionName: actions[selectedIndex],
    strike: currS + 1,
    ball: currB,
    out: currO,
  });

  dispatch({
    type: "currHitter",
    ...copyPreStateOfHitter,
  });
};

export default strike;
