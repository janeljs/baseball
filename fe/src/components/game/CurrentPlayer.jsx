import React, { useContext } from "react";
import { GlobalContext } from "../../App";
import styled from "styled-components";

const CurrentPlayer = ({ playerRole }) => {
  const { globalState } = useContext(GlobalContext);
  const { currHitter, currPitcher } = globalState;

  return (
    <CurrPlayerBox>
      <PlayerRole>{playerRole}</PlayerRole>
      <PlayerInfo>
        <span>{playerRole === "투수" ? currPitcher.name : currHitter.name}</span>
        <span>
          {playerRole === "투수"
            ? `#${currPitcher.pitchCount}`
            : `${currHitter.plateAppearances}타석 ${currHitter.hits}안타`}
        </span>
      </PlayerInfo>
    </CurrPlayerBox>
  );
};

export default CurrentPlayer;

const CurrPlayerBox = styled.div`
  padding: 15px 0;
  font-weight: 700;
`;
const PlayerRole = styled.div`
  font-size: 25px;
  color: #eee;
`;
const PlayerInfo = styled.div`
  font-size: 20px;
  color: #c8e8ee;
  span {
    margin-right: 10px;
  }
`;
