<script lang="ts">
import { defineComponent } from "vue";
import { IMovie } from "@/modules/movie";

export default defineComponent({
  created() {
    this.$store.dispatch("movie/fetchMovie", this.id);
  },

  computed: {
    id(): string {
      return this.$route.params.id as string;
    },

    movie(): IMovie | undefined {
      return this.$store.getters["movie/movie"];
    },
  },
});
</script>

<template>
  <el-container id="movie-page">
    <el-card class="movie-details" :body-style="{ padding: 0 }">
      <el-container class="movie-details-content" v-if="movie">
        <el-image
          :src="movie.covers.medium"
          :preview-src-list="[movie.covers.large]"
          class="movie-cover"
          draggable="false"
        />
        <el-container class="movie-details-text">
          <h1>{{ movie.title }}</h1>
          <el-rate
            class="movie-rating"
            v-model="movie.rating"
            v-if="movie"
            disabled
            show-score
          />
          <el-container class="movie-genres">
            <el-tag
              class="movie-genre"
              v-for="genre in movie.genres"
              :key="genre"
            >
              {{ genre }}
            </el-tag>
          </el-container>
        </el-container>
      </el-container>
      <el-container style="height: 10rem" v-loading="!movie" v-else />
    </el-card>
  </el-container>
</template>

<style lang="scss">
#movie-page {
  padding: 2rem 1rem;
  width: 100%;

  .movie-details {
    border-radius: 8px;
    width: 50rem;
    margin: 0 auto;

    .movie-details-content {
      display: flex;

      .movie-cover img {
        width: auto;
        height: 30rem;
      }

      .movie-details-text {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 1.5rem;

        h1 {
          margin: 0 0 1rem 0;
          font-size: 2rem;
        }

        .movie-rating {
          margin-bottom: 1rem;
        }

        .movie-genres {
          flex-wrap: wrap;
          flex-grow: 0;

          .movie-genre {
            margin-right: 0.5rem;
            margin-bottom: 0.5rem;
          }
        }
      }

      @media (max-width: 600px) {
        flex-direction: column;

        .movie-cover img {
          width: 100%;
          height: auto;
        }
      }
    }
  }
}
</style>
