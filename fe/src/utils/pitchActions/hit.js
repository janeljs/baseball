const hit = (currSBO, currHitter, dispatch, ...fns) => {
  const { currS, currB, currO } = currSBO;
  dispatch({ type: "currH", init: false, payload: 1 });
  dispatch({ type: "currH", init: false, payload: 1 });

  const copiedPreStateOfHitter = {
    ...currHitter,
    plateAppearances: currHitter.plateAppearances,
    hits: currHitter.hits + 1,
    lastAction: "안타",
    historyList: currHitter.historyList.concat({
      id: currHitter.historyList.length + 1,
      actionName: "hit",
      strike: currS,
      ball: currB,
      out: currO,
    }),
  };

  dispatch({
    type: "currHitter",
    ...copiedPreStateOfHitter,
  });

  fns.forEach((fn) => fn());
};

export default hit;
