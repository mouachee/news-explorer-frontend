import { mockNewsData } from "../../utils/constants";
import NewsCard from "../NewsCard/NewsCard";

function NewsCardList() {
  return (
    <ul className="cards__list">
      {mockNewsData.map((item) => {
        return <NewsCard key={item.title} item={item} />;
      })}
    </ul>
  );
}

export default NewsCardList;
