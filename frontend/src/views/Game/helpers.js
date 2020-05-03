import { dateResetHour } from '../../helpers/dateParsers';

export const initialTeamDetail = {
  name: '',
  id: 0,
  isWinner: false,
  captainId: '',
  score: 0,
  players: []
};

const teams = [
  { name: 'Drużyna 1', id: 1 },
  { name: 'Drużyna 2', id: 2 }
];

const initialTeams = teams.map(team => ({
  ...initialTeamDetail, name: team.name, id: team.id
}));

export const initialGameDetails = {
  date: dateResetHour(new Date()),
  isCrate: false,
  isDraw: false,
  teams: initialTeams
}
