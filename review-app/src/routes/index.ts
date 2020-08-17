import { Router } from 'express';
import RatingRouter from './rating.route';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/', RatingRouter);

// Export the base-router
export default router;
