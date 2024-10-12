import "./NewsCard.css";
import noSaveIcon from "../../assets/noSaveIcon.png";

function NewsCard({ item }) {
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
      <button className="card__saved--button">
        <img
          src={noSaveIcon}
          alt="no save card"
          className="card__saved--icon"
        />
        {""}
      </button>
    </li>
  );
}

export default NewsCard;
