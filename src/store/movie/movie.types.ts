import {
  ActionContext,
  ActionTree,
  GetterTree,
  Module,
  MutationTree,
} from "vuex";
import { IMovie } from "@/modules/movie";
import { IStore, IStoreState } from "@/store";

// State

export interface IMovieStoreState {
  movies: Array<IMovie>;
  page: number;
}

// Getters

export interface IMovieStoreGetters
  extends GetterTree<IMovieStoreState, IStoreState> {
  movies: (state: IMovieStoreState) => Array<IMovie>;
  movie: (state: IMovieStoreState) => (id: number) => IMovie | undefined;
}

// Mutations

export interface IMovieStoreMutations extends MutationTree<IMovieStoreState> {
  appendMovies: (state: IMovieStoreState, payload: Array<IMovie>) => void;
  setPage: (state: IMovieStoreState, payload: number) => void;
}

// Actions

export type IMovieStoreContext = ActionContext<IMovieStoreState, IStoreState>;

export interface IMovieStoreActions
  extends ActionTree<IMovieStoreState, IStoreState> {
  fetchMovies: (this: IStore, context: IMovieStoreContext) => Promise<void>;
}

// Store

export interface IMovieStore extends Module<IMovieStoreState, IStoreState> {
  getters: IMovieStoreGetters;
  mutations: IMovieStoreMutations;
  actions: IMovieStoreActions;
}
