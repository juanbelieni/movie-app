import {
  IMovieStore,
  IMovieStoreContext,
  IMovieStoreState,
} from "./movie.types";
import { IMovie } from "@/modules/movie";

export const movieStore: IMovieStore = {
  namespaced: true,

  state: {
    page: 0,
    movies: [],
  },

  getters: {
    movies: (state: IMovieStoreState) => state.movies,

    movie: (state: IMovieStoreState) => (id: number) =>
      state.movies.find((movie: IMovie) => movie.id === id),
  },

  mutations: {
    appendMovies(state: IMovieStoreState, payload: Array<IMovie>) {
      payload.forEach((movie: IMovie) => state.movies.push(movie));
    },

    setPage(state: IMovieStoreState, payload: number) {
      state.page = payload;
    },
  },

  actions: {
    async fetchMovies(context: IMovieStoreContext) {
      const { movies, page } = await this.$services.movie.getPaged({
        sortBy: "download_count",
        page: context.state.page + 1,
      });

      context.commit("appendMovies", movies);
      context.commit("setPage", page);
    },
  },
};
