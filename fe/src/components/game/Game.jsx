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
  const { myTeam, homeTeam, expeditionTeam, currInning, currTeamLog, isResponseDone } = globalState;
  const [popupState, setPopupState] = useState([]);
  const [mouseEnterTopState, setMouseEnterTopState] = useState(false);

  // 이닝 점수판 이벤트핸들러
  const handleMouseEnterOnPopup = async (target, isTop) => {
    if (mouseEnterTopState) return;
    setMouseEnterTopState(true);
    const matchId = localStorage.getItem("matchId");
    const urlName = getURL(`/${matchId}/record/${isTop ? "teams" : "players"}`);
    const translateValue = `translateY(${isTop ? 880 : -880}px)`;

    const response = await fetch(urlName);
    const popupData = await response.json();
    setPopupState(popupData);

    target.style.transform = translateValue;
    target.style.background = `rgba(0, 0, 0, 0.9)`;
  };

  const handleClickOutOfPopup = (target) => {
    setMouseEnterTopState(false);
    target.style.transform = `translateY(0px)`;
    target.style.background = `transparent`;
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
                <Title isMain={false} />
                <ScoreBox>
                  <TeamScore isMyTeam={myTeam.name === expeditionTeam.name} isHome={false} team={expeditionTeam} />
                  <span>VS</span>
                  <TeamScore isMyTeam={myTeam.name === homeTeam.name} isHome team={homeTeam} />
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
            <TopPopupArea
              onMouseEnter={({ target }) => handleMouseEnterOnPopup(target, true)}
              onClick={({ target }) => handleClickOutOfPopup(target)}
            >
              {/* <TopPopupArea onMouseEnter={(e) => handleMouseEnterOnPopup(e,
                 true)}> */}
              <DetailScorePopup popupState={popupState} />
            </TopPopupArea>
            {/* <BottomPopupArea onMouseEnter={(e) => handleMouseEnterOnPopup(e, false)}>
              <PlayerListPopup popupState={popupState} />
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
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)),
    url("https://static.vecteezy.com/system/resources/previews/000/236/108/original/baseball-stadium-background-vector.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
`;

const GameProgress = styled.div`
  display: flex;
  width: 80%;
  flex-direction: column;
`;

const ScoreBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 70px;
  position: relative;
  span {
    color: #777;
    font-size: 40px;
    font-weight: 900;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const MainScoreBoard = styled.div`
  height: 200px;
`;
const BaseballField = styled.div`
  height: 700px;
  display: flex;
  justify-content: space-between;
  border-top: 4px solid #777;
  border-right: 4px solid #777;
`;

const PlayerProgress = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
`;
const CurrentPlayerContainer = styled.div`
  box-sizing: border-box;
  height: 200px;
  padding: 20px;
  border-left: 4px solid #777;
  border-bottom: 4px solid #777;
`;
const PlayerHistoryContainer = styled.div`
  height: 700px;
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
  height: 900px;
  position: absolute;
  // bottom: -450px;
`;
