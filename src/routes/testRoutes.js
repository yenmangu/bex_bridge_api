import { Router } from 'express';
import {
	routeHandler,
	testGetAll,
	testGetCards
} from '../controllers/dbController.js';
const router = Router();
router.get('/', (req, res, next) => {
	res.json({ message: 'Route reached' });
});

router.get('/all-tables', routeHandler);

router.get('/cards', testGetCards);

router.get('/all-cards', testGetAll);

export { router as testRouter };
