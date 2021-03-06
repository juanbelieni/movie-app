import {
  IMovieData,
  IMovie,
  IMovieServiceGetPagedApiData,
  IMovieServiceGetOneApiData,
  IMovieService,
} from "./movie.types";
import { Movie } from "./movie.model";

// Model

export const mockMoviesData = (): Array<IMovieData> => [
  {
    id: 1,
    title: "title",
    year: 2021,
    rating: 4,
    slug: "slug1",
    genres: ["a", "b", "c"],
    covers: {
      small: "small",
      medium: "medium",
      large: "large",
    },
    trailerId: "trailerId",
  },
  {
    id: 2,
    title: "title",
    year: 2021,
    rating: 4,
    slug: "slug2",
    genres: ["a", "b", "c"],
    covers: {
      small: "small",
      medium: "medium",
      large: "large",
    },
    trailerId: "trailerId",
  },
];

export const mockMovies = (
  data: Array<IMovieData> = mockMoviesData()
): Array<IMovie> => data.map((item) => new Movie(item));

// Service

export const mockMovieServiceGetPagedApiData = (): IMovieServiceGetPagedApiData => ({
  page_number: 1,
  movies: [
    {
      id: 1,
      title: "title",
      year: 2021,
      rating: 8,
      slug: "slug1",
      genres: ["a", "b", "c"],
      small_cover_image: "small",
      medium_cover_image: "medium",
      large_cover_image: "large",
      yt_trailer_code: "trailerId",
    },
    {
      id: 2,
      title: "title",
      year: 2021,
      rating: 8,
      slug: "slug2",
      genres: ["a", "b", "c"],
      small_cover_image: "small",
      medium_cover_image: "medium",
      large_cover_image: "large",
      yt_trailer_code: "trailerId",
    },
  ],
});

export const mockMovieServiceGetOneApiData = (): IMovieServiceGetOneApiData => ({
  movie: {
    id: 1,
    title: "title",
    year: 2021,
    rating: 8,
    slug: "slug1",
    genres: ["a", "b", "c"],
    small_cover_image: "small",
    medium_cover_image: "medium",
    large_cover_image: "large",
    yt_trailer_code: "trailerId",
  },
});

export const mockMovieService = (): IMovieService => ({
  getOne: jest.fn(),
  getPaged: jest.fn(),
});
