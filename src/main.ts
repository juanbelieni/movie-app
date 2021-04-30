import "./registerServiceWorker";
import "./styles/index.scss";
import App from "./App.vue";
import { router } from "./router";
import { createApp } from "vue";
import { store } from "./store";
import { services, elementPlus } from "@/plugins";

createApp(App)
  .use(store)
  .use(services)
  .use(router)
  .use(elementPlus)
  .mount("#app");
