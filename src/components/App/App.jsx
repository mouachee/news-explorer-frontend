import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Nav from "../Nav/Nav";
import Header from "../Header/Header";
import Main from "../Main/Main";
import About from "../About/About";
import Footer from "../Footer/Footer";
import { fetchNews } from "../../utils/api";
import SavedNews from "../SavedNews/SavedNews";

function App() {
  // search term stored the current keyword which is empty "" now. setSearchTerm update the state to whatever the user search "SpaceX//
  const [searchTerm, setSearchTerm] = useState("");
  // articles will hold the list of articles fetched from the api after a search. setArticles update the articles appearance when user search using kekyword.
  const [articles, setArticles] = useState([]);
  // saveArticles hold the list of articles that user saved to save page. setSavedArticles will update the list when user add or remove more.
  const [savedArticles, setSavedArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  // keywords sores a list of keywords that were used to search for articles. setKeywords update the keyword list if remove card the keyword update to remove too.
  const [keywords, setKeywords] = useState([]);
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  const handleSearch = async (keyword) => {
    setLoading(true);
    setSearchTerm(keyword); // set the search term to current keyword which is empty "" if user type "space" it will be "space"
    localStorage.setItem("lastSearchTerm", keyword); // this will save the keyword "space" in localstorage

    try {
      const fetchArticles = await fetchNews(keyword); // fetch articles from the api using the keyword search
      const articlesWithKeyword = fetchArticles.map((article) => ({
        ...article, // this will copied the articles array that fetched from api to fetchArticles and will add the keyword: "" property to the copied array by using map().
        keyword, // keyword property
      }));
      setArticles(articlesWithKeyword); // it updates the state of the newly copied articles that have keyword property.
      localStorage.setItem(
        "lastSearchArticles",
        JSON.stringify(articlesWithKeyword) // this will save the newly articles in localstorage
      );

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const saveArticles = (article) => {
    const updatedSavedArticles = [...savedArticles, article]; // this will copy the savedArticles array to updatedSavedArticles array even tho the saveArticle is [].
    setSavedArticles(updatedSavedArticles); // this will update the savedArticles state to the updatesavearticles.
    localStorage.setItem("savedArticles", JSON.stringify(updatedSavedArticles)); // stored the newly array to local storage so it stays persist.

    const relatedKeyword = article.keyword; // this make sure that every article object had a keyword property when saved keyword: ""
    if (!keywords.includes(relatedKeyword)) {
      // check if the keyword already in the array if not then add
      const updatedKeywords = [...keywords, relatedKeyword];
      setKeywords(updatedKeywords);
      localStorage.setItem("searchedKeywords", JSON.stringify(updatedKeywords));
    }
  };

  const removeArticle = (article) => {
    const updatedSavedArticles = savedArticles.filter(
      // this create a new array and only articles with different URLS are kept in the updateSaveArticles array.
      (a) => a.url !== article.url
    );
    setSavedArticles(updatedSavedArticles);

    localStorage.setItem("savedArticles", JSON.stringify(updatedSavedArticles));

    const relatedKeyword = article.keyword; // check if any other saved articels share the same keyword
    const remainingArticlesWithKeyword = updatedSavedArticles.filter(
      // This will make sure to not delete other cards who share the same keyword as the deleted one.
      (a) => a.keyword === relatedKeyword
    );

    if (remainingArticlesWithKeyword.length === 0) {
      // this will remove the keyword if there's no other card who share the keyword
      const remainingKeywords = keywords.filter((kw) => kw !== relatedKeyword);
      setKeywords(remainingKeywords);
      localStorage.setItem(
        "searchedKeywords",
        JSON.stringify(remainingKeywords)
      );
    }
  };

  useEffect(() => {
    const lastSearchTerm = localStorage.getItem("lastSearchTerm");
    const storedArticles = JSON.parse(
      localStorage.getItem("lastSearchArticles")
    );

    if (lastSearchTerm && isHomePage && !searchTerm) {
      setSearchTerm(lastSearchTerm);
      setArticles(storedArticles || []);
    }
  }, [isHomePage, searchTerm]);

  useEffect(() => {
    const storedKeywords =
      JSON.parse(localStorage.getItem("searchedKeywords")) || [];
    const storedArticles =
      JSON.parse(localStorage.getItem("savedArticles")) || [];

    setKeywords(storedKeywords);
    setSavedArticles(storedArticles);
  }, []);

  return (
    <div className="app">
      <div className="app__content">
        <div
          className={`app__search ${isHomePage ? "app__search--with-bg" : ""}`}
        >
          <Nav />
          {isHomePage && (
            <Header
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              onSearch={handleSearch}
            />
          )}
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <Main
                searchTerm={searchTerm}
                articles={articles}
                onSaveArticle={saveArticles}
                savedArticles={savedArticles}
                onRemoveArticle={removeArticle}
                loading={loading}
              />
            }
          />
          <Route
            path="/saved-news"
            element={
              <SavedNews
                savedArticles={savedArticles}
                onRemoveArticle={removeArticle}
                keywords={keywords}
              />
            }
          />
        </Routes>
        {isHomePage && <About />}
        <Footer />
      </div>
    </div>
  );
}

export default App;
