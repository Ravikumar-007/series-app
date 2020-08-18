import * as helper from '../helpers/api.helper';

export const fetchSeriesDetailsById = async (tvSeriesId: string): Promise<any> => {
    const episodeResults: any = [];
    try {
        // Using Axios library getting the tv-series data
        const seriesData = await helper.fetchSeriesData(tvSeriesId);
        if (!seriesData || !seriesData.data || seriesData.data.seasons.length === 0) return {} as any;
        const promises = seriesData.data.seasons.map(async (item: any) => {
            const seasonData = await helper.fetchSeasonData(tvSeriesId, item.season_number);
            return seasonData
        })
        const promiseResult = await Promise.all(promises);
        promiseResult.forEach((entry: any) => {
            entry.episodes.map((item: any) => {
                episodeResults.push(item);
            })
        });
        // Collecting the episodes data length.
        const recordCounts = episodeResults.length;
        // Calculating the all the no.of votes for all the records
        const voteCounts = episodeResults.reduce((total: number, item: { vote_count: number; }) => total += item.vote_count, 0);
        // Getting the avearge for calculating the top rated reviews.
        const voteCountsAvg = Math.floor(voteCounts / recordCounts);
        // Filtering the Object with counts average
        let filteredRecords = episodeResults.filter((item: any) => item.vote_count > voteCountsAvg);
        // Sorting(Decending Order ) the Records based on the vote_average
        filteredRecords.sort((a: any, b: any) => (a.vote_average > b.vote_average) ? -1 : 1);
        // Checking the sorted data for beyond the limit (limit = 20) and merging with the previous record
        if (filteredRecords.length < 20) {
            const remainingRecords = await episodeResults.filter((item: any) => item.vote_count <= voteCountsAvg);
            remainingRecords.sort((a: any, b: any) => (a.vote_average > b.vote_average) ? -1 : 1)
            filteredRecords = [...filteredRecords, ...remainingRecords];
        }
        // Filtering the limit with 20.
        const result = filteredRecords.slice(0, 20);
        const mapedData = result.map((value: any) => {
            return {
                'episodeName': value.name,
                'averageVotes': value.vote_average
            };
        });
        return mapedData;
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
