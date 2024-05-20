import database from '../modules/database.js';

const qGameRank = database.defineView(
	'Q_Game_Rank',
	{
		Torneo: {
			primaryKey: true,
			allowNull: false
		},
		Posiz: {},
		Giocatore: {},
		Giocatore1: {},
		Media: {},
		Score: {},
		MP2: {},
		Circuito: {},
		Coppia: {}
	},
	{},
	'Q_Game_Rank'
);
export default qGameRank;
