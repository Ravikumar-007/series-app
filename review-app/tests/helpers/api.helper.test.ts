import { expect } from 'chai';
import 'mocha';
import sinon from 'sinon';
import axios, { AxiosResponse } from 'axios';

import * as helper from '../../src/helpers/api.helper';

describe('Should check the Api -helper  with the method call fetchApiData', () => {
    let axiosGetStub: any;
    beforeEach(() => {
        axiosGetStub = sinon.stub(axios, 'get');
    });
    afterEach(() => {
        axiosGetStub.restore();
    });

    it('1. Should get the series data using the mocked axios api', async () => {
        const requestObj = {
            id : '210',
            sid: '1'
        }
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
        axiosGetStub.withArgs(requestObj.id, requestObj.sid).resolves(responseObj);
        const getApiResponse = await helper.fetchApiData(requestObj.id, requestObj.sid);
        expect(getApiResponse).to.be.deep.equal(getApiResponse);
    });
    it('1. Should throw the error from the mocked axios api', async () => {
        const requestObj = {
            id : '210',
            sid: '1'
        }
        const errorObj = {
            response : {
                data: {
                    status_message: 'Invalid API key: You must be granted a valid key.',
                }
            },
            status : 401
          }
        try {
            axiosGetStub.withArgs(requestObj.id, requestObj.sid).rejects(errorObj);
        const getApiResponse = await helper.fetchApiData(requestObj.id, requestObj.sid);
        } catch (err) {
            expect(err).to.be.deep.equal(errorObj);
        }
    });
});