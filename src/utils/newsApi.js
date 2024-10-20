import { APIkey } from "./constants";

export const fetchNews = async (keyword) => {
  const today = new Date().toISOString().split("T")[0];
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${keyword}&from=${sevenDaysAgo}&to=${today}&pageSize=100&apiKey=${APIkey}`
    );
    const data = await response.json();

    const filteredArticles = data.articles.filter(
      (article) =>
        article.title &&
        article.title.toLowerCase() !== "[removed]" &&
        article.description &&
        article.description.toLowerCase() !== "[removed]" &&
        article.source &&
        article.source.name &&
        article.source.name.toLowerCase() !== "[removed]" &&
        article.urlToImage
    );

    return filteredArticles;
  } catch (err) {
    throw new Error("Failed to fetch news");
  }
};
