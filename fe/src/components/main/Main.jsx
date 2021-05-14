import { useEffect, useState } from "react";
import styled from "styled-components";
import Title from "../shared/Title";
import Message from "./Message";
import Teams from "./Teams";
import { getURL } from "../../utils/util";

const setMatches = (teamList) => {
  const result = [];
  let match = [];
  while (teamList.length) {
    if (match.length < 2) {
      const i = parseInt(Math.random() * teamList.length);
      match.push(teamList[i]);
      teamList.splice(i, 1);
    }
    if (match.length >= 2) {
      result.push(match);
      match = [];
    }
  }
  return result;
};

const Main = () => {
  const [teamList, setTeamList] = useState([]);

  useEffect(() => {
    fetch(getURL("teams"))
      .then((res) => res.json())
      .then((json) => {
        const matchedTeamList = setMatches(json);
        setTeamList(matchedTeamList);
      });
  }, []);

  return (
    <MainContainer>
      <Title isMain={true} />
      <Message />
      <TeamMatchContainer>
        {teamList.length > 0 &&
          [...teamList].map((teamSet, i) => {
            return <Teams teamSet={teamSet} order={i} />;
          })}
      </TeamMatchContainer>
    </MainContainer>
  );
};

export default Main;

const MainContainer = styled.div`
  box-sizing: border-box;
  width: 1200px;
  height: 900px;
  padding: 30px;
  position: relative;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)),
    url("https://static.vecteezy.com/system/resources/previews/000/236/108/original/baseball-stadium-background-vector.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const TeamMatchContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 500px;
  display: flex;
  flex-direction: column;
`;
