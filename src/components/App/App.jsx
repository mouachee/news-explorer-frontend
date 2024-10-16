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
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  const handleSearch = async (keyword) => {
    setLoading(true);
    try {
      const fetchArticles = await fetchNews(keyword);
      setArticles(fetchArticles);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };
  useEffect(() => {
    const storedArticles =
      JSON.parse(localStorage.getItem("savedArticles")) || [];
    setSavedArticles(storedArticles);
  }, []);

  const saveArticles = (article) => {
    const updatedSavedArticles = [...savedArticles, article];
    setSavedArticles(updatedSavedArticles);
    localStorage.setItem("savedArticles", JSON.stringify(updatedSavedArticles));
  };

  const removeArticle = (article) => {
    const updatedSavedArticles = savedArticles.filter(
      (a) => a.url !== article.url
    );
    setSavedArticles(updatedSavedArticles);
    localStorage.setItem("savedArticles", JSON.stringify(updatedSavedArticles));
  };

  return (
    <div className="app">
      <div className="app__content">
        <div
          className={`app__search ${isHomePage ? "app__search--with-bg" : ""}`}
        >
          <Nav />
          {isHomePage && (
            <Header setSearchTerm={setSearchTerm} onSearch={handleSearch} />
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
              />
            }
          />
          <Route
            path="/saved-news"
            element={
              <SavedNews
                savedArticles={savedArticles}
                onRemoveArticle={removeArticle}
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
