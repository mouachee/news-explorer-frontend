# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Web Application

This is a news application where user can search for the news that related to their keywords and save them to their saved articles profile.

- the application will be built using React + Vite for the frontend.
  - React: A javaScript library for building user interfaces.
  - React-DOM: Handles rendering React components to the DOM.
  - React-Router-DOM: Manages routing and navigation within React applicatior.
  - Vite: a build tool that provides a fast development enviroment.

features:

- search
- authentication
- save
- delete
- logout
-

# API REQUEST

- ## Fetch News Api

const fetchNews = async (keyword) => {

    const today = new Date().toISOString().split("T")[0];

    const sevenDayAgo = new Date(Date.now() - 7 _ 24 _ 60 * 60 *1000)
        .toISOString().split("T")[0];

    try {
        const response = await fetch(
        `https://newsapi.org/v2/everything?q=${keyword}&from=${sevenDaysAgo}&to=${today}&pageSize=100&apiKey=${APIkey}`

        );
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
        throw new Error("Failed to fetch news")
    }

};

# code explain

- new Date() creates a new Date object represent the current date and time.
- .toISOString() converts that date into a standardized string format like"2024-10-11T09:30:00.000Z".
- .split("T")[0] splits the string at the T character and takes only the first part (2024-10-11).
- 7 _ 24 _ 60 _ 60 _ 1000 is used to calculate the milliseconds for 7 days ago.
- Date.now() - 7 _ 24 _ 60 _ 60 _ 1000 calculates the timestamp for exactly 7 days ago. Then, it creates a new Date object from this timestamp
- send a request to NewsAPI to fetch news articles based on the keyword the user searched.
- response.json() convert the response to JavaScript object.
- const filteredArticles : is use to render only the cards with valid data.
  Because some cards might be null and display the "Removed" on the card alt and title.

## Deployed Link App

[live Demo](https://mouachee.github.io/news-explorer-frontend/)
