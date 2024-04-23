import Query from './query.js';
class Column {
	constructor(
		name,
		type,
		allowNull = true,
		primaryKey = false,
		defaultValue = null
	) {
		this.name = name;
		this.type = type;
		this.allowNull = null;
		this.primaryKey = primaryKey;
		this.defaultValue = defaultValue;
	}
}
/**
 * Represents a Model class
 */
class Model {
	/**
	 * Creates an instance of the model class, used to define the model of a specific table
	 * @param {string} modelName
	 * @param {string} table
	 * @param {object} columns
	 * @param {object} options
	 * @param {object} associations
	 * @param {string} primaryKey
	 */

	constructor(modelName, table, columns, options, associations, primaryKey, db) {
		this.modelName = modelName;
		this.table = table;
		this.columns = columns;
		this.options = options;
		this.associations = associations;
		this.primaryKey = this.primaryKey;
		this.query = new Query();
	}

	/**
	 *
	 * @param {import('../services/dbConnector.js')} db
	 * @param {string} modelName
	 * @param {Object} columnDefinitions
	 * @param {Object} associations
	 * @param {Object} options
	 * @param {string} tableName
	 * @returns {Class} Newly defined model class
	 *
	 */

	static define(
		db,
		modelName,
		columnDefinitions,
		associations,
		options,
		tableName
	) {
		const columns = {};
		let primaryKey;
		for (const columnName in columnDefinitions) {
			if (Object.hasOwnProperty.call(columnDefinitions, columnName)) {
				const column = columnDefinitions[columnName];
				if (column.primaryKey && column.primaryKey === true) {
					primaryKey = columnName;
				}
				columns[columnName] = { ...column };
			}
		}
		const modelInstance = new Model(
			modelName,
			tableName,
			columns,
			options,
			associations,
			primaryKey
		);
		modelInstance.db = db;
		return modelInstance;
	}

	/**
	 *
	 * @param {any} param
	 * @returns {any} param
	 */
	testMethod(param) {
		return param;
	}

	/**
	 * @param {strin|string[]} [fields=null] fields to select. if not provided, selects all fields
	 * @param {*} [options=null] Additional options for pagination
	 * @param {boolean} [options.paginate=false]
	 * @param {number} [options.perPage=10]
	 * @param {number} [options.currentPage=10]
	 * @param {boolean} [options.ascend=true]
	 * @param {string} [options.orderField]
	 * @returns {Promise<any[]>}
	 */
	async findAll(fields = null, options = null) {
		let fieldsString = '';
		if (fields) {
			if (Array.isArray(fields)) fieldsString = fields.join(', ');
		} else {
			fieldsString = fields;
		}

		const query = this.query
			.select(fields ? `${fieldsString}` : '*')
			.from(this.table);

		if (options) {
			if (options.paginate) {
				const perPage = options.perPage || 10;
				const currentPage = options.currentPage || 1;
				const offset = (currentPage - 1) * perPage;
				query.limit(perPage).offset(offset);
			}

			if (options.orderBy && options.orderField) {
				const field = options.orderField;
				if (options.ascend) {
					query.orderBy(field);
				} else {
					query.orderBy(field, 'DESC');
				}
			}
		}

		const { query: queryString } = query.getQuery();

		console.log('QueryString: ', queryString);

		try {
			const connection = await this.db.establishedConnection;
			const result = connection.query(queryString);
			return result;
		} catch (error) {
			throw error;
		}
	}

	/**
	 * This uses the `connection.execute(..)` method to leverage the mysql2 prepared stataments
	 * @param {*} conditions
	 * @returns {Promise<[]>}
	 */
	async findOne(conditions) {
		if (!conditions) {
			throw new Error('getOne requires at least (1) one condition as parameter');
		}
		const query = this.query.select('*').from(this.table).where(conditions);
		console.log('Query in findOne: ', query);
		console.log('Conditions in findOne: ', conditions);

		const { query: queryString, params } = query.getQuery();

		console.log('Query string: ', queryString);

		try {
			const connection = await this.db.establishedConnection;
			const result = connection.execute(queryString, params);
			return result;
		} catch (error) {
			throw error;
		}
	}

	async updateOne(conditions) {
		try {
		} catch (error) {
			throw error;
		}
	}
}
export default Model;
