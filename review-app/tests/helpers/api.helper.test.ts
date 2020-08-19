import { expect } from 'chai';
import 'mocha';
import sinon from 'sinon';
import axios, { AxiosResponse } from 'axios';

import * as helper from '../../src/helpers/api.helper';

describe('Should check the Api -helper  with mocked axios calls', () => {
    let axiosGetStub: any;
    beforeEach(() => {
        axiosGetStub = sinon.stub(axios, 'get');
    });
    afterEach(() => {
        axiosGetStub.restore();
    });

    it('1. Should test fetchSeriesData() method with suceess using the mocked axios api', async () => {
        const seriesId = '210';
        const responseObj = {
            data: {
                seasons:[
                    {
                        season_number:1,
                    }
                ]
            }
        };
        axiosGetStub.resolves(responseObj);
        const getApiResponse = await helper.fetchSeriesData(seriesId);
        expect(getApiResponse).to.be.deep.equal(responseObj);
    });
    it('2. Should throw the error from the mocked axios api from the  method fetchSeriesData()', async () => {
        const requestObj = {
            id : '210'
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
            axiosGetStub.withArgs(requestObj.id).rejects(errorObj);
        const getApiResponse = await helper.fetchSeriesData(requestObj.id);
        } catch (err) {
            expect(err).to.be.deep.equal(errorObj);
        }
    });
    it('3. Should test fetchSeasonData() method with suceess using the mocked axios api', async () => {
        const requestObj = {
            id : '210',
            sid : '1'
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
        axiosGetStub.resolves(responseObj);
        const getApiResponse = await helper.fetchSeasonData(requestObj.id, requestObj.sid);
        expect(getApiResponse).to.be.deep.equal(responseObj.data);
    });
    it('4. Should throw the error from the mocked axios api from the  method fetchSeasonData()', async () => {
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
            axiosGetStub.rejects(errorObj);
        const getApiResponse = await helper.fetchSeasonData(requestObj.id, requestObj.sid);
        } catch (err) {
            expect(err).to.be.deep.equal(errorObj);
        }
    });
});