import * as helper from '../helpers/api.helper';

import { EpisodesList, TVSeriesList, SeasonList, AllSeasonDescription, EpisodeReturn } from '../interfaces/common.interface';

export const fetchSeriesDetailsById = async(tvSeriesId: string): Promise<EpisodeReturn | {}> => {
    const episodeResults : EpisodesList[] = [];
    let topRatedEpisodes: EpisodeReturn | {}= [];
    try {
        // Using Axios library Fetch the Tv Series Data
        const seriesData : TVSeriesList = await helper.fetchSeriesData(tvSeriesId);
        // Cheking whether Series Data has keys or not and if true then retun empty object as EpisodeList type
        if (!('data' in seriesData)) return {} as EpisodesList;
        // Checking the Array condition and if true then retun empty object as EpisodeList type
        if (!Array.isArray(seriesData.data.seasons)) return {} as EpisodesList;
        // Mapping the Season results for making Mutiple Calls with Tv Series Id and Different Season Id
        const promises= seriesData.data.seasons.map(async (item: SeasonList) => {
            const seasonData = await helper.fetchSeasonData(tvSeriesId, item.season_number);
            return seasonData;
        });
        // Fetching all returned promise data using Promise.all
        const promiseResult:AllSeasonDescription[] = await Promise.all(promises);
        // Looping the Array of Array for returning only episodes list
        promiseResult.forEach((entry:AllSeasonDescription) => {
            entry.episodes.map((item: EpisodesList) => {
                episodeResults.push(item);
            })
        });
        // Sorting the all the episodes data using this method
        topRatedEpisodes = await getTopRatedEpisodes(episodeResults);
        return topRatedEpisodes;
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

const getTopRatedEpisodes = async (episodeResults: EpisodesList[]): Promise<EpisodeReturn[] | {}> => {
    try {
        // Collecting the episodes data length.
        const recordCounts:number = episodeResults.length;
        // Calculating the all the no.of votes for all the records
        const voteCounts:number = episodeResults.reduce((total, item: { vote_count: number}) => total += item.vote_count, 0);
        // Getting the avearge for calculating the top rated reviews.
        const voteCountsAvg:number = Math.floor(voteCounts / recordCounts);
        // Filtering the Object with counts average
        let filteredRecords:EpisodesList[] = episodeResults.filter((item: EpisodesList) => item.vote_count > voteCountsAvg);
        // Sorting(Decending Order ) the Records based on the vote_average
        filteredRecords.sort((a:EpisodesList , b:EpisodesList) => (a.vote_average > b.vote_average) ? -1 : 1);
        // Checking the sorted data for beyond the limit (limit = 20) and merging with the previous record
        if (filteredRecords.length < 20) {
            const remainingRecords:EpisodesList[] = await episodeResults.filter((item: any) => item.vote_count <= voteCountsAvg);
            remainingRecords.sort((a:EpisodesList, b:EpisodesList) => (a.vote_average > b.vote_average) ? -1 : 1)
            filteredRecords = [...filteredRecords, ...remainingRecords];
        }
        // Filtering the limit with 20.
        const result:EpisodesList[] = filteredRecords.slice(0, 20);
        const mapedData = result.map((value: any) => {
            return {
                'episodeName': value.name,
                'averageVotes': value.vote_average
            };
        });
        return mapedData;
    } catch(err) {
        throw err;
    }
}
