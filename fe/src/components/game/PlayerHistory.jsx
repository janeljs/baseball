import React, { useContext } from "react";
import styled from "styled-components";
import { GlobalContext } from "../../App";
import { actionType } from "../../utils/util";

// history: currTeamLog에 있는 지난 선수들 기록
const PlayerHistory = ({ flag, history }) => {
  const { globalState } = useContext(GlobalContext);
  const { currHitter } = globalState;

  // let currHitterLocal = null;
  // const currHitterInfo = localStorage.getItem("currHitter");
  // if (currHitterInfo) currHitterLocal = currHitterInfo.currHitter;

  return (
    <PlayerHistoryContainer>
      {flag === "currPlayer" ? (
        <CurrPlayer>
          <div>
            {currHitter.playerBattingOrder}번 타자 {currHitter.name}
          </div>
          <PlayerLog>
            {currHitter.historyList.length > 0 &&
              [...currHitter.historyList].map((historyLog, i) => {
                return (
                  <li>
                    <LogNumber>{i + 1}</LogNumber>
                    <ActionName>{actionType[historyLog.actionName]}</ActionName>
                    <span>
                      S{historyLog.strike} B{historyLog.ball}
                    </span>
                  </li>
                );
              })}
          </PlayerLog>
        </CurrPlayer>
      ) : (
        <PastPlayers>
          <div>
            {history.playerBattingOrder}번 타자 {history.playerName}
          </div>
          <LastAction>{history.lastAction}!</LastAction>
          <PlayerLog>
            {history.historyList.length > 0 &&
              [...history.historyList].map((historyLog, i) => {
                return (
                  <li>
                    <LogNumber>{i + 1}</LogNumber>
                    <ActionName>{actionType[historyLog.actionName]}</ActionName>
                    <span>
                      S{historyLog.strike} B{historyLog.ball}
                    </span>
                  </li>
                );
              })}
          </PlayerLog>
        </PastPlayers>
      )}
      {/* pastPlayer, currPlayer를 공통된 컴포넌트로 만들 수 있을듯 */}
    </PlayerHistoryContainer>
  );
};

export default PlayerHistory;

const PlayerHistoryContainer = styled.div`
  padding: 15px 20px;
`;

const CurrPlayer = styled.div`
  & > div:first-child {
    font-size: 20px;
    font-weight: 700;
    color: #eb4833;
  }
`;
const PastPlayers = styled.div`
  & > div:first-child {
    font-size: 20px;
    font-weight: 700;
    color: #c8e8ee;
  }
`;
const LastAction = styled.div`
  padding: 8px;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  color: #509dbb;
`;
const PlayerLog = styled.ul`
  display: flex;
  flex-direction: column-reverse;
  color: #fff;
  li {
    display: flex;
    padding-top: 8px;
  }
`;

const LogNumber = styled.div`
  box-sizing: border-box;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  padding-top: 3px;
  background: #fff;
  font-weight: 900;
  color: #333;
  text-align: center;
`;

const ActionName = styled.div`
  width: 120px;
  height: 20px;
  text-align: center;
`;
