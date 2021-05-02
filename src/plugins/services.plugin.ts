import { Plugin } from "vue";
import { IMovieService, MovieService } from "@/modules/movie";
import { api } from "@/config/api.config";

export interface IServices {
  movie: IMovieService;
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
