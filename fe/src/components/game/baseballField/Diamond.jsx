import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { GlobalContext } from "../../../App";
import { deepCopy, getURL, isEqual, requestPost } from "../../../utils/util";

const Diamond = (props) => {
  const { globalState, dispatch } = useContext(GlobalContext);
  const {
    currHitter,
    currS,
    currB,
    currO,
    currH,
    expeditionTeam,
    homeTeam,
    currInning,
    currTeamLog,
    currAttackTeam,
  } = globalState;

  useEffect(() => {
    const actionBoard = { currHitter, S: currS, B: currB, O: currO, H: currH };
    localStorage.setItem("currHitter", JSON.stringify(actionBoard));
  }, [currS, currB, currH, currO]);

  const resetSB = () => {
    dispatch({ type: "currS", init: true });
    dispatch({ type: "currB", init: true });
  };

  const requestNextHitter = (currHitterLastAction) => {
    const matchId = localStorage.getItem("matchId");

    requestPost(
      getURL(`game/${matchId}/exchange`),
      {
        playerBattingOrder: currHitter.playerBattingOrder,
        teamId: currHitter.teamId,
        playerName: currHitter.name,
        historyList: currHitter.historyList,
        lastAction: currHitterLastAction,
        totalTeamScore: expeditionTeam.totalScore,
      },
      dispatch
    );
  };

  const throwBaseball = () => {
    const { currPitcher } = globalState;
    const actions = ["strike", "strike", "strike"];
    const selectedIndex = parseInt(Math.random() * actions.length);
    alert(`결과: ${actions[selectedIndex]}`); // 일단!!!

    // 도전
    const copyPreStateOfPitcher = { ...currPitcher };
    copyPreStateOfPitcher.pitchCount++;
    dispatch({ type: "currPitcher", ...copyPreStateOfPitcher });

    if (actions[selectedIndex] === "strike") {
      if (currS < 2) {
        // 스트라이크이고, 아웃이 아닐 때
        dispatch({ type: "currS", init: false, payload: 1 });

        const currHitterActionLog = {
          id: currHitter.historyList.length + 1,
          actionName: actions[selectedIndex],
          strike: currS + 1,
          ball: currB,
          out: currO,
        };
        const copyPreStateOfHitter = { ...currHitter };
        copyPreStateOfHitter.historyList.push(currHitterActionLog);

        dispatch({
          type: "currHitter",
          ...copyPreStateOfHitter,
        });
      } else {
        // 스트라이크이고, 아웃일 때

        if (currO < 2) {
          // 스트라이크, 아웃인데 팀 교체X, 선수만 교체
          const copyPreStateOfHitter = { ...currHitter };
          copyPreStateOfHitter.plateAppearances++;
          copyPreStateOfHitter.lastAction = "아웃";
          copyPreStateOfHitter.historyList.push({
            id: currHitter.historyList.length + 1,
            actionName: actions[selectedIndex],
            strike: currS + 1,
            ball: currB,
            out: currO + 1, // db에 보내기 위한 용도로만 해줄 거니까 굳이 상태를 갱신해서 리렌더할 필요가 없음
          });

          dispatch({
            type: "currHitter",
            ...copyPreStateOfHitter,
          });

          resetSB();
          requestNextHitter("아웃");
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
    } else if (actions[selectedIndex] === "ball") {
      if (currB < 3) {
        dispatch({ type: "currB", init: false, payload: 1 });

        const copyPreStateOfHitter = { ...currHitter };
        copyPreStateOfHitter.historyList.push({
          id: currHitter.historyList.length + 1,
          actionName: actions[selectedIndex],
          strike: currS,
          ball: currB + 1,
          out: currO,
        });

        dispatch({
          type: "currHitter",
          ...copyPreStateOfHitter,
        });
      } else {
        alert("볼넷임다~");
        // 지금 타자 진루, 현재 나가있는 선수들도 모두 한칸씩 진루시킴
        // 만약에 홈으로 들어오는 선수가 있으면 현재 팀의 totalScore+1 해줘야 함

        const copyPreStateOfHitter = { ...currHitter };
        copyPreStateOfHitter.plateAppearances++;
        copyPreStateOfHitter.lastAction = "볼넷";
        copyPreStateOfHitter.historyList.push({
          id: currHitter.historyList.length + 1,
          actionName: actions[selectedIndex],
          strike: currS,
          ball: currB + 1,
          out: currO,
        });

        dispatch({
          type: "currHitter",
          ...copyPreStateOfHitter,
        });

        resetSB();
        requestNextHitter("볼넷");

        if (isEqual(currAttackTeam, expeditionTeam)) {
          // 다이아몬드에 있는 선수 중 한명이 홈으로 들어와야지만 totalScore+1
          dispatch({ type: "expeditionTeam", team: { ...expeditionTeam } });
        } else {
          // 다이아몬드에 있는 선수 중 한명이 홈으로 들어와야지만 totalScore+1
          dispatch({ type: "homeTeam", team: { ...homeTeam } });
        }
        // 데이터베이스에 다음 선수 정보 요청, 응답 받음 <- 이때 팀들의 totalScore도 데이터베이스에 저장함
        resetSB();
        // Teams 로직 또 수행 (아마도 필요한 부분만 수행하겟지...?)
      }
    } else if (actions[selectedIndex] === "hit") {
      alert("선수 교체함다~");
      dispatch({ type: "currH", init: false, payload: 1 });
      dispatch({ type: "currH", init: false, payload: 1 });

      const copyPreStateOfHitter = { ...currHitter };
      copyPreStateOfHitter.plateAppearances++;
      copyPreStateOfHitter.hits++;
      copyPreStateOfHitter.lastAction = "안타";
      copyPreStateOfHitter.historyList.push({
        id: currHitter.historyList.length + 1,
        actionName: actions[selectedIndex],
        strike: currS,
        ball: currB,
        out: currO,
      });

      dispatch({
        type: "currHitter",
        ...copyPreStateOfHitter,
      });
      resetSB();
      requestNextHitter("안타");
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
