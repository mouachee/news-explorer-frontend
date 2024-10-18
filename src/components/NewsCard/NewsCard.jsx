import "./NewsCard.css";
import { useLocation } from "react-router-dom";
import { useState } from "react";

function NewsCard({
  item,
  onSaveArticle,
  savedArticles = [],
  onRemoveArticle,
}) {
  const isSaved = savedArticles.some((article) => article.url === item.url);
  const location = useLocation();
  const onSavedPage = location.pathname === "/saved-news";

  const [showText, setShowText] = useState(false);

  const handleSave = () => {
    if (onSavedPage) {
      onRemoveArticle(item);
    } else {
      if (!isSaved) {
        onSaveArticle(item);
      } else {
        onRemoveArticle(item);
      }
    }
  };

  return (
    <li className="card">
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="card__link"
      >
        <img src={item.urlToImage} alt={item.title} className="card__image" />
        <div className="card__info">
          <p className="card__published">{item.publishedAt.split("T")[0]}</p>
          <h2 className="card__title">{item.title}</h2>
          <p className="card__description">{item.description}</p>
          <p className="card__source">{item.source.name}</p>
        </div>
      </a>
      {onSavedPage && item.keyword && (
        <p className="card__keyword">{item.keyword}</p>
      )}
      <button
        className={`card__button ${
          onSavedPage
            ? "card__remove-icon"
            : isSaved
            ? "card__saved-icon"
            : "card__no-saved"
        }`}
        onClick={handleSave}
        onMouseEnter={() => setShowText(true)}
        onMouseLeave={() => setShowText(false)}
      >
        {" "}
        {onSavedPage && (
          <span
            className={`card__button-text ${
              showText ? "" : "card__button-text_hidden"
            }`}
          >
            Remove from saved
          </span>
        )}
      </button>
    </li>
  );
}

export default NewsCard;
