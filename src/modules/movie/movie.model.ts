import { IMovie, IMovieData } from "./movie.types";

export class Movie implements IMovie {
  id: number;
  title: string;
  year: number;
  rating: number;
  genres: Array<string>;

  covers: {
    small: string;
    medium: string;
    large: string;
  };

  trailerId?: string;

  constructor(data: IMovieData) {
    this.id = data.id;
    this.title = data.title;
    this.year = data.year;
    this.rating = data.rating;
    this.genres = data.genres;
    this.covers = data.covers;
    this.trailerId = data.trailerId;
  }

  get trailerUrl(): string | undefined {
    if (this.trailerId) {
      return `https://youtu.be/${this.trailerId}`;
    }
  }
}
