import app from './app.js';

// const PORT = process.env.NODE_ENV === 'development' ? 4060 : process.env.PORT;
const PORT = process.env.APP_PORT || 4060;

app.listen(PORT, () => {
	console.log('API running on port:', PORT);
});
