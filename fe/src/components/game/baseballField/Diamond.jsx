import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { GlobalContext } from "../../../App";
// import PitchButton from "./PitchButton";
import { getURL } from "../../../data";

const Diamond = (props) => {
  const { globalState, dispatch } = useContext(GlobalContext);
  const { currHitter, currS, currB, currO, currH, expeditionTeam, homeTeam, currInning } = globalState;

  useEffect(() => {
    const actionBoard = { currHitter, S: currS, B: currB, O: currO, H: currH };
    localStorage.setItem("currHitter", JSON.stringify(actionBoard));
  }, [currS, currB, currH, currO]);

  const resetSB = () => {
    dispatch({ type: "currS", init: true });
    dispatch({ type: "currB", init: true });
  };

  // const getLastAction = (currHitterHistoryList) => {
  //   if (!currHitterHistoryList.length) return "안타";

  //   const lastHistory = currHitterHistoryList[currHitterHistoryList.length - 1];
  //   let lastAction = null;
  //   if (lastHistory.out === 1) lastAction = "아웃";
  //   else if (lastHistory.ball === 4) lastAction = "볼넷";
  //   else lastAction = "안타";

  //   return lastAction;
  // };

  const requestNextHitter = () => {
    const matchId = localStorage.getItem("matchId");
    const currHitterHistoryList = JSON.parse(localStorage.getItem("currHitter")).currHitter.historyList;
    // const lastAction = getLastAction(currHitterHistoryList);

    const request = async () => {
      const responseNextHitter = await fetch(getURL(`game/${matchId}/exchange`), {
        method: "post",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          playerBattingOrder: currHitter.playerBattingOrder,
          teamId: currHitter.teamId,
          playerName: currHitter.name,
          historyList: currHitter.historyList,
          lastAction: currHitter.lastAction,
          totalTeamScore: expeditionTeam.totalScore,
        }),
      });

      const nextHitterData = await responseNextHitter.json();

      console.log("---nextHitterData---");
      console.log(nextHitterData);

      dispatch({
        type: "currHitter",
        role: nextHitterData.hitter.role,
        playerBattingOrder: nextHitterData.nextHitter.playerBattingOrder,
        teamId: nextHitterData.nextHitter.teamId,
        historyList: [...nextHitterData.nextHitter.historyList],
        name: nextHitterData.hitter.name,
        plateAppearances: nextHitterData.hitter.plateAppearances,
        hits: nextHitterData.hitter.hits,
        lastAction: null,
      });
    };

    request();
  };

  const nowPitchingTeam = currInning.cycle === "초" ? "homeTeam" : "expeditionTeam";

  const throwBaseball = () => {
    const { currPitcher } = globalState;
    const actions = ["S", "B", "H"];
    const selectedIndex = parseInt(Math.random() * actions.length);
    alert(`결과: ${actions[selectedIndex]}`); // 일단!!!

    dispatch({ type: "currPitcher", pitchCount: currPitcher.pitchCount + 1 });
    if (actions[selectedIndex] === "S") {
      if (currS < 2) {
        // 스트라이크이고, 아웃이 아닐 때
        dispatch({ type: "currS", init: false, payload: 1 });
        dispatch({
          type: "currHitter",
          role: currHitter.role,
          playerBattingOrder: currHitter.playerBattingOrder,
          teamId: currHitter.teamId,
          hits: currHitter.hits,
          name: currHitter.name,
          historyList: JSON.parse(JSON.stringify(currHitter.historyList)).concat({
            id: currHitter.historyList.length + 1,
            actionName: actions[selectedIndex],
            strike: currS + 1,
            ball: currB,
            out: currO,
          }),
          plateAppearances: currHitter.plateAppearances,
          lastAction: null,
        });
      } else {
        // 스트라이크이고, 아웃일 때
        dispatch({
          type: "currHitter",
          role: currHitter.role,
          plateAppearances: currHitter.plateAppearances + 1,
          hits: currHitter.hits,
          teamId: currHitter.teamId,
          playerBattingOrder: currHitter.playerBattingOrder,
          name: currHitter.name,
          historyList: JSON.parse(JSON.stringify(currHitter.historyList)).concat({
            id: currHitter.historyList.length + 1,
            actionName: actions[selectedIndex],
            strike: currS + 1,
            ball: currB,
            out: currO + 1, // db에 보내기 위한 용도로만 해줄 거니까 굳이 상태를 갱신해서 리렌더할 필요가 없음
          }),
          lastAction: "아웃",
        });

        if (currO < 2) {
          // 스트라이크, 아웃인데 팀 교체X, 선수만 교체
          resetSB();
          requestNextHitter();
          alert("선수 교체함다~");
          // setCurrO((currO) => currO + 1); // 빨간공 하나 적재 됨
          dispatch({ type: "currO", init: false, payload: 1 });
          // 데이터베이스에 다음 선수 정보 요청, 응답 받음
          // 응답 받으면 여기서 또 Teams에서 셋팅해준 로직과 같은 것을 수행해야 함
        } else {
          // 스트라이크, 아웃, 팀 교체!!
          // 팀 교체
          alert("팀 교체함다~");
          // 데이터베이스에 로컬스토리지의 정보를 저장, 이때는 SBOH 모두 리셋
          // 다음 공격팀, 투수, 타자 등의 전체 정보를 응답 받음, 여기서 또 Teams에서 셋팅해준 로직과 같은 것을 수행해야 함
        }
      }
    } else if (actions[selectedIndex] === "B") {
      if (currB < 3) {
        dispatch({ type: "currB", init: false, payload: 1 });
        dispatch({
          type: "currHitter",
          role: currHitter.role,
          playerBattingOrder: currHitter.playerBattingOrder,
          teamId: currHitter.teamId,
          name: currHitter.name,
          plateAppearances: currHitter.plateAppearances,
          hits: currHitter.hits,
          historyList: JSON.parse(JSON.stringify(currHitter.historyList)).concat({
            id: currHitter.historyList.length + 1,
            actionName: actions[selectedIndex],
            strike: currS,
            ball: currB + 1,
            out: currO,
          }),
          lastAction: null,
        });
      } else {
        alert("볼넷임다~");
        // 지금 타자 진루, 현재 나가있는 선수들도 모두 한칸씩 진루시킴
        // 만약에 홈으로 들어오는 선수가 있으면 현재 팀의 totalScore+1 해줘야 함

        dispatch({
          type: "currHitter",
          role: currHitter.role,
          playerBattingOrder: currHitter.playerBattingOrder,
          teamId: currHitter.teamId,
          name: currHitter.name,
          plateAppearances: currHitter.plateAppearances + 1,
          hits: currHitter.hits,
          historyList: JSON.parse(JSON.stringify(currHitter.historyList)).concat({
            id: currHitter.historyList.length + 1,
            actionName: actions[selectedIndex],
            strike: currS,
            ball: currB + 1,
            out: currO,
          }),
          lastAction: "볼넷",
        });

        resetSB();
        requestNextHitter();

        if (nowPitchingTeam === "homeTeam") {
          dispatch({ type: "expeditionTeam", team: { ...expeditionTeam, totalScore: expeditionTeam.totalScore + 1 } });
        } else {
          dispatch({ type: "homeTeam", team: { ...homeTeam, totalScore: homeTeam.totalScore + 1 } });
        }
        // 데이터베이스에 다음 선수 정보 요청, 응답 받음 <- 이때 팀들의 totalScore도 데이터베이스에 저장함
        resetSB();
        // Teams 로직 또 수행 (아마도 필요한 부분만 수행하겟지...?)
      }
    } else if (actions[selectedIndex] === "H") {
      alert("선수 교체함다~");
      // setCurrH((currH) => currH + 1);
      dispatch({ type: "currH", init: false, payload: 1 });
      dispatch({ type: "currH", init: false, payload: 1 });
      dispatch({
        type: "currHitter",
        role: currHitter.role,
        playerBattingOrder: currHitter.playerBattingOrder,
        teamId: currHitter.teamId,
        name: currHitter.name,
        plateAppearances: currHitter.plateAppearances + 1,
        hits: currHitter.hits + 1,
        historyList: JSON.parse(JSON.stringify(currHitter.historyList)).concat({
          id: currHitter.historyList.length + 1,
          actionName: actions[selectedIndex],
          strike: currS,
          ball: currB,
          out: currO,
        }),
        lastAction: "안타",
      });
      resetSB();
      requestNextHitter();
    }
  };

  return (
    <DiamondField>
      <div>다이아몬드 경기장을 넣을 거임</div>
      {/* <PitchButton /> */}
      <button onClick={throwBaseball}>pitch</button>
    </DiamondField>
  );
};

export default Diamond;

const DiamondField = styled.div`
  width: 100%;
`;
