import database from '../modules/database.js';

const qWinners = database.defineView(
	'Q_Winners',
	{
		Circuito: { primaryKey: true, allowNull: false },
		Torneo: {},
		Giocatore: {},
		Giocatore1: {},
		Media: {},
		MP: {},
		Data: {}
	},
	{},
	'Q_Winners'
);

export default qWinners;
