import React from "react";
import styled from "styled-components";

const Badge = () => {
  return <MyTeam>MyTeam</MyTeam>;
};

export default Badge;

const MyTeam = styled.div`
  font-size: 20px;
  font-weight: 900;
  color: #eb4833;
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
`;
