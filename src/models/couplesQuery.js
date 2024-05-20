import database from '../modules/database';

const qryCoppie = database.defineView(
	'QryCoppie',
	{
		Torneo: {},
		Posizione: {},
		Coppia_: {},
		Coppia: {},
		Media: {},
		Codice1: {},
		Codice2: {},
		Giocatore1: {},
		Giocatore2: {},
		PubtiFIB: {},
		MP2: {},
		Circuito: {}
	},
	null,
	'QryCoppie'
);
export default qryCoppie;
