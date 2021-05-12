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
                    <span>{i + 1}</span>
                    <span>{actionType[historyLog.actionName]}</span>
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
          <div>{history.lastAction}</div>
          <PlayerLog>
            {history.historyList.length > 0 &&
              [...history.historyList].map((historyLog, i) => {
                return (
                  <li>
                    <span>{i + 1}</span>
                    <span>{actionType[historyLog.actionName]}</span>
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

const PlayerHistoryContainer = styled.div``;

const PlayerLog = styled.ul`
  display: flex;
  flex-direction: column-reverse;
`;

const CurrPlayer = styled.div`
  border: 1px solid blue;
`;
const PastPlayers = styled.div`
  border: 1px solid red;
`;
