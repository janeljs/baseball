import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../App";
import { getURL } from "../../data";

const Teams = ({ teamSet }) => {
  // const { setMyTeam, setCounterTeam, setHomeTeam, setExpeditionTeam, setCurrHitter, setCurrPitcher, setCurrInning, setCurrTeamLog, setIsResponseDone } = useContext(GlobalContext);
  const { dispatch } = useContext(GlobalContext);

  const setTeams = async (teamName, teamId, idx) => {
    const counterTeamId = idx ? teamSet[0].id : teamSet[1].id;
    const counterTeamName = teamSet[idx ? 0 : 1].name;
    const isHome = idx === 1;
    // const homeTeam = isHome ? { id: teamId, name: teamName } : { id: counterTeamId, name: counterTeamName };

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
    if (innigNumber % 2 && cycle === "수비")
      dispatch({ type: "currAttackTeam", team: JSON.parse(JSON.stringify(expeditionTeam)) });
    if (!innigNumber % 2 && cycle === "공격")
      dispatch({ type: "currAttackTeam", team: JSON.parse(JSON.stringify(homeTeam)) });
    // console.log("/game", mockData);

    // setMyTeam({ id: teamId, name: teamName });
    dispatch({ type: "myTeam", id: teamId, name: teamName });
    // setCounterTeam({ id: counterTeamId, name: counterTeamName });
    dispatch({ type: "counterTeam", id: counterTeamId, name: counterTeamName });
    // setHomeTeam(mockData.homeTeam);
    dispatch({ type: "homeTeam", team: JSON.parse(JSON.stringify(initialGameData.homeTeam)) });
    // setExpeditionTeam(mockData.expeditionTeam);
    dispatch({ type: "expeditionTeam", team: JSON.parse(JSON.stringify(initialGameData.expeditionTeam)) });
    // setCurrPitcher({
    //   role: mockData.pitcher.role,
    //   name: mockData.pitcher.name,
    //   pitchCount: mockData.pitcher.pitchCount,
    // });
    dispatch({
      type: "currPitcher",
      role: initialGameData.pitcher.role,
      name: initialGameData.pitcher.name,
      pitchCount: initialGameData.pitcher.pitchCount,
    });

    // setCurrHitter({
    //   role: mockData.hitter.role,
    //   playerBattingOrder: mockData.nextHitter.playerBattingOrder,
    //   teamId: mockData.nextHitter.teamId,
    //   historyList: [...mockData.nextHitter.historyList],
    //   name: mockData.hitter.name,
    //   plateAppearances: mockData.hitter.plateAppearances,
    //   hits: mockData.hitter.hits,
    //   lastAction: null,
    // });

    dispatch({
      type: "currHitter",
      role: initialGameData.hitter.role,
      playerBattingOrder: initialGameData.nextHitter.playerBattingOrder,
      teamId: initialGameData.nextHitter.teamId,
      historyList: JSON.parse(JSON.stringify(initialGameData.nextHitter.historyList)),
      name: initialGameData.hitter.name,
      plateAppearances: initialGameData.hitter.plateAppearances,
      hits: initialGameData.hitter.hits,
      lastAction: null,
    });

    // setCurrInning(mockData.inning);

    dispatch({
      type: "currInning",
      currInning: JSON.parse(JSON.stringify(initialGameData.inning)),
    });
    // setCurrTeamLog([...mockData.teamLog.playerLog]);
    dispatch({
      type: "currTeamLog",
      currTeamLog: JSON.parse(JSON.stringify(initialGameData.teamLog.playerLog)),
    });

    localStorage.setItem("selectedTeams", JSON.stringify({ myTeam: teamId, counterTeam: counterTeamId }));
    localStorage.setItem("matchId", initialGameData.matchId);

    dispatch({ type: "isResponseDone" });
    // setIsResponseDone(true);
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
