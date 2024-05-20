import database from '../modules/database.js';

const qGameList = database.defineView(
	'Q_Game_List',
	{
		torneo: {
			primaryKey: true,
			allowNull: false
		},
		circuito: {},
		Swiss: {},
		Data: {}
	},
	{},
	'Q_Game_List'
);
export default qGameList;
