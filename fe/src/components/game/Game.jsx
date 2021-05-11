import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { GlobalContext } from "../../App";
import Title from "../shared/Title";
import CurrentInningInfo from "./baseballField/CurrentInningInfo";
import Diamond from "./baseballField/Diamond";
// import PitchButton from "./baseballField/PitchButton";
import SBO from "./baseballField/SBO";
import CurrentPlayer from "./CurrentPlayer";
import DetailScorePopup from "./DetailScorePopup";
import PlayerHistory from "./PlayerHistory";
import PlayerListPopup from "./PlayerListPopup";
import TeamScore from "./TeamScore";
import { getURL } from "../../data";

const Game = () => {
  const {
    myTeam,
    counterTeam,
    homeTeam,
    expeditionTeam,
    currPitcher,
    currHitter,
    currInning,
    currTeamLog,
    isResponseDone,
    setIsResponseDone,
  } = useContext(GlobalContext);

  // const isTeamSelected = localStorage.getItem("selectedTeams");
  // if (isTeamSelected) setIsResponseDone(true);

  // 이닝 점수판 이벤트핸들러
  const handleMouseEnterOnPopup = async () => {
    const matchId = localStorage.getItem("matchId");
    const response = await fetch(getURL(`game/${matchId}/detailScore`));
    const detailScore = await response.json();
    console.log(detailScore);
  };

  return (
    <>
      {!isResponseDone ? (
        <div>Loading</div>
      ) : (
        <>
          <GameContainer>
            <GameProgress>
              {/* style-component*/}
              <MainScoreBoard>
                {/* style-component*/}
                <Title />
                <ScoreBox>
                  <TeamScore isHome={false} team={expeditionTeam} />
                  <span>VS</span>
                  <TeamScore isHome team={homeTeam} />
                </ScoreBox>
              </MainScoreBoard>
              <BaseballField>
                {/* style-component*/}
                <SBO />
                <Diamond />
                {/* </Diamond> */}
                <CurrentInningInfo inning={currInning} />
              </BaseballField>
            </GameProgress>

            <PlayerProgress>
              {/* style-component*/}
              <CurrentPlayerContainer>
                {/* style-component*/}
                <CurrentPlayer player={currPitcher} />
                <CurrentPlayer player={currHitter} />
              </CurrentPlayerContainer>
              <PlayerHistoryContainer>
                {/* style-component*/}
                {currTeamLog.length && [...currTeamLog].map((playerLog) => <PlayerHistory history={playerLog} />)}
              </PlayerHistoryContainer>
            </PlayerProgress>
            <TopPopupArea onMouseEnter={handleMouseEnterOnPopup}>
              <DetailScorePopup />
            </TopPopupArea>
            {/* <BottomPopupArea>
              <PlayerListPopup />
            </BottomPopupArea> */}
          </GameContainer>
        </>
      )}
    </>
  );
};

export default Game;

const GameContainer = styled.section`
  display: flex;
  width: 1200px;
  height: 900px;

  border: 1px solid red;
  & div {
    /* border: 1px solid black; */
  }
  position: relative;
`;

const GameProgress = styled.div`
  display: flex;
  width: 80%;
  flex-direction: column;
  border: 1px solid black;
`;

const ScoreBox = styled.div`
  display: flex;
  border: 1px solid black;
`;

const MainScoreBoard = styled.div`
  height: 200px;
  border: 1px solid black;
  // width: 80%;
`;
const BaseballField = styled.div`
  // width: 80%;
  height: 700px;
  display: flex;
  justify-content: space-between;
  border: 1px solid black;
`;

const PlayerProgress = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  border: 1px solid black;
`;
const CurrentPlayerContainer = styled.div`
  height: 200px;
  // width: 20%;
  border: 1px solid black;
`;
const PlayerHistoryContainer = styled.div`
  // width: 20%;
  height: 700px;
  border: 1px solid black;
`;
const TopPopupArea = styled.section`
  width: 1200px;
  height: 900px;
  padding-top: 20px;
  display: flex;
  justify-content: center;
  position: absolute;
  background: rgba(0, 0, 0, 0.9);
  top: -930px;
`;
const BottomPopupArea = styled.section`
  border: 1px solid blue;
  width: 1200px;
  height: 500px;
  position: absolute;
  bottom: -450px;
`;
