import { APIkey } from "./constants";

function formatMonth(dateString) {
  const date = new Date(dateString);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthIndex = date.getMonth();
  const monthName = monthNames[monthIndex];
  // Format the full date as needed
  return `${monthName} ${date.getDate()}, ${date.getFullYear()}`;
}

export const fetchNews = async (keyword) => {
  const today = new Date().toISOString().split("T")[0];
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  try {
    const response = await fetch(
      `https://nomoreparties.co/news/v2/everything?q=${keyword}&from=${sevenDaysAgo}&to=${today}&pageSize=100&apiKey=${APIkey}`
    );
    const data = await response.json();

    const filteredArticles = data.articles
      .filter(
        (article) =>
          article.title &&
          article.title.toLowerCase() !== "[removed]" &&
          article.description &&
          article.description.toLowerCase() !== "[removed]" &&
          article.source &&
          article.source.name &&
          article.source.name.toLowerCase() !== "[removed]" &&
          article.urlToImage
      )
      .map((article) => ({
        ...article,
        publishedAt: formatMonth(article.publishedAt),
      }));

    return filteredArticles;
  } catch {
    throw new Error("Failed to fetch news");
  }
};

export function saveArticle(article) {
  return new Promise((resolve, reject) => {
    resolve({
      id: "65f7371e7bce9e7d331b11a0",
      url: article.url,
      title: article.title,
      urlToImage: article.urlToImage,
      description: article.description,
      source: article.source.name,
      keyword: article.keyword,
      publishedAt: article.publishedAt,
    });
  });
}
