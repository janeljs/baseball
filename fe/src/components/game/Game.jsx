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
import { getURL } from "../../utils/util";

const Game = () => {
  const { globalState } = useContext(GlobalContext);
  const { homeTeam, expeditionTeam, currInning, currTeamLog, isResponseDone } = globalState;
  const { popupState, setPopupState } = useState(null);

  // 이닝 점수판 이벤트핸들러
  const handleMouseEnterOnPopup = async ({ target }, isTop) => {
    const matchId = localStorage.getItem("matchId");
    const urlName = getURL(`game/${matchId}/${isTop ? "detailScore" : "playerListPopUp"}`);
    const translateValue = `translateY(${isTop ? 880 : -880}px)`;

    const response = await fetch(urlName);
    const popupData = await response.json();

    console.log(popupData);

    setPopupState(popupData);

    target.style.transform = translateValue;
    target.style.background = `rgba(0, 0, 0, 0.9)`;
  };

  const handleClickOutOfPopup = () => {};

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
                <CurrentPlayer playerRole="투수" />
                <CurrentPlayer playerRole="타자" />
              </CurrentPlayerContainer>
              <PlayerHistoryContainer>
                {/* style-component*/}
                <PlayerHistory flag="currPlayer" />
                {currTeamLog.length > 0 &&
                  [...currTeamLog]
                    .reverse()
                    .map((playerLog) => <PlayerHistory flag="pastPlayer" history={playerLog} />)}
              </PlayerHistoryContainer>
            </PlayerProgress>
            {/* <TopPopupArea onMouseEnter={(e) => handleMouseEnterOnPopup(e, true)}>
              <DetailScorePopup popupState={popupState} />
            </TopPopupArea>
            <BottomPopupArea>
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
  top: -880px;
  transition: 500ms;
  // top: 0;
`;
const BottomPopupArea = styled.section`
  border: 1px solid blue;
  width: 1200px;
  height: 500px;
  position: absolute;
  bottom: -450px;
`;
