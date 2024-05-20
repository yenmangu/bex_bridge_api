import database from '../modules/database.js';

const qPairScore = database.defineView(
	'Q_PairScore',
	{
		Torneo: { primaryKey: true, allowNull: false },
		Posizione: {},
		Board: {},
		Turno: {},
		Avversari: {},
		Score: {},
		Media: {},
		MP: {},
		PlayedAS: {},
		Contratto: {},
		Bid: {},
		PlaySeq: {}
	},
	{},
	'Q_PairScore'
);
export default qPairScore;
