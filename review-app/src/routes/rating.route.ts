import { Router } from 'express';
import  { getTopEpisodes }from '../controllers/series.controller'

const router = Router();

router.get('/topEpisodes/:id', getTopEpisodes);
export default router;
