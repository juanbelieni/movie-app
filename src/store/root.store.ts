import { createStore } from "vuex";
import { IStoreState } from "@/store/root.types";
import { movieStore } from "@/store/movie";

export const store = createStore<IStoreState>({
  modules: {
    movie: movieStore,
  },
});
