import React, { useContext } from "react";
import styled from "styled-components";
import { GlobalContext } from "../../App";

// history: currTeamLog에 있는 지난 선수들 기록
const PlayerHistory = ({ history }) => {
  // const { currHitter } = useContext(GlobalContext);
  const { globalState } = useContext(GlobalContext);
  const { currHitter } = globalState;
  console.log(currHitter);

  // let currHitterLocal = null;
  // const currHitterInfo = localStorage.getItem("currHitter");
  // if (currHitterInfo) currHitterLocal = currHitterInfo.currHitter;

  const actionType = {
    S: "스트라이크",
    B: "볼",
    H: "안타",
  };

  // 지난 선수들의 마지막 액션
  // => 나중에 서버에서 response로 lastAction값 받을 예정
  // const lastHistory = history.historyList[history.historyList.length - 1];
  // let lastAction = null;
  // if (lastHistory.out === 1) lastAction = "아웃!";
  // else if (lastHistory.ball === 4) lastAction = "볼넷!";
  // else lastAction = "안타!";

  return (
    <PlayerHistoryContainer>
      {/*styled-component*/}
      <CurrPlayer>
        <div>
          {currHitter.playerBattingOrder}번 타자 {currHitter.name}
          {/* {currHitterLocal.playerBattingOrder}번 타자 {currHitterLocal.name} */}
        </div>
        )
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

const CurrPlayer = styled.div``;
const PastPlayers = styled.div``;
