import "./App.css";
import { act, useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Nav from "../Navigation/Navigation";
import Header from "../Header/Header";
import Main from "../Main/Main";
import About from "../About/About";
import Footer from "../Footer/Footer";
import { fetchNews } from "../../utils/newsApi";
import SavedNews from "../SavedNews/SavedNews";
import SignIn from "../SignIn/SignIn";
import { saveArticle } from "../../utils/newsApi";
import * as auth from "../../utils/auth";
import { setToken } from "../../utils/token";
import SignUp from "../SignUp/SignUp";
import CurrentUserContext from "../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import SignupSuccessPopup from "../SignupSuccessPopup/SignupSuccessPopup";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [articles, setArticles] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keywords, setKeywords] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  const handleSignInClick = () => {
    setActiveModal("signin");
  };

  const handleSignUpClick = () => {
    setActiveModal("signup");
  };
  const closeActiveModal = () => {
    setActiveModal(null);
  };

  const handleSignIn = async ({ email, password }) => {
    setLoading(true);
    if (!email || !password) {
      setLoading(false);
      return Promise.reject(new Error("Email and password are required"));
    }
    try {
      const data = await auth.authorize(email, password);
      // setToken(data.token);
      setIsLoggedIn(true);

      // const user = await auth.checkToken(data.token);
      // setCurrentUser(user);
      closeActiveModal();
      navigate("/saved-news");
    } catch (error) {
      console.error("Login failed", error);
      setLoading(false);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // set up Sign Up logic

  const handleLogOut = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
  };

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

  const saveArticles = async (article) => {
    try {
      const savedArticle = await saveArticle(article);
      console.log(savedArticle);
      const updatedSavedArticles = [...savedArticles, savedArticle];
      setSavedArticles(updatedSavedArticles);
      localStorage.setItem(
        "savedArticles",
        JSON.stringify(updatedSavedArticles)
      );

      const relatedKeyword = savedArticle.keyword;
      // check if the keyword already in the array if not then add
      if (!keywords.includes(relatedKeyword)) {
        const updatedKeywords = [...keywords, relatedKeyword];
        setKeywords(updatedKeywords);
        localStorage.setItem(
          "searchedKeywords",
          JSON.stringify(updatedKeywords)
        );
      }
    } catch (error) {
      console.error("Failed saving article:", error);
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

  // USE EFFECT

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
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <div className="app__content">
          <div
            className={`app__search ${
              isHomePage ? "app__search--with-bg" : ""
            }`}
          >
            <Nav
              onLogOut={handleLogOut}
              handleSignInClick={handleSignInClick}
              isLoggedIn={isLoggedIn}
              activeModal={activeModal}
            />
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
                  isLoggedIn={isLoggedIn}
                />
              }
            />
            <Route
              path="/saved-news"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <SavedNews
                    savedArticles={savedArticles}
                    onRemoveArticle={removeArticle}
                    keywords={keywords}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>
          {isHomePage && <About />}
          <Footer />
        </div>
        <SignIn
          isOpen={activeModal === "signin"}
          onClose={closeActiveModal}
          onSignUpClick={handleSignUpClick}
          handleSignIn={handleSignIn}
        />
        <SignUp
          isOpen={activeModal === "signup"}
          onClose={closeActiveModal}
          onSignInClick={handleSignInClick}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
