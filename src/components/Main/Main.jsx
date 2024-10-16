import "./Main.css";
import NewsCardList from "../NewsCardList/NewsCardList";

function Main({ articles, onSaveArticle, savedArticles, onRemoveArticle }) {
  return (
    <main>
      <section className="cards">
        <h2 className="cards__result">Search results</h2>
        <NewsCardList
          articles={articles}
          onSaveArticle={onSaveArticle}
          savedArticles={savedArticles}
          onRemoveArticle={onRemoveArticle}
        />
      </section>
    </main>
  );
}

export default Main;
