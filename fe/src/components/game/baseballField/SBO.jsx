import React, { useContext } from "react";
import styled from "styled-components";
import { GlobalContext } from "../../../App";

const SBO = (props) => {
  const { globalState } = useContext(GlobalContext);
  const { currS, currB, currO } = globalState;

  return (
    <ul>
      <SBOItem>
        <SBOKind>S</SBOKind>
        <SBOCount>{Array.from({ length: currS }).map(() => "🟡")}</SBOCount>
      </SBOItem>
      <SBOItem>
        <SBOKind>B</SBOKind>
        <SBOCount>{Array.from({ length: currB }).map(() => "🟢")}</SBOCount>
      </SBOItem>
      <SBOItem>
        <SBOKind>O</SBOKind>
        <SBOCount>{Array.from({ length: currO }).map(() => "🔴")}</SBOCount>
      </SBOItem>
    </ul>
  );
};

export default SBO;

const SBOItem = styled.li`
  display: flex;
  & div {
    height: 20px;
  }
`;

const SBOKind = styled.div`
  width: 20px;
  text-align: center;
`;

const SBOCount = styled.div`
  width: 80px;
`;
