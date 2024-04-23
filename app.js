import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import dotenv from 'dotenv';
dotenv.config({ path: path.join(path.resolve(__dirname), '/.env') });
import bodyParser from 'body-parser';
import morgan from 'morgan';
import catchAsync from './src/utils/catchAsync.js';
import AppError from './src/utils/appError.js';
import globalErrorHandler from './src/controllers/errorController.js';
import database from './src/modules/database.js';
import { testRouter } from './src/routes/testRoutes.js';
import dbRouter from './src/routes/routes.js';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

database
	.connect()
	.then(() => {
		console.log('Database connection initialised');
	})
	.catch(err => {
		console.error('Error initialising database connection: ', err);
		process.exit(1);
	});

app.use(morgan('dev'));
app.use('/sql/test-routes', testRouter);
app.use('/sql/test', (req, res, next) => {
	res.send('Reached TEST');
});
app.use('/sql/database', dbRouter);

app.use(
	'*',
	catchAsync(async (req, res, next) => {
		throw new AppError(`Can't find '${req.originalUrl}' on this server.`, 404);
	})
);

app.use(globalErrorHandler);

export default app;
