import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import dotenv from 'dotenv';
dotenv.config({ path: path.join(path.resolve(__dirname), '/.env') });
import bodyParser from 'body-parser';
// import morgan from './src/utils/morganLogging.js';
import cors from 'cors';
import morgan from 'morgan';
import catchAsync from './src/utils/catchAsync.js';
import AppError from './src/utils/appError.js';
import globalErrorHandler from './src/controllers/errorController.js';
import database from './src/modules/database.js';
import { testRouter } from './src/routes/testRoutes.js';
import { dbRouter } from './src/routes/routes.js';

const app = express();

const allowedOrigin = process.env.ORIGIN;
const devOrigin = process.env.DEV_ORIGIN;
const localHost = 'http://localhost:4200';

const originArray = [allowedOrigin, devOrigin, localHost];

const corsOptions = {
	optionsSuccessStatus: 200,
	origin: function (origin, callback) {
		if (originArray.includes(origin) || !origin) {
			callback(null, true);
		} else {
			callback(new Error('Unauthorized Orgin'));
		}
	},
	exposedHeaders: ['X-Filename', 'Filename']
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

morgan.token('resSize', function (req, res) {
	return res.get('content-length');
});
morgan.format(
	'custom',
	'\x1b[0;36m:method\x1b[0m :url \x1b[0;35m:status\x1b[0m :res[content-length] bytes - :response-time ms'
);

database
	.connect()
	.then(() => {
		console.log('Database connection initialised');
	})
	.catch(err => {
		console.error('Error initialising database connection: ', err);
		process.exit(1);
	});

// app.use(morgan('custom'));
app.use(morgan('dev'));
app.use('/bex-db/test-routes', testRouter);
app.use('/bex-db/test', (req, res, next) => {
	res.status(200).json({ message: 'Reached TEST ROUTE again' });
});
app.use('/bex-db/database', dbRouter);

app.use(
	'*',
	catchAsync(async (req, res, next) => {
		throw new AppError(`Can't find '${req.originalUrl}' on this server.`, 404);
	})
);

app.use(globalErrorHandler);

export default app;
