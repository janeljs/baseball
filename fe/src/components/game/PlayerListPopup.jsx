import React from "react";
import styled from "styled-components";
import PopupTable from "./playerListPopupTable/PopupTable";

const PlayerListPopup = ({ popupState }) => {
  return <div>{popupState.length && popupState.map((team) => <PopupTable team={team} />)}</div>;
};

export default PlayerListPopup;
