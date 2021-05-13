import React from "react";
import styled from "styled-components";
const CurrentInningInfo = ({ inning }) => {
  return (
    <InningInfoBox>
      <p>{`${inning.inningNumber}회${inning.cycle} ${inning.role}`}</p>
    </InningInfoBox>
  );
};

export default CurrentInningInfo;

const InningInfoBox = styled.div`
  /* outline: 1px solid #fff; */
  width: 220px;
  padding: 20px 15px;
  box-sizing: border-box;
  font-size: 25px;
  font-weight: 700;
  color: #eee;
  text-align: center;
`;
