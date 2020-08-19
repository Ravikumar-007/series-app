import { Request, Response } from 'express';
import * as service from '../services/series.service';
import { EpisodeReturn } from 'src/interfaces/common.interface';

// const service = new SeriesDetails();

export const getTopEpisodes = async (req: Request, res: Response) => {
  let response: any = {};
  try {
    // For getting the series data using the fetchSriesDetailsById.
    const getSeriesDetails:EpisodeReturn | {} = await service.fetchSeriesDetailsById(req.params.id);
    // Checking the Object with empty object or not
    response = Object.keys(getSeriesDetails).length === 0 ? {} : getSeriesDetails;
    response.statusCode = 200;
  } catch (err) {
    // Returning the error
    response = err;
  }
  const code = response && response.statusCode ? response.statusCode : 500;
  delete response.statusCode;
  res.status(code).send(response);
};
