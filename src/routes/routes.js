import express from 'express';
// import { gameListController } from '../controllers/viewController.js';
import {
	gameScoresController,
	viewController
} from '../controllers/viewController.js';
const router = express.Router();

console.log('Reached dbRouter');

router.get('/test', (req, res, next) => {
	res.send('yes');
});

router.route('/').get(viewController);
router.route('/tournaments');
router.route('/tournament-rank');
router.route('/tournament-scores').get(gameScoresController);
router.route('/games').get(viewController);
router.route('/players').get(viewController);

router.use('*', (req, res, next) => {
	res.send('any route reached');
});

export { router as dbRouter };
