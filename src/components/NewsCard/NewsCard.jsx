import "./NewsCard.css";
import noSaveIcon from "../../assets/noSaveIcon.png";

function NewsCard({ item }) {
  return (
    <li className="card">
      <img src={item.urlToImage} alt={item.title} className="card__image" />

      <button className="card__saved--button">
        <img
          src={noSaveIcon}
          alt="no save card"
          className="card__saved--icon"
        />
        {""}
      </button>
      <div className="card__info">
        <p className="card__published">{item.publishedAt}</p>
        <h2 className="card__title">{item.title}</h2>
        <p className="card__description">{item.description}</p>
        <p className="card__source">{item.source.name}</p>
      </div>
    </li>
  );
}

export default NewsCard;
