import Game from './Game';
import Games from './Games';
import Players from './Players';
import Statistics from './Statistics';

export const PATH_GAME = "/";
export const PATH_GAMES = "/games";
export const PATH_PLAYER = "/player";
export const PATH_PLAYERS = "/players-list";
export const PATH_STATISTICS = "/statistics";

export const viewsArr = [
  {
    component: Game,
    name: "Nowy mecz",
    path: PATH_GAME,
    isExact: true
  },
  {
    component: Games,
    name: "Mecze",
    path: PATH_GAMES,
    isExact: true
  },
  {
    component: Players,
    name: "Zawodnicy",
    path: PATH_PLAYERS
  },
  {
    component: Statistics,
    name: "Statystyki",
    path: PATH_STATISTICS
  },
];
