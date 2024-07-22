import React from "react";

const Quote = ({ title, author, tags }) => {
  return (
    <div className="quote-container">
      <h2 className="title">{title}</h2>
      <p className="author">— {author}</p>
      <div className="tags">
        {tags.map((tag, index) => (
          <span key={index} className="tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Quote;
