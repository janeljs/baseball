import React, { useContext } from "react";
// import { detailScoreData } from "../../data";
import styled from "styled-components";
import { GlobalContext } from "../../App";
import { isEqual, scoreParser } from "../../utils/util";

const DetailScorePopup = ({ popupState }) => {
  // console.log(popupState);

  const { globalState } = useContext(GlobalContext);
  const { currAttackTeam, expeditionTeam } = globalState;

  const tableHead = ["", "", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, "R"];

  const [expedition, home] = scoreParser(popupState);

  isEqual(currAttackTeam, expeditionTeam) ? (expedition[0] = "⚾️") : (home[0] = "⚾️");

  // console.log(expedition, home);
  // const expedition = ["⚾️", "Captain", 1, 0, 0, 0, "", "", "", "", "", "", "", "", "1"];
  // const home = ["", "Marvel", 1, 2, 2, "", "", "", "", "", "", "", "", "", "5"];

  return (
    <ScorePopup>
      <ScoreTable>
        {tableHead.map((e, i) => (
          <InningNumber border={i >= 2}>{e}</InningNumber>
        ))}
        {expedition.map((e, i) => (
          <Score color={i === expedition.length - 1 && "red"} weight={i >= 2} align={i === 0}>
            {e}
          </Score>
        ))}
        {home.map((e, i) => (
          <Score color={i === expedition.length - 1 && "red"} weight={i >= 2} align={i === 0}>
            {e}
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
  border: 3px solid white;
`;

const ScoreTable = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr repeat(13, 1fr);
  /* gap: 5px; */
`;

const InningNumber = styled.div`
  color: #fff;
  /* outline: 1px solid gold; */
  text-align: center;

  font-size: 1.6rem;
  font-weight: 900;
  border-bottom: ${({ border }) => border && "3px solid #fff"};
  padding-bottom: 5px;
`;

const Score = styled.div`
  color: ${({ color }) => color || "#fff"};
  text-align: ${({ align }) => (align ? "right" : "center")};
  font-size: 1.6rem;
  font-weight: ${({ weight }) => (weight ? "900" : "600")};
  padding-top: 15px;
`;
