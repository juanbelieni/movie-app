import { createStore, Store } from "vuex";
import { movieStore } from "@/store/movie";
import { IStoreState } from "@/store";

export const mockMovieStore = (): Store<IStoreState> =>
  createStore<IStoreState>({
    modules: {
      movie: movieStore,
    },
  });
