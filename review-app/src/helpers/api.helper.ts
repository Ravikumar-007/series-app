import axios, { AxiosResponse } from 'axios';
import { baseUrl } from '../shared/constants';
import secureKey from '../config/key.config';

export const fetchSeriesData = async (tvSeriesId: string): Promise<AxiosResponse> => {
    try {
        // Using Axios library getting the tv-series data
        const fetchData: AxiosResponse = await axios.get(
            `${baseUrl}tv/${tvSeriesId}`, {
                params: {
                    api_key: secureKey
                }
            }
        )
        return fetchData;
    } catch (error) {
        throw error;
    }
}

export const fetchSeasonData = async (tvSeriesId:string, tvSeasonId: string): Promise<AxiosResponse> => {
    try {
        const fetchData: AxiosResponse = await axios.get(
            `${baseUrl}tv/${tvSeriesId}/season/${tvSeasonId}`, {
                params: {
                    api_key: secureKey
                }
            }
        )
        return fetchData.data;
    } catch (error) {
        throw error;
    }
}