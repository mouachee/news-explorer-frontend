import { useState } from "react";
import NewsCard from "../NewsCard/NewsCard";

function NewsCardList({
  articles,
  onSaveArticle,
  savedArticles,
  onRemoveArticle,
  isLoggedIn,
  onSignInClick,
}) {
  const [cardsShown, setCardsShown] = useState(3);

  const handleShowMore = () => {
    setCardsShown((prev) => Math.min(prev + 3, articles.length));
  };
  return (
    <>
      <ul className="cards__list">
        {articles.slice(0, cardsShown).map((item) => {
          return (
            <NewsCard
              key={item.url}
              item={item}
              onSaveArticle={onSaveArticle}
              savedArticles={savedArticles}
              onRemoveArticle={onRemoveArticle}
              isLoggedIn={isLoggedIn}
              onSignInClick={onSignInClick}
            />
          );
        })}
      </ul>
      {cardsShown < articles.length && (
        <div className="cards__show-more-container">
          <button className="cards__show-more-button" onClick={handleShowMore}>
            Show more
          </button>
        </div>
      )}
    </>
  );
}

export default NewsCardList;
