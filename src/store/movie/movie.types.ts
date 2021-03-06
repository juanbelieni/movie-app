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
  movie?: IMovie;
  page: number;
  isFetching: boolean;
}

// Getters

export interface IMovieStoreGetters
  extends GetterTree<IMovieStoreState, IStoreState> {
  movies: (state: IMovieStoreState) => Array<IMovie>;
  movie: (state: IMovieStoreState) => IMovie | undefined;
  isFetching: (state: IMovieStoreState) => boolean;
}

// Mutations

export interface IMovieStoreMutations extends MutationTree<IMovieStoreState> {
  setMovies: (state: IMovieStoreState, payload: Array<IMovie>) => void;
  appendMovies: (state: IMovieStoreState, payload: Array<IMovie>) => void;
  setMovie: (state: IMovieStoreState, payload: IMovie) => void;
  setPage: (state: IMovieStoreState, payload: number) => void;
  setIsFetching: (state: IMovieStoreState, payload: boolean) => void;
}

// Actions

export type IMovieStoreContext = ActionContext<IMovieStoreState, IStoreState>;

export interface IMovieStoreActions
  extends ActionTree<IMovieStoreState, IStoreState> {
  clearMovies: (this: IStore, context: IMovieStoreContext) => void;
  fetchMovies: (
    this: IStore,
    context: IMovieStoreContext,
    search?: string
  ) => Promise<void>;
  fetchMovie: (
    this: IStore,
    context: IMovieStoreContext,
    id: number
  ) => Promise<void>;
}

// Store

export interface IMovieStore extends Module<IMovieStoreState, IStoreState> {
  getters: IMovieStoreGetters;
  mutations: IMovieStoreMutations;
  actions: IMovieStoreActions;
}
