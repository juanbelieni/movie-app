import "./registerServiceWorker";
import App from "./App.vue";
import { router } from "./router";
import { createApp } from "vue";
import { store } from "./store";
import { services } from "@/plugins/services.plugin";

createApp(App).use(store).use(services).use(router).mount("#app");
