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
    async fetchMovies(context: IMovieStoreContext) {
      context.commit("setIsFetching", true);

      const { movies, page } = await this.$services.movie.getPaged({
        sortBy: "download_count",
        page: context.state.page + 1,
      });

      context.commit("appendMovies", movies);
      context.commit("setPage", page);
      context.commit("setIsFetching", false);
    },
  },
};
