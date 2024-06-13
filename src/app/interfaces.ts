export interface MovieData {
    _id: string;
    plot: string;
    genres: string[];
    runtime: number;
    rated: string;
    cast: string[];
    num_mflix_comments: number;
    poster: string;
    title: string;
    fullplot: string;
    languages: string[];
    released: Date;
    directors: string[];
    writers: string[];
    awards: {
      wins: number;
      nominations: number;
      text: string;
    };
    lastupdated: Date;
    year: number;
    imdb: {
      rating: number;
      votes: number;
      id: string;
    };
    countries: string[];
    type: string;
    tomatoes: {
      viewer: {
        rating: number;
        numReviews: number;
        meter: number;
      };
      lastUpdated: Date;
    };
}

export interface Comment{
  _id: string;
  name: string;
  email: string;
  movie_id: string;
  text: string;
  date: Date;
}