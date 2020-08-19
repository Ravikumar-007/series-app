export interface TVSeriesList {
    status: number,
    statusText: string,
    data : {
        seasons: [SeasonList],
        number_of_episodes: number,
        number_of_seasons: number,
    },
}

export interface SeasonList {
    id: number,
    air_date: string,
    name: string,
    overview: string,
    poster_path: null,
    season_number: string,
}

export interface AllSeasonDescription {
    id: string,
    air_date: string,
    episodes: [ EpisodesList ],
    name: string,
    overview: string,
    poster_path: null,
    season_number: string,
}


export interface EpisodesList {
    air_date: string,
    episode_number: number,
    id: number,
    name: string,
    overview: string,
    production_code: string,
    season_number: string,
    show_id: number,
    still_path: null,
    vote_average: number,
    vote_count: number,
    crew: [],
    guest_stars: []
}

export interface EpisodeReturn {
    episodeName: string,
    averageVotes : number,
    id:any;
  key: any;
}
