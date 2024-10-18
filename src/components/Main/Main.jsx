import "./Main.css";
import NewsCardList from "../NewsCardList/NewsCardList";
import Preloader from "../Preloader/Preloader";
import NothingFound from "../NothingFound/NothingFound";

function Main({
  articles,
  onSaveArticle,
  savedArticles,
  onRemoveArticle,
  loading,
}) {
  return (
    <main>
      {loading ? (
        <Preloader />
      ) : articles.length > 0 ? (
        <section className="cards">
          <h2 className="cards__result">Search results</h2>
          <NewsCardList
            articles={articles}
            onSaveArticle={onSaveArticle}
            savedArticles={savedArticles}
            onRemoveArticle={onRemoveArticle}
          />
        </section>
      ) : (
        <NothingFound />
      )}
    </main>
  );
}

export default Main;
