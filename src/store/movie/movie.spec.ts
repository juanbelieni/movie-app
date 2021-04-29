import { mockMovies } from "@/modules/movie";
import { mockMovieStore } from "@/store/movie";

describe("Actions", () => {
  describe("fetchMovies()", () => {
    it("should call getPaged method and store returned movies", async () => {
      const movies = mockMovies();
      const store = mockMovieStore();
      store.$services = {
        ...store.$services,
        movie: {
          ...store.$services?.movie,
          getPaged: jest.fn(),
        },
      };

      store.$services.movie.getPaged = jest.fn().mockReturnValue({
        movies,
        page: 1,
      });

      await store.dispatch("movie/fetchMovies");

      expect(store.$services.movie.getPaged).toBeCalledWith({
        sortBy: "download_count",
        page: 1,
      });
      expect(store.state.movie.movies).toEqual(movies);
      expect(store.state.movie.page).toEqual(1);

      store.$services.movie.getPaged = jest.fn().mockReturnValue({
        movies,
        page: 2,
      });

      await store.dispatch("movie/fetchMovies");

      expect(store.$services.movie.getPaged).toBeCalledWith({
        sortBy: "download_count",
        page: 2,
      });
      expect(store.state.movie.movies).toEqual([...movies, ...movies]);
      expect(store.state.movie.page).toEqual(2);
    });
  });
});

describe("Getters", () => {
  describe("movies", () => {
    it("should return the correct movies", () => {
      const movies = mockMovies();
      const store = mockMovieStore();

      store.state.movie.movies = movies;

      expect(store.getters["movie/movies"]).toEqual(movies);
    });
  });

  describe("movie", () => {
    it("should return the correct movie", () => {
      const movies = mockMovies();
      const store = mockMovieStore();

      store.state.movie.movies = movies;

      expect(store.getters["movie/movie"](movies[0].id)).toEqual(movies[0]);
    });
  });
});
