module.exports = {
	apps: [
		{
			name: 'sql-api',
			script: 'server.js',
			env: {
				NODE_ENV: 'pre_dev'
			},
			watch: true
		}
	]
};
