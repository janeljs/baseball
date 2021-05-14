import React, { useContext } from "react";
import styled from "styled-components";
import { GlobalContext } from "../../App";
import { isEqual, scoreParser } from "../../utils/util";

const DetailScorePopup = ({ popupState }) => {
  const { globalState } = useContext(GlobalContext);
  const { currAttackTeam, expeditionTeam, myTeam, homeTeam } = globalState;
  if (popupState.length === 0) return <></>;

  const isMyTeam = (team, i) => team.name === myTeam.name && i === 1;

  const isTotalScore = (i, array) => i === array.length - 1;

  const tableHead = ["", "", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, "R"];
  const [expedition, home] = scoreParser(popupState);
  isEqual(currAttackTeam, expeditionTeam) ? (expedition[0] = "⚾️") : (home[0] = "⚾️");

  return (
    <ScorePopup>
      <ScoreTable>
        {tableHead.map((el, i) => (
          <InningNumber border={i >= 2}>{el}</InningNumber>
        ))}
        {expedition.map((el, i) => (
          <Score
            color={isTotalScore(i, expedition) ? "#eb4833" : isMyTeam(expeditionTeam, i) ? "#3336eb" : "white"}
            weight={i >= 2}
            align={i === 0}
          >
            {el}
          </Score>
        ))}
        {home.map((el, i) => (
          <Score
            color={isTotalScore(i, home) ? "#eb4833" : isMyTeam(homeTeam, i) ? "#3336eb" : "white"}
            weight={i >= 2}
            align={i === 0}
          >
            {el}
          </Score>
        ))}
      </ScoreTable>
    </ScorePopup>
  );
};

export default DetailScorePopup;

const ScorePopup = styled.div`
  width: 1000px;
  height: 170px;
  padding: 25px 60px;
  box-sizing: border-box;
  border: 3px solid #eee;
`;

const ScoreTable = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr repeat(13, 1fr);
`;

const InningNumber = styled.div`
  color: #eee;
  text-align: center;

  font-size: 1.6rem;
  font-weight: 900;
  border-bottom: ${({ border }) => border && "3px solid #eee"};
  padding-bottom: 5px;
`;

const Score = styled.div`
  color: ${({ color }) => color || "#eee"};
  text-align: ${({ align }) => (align ? "right" : "center")};
  font-size: 1.6rem;
  font-weight: ${({ weight }) => (weight ? "900" : "600")};
  padding-top: 15px;
`;
