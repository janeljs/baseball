import React, { useContext } from "react";
import { GlobalContext } from "../../App";

const CurrentPlayer = ({ playerRole }) => {
  const { globalState } = useContext(GlobalContext);
  const { currHitter, currPitcher } = globalState;

  return (
    <div>
      <div>{playerRole}</div>
      <div>
        <span>{playerRole === "투수" ? currPitcher.name : currHitter.name}</span>
        <span>
          {playerRole === "투수"
            ? `#${currPitcher.pitchCount}`
            : `${currHitter.plateAppearances}타석 ${currHitter.hits}안타`}
        </span>
      </div>
    </div>
  );
};

export default CurrentPlayer;
