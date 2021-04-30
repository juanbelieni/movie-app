import { IServices } from "@/plugins/services.plugin";
import { IStore } from "@/store";

declare module "@vue/runtime-core" {
  export interface ComponentCustomProperties {
    $services: IServices;
    $store: IStore;
  }
}
