import { Router } from 'express';
import  { getTopEpisodes }from '../controllers/topseries.controller'

const router = Router();

router.get('/topEpisodes/:id/:sid', getTopEpisodes);
export default router;
