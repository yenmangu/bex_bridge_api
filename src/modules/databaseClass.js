import Connection from './connectionClass.js';

import Model from './model.js';
/**
 * Represents an instance of the Database class.
 */
class Database {
	/**
	 *
	 * @param {boolean} root determines if the connection is made with
	 * root admin level, or not. Default to false
	 */
	constructor(root = false) {
		this.connection = new Connection(root);
	}
	/**
	 *
	 * @returns {Promise<import('mysql2/promise').Connection>}
	 */
	async connect() {
		try {
			const connection = await this.connection.connect();
			console.log('Connected to DB');
			return this.connection;
		} catch (error) {
			console.error('Error connecting to the database: ', error);
			throw error;
		}
	}

	defineModel(modelName, columnDefinitions, associations, options, tableName) {
		const newModel = new Model();
		newModel.define;
		const modelInstance = Model.define(
			this.connection,
			modelName,
			columnDefinitions,
			associations,
			options,
			tableName
		);
		return modelInstance;
	}
}
export default Database;
