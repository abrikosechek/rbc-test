<template>
  <div>
    <h1 style="text-align: center">Feed</h1>

    <div v-if="!feed.loaded" class="loading">
      <v-icon class="loading__icon" icon="md:autorenew" />
    </div>

    <div class="feed-grid">
      <v-sheet class="feed-grid__filters" rounded>
        <v-text-field v-model="formFilter" label="Поиск по названию" />
        <div class="feed-grid__filters__date">
          <v-btn
            icon="md:edit_calendar"
            @click="showDatePicker = !showDatePicker"
          >
          </v-btn>
          <v-date-picker
            v-if="showDatePicker"
            v-model="datePickerValue"
            class="feed-grid__filters__date__picker"
            elevation="24"
            range
          />
        </div>
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
      {{ datePickerValue }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { format, addDays, isAfter, isBefore } from "date-fns";
import "vuetify-daterange-picker/dist/vuetify-daterange-picker.css";

const pageLength: number = 5;
const feed = useFeedStore();
const formFilter = ref(null);
const showDatePicker = ref(false);

feed.fetchFeed();

const formatDate = (time: string) => {
  return format(time, "yyyy-MM-dd, HH:mm");
};

const choosedPage = ref(1);
const paginationLength = computed(() => {
  return Math.ceil(feed.items.length / pageLength) || 1;
});

const datePickerValue = ref<Date | null>(null);

const filteredFeed = computed(() => {
  let result = [...feed.items].slice(
    (choosedPage.value - 1) * pageLength,
    choosedPage.value * pageLength
  );
  // search filter
  if (formFilter.value) {
    result = result.filter((article) => {
      return article.title
        .toLowerCase()
        .includes(`${formFilter.value}`.toLowerCase());
    });
  }
  // date filter
  if (datePickerValue.value) {
    const minDate = datePickerValue.value;
    const maxDate = addDays(datePickerValue.value, 1);
    console.log(minDate, maxDate);
    result = result.filter((article) => {
      return (
        isAfter(article.pubDate, minDate) && isBefore(article.pubDate, maxDate)
      );
    });
  }
  return result;
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

    &__date {
      position: relative;

      &__picker {
        position: absolute !important;
        right: 0;
        top: 100%;
      }
    }
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
