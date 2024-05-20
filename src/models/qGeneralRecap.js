import database from '../modules/database.js';

const qGeneralRecap = database.defineView('Q_GeneralRecap', {
	Circuito: {},
	Tornei: {},
	Punti: {},
	Media: {},
	FIGB: {}
});
export default qGeneralRecap;
