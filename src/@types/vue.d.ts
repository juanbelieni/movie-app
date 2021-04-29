import { Store } from "vuex";
import { IServices } from "@/plugins/services.plugin";

declare module "@vue/runtime-core" {
  export interface ComponentCustomProperties {
    $services: IServices;
    $store: Store<unknown>;
  }
}
