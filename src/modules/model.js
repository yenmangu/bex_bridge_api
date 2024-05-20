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

	explain() {
		this.query.explain();
	}

	async useQueryString(queryString) {
		try {
			const connection = await this.db.establishedConnection;
			const result = await connection.execute(queryString);
			const [rows, fields] = result;
			return rows;
		} catch (error) {
			throw error;
		}
	}

	/**
	 * @param {Object} [conditions=null]
	 * @param {Object|null} [queryParams=null]
	 * @param {string|string[]} [fields=null] fields to select. if not provided, selects all fields
	 * @param {Object|null} [options=null] Additional options for pagination
	 * @param {boolean} [options.paginate=false]
	 * @param {number} [options.perPage=10]
	 * @param {number} [options.currentPage=10]
	 * @param {boolean} [options.ascend=true]
	 * @param {string} [options.orderField]
	 * @returns {Promise<any[]>}
	 */
	async findAll(
		conditions = null,
		queryParams = null,
		fields = null,
		options = null
	) {
		this.query.clear();
		const dbQuery = this.query;
		if (queryParams) {
			dbQuery.params = queryParams;
		}
		console.log('DB Query after if(queryParams): ', dbQuery);

		let fieldsString = '';
		if (fields) {
			if (Array.isArray(fields)) fieldsString = fields.join(', ');
		} else {
			fieldsString = fields;
		}

		dbQuery.select(fields ? `${fieldsString}` : '*').from(this.table);

		if (conditions) {
			dbQuery.where(conditions);
		}

		if (options) {
			if (options.limit) {
				dbQuery.limit(options.limit);
			}
			if (options.orderBy) {
				if (ascend) {
					dbQuery.orderBy(field);
				} else {
					dbQuery.orderBy(field, 'DESC');
				}
			}
			if (options.paginate) {
				const perPage = perPage || 10;
				const currentPage = currentPage || 1;
				const offset = (currentPage - 1) * perPage;
				dbQuery.limit(perPage).offset(offset);
			}

			if (options.orderBy && options.orderField) {
				if (options.ascend) {
					dbQuery.orderBy(options.orderField);
				} else {
					dbQuery.orderBy(field, 'DESC');
				}
			}
		}

		const { query: queryString, params } = dbQuery.getQuery();

		console.log('QueryString: ', queryString, '\nParams: ', params);

		try {
			const connection = await this.db.establishedConnection;
			let result;
			if (params) {
				result = await connection.execute(queryString, params);
			} else {
				result = await connection.execute(queryString);
			}
			const [rows, fields] = result;
			return rows;
		} catch (error) {
			throw error;
		}
	}

	/**
	 * This uses the `connection.execute(..)` method to leverage the mysql2 prepared stataments
	 * @param {Object} conditions
	 * @param {Object} [queryParams=null]
	 * @param {Array<string>} [fields=null]
	 * @returns {Promise<[]>}
	 */
	async findOne(conditions, queryParams = null, fields = null) {
		this.query.clear();
		if (queryParams) {
			query.params = queryParams;
		}
		if (!conditions) {
			throw new Error('getOne requires at least (1) one condition as parameter');
		}
		let fieldsString = '';
		if (fields) {
			if (Array.isArray(fields)) fieldsString = fields.join(', ');
		} else {
			fieldsString = '*';
		}

		const query = this.query
			.select(fieldsString)
			.from(this.table)
			.where(conditions);
		console.log('Query in findOne: ', query);
		console.log('Conditions in findOne: ', conditions);

		const { query: queryString, params } = query.getQuery();
		console.log('Query Object (this): ', query.getQuery());
		console.log('Params from getQuery(): ', params);

		console.log('Query string: ', queryString);

		try {
			const connection = await this.db.establishedConnection;
			let result;
			if (params) {
				console.log('Executing query with params');

				result = await connection.execute(queryString, params);
			} else {
				result = await connection.execute(queryString);
			}
			const [rows, fields] = result;
			return rows;
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
