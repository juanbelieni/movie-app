import { Movie } from "./movie.model";
import {
  mockMovies,
  mockMoviesData,
  mockMovieServiceGetPagedApiData,
  mockMovieServiceGetOneApiData,
} from "./movie.mock";
import { MovieService } from "./movie.service";
import axios, { AxiosInstance } from "axios";
import moxios from "moxios";

describe("Model", () => {
  describe("trailerUrl", () => {
    it("should return the correct link if trailerId is provided", () => {
      const movie = new Movie(mockMoviesData()[0]);
      movie.trailerId = "CX45pYvxDiA";

      expect(movie.trailerUrl).toBe("https://youtu.be/CX45pYvxDiA");
    });

    it("should return undefined if trailerId is not provided", () => {
      const movie = new Movie(mockMoviesData()[0]);
      movie.trailerId = undefined;

      expect(movie.trailerUrl).toBeUndefined();
    });
  });
});

describe("Service", () => {
  let api: AxiosInstance;
  let movieService: MovieService;

  beforeEach(() => {
    api = axios.create();
    moxios.install(api);

    movieService = new MovieService(api);
  });

  afterEach(() => {
    moxios.uninstall(api);
  });

  describe("getPaged()", () => {
    it("should return paged movies", async () => {
      moxios.stubRequest("/list_movies.json", {
        response: mockMovieServiceGetPagedApiData(),
      });

      const { movies } = await movieService.getPaged();
      expect(movies).toEqual(mockMovies());
    });

    it("should return a empty array of movies if nothing comes from api response", async () => {
      moxios.stubRequest("/list_movies.json", {
        response: {
          page_number: 1,
        },
      });

      const { movies } = await movieService.getPaged();
      expect(movies).toEqual([]);
    });
  });

  describe("getOne()", () => {
    it("should return one movie", async () => {
      moxios.stubRequest("/movie_details.json?movie_id=1", {
        response: mockMovieServiceGetOneApiData(),
      });

      const movie = await movieService.getOne(1);
      expect(movie).toEqual(mockMovies()[0]);
    });

    it("should return undefined when id equals to 0", async () => {
      moxios.stubRequest("/movie_details.json?movie_id=999999", {
        response: { movie: { id: 0 } },
      });

      const movie = await movieService.getOne(999_999);
      expect(movie).toBeUndefined();
    });
  });
});
