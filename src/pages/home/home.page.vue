<script lang="ts">
import { defineComponent } from "vue";
import { IMovie } from "@/modules/movie";

export default defineComponent({
  created() {
    this.$store.dispatch("movie/fetchMovies");
  },

  computed: {
    movies(): Array<IMovie> {
      return this.$store.getters["movie/movies"];
    },
  },

  methods: {
    handleLoadMoreMovies() {
      this.$store.dispatch("movie/fetchMovies");
    },
  },
});
</script>

<template>
  <button @click="handleLoadMoreMovies">Load more</button>
  <p v-for="movie in movies" :key="movie.id">{{ movie.title }}</p>
</template>
