import React from "react";
import MovieCard from "../MovieCard";
import { apiKey } from "../../utils";
import useSearch from "../../hooks/useSearch";
import "./SearchPage.css";
import FetchSuggestion from "../../hooks/fetchSuggestion";

const SearchPage = () => {
  const { query, searchResults, setQuery } = useSearch();
  return (
    <main className="searchPage movieRows__container">
      <section>
        <input
          className="searchPage__searchBar"
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Title, character or genre"
        />
        <div className="searchPage__gallery">
          <div className="searchPage__container">
            {query
              ? searchResults.map((result) => (
                  <MovieCard
                    id={result.svid}
                    key={result.svid}
                    poster={result.description}
                    title={result.title}
                  />
                ))
              : null}
          </div>
        </div>
      </section>
    </main>
  );
};

export default SearchPage;
