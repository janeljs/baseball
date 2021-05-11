import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../App";
import { getURL } from "../../data";

const Teams = ({ teamSet }) => {
  const { setMyTeam, setCounterTeam, setHomeTeam, setExpeditionTeam, setCurrHitter, setCurrPitcher, setCurrInning, setCurrTeamLog, setIsResponseDone } = useContext(GlobalContext);
  const setTeams = async (teamName, teamId, idx) => {
    const counterTeamId = idx ? teamSet[0].id : teamSet[1].id;
    const counterTeamName = teamSet[idx ? 0 : 1].name;
    const isHome = idx === 1;
    const homeTeam = isHome ? { id: teamId, name: teamName } : { id: counterTeamId, name: counterTeamName };

    // 데이터베이스에 현재팀, 반대팀 정보 저장하는 로직 짜기
    const response = await fetch(getURL("game"), {
      method: "post",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        myTeamId: teamId,
        counterTeamId: counterTeamId,
        isHome: isHome,
      }),
    });
    const mockData = await response.json();
    console.log("/game", mockData);

    setMyTeam({ id: teamId, name: teamName });
    setCounterTeam({ id: counterTeamId, name: counterTeamName });
    setHomeTeam(mockData.homeTeam);
    setExpeditionTeam(mockData.expeditionTeam);
    // setCurrGameState([...mockData]);
    setCurrPitcher({
      role: mockData.pitcher.role,
      name: mockData.pitcher.name,
      pitchCount: mockData.pitcher.pitchCount,
    });
    setCurrHitter({
      role: mockData.hitter.role,
      playerBattingOrder: mockData.nextHitter.playerBattingOrder,
      teamId: mockData.nextHitter.teamId,
      historyList: [...mockData.nextHitter.historyList],
      name: mockData.hitter.name,
      plateAppearances: mockData.hitter.plateAppearances,
      hits: mockData.hitter.hits,
      lastAction: null,
    });
    setCurrInning(mockData.inning);
    setCurrTeamLog([...mockData.teamLog.playerLog]);
    localStorage.setItem("selectedTeams", JSON.stringify({ myTeam: teamId, counterTeam: counterTeamId }));
    localStorage.setItem("matchId", mockData.matchId);
    setIsResponseDone(true);
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
