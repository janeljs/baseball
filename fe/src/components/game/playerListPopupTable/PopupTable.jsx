import React from "react";
import styled from "styled-components";

const PopupTable = ({ team }) => {
  const { teamName, user, playerGameScore } = team;
  const tableHeads = ["타자", "타석", "안타", "아웃", "평균"];
  return (
    <></>
    // <PopupBox>
    //   <TeamName>{teamName}</TeamName>
    //   <TeamTable>
    //     {tableHeads.map(head => <TeamTableHeadCol>{head}<TeamTableHeadCol/>)}
    //     {playerGameScore.length && playerGameScore.map(player => {
    //         const {playerName, plateAppearance, hits, out, average} = player
    //         return (
    //             <>
    //             <TeamTableCol>{playerName}</TeamTableCol>
    //             <TeamTableCol>{plateAppearance}</TeamTableCol>
    //             <TeamTableCol>{hits}</TeamTableCol>
    //             <TeamTableCol>{out}</TeamTableCol>
    //             <TeamTableCol>{average}</TeamTableCol>
    //             </>
    //         )
    //     })}
    //   </TeamTable>
    // </PopupBox>
  );
};

const PopupBox = styled.div``;

const TeamName = styled.div``;

const TeamTable = styled.ul``;

const TeamTableCol = styled.li``;

const TeamTableHeadCol = styled.li``;

export default PopupTable;
