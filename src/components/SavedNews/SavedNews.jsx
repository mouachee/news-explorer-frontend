import NewsCard from "../NewsCard/NewsCard";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import "./SavedNews.css";

function SavedNews({ savedArticles, onRemoveArticle, keywords }) {
  return (
    <>
      <SavedNewsHeader savedArticles={savedArticles} keywords={keywords} />
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
