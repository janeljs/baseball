import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { GlobalContext } from "../../../App";
import ball from "../../../utils/pitchActions/ball";
import hit from "../../../utils/pitchActions/hit";
import strike from "../../../utils/pitchActions/strike";
import { getURL, requestPost } from "../../../utils/util";

const Diamond = (props) => {
  const { globalState, dispatch } = useContext(GlobalContext);
  const { currHitter, currS, currB, currO, currH, expeditionTeam, homeTeam, currAttackTeam, diamondQueue } =
    globalState;

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
    let totalTeamScore = currAttackTeam.totalScore;
    const newDiamondQueue = [...diamondQueue];

    if (currHitterLastAction === "안타" || currHitterLastAction === "볼넷") {
      newDiamondQueue.push(currHitter);
      if (newDiamondQueue.length > 3) {
        newDiamondQueue.shift();
        totalTeamScore++;
        dispatch({
          type: "currAttackTeam",
          team: { ...currAttackTeam, totalScore: currAttackTeam.totalScore + 1 },
        });
      }
    }

    dispatch({
      type: "diamondQueue",
      diamondQueue: newDiamondQueue,
    });

    requestPost(
      getURL(`/${matchId}/exchange`),
      {
        playerBattingOrder: currHitter.playerBattingOrder,
        teamId: currHitter.teamId,
        playerName: currHitter.name,
        historyList: currHitter.historyList,
        lastAction: currHitterLastAction,
        totalTeamScore: totalTeamScore,
      },
      dispatch
    );
  };

  const handlePitch = () => {
    const { currPitcher } = globalState;
    const actions = ["strike", "strike", "strike"];
    const selectedIndex = parseInt(Math.random() * actions.length);
    const pitchResult = actions[selectedIndex];
    alert(`결과: ${pitchResult}`); // 일단!!!

    const copyPreStateOfPitcher = { ...currPitcher };
    copyPreStateOfPitcher.pitchCount++;
    dispatch({ type: "currPitcher", ...copyPreStateOfPitcher });

    if (pitchResult === "strike") {
      strike({ currS, currB, currO }, currHitter, dispatch, resetSB, () => requestNextHitter("아웃"));
      return;
    }
    if (pitchResult === "ball") {
      ball(diamondQueue, currAttackTeam, { currS, currO, currB }, currHitter, dispatch, resetSB, () =>
        requestNextHitter("볼넷")
      );
      return;
    }
    if (pitchResult === "hit") {
      alert("선수 교체함다~");
      hit(diamondQueue, currAttackTeam, { currS, currB, currO }, currHitter, dispatch, resetSB, () =>
        requestNextHitter("안타")
      );
    }
  };

  return (
    <DiamondField>
      <div>다이아몬드 경기장을 넣을 거임</div>
      {/* <PitchButton /> */}
      <button onClick={handlePitch}>pitch</button>
    </DiamondField>
  );
};

export default Diamond;

const DiamondField = styled.div`
  width: 100%;
`;
