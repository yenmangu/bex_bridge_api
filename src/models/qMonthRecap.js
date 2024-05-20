import database from '../modules/database.js';

const qMonthRecap = database.defineView(
	'Q_MonthRecap',
	{
		Data: {},
		TotalEvents: {},
		MPTotal: {},
		PairEvents: {},
		MPPair: {},
		PctPair: {},
		TeamEvents: {},
		MPTeams: {}
	},
	null,
	'Q_MonthRecap'
);
export default qMonthRecap;
