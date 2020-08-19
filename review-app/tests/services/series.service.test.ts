import { expect } from 'chai';
import 'mocha';
import sinon from 'sinon';

import * as service from '../../src/services/series.service';
import * as helper from '../../src/helpers/api.helper';

describe('Should check the Rated-Service with the method call fetchDetailsById', () => {
    let fetchSeriesDataStub: any;
    let fetchSeasonDataStub:any;
    beforeEach(() => {
        fetchSeriesDataStub = sinon.stub(helper, 'fetchSeriesData');
        fetchSeasonDataStub = sinon.stub(helper, 'fetchSeasonData');
    });
    afterEach(() => {
        fetchSeriesDataStub.restore();
        fetchSeasonDataStub.restore();
    });
    const requestObj = {
        id: '210',
        sid: 1
    };
    const seriesResponseObj = {
        status: 200,
        statusText: 'OK',
        data : {
            seasons:[
                {
                    season_number:1,
                }
            ]
        }
    }
    const seasonResponseObj = {
            _id: '5253458419c29579400bf918',
            air_date: '1964-09-22',
            episodes: [
                {
                    episode_number: 1,
                    id: 12207,
                    name: 'The Vulcan Affair',
                    season_number: 1,
                    show_id: 210,
                    still_path: null,
                    vote_average: 6,
                    vote_count: 1,
                },
                {
                    episode_number: 2,
                    id: 12208,
                    name: 'The Iowa Scuba Affair',
                    season_number: 1,
                    show_id: 210,
                    vote_average: 7,
                    vote_count: 1,
                },
                {
                    episode_number: 3,
                    id: 12209,
                    name: 'The Quadripartite Affair',
                    season_number: 1,
                    show_id: 210,
                    vote_average: 8,
                    vote_count: 1,
                },
            ],
    };
    const returnedObj = [
        {
            episodeName: 'The Quadripartite Affair',
            averageVotes: 8
        },{
            episodeName: 'The Iowa Scuba Affair',
            averageVotes: 7
        },{
            episodeName: 'The Vulcan Affair',
            averageVotes: 6
        }
    ]
    it('1. Should check fetch the series data with method fetchSeriesDetailsById ()', async () => {
        fetchSeriesDataStub.withArgs(requestObj.id).resolves(seriesResponseObj);
        fetchSeasonDataStub.withArgs(requestObj.id, requestObj.sid).resolves(seasonResponseObj);
        const serviceDetailsResponse = await service.fetchSeriesDetailsById(requestObj.id);
        expect(serviceDetailsResponse).to.be.deep.equal(returnedObj);
    });
    it('2. Should check fetch the series data  with empty object of the method fetchSeriesDetailsById()', async () => {
        const emptyObj = {};
        fetchSeriesDataStub.withArgs(requestObj.id).resolves(emptyObj);
        const serviceDetailsResponse = await service.fetchSeriesDetailsById(requestObj.id);
        expect(serviceDetailsResponse).to.be.deep.equal(emptyObj);
    });
    it('3. Should throw the error condition with the method fetchSeriesDetailsById()', async () => {
        const errorObj = {
            response : {
                data: {
                    status_message: 'Invalid API key: You must be granted a valid key.',
                }
            },
            status : 500
          }
          const returnedErrorObj = {
              message: 'Invalid API key: You must be granted a valid key.',
              statusCode: 500,
              success: false
          }
        try{
            fetchSeriesDataStub.withArgs(requestObj.id).rejects(errorObj);
            const serviceDetailsResponse = await service.fetchSeriesDetailsById(requestObj.id);
        } catch(err) {
            expect(err.statusCode).to.be.equal(returnedErrorObj.statusCode);
            expect(err).to.be.deep.equal(returnedErrorObj);
        }
    });
    it('4. Should sort the data with method getTopRatedEpisodes()', async () => {
        const newSeasonResponse = {
            _id: '5253458419c29579400bf918',
            air_date: '1964-09-22',
            episodes: [
                {
                    episode_number: 1,
                    id: 12207,
                    name: 'The Vulcan Affair',
                    season_number: 1,
                    show_id: 210,
                    still_path: null,
                },
                {
                    episode_number: 2,
                    id: 12208,
                    name: 'The Iowa Scuba Affair',
                    season_number: 1,
                    show_id: 210,
                },
                {
                    episode_number: 3,
                    id: 12209,
                    name: 'The Quadripartite Affair',
                    season_number: 1,
                    show_id: 210,
                },
            ],
    };
        fetchSeriesDataStub.withArgs(requestObj.id).resolves(seriesResponseObj);
        fetchSeasonDataStub.withArgs(requestObj.id, requestObj.sid).resolves(newSeasonResponse);
        const serviceDetailsResponse = await service.fetchSeriesDetailsById(requestObj.id);
        expect(serviceDetailsResponse).to.be.deep.equal([]);
    });


})
