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
    fetch(getURL("totalTeamList"))
      .then((res) => res.json())
      .then((json) => {
        const matchedTeamList = setMatches(json);
        setTeamList(matchedTeamList);
      });
  }, []);

  return (
    <>
      <Title />
      <Message />
      <TeamMatchContainer>
        {teamList.length > 0 &&
          [...teamList].map((teamSet) => {
            return <Teams teamSet={teamSet} />;
          })}
      </TeamMatchContainer>
    </>
  );
};

export default Main;

const TeamMatchContainer = styled.div`
  border: 1px solid red;
  display: flex;
  flex-direction: column;
`;
