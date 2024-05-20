class Query {
	constructor() {
		// this.db = db;
		this.query = '';
		this.params = [];
		this.explainFlag = false;
	}
	explain() {
		this.query = 'EXPLAIN ';
		this.explainFlag = true;
		return this;
	}
	select(fields) {
		if (!this.explainFlag) {
			this.query = `SELECT ${fields}`;
		} else {
			this.query += `SELECT ${fields}`;
		}
		return this;
	}
	from(table) {
		this.query += ` FROM ${table}`;
		return this;
	}
	where(conditions) {
		const keys = Object.keys(conditions);
		if (keys.length > 0) {
			this.query += ' WHERE ';
			keys.forEach((key, index) => {
				this.query += `${key} = ?`;
				this.params.push(conditions[key]);
				if (index < keys.length - 1) {
					this.query += ' AND ';
				}
			});
		}
		return this;
	}
	orderBy(field, order = 'ASC') {
		this.query += ` ORDER BY ${field} ${order}`;
		return this;
	}
	limit(limit) {
		this.query += ` LIMIT ${limit}`;
		return this;
	}
	offset(offset) {
		this.query += ` OFFSET ${offset}`;
		return this;
	}
	values(...values) {
		this.params.push(...values);
		return this;
	}
	getQuery() {
		console.log('getQuery initiated');
		console.log('Query: ', this.query, '\nParams: ', this.params);
		const finishedQuery = `${this.query};`;

		return { query: finishedQuery, params: this.params };
	}
	clear() {
		this.params = [];
		return this;
	}

	async findOne(table, condition) {}
}
export default Query;
