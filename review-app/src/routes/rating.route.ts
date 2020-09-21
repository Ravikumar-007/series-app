import { Router } from 'express';
import  { getTopEpisodes }from '../controllers/series.controller'
import * as cacheMiddleware  from '../middlewares/cache'

const router = Router();

router.get('/topEpisodes/:id', cacheMiddleware.createCache(23 * 60 * 60), getTopEpisodes);
export default router;
