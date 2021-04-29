import { IMovieStoreState } from "@/store/movie";
import { Store } from "vuex";

export interface IStoreState {
  movie: IMovieStoreState;
}

export type IStore = Store<IStoreState>;
