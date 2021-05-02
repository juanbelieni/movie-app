// Model

export interface IMovieData {
  id: number;
  title: string;
  year: number;
  rating: number;
  slug: string;
  genres: Array<string>;

  covers: {
    small: string;
    medium: string;
    large: string;
  };

  trailerId?: string;
}

export interface IMovie extends IMovieData {
  trailerUrl?: string;
}

// Service

/// getPaged()

export interface IMovieServiceGetPagedPayload {
  limit?: number;
  page?: number;
  sortBy?: string;
  search?: string;
}

export interface IMovieServiceGetPagedResponse {
  page: number;
  movies: Array<IMovie>;
}

export interface IMovieServiceGetPagedApiData {
  page_number: number;
  movies?: Array<{
    id: number;
    title: string;
    year: number;
    rating: number;
    slug: string;
    genres: Array<string>;
    small_cover_image: string;
    medium_cover_image: string;
    large_cover_image: string;
    yt_trailer_code: string;
  }>;
}

/// getOne()

export interface IMovieServiceGetOneApiData {
  movie: {
    id: number;
    title: string;
    year: number;
    rating: number;
    slug: string;
    genres: Array<string>;
    small_cover_image: string;
    medium_cover_image: string;
    large_cover_image: string;
    yt_trailer_code: string;
  };
}

// Class

export interface IMovieService {
  getPaged(
    payload?: IMovieServiceGetPagedPayload
  ): Promise<IMovieServiceGetPagedResponse>;
  getOne(id: number): Promise<IMovie | undefined>;
}
