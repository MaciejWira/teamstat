import Game from './Game';
import Players from './Players';

export const viewsArr = [
  {
    component: Game,
    name: "Mecze",
    path: '/',
    isExact: true
  },
  {
    component: Players,
    name: "Zawodnicy", 
    path: '/players'
  },
];
