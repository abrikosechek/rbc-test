<template>
  <div>
    <h1 style="text-align: center">Feed</h1>

    <div v-if="!feed.loaded" class="loading">
      <v-icon class="loading__icon" icon="md:autorenew" />
    </div>

    <div class="feed-grid">
      <v-sheet class="feed-grid__filters" rounded>
        <v-text-field v-model="formFilter" label="Поиск по названию" />
      </v-sheet>

      <v-sheet
        v-for="article in filteredFeed"
        :key="article.link"
        class="feed-grid__item"
        rounded
      >
        <NuxtLink
          class="feed-grid__item__title"
          :to="`/news/${article.isoDate}`"
        >
          {{ article.title }}
        </NuxtLink>
        <p class="feed-grid__item__subtitle">
          {{ formatDate(article.pubDate) }}
          <span v-if="article.author">
            <br />
            {{ article.author }}
          </span>
        </p>
        <p class="feed-grid__item__snippet">{{ article.contentSnippet }}</p>
      </v-sheet>

      <v-pagination v-model="choosedPage" :length="paginationLength" />
    </div>
    <p>
      {{ formFilter }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { format } from "date-fns";

const pageLength: number = 5;
const feed = useFeedStore();
const formFilter = ref(null);

feed.fetchFeed();

const formatDate = (time: string) => {
  return format(time, "yyyy-MM-dd, HH:mm");
};

const choosedPage = ref(1);
const filteredFeed = computed(() => {
  let result = [...feed.items].slice(
    (choosedPage.value - 1) * pageLength,
    choosedPage.value * pageLength
  );
  if (formFilter.value) {
    result = result.filter((article) => {
      return article.title
        .toLowerCase()
        .includes(`${formFilter.value}`.toLowerCase());
    });
  }
  return result;
});
const paginationLength = computed(() => {
  return Math.ceil(feed.items.length / pageLength) || 1;
});
</script>

<style scoped lang="scss">
.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 15px 0;

  &__icon {
    animation-name: spin;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.feed-grid {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;

  &__filters {
    display: flex;
    gap: 16px;
  }

  &__item {
    padding: 8px;

    &__title {
      cursor: pointer;
      font-size: 18px;
      line-height: 1.2em;
    }

    &__subtitle {
      margin-top: 4px;
      font-size: 14px;
      line-height: 1.1em;
      opacity: 0.8;
    }

    &__snippet {
      margin-top: 12px;
      font-size: 14px;
      line-height: 1.2em;
    }
  }
}
</style>
