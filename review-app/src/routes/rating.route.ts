import { Router } from 'express';
import  { getTopEpisodes }from '../controllers/series.controller'

const router = Router();

router.get('/topEpisodes/:id/:sid', getTopEpisodes);
export default router;
