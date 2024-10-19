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
  const [searchTerm, setSearchTerm] = useState("");
  const [articles, setArticles] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);
  const [loading, setLoading] = useState(false);
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
        ...article, // this will copied the articles array that fetched from api to fetchArticles array and will add the keyword: "" property to the copied array by using map().
        keyword, // keyword property
      }));
      setArticles(articlesWithKeyword); // it updates the state of the newly copied articles that have keyword property.
      localStorage.setItem(
        "lastSearchArticles",
        JSON.stringify(articlesWithKeyword)
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
    const updatedSavedArticles = [...savedArticles, article];
    setSavedArticles(updatedSavedArticles);
    localStorage.setItem("savedArticles", JSON.stringify(updatedSavedArticles)); // stored the newly array to local storage so it stays persist.

    const relatedKeyword = article.keyword; // this make sure that every article object had a keyword property when saved keyword: ""

    // check if the keyword already in the array if not then add
    if (!keywords.includes(relatedKeyword)) {
      const updatedKeywords = [...keywords, relatedKeyword];
      setKeywords(updatedKeywords);
      localStorage.setItem("searchedKeywords", JSON.stringify(updatedKeywords));
    }
  };

  // check for URL to remove
  const removeArticle = (article) => {
    const updatedSavedArticles = savedArticles.filter(
      (a) => a.url !== article.url
    );
    setSavedArticles(updatedSavedArticles);

    localStorage.setItem("savedArticles", JSON.stringify(updatedSavedArticles));

    // check if any other saved articels share the same keyword with the removed one and do not remove them
    const relatedKeyword = article.keyword;
    const remainingArticlesWithKeyword = updatedSavedArticles.filter(
      (a) => a.keyword === relatedKeyword
    );

    // this will remove the keyword if there's no other card who share the keyword
    if (remainingArticlesWithKeyword.length === 0) {
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
