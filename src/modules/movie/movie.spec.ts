import { Movie } from "./movie.model";
import {
  mockMovies,
  mockMoviesData,
  mockMovieServiceGetPagedApiData,
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
  });
});
