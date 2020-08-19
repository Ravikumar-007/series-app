import { expect } from 'chai';
import 'mocha';
import httpMocks from 'node-mocks-http';
import sinon from 'sinon';

import * as controller from '../../src/controllers/series.controller';
import * as service from '../../src/services/series.service';

describe('Should check the Controller with the method call topSeries Controller', () => {
  let fetchServiceStub: any;
  let mockRequest: any; let mockResponse: any;
  beforeEach(() => {
    mockRequest = httpMocks.createRequest();
    mockResponse = httpMocks.createResponse({ eventEmitter: require('events').EventEmitter });
    fetchServiceStub = sinon.stub(service, 'fetchSeriesDetailsById');
  });
  afterEach(() => {
    fetchServiceStub.restore();
  });
  it('1. Should check the positive scenario with not empty response', () => {
    mockRequest = {
      params: {
        id: '210',
        sid: 1
      },
    };
    const responseObject = {
      'episodes': [
        {
          'episodeName': 'The Dove Affair',
          'averageVotes': 8
        },
        {
          'episodeName': 'The Deadly Decoy Affair',
          'averageVotes': 8
        },
        {
          'episodeName': 'The Project Strigas Affair',
          'averageVotes': 8
        }]
    };
    fetchServiceStub.withArgs(mockRequest.params.id).resolves(responseObject);
    controller.getTopEpisodes(mockRequest, mockResponse);
    mockResponse.on('end', async () => {
      const response = await (mockResponse._getData());
      expect(response).to.be.deep.equal(responseObject);
    });
  });
  it('2. Should check the positive scenario with empty response', () => {
    mockRequest = {
      params: {
        id: '210',
        sid: 1
      },
    };
    const responseObject = {};
    fetchServiceStub.withArgs(mockRequest.params.id).resolves(responseObject);
    controller.getTopEpisodes(mockRequest, mockResponse);
    mockResponse.on('end', async () => {
      const response = await (mockResponse._getData());
      expect(response).to.be.deep.equal(responseObject);
    });
  });

  it('3. Should check the error scenario', () => {
    mockRequest = {
      params: {
        id: '210',
        sid: 1
      },
    };
    const mockErrorResponse = {
      'status_code': 7,
      'status_message': 'Invalid API key: You must be granted a valid key.',
      'success': false
    }
    fetchServiceStub.withArgs(mockRequest.params.id).rejects(mockErrorResponse);
    controller.getTopEpisodes(mockRequest, mockResponse);
    mockResponse.on('end', async () => {
      const response = await (mockResponse._getData());
      expect(response).to.be.deep.equal(mockErrorResponse);
    });
  });
});
