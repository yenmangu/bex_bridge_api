import database from '../modules/database.js';

const qScores = database.defineView(
	'Q_Scores',
	{
		Torneo: { primaryKey: true, allowNull: false },
		Board: {},
		CoppiaNS: {},
		CoppiaEO: {},
		N_S: {},
		E_W: {},
		NS: {},
		EW: {},
		Contratto: {},
		Bid: {},
		PlaySeq: {}
	},
	{},
	'Q_Scores'
);
export default qScores;
