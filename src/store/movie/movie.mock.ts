import { createStore, Store } from "vuex";
import { movieStore } from "@/store/movie";
import { IStoreState } from "@/store";
import cloneDeep from "lodash/cloneDeep";

export const mockMovieStore = (): Store<IStoreState> =>
  createStore<IStoreState>({
    modules: {
      movie: cloneDeep(movieStore),
    },
  });
