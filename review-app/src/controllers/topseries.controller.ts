import { Request, Response } from 'express';
import * as service from '../services/rated.service';

export const getTopEpisodes = async (req: Request, res: Response) => {
  let response: any = {};
try {
  const getSeriesDetails = await service.fetchSeriesDetailsById(req.params.id, req.params.sid);
  response = Object.keys(getSeriesDetails).length === 0 ? {} : getSeriesDetails;
  response.statusCode = 200;
} catch (err) {
  response = err;
}
const code = response && response.statusCode ?
    response.statusCode :
    500;
  delete response.statusCode;
  res.status(code).send(response);
};
