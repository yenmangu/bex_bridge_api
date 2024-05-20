module.exports = {
	apps: [
		{
			name: 'sql-api',
			script: 'server.js',
			watch: ['./'],
			ignore_watch: ['.git'],
			env_dev: {
				NODE_ENV: 'pre_dev'
			},
			env_production: {
				NODE_ENV: 'production'
			},
			env_test: {
				NODE_ENV: 'test'
			}
		}
	]
};
