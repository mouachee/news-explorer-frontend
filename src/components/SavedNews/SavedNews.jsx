import NewsCard from "../NewsCard/NewsCard";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import "./SavedNews.css";
function SavedNews({ savedArticles, onRemoveArticle }) {
  return (
    <>
      <SavedNewsHeader />
      <div className="saved__news-list">
        {savedArticles.map((item) => (
          <NewsCard
            key={item.url}
            item={item}
            onRemoveArticle={onRemoveArticle}
          />
        ))}
      </div>
    </>
  );
}

export default SavedNews;
