import { pitchResult } from "../util";
const { isThreeOut } = pitchResult;

const out = (currSBO, currHitter, dispatch, ...fns) => {
  const { currS, currB, currO } = currSBO;
  dispatch({ type: "currO", init: false, payload: 1 });
  const copiedPreStateOfHitter = {
    ...currHitter,
    plateAppearances: currHitter.plateAppearances + 1,
    lastAction: "아웃",
    historyList: currHitter.historyList.concat({
      id: currHitter.historyList.length + 1,
      actionName: "out",
      strike: currS + 1,
      ball: currB,
      out: currO + 1, // db에 보내기 위한 용도로만 해줄 거니까 굳이 상태를 갱신해서 리렌더할 필요가 없음
    }),
  };

  dispatch({
    type: "currHitter",
    ...copiedPreStateOfHitter,
  });

  if (isThreeOut(currO)) {
    alert("팀 교체함다~");
    // 팀 교체 요청 보내기
  }
  fns.forEach((fn) => fn());
};

export default out;
