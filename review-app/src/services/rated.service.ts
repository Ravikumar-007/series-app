import { AxiosResponse } from 'axios';

import * as helper from '../helpers/api.helper';

export const fetchSeriesDetailsById = async (tvId: string, seasonId: string): Promise<AxiosResponse> => {
    const response: any = {};
    try {
        const fetchData = await helper.fetchApiData(tvId, seasonId);
        if (!fetchData || !fetchData.data || fetchData.data.episodes.length === 0) return {} as any;
        const recordCounts = fetchData.data.episodes.length;
        const voteCounts = fetchData.data.episodes.reduce((total: number, item: { vote_count: number; }) => total += item.vote_count, 0);
        const voteCountsAvg = Math.floor(voteCounts / recordCounts);
        let filteredRecords = fetchData.data.episodes.filter((item: any) => item.vote_count > voteCountsAvg);
        filteredRecords.sort((a: any, b: any) => (a.vote_average > b.vote_average) ? -1 : 1);
        if (filteredRecords.length < 20) {
            const remainingRecords = await fetchData.data.episodes.filter((item: any) => item.vote_count <= voteCountsAvg);
            remainingRecords.sort((a: any, b: any) => (a.vote_average > b.vote_average) ? -1 : 1)
            filteredRecords = [...filteredRecords, ...remainingRecords];
        }
        const result = filteredRecords.slice(0, 20);
        const mapedData = result.map((value: any) => {
            return {
                'episodeName': value.name,
                'averageVotes': value.vote_average
            };
        });
        response.episodes = mapedData;
        return response;
    } catch (error) {
        const errorMessage = error && error.response && error.response.data ? error.response.data.status_message : error.message;
        const statusCode = error && error.response && error.response.status ? error.response.status : 500;
        throw {
            message: errorMessage,
            statusCode,
            success: false
        };
    }
}
