import axios, { AxiosResponse } from 'axios';
import { baseUrl } from '../shared/constants';
import secureKey from '../config/key.config';

export const fetchApiData = async (tvId: string, seasonId: string): Promise<AxiosResponse> => {
    try {
        const fetchData: AxiosResponse = await axios.get(
            `${baseUrl}tv/${tvId}/season/${seasonId}`, {
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