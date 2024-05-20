import database from '../modules/database.js';

const qGamesPlayer = database.defineView(
	'Q_GamesPlayer',
	{
		posizione: {},
		codice: {},
		giocatore: {},
		torneo: {},
		media: {},
		circuito: {},
		datatorneo: {},
		temp: {},
		swiss: {}
	},
	null,
	'Q_GamesPlayers'
);
export default qGamesPlayer;
