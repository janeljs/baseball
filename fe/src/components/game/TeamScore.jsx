import React from "react";
import styled from "styled-components";

const TeamScore = ({ isMyTeam, isHome, team }) => {
  return (
    <TeamScoreContainer>
      <p>{team.totalScore}</p>
      <div>
        <p>{team.name}</p>
        {isMyTeam && <p>myteam</p>}
      </div>
    </TeamScoreContainer>
  );
};

export default TeamScore;

const TeamScoreContainer = styled.div`
  display: flex;
  flex-direction: ${({ isHome }) => !isHome && "row-reverse"};
`;
