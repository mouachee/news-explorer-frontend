import "./NothingFound.css";

function NothingFound() {
  return (
    <div className="nothing-found">
      <div className="nothing-found__container">
        <p className="nothing-found__message">Nothing found</p>
        <p className="nothing-found__description">
          Sorry, but nothing matched <br />
          your search terms.
        </p>
      </div>
    </div>
  );
}

export default NothingFound;
