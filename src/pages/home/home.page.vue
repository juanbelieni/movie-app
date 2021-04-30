<script lang="ts">
import { defineComponent } from "vue";
import { IMovie } from "@/modules/movie";

export default defineComponent({
  created() {
    this.loadMoreMovies();
  },

  mounted() {
    const bottomElement = this.$refs.bottom as HTMLDivElement;

    const observer = new IntersectionObserver(([entry]) => {
      if (
        entry.isIntersecting &&
        this.movies.length > 0 &&
        !this.isFetchingMovies
      ) {
        this.loadMoreMovies();
      }
    }, {});

    observer.observe(bottomElement);
  },

  computed: {
    movies(): Array<IMovie> {
      return this.$store.getters["movie/movies"];
    },

    isFetchingMovies(): boolean {
      return this.$store.getters["movie/isFetching"];
    },
  },

  methods: {
    loadMoreMovies() {
      this.$store.dispatch("movie/fetchMovies");
    },
  },
});
</script>

<template>
  <el-container id="home-page">
    <el-container class="movies-list">
      <el-card
        v-for="movie in movies"
        :key="movie.id"
        :body-style="{ padding: '0px' }"
        class="movie-card"
      >
        <el-image
          :src="movie.covers.medium"
          :alt="movie.title"
          class="movie-card-image"
          draggable="false"
        />
        <div class="movie-card-body">
          <p class="movie-card-title">{{ movie.title }}</p>
          <el-rate v-model="movie.rating" disabled show-score />
        </div>
      </el-card>
    </el-container>
    <div ref="bottom" class="loading-indicator" v-loading="isFetchingMovies" />
  </el-container>
</template>

<style lang="scss">
#home-page {
  display: flex;
  flex-direction: column;

  .movies-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, 16rem);
    gap: 2rem 1rem;
    justify-content: space-evenly;

    .movie-card {
      border-radius: 8px;

      .movie-card-image {
        width: 100%;

        img {
          transition: transform 500ms;
          cursor: pointer;

          &:hover {
            transform: scale(1.05);
          }
        }
      }

      .movie-card-body {
        padding: 1rem;

        .movie-card-title {
          font-size: 1.2rem;
          font-weight: 900;

          margin-top: 0;
          margin-bottom: 0.5rem;
        }
      }
    }
  }

  .loading-indicator {
    height: 10rem;
    width: 100%;
  }
}
</style>
