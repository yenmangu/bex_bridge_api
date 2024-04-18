const AppError = require('../utils/appError');

const sendErrorDev = (error, res) => {
	const statusCode = error.statusCode || 500;
	const status = error.status || 'error';
	const message = error.message || 'Soemthing went very wrong';
	const stack = error.stack;

	if (error.isOperational) {
		return res.status(statusCode).json({ status, message, stack });
	}

	console.error('Something went very wrong: ', error.name, error);

	return res
		.status(500)
		.json({ status, message: 'Something went very wrong', stack });
};

const sendErrorProd = (error, res) => {
	const statusCode = error.statusCode || 500;
	const status = error.status || 'error';
	const message = error.message;

	if (error.isOperational) {
		console.error('Operational Error: ', error);
		return res.status(statusCode).json({ status, message });
	}
	console.error(
		'Something went very wrong error: ',
		error.name,
		error.message,
		stack
	);
	return res
		.status(500)
		.json({ status: 'error', message: 'Something went very wrong' });
};

const globalErrorHandler = (err, req, res, next) => {
	let error = '';
	if (err.name === 'JsonWebTokenError') {
		err = new AppError('Invalid token', 401);
	}
	if (err.name === 'SequelizeUniqueConstraintError') {
		err = new AppError(err.errors[0].message, 400);
	}
	if (err.name === 'SequelizeValidationError') {
		console.log('Error: ', err);

		err = new AppError(err.errors[0].message, 400);
	}
	const nodeEnv = process.env.NODE_ENV;
	if (nodeEnv === 'developmnent' || nodeEnv === 'pre_dev') {
		return sendErrorDev(err, res);
	}
	sendErrorProd(err, res);
};

module.exports = globalErrorHandler;
