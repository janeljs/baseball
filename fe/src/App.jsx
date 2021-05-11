import React, { useReducer, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import "./reset.css";
import Main from "./components/main/Main";
import Game from "./components/game/Game";
import reducer from "./components/shared/reducer";

export const GlobalContext = React.createContext();

const initialValue = {
  myTeam: null,
  counterTeam: null,
  homeTeam: null,
  expeditionTeam: null,
  currInning: null,
  currPitcher: null,
  currHitter: null,
  currTeamLog: null,
  currS: 0,
  currB: 0,
  currH: 0,
  currO: 0,
  isResponseDone: false,
  currAttackTeam: null,
};

function App() {
  const [globalState, dispatch] = useReducer(reducer, initialValue);

  const baseballState = {
    teamInfo: {
      globalState,
      dispatch,
    },
  };
  return (
    <GlobalContext.Provider value={baseballState.teamInfo}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="/baseballGame">
            <Game />
          </Route>
        </Switch>
      </Router>
    </GlobalContext.Provider>
  );
}

export default App;
