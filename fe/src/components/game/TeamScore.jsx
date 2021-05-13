import React from "react";
import styled from "styled-components";
import Badge from "../shared/Badge";

const TeamScore = ({ isMyTeam, isHome, team }) => {
  return (
    <TeamScoreContainer isHome={isHome}>
      <p>{team.totalScore}</p>
      <TeamName>
        <p>{team.name}</p>
        {isMyTeam && <Badge />}
      </TeamName>
    </TeamScoreContainer>
  );
};

export default TeamScore;

const TeamScoreContainer = styled.div`
  display: flex;
  flex-direction: ${({ isHome }) => !isHome && "row-reverse"};
  color: #eee;
  font-size: 70px;
  font-weight: 900;
`;

const TeamName = styled.div`
  width: 250px;
  margin: 0 20px;
  text-align: center;
  position: relative;
`;
