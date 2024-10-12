import "./Main.css";
import NewsCardList from "../NewsCardList/NewsCardList";

function Main({ articles }) {
  return (
    <main>
      <section className="cards">
        <h2 className="cards__result">Search results</h2>
        <NewsCardList articles={articles} />
        <div className="cards__show-more-container">
          <button className="cards__show-more-button">Show more</button>
        </div>
      </section>
    </main>
  );
}

export default Main;
