import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { GlobalContext } from "../../../App";
import ball from "../../../utils/pitchActions/ball";
import hit from "../../../utils/pitchActions/hit";
import strike from "../../../utils/pitchActions/strike";
import { getURL, requestPost } from "../../../utils/util";

const Diamond = () => {
  const { globalState, dispatch } = useContext(GlobalContext);
  const { currHitter, currS, currB, currO, currH, currAttackTeam, diamondQueue } = globalState;
  let displayingQueue = [];

  useEffect(() => {
    const actionBoard = { currHitter, S: currS, B: currB, O: currO, H: currH };
    localStorage.setItem("currHitter", JSON.stringify(actionBoard));
  }, [currS, currB, currH, currO]);

  const resetSB = () => {
    dispatch({ type: "currS", init: true });
    dispatch({ type: "currB", init: true });
  };

  const locatePlayers = (queue) => {
    let diamondLocation = 1;
    for (let i = queue.length - 1; i >= 0; i--) {
      queue[i].location = diamondLocation;
      diamondLocation++;
    }
    return queue;
  };

  const requestNextHitter = (currHitterLastAction) => {
    const matchId = localStorage.getItem("matchId");
    let totalTeamScore = currAttackTeam.totalScore;
    let newDiamondQueue = [...diamondQueue];
    // console.log(displayingQueue);
    if (currHitterLastAction === "안타" || currHitterLastAction === "볼넷") {
      newDiamondQueue.push(currHitter);
      displayingQueue.push(currHitter);
      displayingQueue = locatePlayers(newDiamondQueue);
      console.log(displayingQueue);
      if (newDiamondQueue.length > 3) {
        newDiamondQueue.shift();
        totalTeamScore++;
        dispatch({
          type: "currAttackTeam",
          team: { ...currAttackTeam, totalScore: currAttackTeam.totalScore + 1 },
        });
      }
      if (displayingQueue.length > 4) {
        displayingQueue.shift();
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
    const actions = ["hit", "strike", "strike", "strike", "ball", "ball", "ball"];
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
      <Field>
        <Plate></Plate>
        <Base1></Base1>
        <Base2></Base2>
        <Base3></Base3>
      </Field>
      <Player location={0}>{currHitter.name}</Player>
      {diamondQueue.map((player) => (
        <Player location={player.location}>{player.name}</Player>
      ))}
      <PitchButton onClick={handlePitch}>PITCH</PitchButton>
    </DiamondField>
  );
};

export default Diamond;

const DiamondField = styled.div`
  width: 100%;
  position: relative;
`;

const Field = styled.div`
  outline: 5px solid olive;
  width: 454px;
  height: 398px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 200px) rotate(-35.6deg) skew(32deg, 13deg) scale(0.9);
`;

const Plate = styled.div`
  width: 45px;
  height: 40px;
  background: #ddd;
  position: absolute;
  top: 372px;
  left: -14px;
`;

const Base1 = styled.div`
  width: 33px;
  height: 33px;
  border-radius: 50%;
  background: gold;
  position: absolute;
  top: 378px;
  left: 435px;
`;
const Base2 = styled.div`
  width: 33px;
  height: 33px;
  border-radius: 50%;
  background: orange;
  position: absolute;
  top: -16px;
  left: 437px;
`;
const Base3 = styled.div`
  width: 33px;
  height: 33px;
  border-radius: 50%;
  background: #eb4833;
  position: absolute;
  top: -14px;
  left: -13px;
`;

const Player = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  box-sizing: border-box;
  padding-top: 10px;
  background: #2626dd;
  font-size: 10px;
  text-align: center;
  color: #fff;
  top: ${({ location }) => (location === 2 ? "208px" : location === 4 || location === 0 ? "528px" : "369px")};
  left: ${({ location }) => (location === 1 ? "688px" : location === 2 ? "303px" : location === 3 ? "-79px" : "309px")};
  transition: 300ms;
`;

const PitchButton = styled.button`
  background: transparent;
  outline: none;
  border: 3px solid #eee;
  border-radius: 10px;

  font-size: 40px;
  color: #eee;
  cursor: pointer;

  position: absolute;
  left: 50%;
  transform: translate(-50%, 400px);
`;
