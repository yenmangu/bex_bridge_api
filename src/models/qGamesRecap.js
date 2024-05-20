import database from '../modules/database.js';

const qGamesRecap = database.defineView(
	'Q_GamesRecap',
	{
		Giocatore: {},
		Posizione: {},
		Punti: {},
		Media: {},
		FIGB: {},
		Circuito: {},
		Torneo: {},
		Data: {},
		Team: {}
	},
	null,
	'Q_GamesRecap'
);
export default qGamesRecap;
