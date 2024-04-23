import path from 'path';
import { fileURLToPath } from 'url';
import { configDotenv } from 'dotenv';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
configDotenv({ path: path.join(path.resolve(__dirname, '..', '..'), '/.env') });
// const mysql = require('mysql2/promise');
import mysql from 'mysql2/promise';

import Model from '../modules/model.js';
// console.log('environment: ', process.env);

const config = {
	user: 'rob',
	password: 'velvetOaks_01',
	database: 'bex_test',
	host: process.env.DB_HOST_DEV
};

/**
 * Represents a database connection manager
 */
class Connection {
	/**
	 * Creates an instance of DB
	 * @param {boolean} [root=false] - Indicates whether to use root credentials
	 */
	constructor(root = false) {
		/** @type {import('mysql2/promise').Pool} */
		this.connectionPool = null;
		/** @type {import('mysql2/promise').Connection} */
		this.establishedConnection = null;
		this.database = process.env.DB_DEV;
		this.user = root ? process.env.ROB_ADMIN : process.env.DB_USER;
		this.password = root ? process.env.ROB_PASS : process.env.DB_PASS;
		this.host = process.env.DB_HOST_DEV;
	}
	/**
	 *
	 * @returns {Promise<import('mysql2/promise').Pool>}
	 */
	async getConnectionPool() {
		try {
			if (!this.connectionPool) {
				this.connectionPool = await mysql.createPool({
					host: this.host,
					user: this.user,
					password: this.password,
					database: this.database
				});
				console.log('Connection pool created');
			}
			return this.connectionPool;
		} catch (error) {
			throw error;
		}
	}
	/**
	 * Obtains a connection from the pool.
	 * @returns {Promise<import('mysql2/promise').Connection>}
	 * @throws {Error} If there's an error obtaining the connection.
	 */
	async connection() {
		const pool = await this.getConnectionPool();
		if (!this.establishedConnection) {
			try {
				this.establishedConnection = await pool.getConnection();
				console.log('Connection established');
			} catch (error) {
				throw error;
			}
		}

		return this.establishedConnection;
	}
	/**
	 * Releases the established connection back to the pool.
	 */
	async drop() {
		if (this.establishedConnection) {
			this.establishedConnection.release();
			this.establishedConnection = null;
		}
	}

	/**
	 *
	 * @param {import('./dbModel')} modelName
	 * @param {*} columnDefinitions
	 * @param {*} associations
	 * @param {*} options
	 * @param {*} tableName
	 * @returns
	 */

	// model(modelName, columnDefinitions, associations, options, tableName) {
	// 	return Model.define(
	// 		this,
	// 		modelName,
	// 		columnDefinitions,
	// 		associations,
	// 		options,
	// 		tableName
	// 	);
	// }
}
export default Connection;
