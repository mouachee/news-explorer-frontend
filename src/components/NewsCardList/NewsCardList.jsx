import NewsCard from "../NewsCard/NewsCard";

function NewsCardList({ articles }) {
  return (
    <ul className="cards__list">
      {articles.map((item) => {
        return <NewsCard key={item.url} item={item} />;
      })}
    </ul>
  );
}

export default NewsCardList;
