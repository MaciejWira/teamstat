import { PATH_GAMES } from './views/helpers';
import { PATH_PLAYER } from './views/helpers';

import React, { useEffect } from 'react';
import {
  HashRouter,
  Switch,
  Route
} from 'react-router-dom';
import axios from 'axios';

import { useStateValue } from './state/context';

import Game from './views/Game';
import Player from './views/Player';
import { viewsArr } from './views/helpers';
import Header from './components/Header';

const AppCore = () => {

  const [ { players }, dispatch ] = useStateValue();

  useEffect(() => {
    axios.get('/players')
      .then(res => {
        if (JSON.stringify(res.data) !== JSON.stringify(players)){
          dispatch({
            type: 'setPlayers',
            payload: res.data
          });
        }
      })
      .catch(err => console.log(err))
  }, [ players, dispatch ]);

  const routes = viewsArr.map((route, index) => (
    <Route exact={route.isExact} key={index} path={route.path} component={route.component} />
  ));

  return(
    <HashRouter>
      <div className="l-app">
        <div className="b-container b-container--sm">
          <Header />
          <Switch>
            {routes}
            <Route
              path={`${PATH_PLAYER}/:id`}
              component={Player} />
            <Route
              path={`${PATH_GAMES}/:id`}
              component={Game} />
          </Switch>
        </div>
      </div>
    </HashRouter>
  )
};

export default AppCore;
