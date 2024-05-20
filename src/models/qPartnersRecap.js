import database from '../modules/database.js';

const qPartnersRecap = database.defineView(
	'Q_PartnersRecap',
	{
		Giocatore: {},
		Tornei: {},
		Punti: {},
		Media: {},
		FIGB: {}
	},
	null,
	'Q_PartnersRecap'
);
export default qPartnersRecap;
