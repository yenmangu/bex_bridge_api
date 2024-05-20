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
			// const connection = await this.connection.connect();
			await this.connection.connect();
			console.log('Connected to DB');
			return this.connection;
		} catch (error) {
			console.error('Error connecting to the database: ', error);
			throw error;
		}
	}

	/**
	 *
	 * @param {string} modelName
	 * @param {Object} columnDefinitions
	 * @param {Object} associations
	 * @param {Object} options
	 * @param {string} tableName
	 * @returns {Model}
	 */

	defineModel(modelName, columnDefinitions, associations, options, tableName) {
		const newModel = Model.define(
			this.connection,
			modelName,
			columnDefinitions,
			associations,
			options,
			tableName
		);
		// return newModel;
		return newModel;
	}

	/**
	 *
	 * @param {string} viewName
	 * @param {Object} columnDefinitions
	 * @param {Object} options
	 * @param {string} view
	 * @returns {Model}
	 */

	defineView(viewName, columnDefinitions, options, view) {
		const newView = Model.define(
			this.connection,
			viewName,
			columnDefinitions,
			null,
			options,
			view
		);
		return newView;
	}
}
export default Database;
