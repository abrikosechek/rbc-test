export interface IParsedFeed {
  description: string;
  image: {
    link: string;
    title: string;
    url: string;
  };
  items: IFeedItem[];
  language?: string;
  link: string;
  title: string;
}

export interface IFeedItem {
  author?: string;
  categories: string[];
  content: string;
  contentSnippet: string;
  creator?: string;
  enclosure: {
    length: string;
    type: string;
    url: string;
  };
  guid: string;
  isoDate: string;
  link: string;
  pubDate: string;
  title: string;
}
