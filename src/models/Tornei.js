import database from '../modules/database';
const tornei = database.defineModel(
	'Torneo',
	{
		Posizione: {},
		Punti: {},
		Media: {},
		Giocatore: {},
		Punteggio: {},
		Circuito: {},
		Data: {},
		Torneo: {},
		Codice: {},
		CodiceAssoc: {},
		Categoria: {},
		Ladies: {},
		SeniorJunior: {},
		MP2: {},
		SCORE: {},
		dataTorneo: {},
		Swiss: {},
		Eligible: {},
		TeamName: {},
		GiocatoreNum: {},
		StratPlace: {},
		Esterno: {},
		temp: {},
		Coppia: {},
		PuntiFIB: {}
	},
	null,
	null,
	'Tornei'
);
export default tornei;
