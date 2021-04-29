import { IServices } from "@/plugins/services.plugin";

declare module "vuex" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Store<S> {
    $services: IServices;
  }
}
