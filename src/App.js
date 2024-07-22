import React, { useState, useEffect } from "react";
import axios from "axios";
import Quote from "./Quote";
import "./App.css";

function App() {
  const [quotes, setQuotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const quotesPerPage = 10;

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await axios.get(
          "https://api.quotable.io/quotes?limit=30"
        );
        setQuotes(response.data.results);
      } catch (error) {
        console.error("Error fetching quotes", error);
      }
    };

    fetchQuotes();
  }, []);

  const indexOfLastQuote = currentPage * quotesPerPage;
  const indexOfFirstQuote = indexOfLastQuote - quotesPerPage;
  const currentQuotes = quotes.slice(indexOfFirstQuote, indexOfLastQuote);

  const totalPages = Math.ceil(quotes.length / quotesPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="App">
      {currentQuotes.map((quote) => (
        <Quote
          key={quote._id}
          title={quote.content}
          author={quote.author}
          tags={quote.tags}
        />
      ))}
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
