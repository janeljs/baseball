import React from "react";
import styled from "styled-components";
import PopupTable from "./playerListPopupTable/PopupTable";

const PlayerListPopup = ({ popupState }) => {
  return (
    <Popup>
      {popupState.map((team) => (
        <PopupTable team={team} />
      ))}
    </Popup>
  );
};

export default PlayerListPopup;

const Popup = styled.div`
  display: flex;
  color: #fff;
  padding: 0 20px;
`;
