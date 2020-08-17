import { expect } from 'chai';
import 'mocha';
import sinon from 'sinon';

import * as service from '../../src/services/rated.service';
import * as helper from '../../src/helpers/api.helper';

describe('Should check the Rated-Service with the method call fetchDetailsById', () => {
    let fetchApiDataStub:any;
    beforeEach(() => {
        fetchApiDataStub = sinon.stub(helper, 'fetchApiData');
    });
    afterEach(() => {
        fetchApiDataStub.restore();
    });
    const requestObj = {
        id: '210',
        sid: '1'
    };
    const responseObj = {
        data: {
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
        }
    };
    const returnedObj = {
        'episodes': [
            {
                'episodeName': 'The Quadripartite Affair',
                'averageVotes': 8
            },
            {
                'averageVotes': 7,
                'episodeName': 'The Iowa Scuba Affair'

            },
            {
                'averageVotes': 6,
                'episodeName': 'The Vulcan Affair'

            },
        ]
    }
    it('1. Should check fetch the series data with lessa than 20 ', async () => {
        fetchApiDataStub.withArgs(requestObj.id, requestObj.sid).resolves(responseObj);
        const serviceDetailsResponse = await service.fetchSeriesDetailsById(requestObj.id, requestObj.sid);
        expect(serviceDetailsResponse).to.be.deep.equal(returnedObj);
    });
    it('2. Should check fetch the series data  with empty object', async () => {
        const emptyObj = {};
        fetchApiDataStub.withArgs(requestObj.id, requestObj.sid).resolves(emptyObj);
        const serviceDetailsResponse = await service.fetchSeriesDetailsById(requestObj.id, requestObj.sid);
        expect(serviceDetailsResponse).to.be.deep.equal(emptyObj);
    });
    it('3. Should throw the error condition', async () => {
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
            fetchApiDataStub.withArgs(requestObj.id, requestObj.sid).rejects(errorObj);
            const serviceDetailsResponse = await service.fetchSeriesDetailsById(requestObj.id, requestObj.sid);
        } catch(err) {
            expect(err.statusCode).to.be.equal(returnedErrorObj.statusCode);
            expect(err).to.be.deep.equal(returnedErrorObj);
        }
    });


})
