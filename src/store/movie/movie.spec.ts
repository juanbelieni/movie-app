import { mockMovies, mockMovieService } from "@/modules/movie";
import { mockMovieStore } from "@/store/movie";

describe("Actions", () => {
  describe("clearMovies()", () => {
    it("should clear all movies and set page to 0", () => {
      const movies = mockMovies();
      const store = mockMovieStore();

      store.state.movie.movies = movies;
      store.state.movie.page = 1;

      store.dispatch("movie/clearMovies");

      expect(store.state.movie.movies).toEqual([]);
      expect(store.state.movie.page).toEqual(0);
    });
  });

  describe("fetchMovies()", () => {
    it("should call getPaged method and store returned movies and page", async () => {
      const movies = mockMovies();
      const store = mockMovieStore();
      store.$services = {
        movie: mockMovieService(),
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

    it("should toggle isFetching value based on request response", async () => {
      const movies = mockMovies();
      const store = mockMovieStore();
      store.$services = {
        ...store.$services,
        movie: mockMovieService(),
      };

      store.$services.movie.getPaged = jest
        .fn()
        .mockImplementation(async () => {
          expect(store.state.movie.isFetching).toBeTruthy();

          return {
            movies,
            page: 1,
          };
        });

      expect(store.state.movie.isFetching).toBeFalsy();
      await store.dispatch("movie/fetchMovies");
      expect(store.state.movie.isFetching).toBeFalsy();
    });
  });

  describe("fetchMovie()", () => {
    it("should call movie service when movie is not found in movies state", async () => {
      const movies = mockMovies();
      const store = mockMovieStore();
      store.$services = {
        movie: mockMovieService(),
      };

      console.log(mockMovieStore().state.movie);

      store.$services.movie.getOne = jest.fn().mockReturnValue(movies[0]);

      await store.dispatch("movie/fetchMovie", 1);

      expect(store.$services.movie.getOne).toBeCalledWith(1);
      expect(store.state.movie.movie).toEqual(movies[0]);
    });

    it("should not call movie service when movie is found in movies state", async () => {
      const movies = mockMovies();
      const store = mockMovieStore();
      store.$services = {
        movie: mockMovieService(),
      };

      store.state.movie.movies = movies;

      await store.dispatch("movie/fetchMovie", 1);

      expect(store.$services.movie.getOne).not.toBeCalled();
      expect(store.state.movie.movie).toEqual(movies[0]);
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

      store.state.movie.movie = movies[0];

      expect(store.getters["movie/movie"]).toEqual(movies[0]);
    });
  });

  describe("isFetching", () => {
    it("should return if it is fetching", () => {
      const store = mockMovieStore();

      store.state.movie.isFetching = true;
      expect(store.getters["movie/isFetching"]).toBeTruthy();

      store.state.movie.isFetching = false;
      expect(store.getters["movie/isFetching"]).toBeFalsy();
    });
  });
});
