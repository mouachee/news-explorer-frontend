import "./Preloader.css";

function Preloader() {
  return (
    <div className="preloader">
      <div className="preloader__container">
        <div className="preloader__spinner">
          <div className="preloader__spinning"></div>
        </div>
        <p className="preloader__text">Searching for news...</p>
      </div>
    </div>
  );
}

export default Preloader;
