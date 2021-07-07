import { useState, useEffect } from "react";
import axios from "axios";

const useSearch = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([""]);
  useEffect(() => {
    if (query !== "") {
      axios
        .get(
          `http://127.0.0.1:8000/search/${query}`
        )
        .then((response) => {
          const { data } = response;
          setSearchResults(data);
        });
    }
  }, [query]);
  return { query, searchResults, setQuery };
};
export default useSearch;
