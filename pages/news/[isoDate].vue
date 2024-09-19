<template>
  <div class="article-page">
    <h1 class="article-page__title">
      {{ article.title }}
    </h1>
    <p class="article-page__subtitle">
      {{ formatDate(article.pubDate) }}
      <span v-if="article.author">
        <br />
        {{ article.author }}
      </span>
    </p>

    <v-carousel show-arrows="hover" height="300">
      <v-carousel-item
        :src="article.enclosure.url"
        cover
        @click="openDialog(article.enclosure.url)"
      ></v-carousel-item>
    </v-carousel>

    <p class="article-page__content">
      {{ article.contentSnippet }}
    </p>

    <a :href="article.link" target="_blank" class="article-page__link">
      Источник
    </a>
  </div>

  <v-dialog v-model="dialogActive" width="auto">
    <img :src="dialogImg" />
  </v-dialog>
</template>

<script setup lang="ts">
import { format } from "date-fns";

const route = useRoute();
const feed = useFeedStore();

const formatDate = (time: string) => {
  return format(time, "yyyy-MM-dd, HH:mm");
};

const article = await feed.getArticleByIsoDate(route.params.isoDate);

console.log(article);

const dialogImg = ref<string | undefined>(undefined);
const dialogActive = ref<boolean>(false);

const openDialog = (imgUrl: string) => {
  dialogImg.value = imgUrl;
  dialogActive.value = true;
};
</script>

<style scoped lang="scss">
.article-page {
  width: 100%;
  max-width: 650px;
  margin: 0 auto;
  padding: 0 20px;

  &__carousel {
    width: 100%;
  }

  &__title {
    margin-top: 18px;
    font-weight: 500;
  }

  &__subtitle {
    font-weight: 400;
    font-size: 16px;
    margin-top: 4px;
    opacity: 0.8;
  }

  &__content {
    margin-top: 16px;
    padding: 8px;
    border-top: 1px solid #505050;
    border-bottom: 1px solid #505050;
  }

  &__link {
    font-size: 14px;
  }
}
</style>
