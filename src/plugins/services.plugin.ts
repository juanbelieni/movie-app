import { Plugin } from "vue";
import { MovieService } from "@/modules/movie";
import { api } from "@/config/api.config";

export interface IServices {
  movie: MovieService;
}

export const services: Plugin = {
  install(app) {
    const services: IServices = {
      movie: new MovieService(api),
    };

    app.mixin({
      beforeCreate() {
        this.$store.$services = services;
        this.$services = services;
      },
    });
  },
};
