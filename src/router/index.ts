import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/pages/home/home.page.vue"),
  },
  {
    path: "/:id",
    name: "Movie",
    component: () => import("@/pages/movie/movie.page.vue"),
  },
];

export const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
