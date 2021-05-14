import React, { useContext } from "react";
import styled from "styled-components";
import { GlobalContext } from "../../../App";
import Badge from "../../shared/Badge";

const PopupTable = ({ team }) => {
  const { teamName, user, playerGameScore } = team;
  const { globalState } = useContext(GlobalContext);
  const { currHitter, currPitcher, myTeam } = globalState;
  const isNotPlaying = (playerName) =>
    currPitcher.name !== playerName && currHitter.name !== playerName;

  let [totalPA, totalHits, totalOut] = [0, 0, 0];
  playerGameScore.forEach(({ plateAppearance, hits, out }) => {
    totalPA += plateAppearance;
    totalHits += hits;
    totalOut += out;
  });

  return (
    <Table>
      <TeamName isMyTeam={myTeam.name === teamName}>{teamName}</TeamName>
      <Row>
        {["타자", "타석", "안타", "아웃", "평균"].map((col) => (
          <ColName>{col}</ColName>
        ))}
      </Row>
      {playerGameScore.map((row) => {
        const { playerName, plateAppearance, hits, out, average } = row;
        return (
          <Row isNotPlaying={isNotPlaying(playerName)}>
            <div>{playerName}</div>
            <div>{plateAppearance}</div>
            <div>{hits}</div>
            <div>{out}</div>
            <div>{average}</div>
          </Row>
        );
      })}
      <Row isNotPlaying={true}>
        {["Totals", totalPA, totalHits, totalOut, ""].map((value) => (
          <div>{value}</div>
        ))}
      </Row>
    </Table>
  );
};

export default PopupTable;

const Table = styled.div`
  border: 3px solid #fff;
  color: #fff;
  text-align: center;
  width: 100%;
  & div {
    padding: 10px;
  }
`;

const TeamName = styled.div`
  color: ${({ isMyTeam }) => (isMyTeam ? "blue" : "#fff")};
  font-size: 30px;
  font-weight: bold;
  border-bottom: 3px solid #fff;
`;

const ColName = styled.div`
  color: #ddd;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  color: ${({ isNotPlaying }) => (isNotPlaying ? "#fff" : "red")};
  border-bottom: 1px solid #ddd;
  font-size: 15px;
`;
