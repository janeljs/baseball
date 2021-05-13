import React from "react";
import styled from "styled-components";
import Badge from "../shared/Badge";

const TeamScore = ({ isMyTeam, isHome, team }) => {
  return (
    <TeamScoreContainer isHome={isHome}>
      <p>{team.totalScore}</p>
      <div>
        <p>{team.name}</p>
        {isMyTeam && <Badge />}
      </div>
    </TeamScoreContainer>
  );
};

export default TeamScore;

const TeamScoreContainer = styled.div`
  display: flex;
  flex-direction: ${({ isHome }) => !isHome && "row-reverse"};
`;
