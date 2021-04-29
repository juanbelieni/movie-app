import { Movie } from "./movie.model";
import {
  IMovieService,
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
        },
      }
    );

    const data = response.data;

    const movies = data.movies.map(
      (movie) =>
        new Movie({
          id: movie.id,
          title: movie.title,
          year: movie.year,
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
}
