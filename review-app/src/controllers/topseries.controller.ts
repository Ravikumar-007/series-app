import { Request, Response } from 'express';
import fetchSeriesDetailsById from '../services/rated.service';

const getTopEpisodes = async (req: Request, res: Response) => {
try {
  const getSeriesDetails = await fetchSeriesDetailsById(req.params.id, req.params.sid);
  if(Object.keys(getSeriesDetails).length === 0){
    res.status(200).send('No data Found');
  }
  res.status(200).send(getSeriesDetails);
} catch (err) {
  res.status(404).send(err);
}
};

export default getTopEpisodes;