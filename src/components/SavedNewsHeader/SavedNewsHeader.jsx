function SavedNewsHeader({ savedArticles, keywords = [] }) {
  const formatKeywords = (keywords) => {
    const length = keywords.length;
    if (length === 1) return keywords[0];
    if (length === 2) return `${keywords[0]}, ${keywords[1]}`;
    if (length === 3) return `${keywords[0]}, ${keywords[1]}, ${keywords[2]}`;
    if (length > 2)
      return `${keywords[0]}, ${keywords[1]}, and ${length - 2} other${
        length - 2 > 1 ? "s" : ""
      }`;
    return "";
  };

  return (
    <div className="saved__news-header">
      <p className="saved__news--page">Saved articles</p>
      <h2 className="saved__news--title">
        Elise, you have {savedArticles.length} saved articles
      </h2>
      <p className="saved__keywords">
        By keywords:{" "}
        <span className="saved__keywords-text">{formatKeywords(keywords)}</span>{" "}
      </p>
    </div>
  );
}

export default SavedNewsHeader;
