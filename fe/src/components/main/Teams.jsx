import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../App";
import { getURL } from "../../data";

const deepCopy = (arg) => JSON.parse(JSON.stringify(arg));

const Teams = ({ teamSet }) => {
  const { dispatch } = useContext(GlobalContext);

  const setTeams = async (teamName, teamId, idx) => {
    const counterTeamId = idx ? teamSet[0].id : teamSet[1].id;
    const counterTeamName = teamSet[idx ? 0 : 1].name;
    const isHome = idx === 1;

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

    const initialGameData = await response.json();
    const { innigNumber, cycle } = initialGameData.inning;
    console.log(initialGameData);

    const { expeditionTeam, homeTeam } = initialGameData;
    if (innigNumber % 2 && cycle === "수비") dispatch({ type: "currAttackTeam", team: deepCopy(expeditionTeam) });
    if (!innigNumber % 2 && cycle === "공격") dispatch({ type: "currAttackTeam", team: deepCopy(homeTeam) });

    [
      { type: "myTeam", id: teamId, name: teamName },
      { type: "counterTeam", id: counterTeamId, name: counterTeamName },
      { type: "homeTeam", team: deepCopy(initialGameData.homeTeam) },
      { type: "expeditionTeam", team: deepCopy(initialGameData.expeditionTeam) },
      {
        type: "currPitcher",
        role: initialGameData.pitcher.role,
        name: initialGameData.pitcher.name,
        pitchCount: initialGameData.pitcher.pitchCount,
      },
      {
        type: "currHitter",
        role: initialGameData.hitter.role,
        playerBattingOrder: initialGameData.nextHitter.playerBattingOrder,
        teamId: initialGameData.nextHitter.teamId,
        historyList: deepCopy(initialGameData.nextHitter.historyList),
        name: initialGameData.hitter.name,
        plateAppearances: initialGameData.hitter.plateAppearances,
        hits: initialGameData.hitter.hits,
        lastAction: null,
      },
      {
        type: "currInning",
        currInning: deepCopy(initialGameData.inning),
      },
      {
        type: "currTeamLog",
        currTeamLog: deepCopy(initialGameData.teamLog.playerLog),
      },
      { type: "isResponseDone" },
    ].forEach((state) => dispatch(state));

    localStorage.setItem("selectedTeams", JSON.stringify({ myTeam: teamId, counterTeam: counterTeamId }));
    localStorage.setItem("matchId", initialGameData.matchId);
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
