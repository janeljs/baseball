import React, { useContext } from "react";
import styled from "styled-components";
import { GlobalContext } from "../../../App";

const ballColor = {
  S: "#E2CF2D",
  B: "#3F8720",
  O: "#BB352B",
};

const SBO = () => {
  const { globalState } = useContext(GlobalContext);
  const { currS, currB, currO } = globalState;

  return (
    <SBOList>
      <SBOItem>
        <SBOKind>S</SBOKind>
        <SBOCount>
          {Array.from({ length: currS }).map(() => (
            <SBOBall color={ballColor.S}></SBOBall>
          ))}
        </SBOCount>
      </SBOItem>
      <SBOItem>
        <SBOKind>B</SBOKind>
        <SBOCount>
          {Array.from({ length: currB }).map(() => (
            <SBOBall color={ballColor.B}></SBOBall>
          ))}
        </SBOCount>
      </SBOItem>
      <SBOItem>
        <SBOKind>O</SBOKind>
        <SBOCount>
          {Array.from({ length: currO }).map(() => (
            <SBOBall color={ballColor.O}></SBOBall>
          ))}
        </SBOCount>
      </SBOItem>
    </SBOList>
  );
};

export default SBO;

const SBOList = styled.ul`
  padding: 20px 10px;
`;

const SBOItem = styled.li`
  display: flex;
`;

const SBOKind = styled.div`
  width: 40px;
  font-size: 30px;
  color: #eee;
  font-weight: 900;
  text-align: center;
`;

const SBOCount = styled.div`
  width: 100px;
  display: flex;
`;

const SBOBall = styled.div`
  width: 23px;
  height: 23px;
  margin-right: 8px;
  border-radius: 50%;
  background: ${({ color }) => color};
`;
