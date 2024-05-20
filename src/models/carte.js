import database from '../modules/database.js';
/**
 *
 */
const card = database.defineModel(
	'Cards',
	{
		torneo: {
			primaryKey: true,
			allowNull: false
		},
		carte: {
			allowNull: false
		},
		GIB: {
			allowNull: false
		}
	},
	{},
	{},
	'Carte'
);

export default card;
