import {
  IMovieStore,
  IMovieStoreContext,
  IMovieStoreState,
} from "./movie.types";
import { IMovie } from "@/modules/movie";

export const movieStore: IMovieStore = {
  namespaced: true,

  state: {
    movies: [],
    isFetching: false,
    page: 0,
  },

  getters: {
    movies: (state: IMovieStoreState) => state.movies,

    movie: (state: IMovieStoreState) => (id: number) =>
      state.movies.find((movie: IMovie) => movie.id === id),

    isFetching: (state: IMovieStoreState) => state.isFetching,
  },

  mutations: {
    setMovies(state: IMovieStoreState, payload: Array<IMovie>) {
      state.movies = [...payload];
    },

    appendMovies(state: IMovieStoreState, payload: Array<IMovie>) {
      payload.forEach((movie: IMovie) => state.movies.push(movie));
    },

    setPage(state: IMovieStoreState, payload: number) {
      state.page = payload;
    },

    setIsFetching(state: IMovieStoreState, payload: boolean) {
      state.isFetching = payload;
    },
  },

  actions: {
    clearMovies(context: IMovieStoreContext) {
      context.commit("setMovies", []);
      context.commit("setPage", 0);
    },

    async fetchMovies(context: IMovieStoreContext, search?: string) {
      context.commit("setIsFetching", true);

      const { movies, page } = await this.$services.movie.getPaged({
        sortBy: "download_count",
        page: context.state.page + 1,
        search,
      });

      context.commit("appendMovies", movies);
      context.commit("setPage", page);
      context.commit("setIsFetching", false);
    },
  },
};
