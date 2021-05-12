import { pitchResult } from "../util";
import out from "./out";

const { isThreeStrike } = pitchResult;

const strike = (currSBO, currHitter, dispatch, ...fns) => {
  const { currS, currB, currO } = currSBO;
  if (isThreeStrike(currS)) {
    out(currSBO, currHitter, dispatch, ...fns);
    return;
  }
  dispatch({ type: "currS", init: false, payload: 1 });

  const copiedPreStateOfHitter = {
    ...currHitter,
    historyList: currHitter.historyList.concat({
      id: currHitter.historyList.length + 1,
      actionName: "strike",
      strike: currS + 1,
      ball: currB,
      out: currO,
    }),
  };

  dispatch({
    type: "currHitter",
    ...copiedPreStateOfHitter,
  });
};

export default strike;
