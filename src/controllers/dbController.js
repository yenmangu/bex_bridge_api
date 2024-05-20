import Connection from '../services/dbConnector.js';
import catchAsync from '../utils/catchAsync.js';
import card from '../models/carte.js';
const db = new Connection();

/**
 * manageQuery()
 * @param {import('mysql2').Connection} connection
 * @param {string} tableName
 * @returns {Promise<array>}
 * @throws {Error}
 */
const manageQuery = async (connection, tableName) => {
	const sql = `SELECT * FROM ${tableName}`;
	try {
		const [rows, fields] = await connection.execute(sql);
		// console.log('Result: ', result);
		return [rows, fields];
	} catch (error) {
		throw error;
	} finally {
		await db.drop();
	}
};
/**
 * manageConnections()
 * @param {string} tableName
 * @returns {Promise<Array>}
 */
const manageConnections = async tableName => {
	try {
		const connection = await db.connection();
		return manageQuery(connection, tableName);
	} catch (error) {
		throw error;
	} finally {
		await db.drop();
	}
};
/**
 * routeHandler()
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const routeHandler = catchAsync(async (req, res, next) => {
	try {
		const tableName = 'Carte';

		const [rows, fields] = await manageConnections(tableName);

		const fieldNames = fields.map(field => field.name);
		res.setHeader('Content-Type', 'application/json');
		res.status(200).json({ status: 'success', fieldNames });
	} catch (error) {
		return next(error);
	}
});

/**
 * @param {import('express').Request} req
 * @param {import('express')}
 */
const testGetCards = catchAsync(async (req, res, next) => {
	try {
		const condition = '2024-04-10 #34049 Pairs MEDITERRANEO';
		const result = await card.findOne({ torneo: condition });

		res.status(200).json({ status: 'success', data: result });
	} catch (error) {
		return next(error);
	}
});

const testGetAll = catchAsync(async (req, res, next) => {
	try {
		card.explain();
		const result = await card.findAll(null, { paginate: true });
		res.status(200).json({ status: 'success', data: result });
	} catch (error) {
		return next(error);
	}
});

export { routeHandler, testGetCards, testGetAll };
