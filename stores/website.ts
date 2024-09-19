import { defineStore } from "pinia";
import Parser from "rss-parser";

interface IFetchFeed {
  data: {
    value: string;
  };
}

export const useFeedStore = defineStore("feedStore", {
  state: () => ({
    items: [] as any,
    loaded: false as boolean,
  }),
  actions: {
    async fetchFeed() {
      const parser = new Parser();

      const requestUrl: string =
        "http://static.feed.rbc.ru/rbc/logical/footer/news.rss";
      const feed: IFetchFeed = await useFetch(requestUrl);
      const parsedFeed = await parser.parseString(feed.data.value);

      console.log(parsedFeed.items);

      this.items = parsedFeed.items;
      this.loaded = true;
    },
    async getArticleByIsoDate(isoDate: any) {
      if (this.items.length == 0) {
        await this.fetchFeed();
      }
      return [...this.items].filter((article) => article.isoDate == isoDate)[0];
    },
  },
});
