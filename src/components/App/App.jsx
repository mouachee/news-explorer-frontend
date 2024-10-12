import "./App.css";
import Nav from "../Nav/Nav";
import Header from "../Header/Header";
import Main from "../Main/Main";
import About from "../About/About";
import Footer from "../Footer/Footer";
import { fetchNews } from "../../utils/api";
import { useState } from "react";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="app">
      <div className="app__content">
        <div className="app__search">
          <Nav />
          <Header setSearchTerm={setSearchTerm} onSearch={handleSearch} />
        </div>
        <Main searchTerm={searchTerm} articles={articles} />
        <About />
        <Footer />
      </div>
    </div>
  );
}

export default App;
