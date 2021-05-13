import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../App";
import { getURL, requestPost } from "../../utils/util";

const Teams = ({ teamSet, order }) => {
  const { dispatch } = useContext(GlobalContext);

  const setTeams = async (teamName, teamId, idx) => {
    const counterTeamId = idx ? teamSet[0].id : teamSet[1].id;
    const counterTeamName = teamSet[idx ? 0 : 1].name;
    const isHome = idx === 1;

    requestPost(
      getURL("/"),
      {
        myTeamId: teamId,
        counterTeamId: counterTeamId,
        isHome: isHome,
      },
      dispatch,
      { type: "myTeam", id: teamId, name: teamName },
      { type: "counterTeam", id: counterTeamId, name: counterTeamName }
    );

    localStorage.setItem("selectedTeams", JSON.stringify({ myTeam: teamId, counterTeam: counterTeamId }));
  };

  return (
    <TeamNameBox>
      <GameNumber>GAME {order + 1}</GameNumber>
      {teamSet.map((team, i) => (
        <>
          {i === 1 && <Vs>VS</Vs>}
          <Link to="/baseballGame" style={{ textDecoration: "none" }} onClick={() => setTeams(team.name, team.id, i)}>
            <TeamName>{team.name}</TeamName>
          </Link>
        </>
      ))}
    </TeamNameBox>
  );
};

export default Teams;

const TeamNameBox = styled.div`
  position: relative;
  padding: 45px 45px 20px;
  border-radius: 20px;
  margin-bottom: 30px;

  background: #ddd;
  display: flex;
  justify-content: space-between;
`;

const GameNumber = styled.span`
  position: absolute;
  top: 15px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 18px;
  color: #eb4833;
`;

const TeamName = styled.div`
  width: 140px;
  font-size: 35px;
  font-weight: 700;
  color: #333;
  text-align: center;
  &:hover {
    color: #eb4833;
  }
`;

const Vs = styled.span`
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 30px;
  font-weight: 900;
  color: #666;
`;
