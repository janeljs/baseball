import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../App";
import { getURL, deepCopy, requestPost } from "../../utils/util";

const Teams = ({ teamSet }) => {
  const { dispatch } = useContext(GlobalContext);

  const setTeams = async (teamName, teamId, idx) => {
    const counterTeamId = idx ? teamSet[0].id : teamSet[1].id;
    const counterTeamName = teamSet[idx ? 0 : 1].name;
    const isHome = idx === 1;

    requestPost(
      getURL("game"),
      {
        myTeamId: teamId,
        counterTeamId: counterTeamId,
        isHome: isHome,
      },
      dispatch,
      { type: "myTeam", id: teamId, name: teamName },
      { type: "counterTeam", id: counterTeamId, name: counterTeamName }
    );

    localStorage.setItem(
      "selectedTeams",
      JSON.stringify({ myTeam: teamId, counterTeam: counterTeamId })
    );
  };

  return (
    <div>
      {teamSet.map((team, i) => (
        <Link to="/baseballGame" onClick={() => setTeams(team.name, team.id, i)}>
          {team.name}
        </Link>
      ))}
    </div>
  );
};

export default Teams;
