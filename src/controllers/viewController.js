import qGameList from '../models/qGameList.js';
import qGameRank from '../models/qGameRank.js';
import qScores from '../models/qScores.js';
import qPairScore from '../models/qPairScore.js';
import qWinners from '../models/qWinners.js';
import qGamesPlayers from '../models/qGamesPlayers.js';
import qGeneralRecap from '../models/qGeneralRecap.js';
import qGamesRecap from '../models/qGamesRecap.js';
import qPartnersRecap from '../models/qPartnersRecap.js';
import qMonthRecap from '../models/qMonthRecap.js';
import catchAsync from '../utils/catchAsync.js';

function getView(viewString) {
	switch (viewString) {
		case 'qScores':
			return qScores;
		case 'qGameList':
			return qGameList;
		case 'qGameRank':
			return qGameRank;
		case 'qPairScore':
			return qPairScore;
		case 'qWinners':
			return qWinners;
		case 'qGamesPlayers':
			return qGamesPlayers;
		case 'qGeneralRecap':
			return qGeneralRecap;
		case 'qGamesRecap':
			return qGamesRecap;
		case 'qPartnersRecap':
			return qPartnersRecap;
		case 'qMonthRecap':
			return qMonthRecap;
	}
}

export const viewController = catchAsync(async (req, res, next) => {
	try {
		console.log('Req query: ', req.query);
		const query = req.query;

		const { view, all, limit, offset, explain } = query;
		if (!view) {
			return res.status(400).json({ status: 'fail', message: 'No view in query' });
		}
		if (explain) {
			viewFunc.explain();
		}
		const viewModel = getView(view);
		let data;

		let playerArray;
		let playerName;
		let playerCode;
		if (query.player) {
			playerArray = extractPlayerCode(query.player);
			playerCode = playerArray[0];
			playerName = playerArray[1];
		}
		let options;
		if (limit) {
			options = { limit: limit };
		} else {
			options = null;
		}

		if (viewModel === qGameRank || viewModel === qScores) {
			console.log('View is: ', view);

			const tournament = query.torneo;
			data = await viewModel.findAll({ torneo: tournament }, null, null, null);
		} else if (viewModel === qMonthRecap) {
			if (!query.player) {
				return res
					.status(400)
					.json({ status: 'fail', message: 'No player in query' });
			}
			data = await getMonthRecap(query.player);
		} else if (viewModel === qGamesPlayers) {
			console.log('QGamesPlayers');
			if (query.player) {
				data = await viewModel.findOne({ codice: playerCode });
				// return res.status(200).json({ status: 'success' });
			} else {
				data = await viewModel.findAll(null, null, null, options);
			}
		} else if (viewModel === qGamesRecap) {
			data = await viewModel.findAll({ codice: playerCode });
		} else {
			data = await viewModel.findAll(null, null, null, options);
		}

		res
			.status(200)
			.json({ status: 'success', meta: explain ? data[0] : '', data: data });
	} catch (error) {
		return next(error);
	}
});

function extractPlayerCode(combined) {
	let arr = combined.split('-');
	arr.map(e => e.trim());
	return arr;
}

export const gameScoresController = catchAsync(async (req, res, next) => {
	try {
		const { view, limit, offset, explain } = req.query;

		if (!view) {
			return res.status(400).json({ status: 'fail', message: 'No view in query' });
		}
		const viewModel = getView(view);
		if (req.query.torneo) {
			const tournament = req.query.torneo;
			const data = await viewModel.findAll(null, null, { torneo: tournament });
			res.sattus(200).json({ status: 'success', data: data });
		}
	} catch (error) {
		return next(error);
	}
});

async function getMonthRecap(player) {
	try {
		// const playerId = await qGamesPlayers.findOne({ giocatore: player }, null, [
		// 	'codice'
		// ]);
		// console.log('Found player ID: ', playerId);
		// return playerId;
		const queryString = `SELECT Data, COUNT(\*) AS TotalEvents, SUM(puntiFIB) AS MPTotal, SUM(numPair) AS PairEvents, SUM(MpPair) AS MPPair, ROUND(AVG(PctPair), 1) AS PctPair, SUM(numTeam) AS TeamEvents, SUM(MpTeam) AS MPTeams FROM ( SELECT DATE\_FORMAT(DataTorneo, '%Y-%m %M') AS Data, puntiFIB, CASE WHEN Swiss \= 'Y' THEN 1 ELSE NULL END AS numTeam, CASE WHEN Swiss \= 'Y' THEN puntiFIB ELSE NULL END AS MpTeam, CASE WHEN Swiss <> 'Y' THEN 1 ELSE NULL END AS numPair, CASE WHEN Swiss <> 'Y' THEN puntiFIB ELSE NULL END AS MpPair, CASE WHEN Swiss <> 'Y' THEN Media ELSE NULL END AS PctPair FROM Tornei WHERE codice \= "${player}" ) AS x GROUP BY x.Data ORDER BY x.Data DESC;`;
		const response = qMonthRecap.useQueryString(queryString);
		return response;
	} catch (error) {
		throw error;
	}
}

// export const gameListController = catchAsync(async (req, res, next) => {
// 	try {
// 		const { all, limit, offset } = req.query;

// 		console.log('Req query: ', req.query);
// 		if (all) {
// 			const data = await qGameList.findAll(null, { paginate: false });
// 			res.status(200).json({ message: 'success', data: data });
// 		} else {
// 		}

// 		res
// 			.status(200)
// 			.json({ message: 'Route reached', data: { all, limit, offset } });
// 	} catch (error) {
// 		return next(error);
// 	}
// });

// export const gameRankController = catchAsync(async (req, res, next) => {
// 	try {
// 		const { all, limit, offset } = req.query;
// 		if (all) {
// 			const data = await qGameRank.findAll(null, { paginate: false });
// 			res.status(200).json({ message: 'success', data: data });
// 		}
// 	} catch (error) {
// 		return next(error);
// 	}
// });

// export const winnersController = catchAsync(async (req, res, next) => {
// 	try {
// 		const { all, limit, offset } = req.query;
// 		if (all) {
// 			const data = await qWinners.findAll(null, { paginate: false });
// 			res.status(200).json({ message: 'success', data: data });
// 		}
// 	} catch (error) {
// 		return next(error);
// 	}
// });

// export const pairScoreController = catchAsync(async (req, res, next) => {
// 	try {
// 		const { all, limit, offset } = req.query;
// 		if (all) {
// 			const data = await qPairScore.findAll(null, { paginate: true });
// 			res.status(200).json({ message: 'success', data: data });
// 		}
// 	} catch (error) {
// 		return next(error);
// 	}
// });

// export const scoresController = catchAsync(async (req, res, next) => {
// 	try {
// 		const { all, limit, offset } = req.query;
// 		if (all) {
// 			const data = await qScores.findAll(null, { paginate: true });
// 			res.status(200).json({ message: 'success', data: data });
// 		}
// 	} catch (error) {
// 		return next(error);
// 	}
// });
export default { viewController, gameScoresController };
