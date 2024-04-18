const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
const catchAsync = require('./src/utils/catchAsync');
const AppError = require('./src/utils/appError');
const globalErrorHandler = require('./src/controllers/errorController');

dotenv.config({ path: path.join(path.resolve(__dirname), '/.env') });

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
	'*',
	catchAsync(async (req, res, next) => {
		throw new AppError(`Can't find ${req.originalUrl} on this server.`, 404);
	})
);

app.use(globalErrorHandler);

module.exports = app;
