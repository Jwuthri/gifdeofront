import React from "react";
import SingleRow from "../SingleRow";
import "./MoviesRows.css";
import FetchCategories from "../../hooks/fetchCategories";

const MoviesRows = () => {
    const { categories } = FetchCategories("http://127.0.0.1:8000/get_all_videos_by_category")
    return (
        <section className="moviesRows">
            {categories.map((category) => (
                <SingleRow title={category.name} videos={category.videos} />
            ))}
        </section>
    );
};

export default MoviesRows;
