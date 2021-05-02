import { Movie } from "./movie.model";
import {
  IMovie,
  IMovieService,
  IMovieServiceGetOneApiData,
  IMovieServiceGetPagedApiData,
  IMovieServiceGetPagedPayload,
  IMovieServiceGetPagedResponse,
} from "./movie.types";
import { AxiosInstance } from "axios";

export class MovieService implements IMovieService {
  constructor(public api: AxiosInstance) {}

  async getPaged(
    payload: IMovieServiceGetPagedPayload = {}
  ): Promise<IMovieServiceGetPagedResponse> {
    const response = await this.api.get<IMovieServiceGetPagedApiData>(
      "/list_movies.json",
      {
        params: {
          limit: payload.limit,
          page: payload.page,
          sort_by: payload.sortBy,
          query_term: payload.search,
        },
      }
    );

    const data = response.data;
    data.movies ??= [];

    const movies = data.movies.map(
      (movie) =>
        new Movie({
          id: movie.id,
          title: movie.title,
          year: movie.year,
          rating: movie.rating / 2,
          slug: movie.slug,
          genres: movie.genres,
          covers: {
            small: movie.small_cover_image,
            medium: movie.medium_cover_image,
            large: movie.large_cover_image,
          },
          trailerId: movie.yt_trailer_code,
        })
    );

    return {
      page: data.page_number,
      movies,
    };
  }

  async getOne(id: number): Promise<IMovie | undefined> {
    const response = await this.api.get<IMovieServiceGetOneApiData>(
      "/movie_details.json",
      {
        params: { movie_id: id },
      }
    );

    const data = response.data;

    if (data.movie.id !== 0) {
      return new Movie({
        id: data.movie.id,
        title: data.movie.title,
        year: data.movie.year,
        rating: data.movie.rating / 2,
        slug: data.movie.slug,
        genres: data.movie.genres,
        covers: {
          small: data.movie.small_cover_image,
          medium: data.movie.medium_cover_image,
          large: data.movie.large_cover_image,
        },
        trailerId: data.movie.yt_trailer_code,
      });
    }
  }
}
