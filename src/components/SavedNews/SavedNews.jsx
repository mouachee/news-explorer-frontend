import NewsCard from "../NewsCard/NewsCard";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import "./SavedNews.css";

function SavedNews({ savedArticles, onRemoveArticle, keywords }) {
  return (
    <div className="saved">
      <SavedNewsHeader savedArticles={savedArticles} keywords={keywords} />
      <ul className="saved__news-list">
        {savedArticles.map((item) => (
          <NewsCard
            key={item.url}
            item={item}
            onRemoveArticle={onRemoveArticle}
          />
        ))}
      </ul>
    </div>
  );
}

export default SavedNews;
