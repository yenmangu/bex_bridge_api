import mysql from 'mysql2/promise';
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
	async connect() {
		const pool = await this.getConnectionPool();
		if (!this.establishedConnection) {
			try {
				this.establishedConnection = await pool.getConnection();
				return this.establishedConnection;
			} catch (error) {
				throw error;
			}
		}
		console.log('Connection established: ', this.database);

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
