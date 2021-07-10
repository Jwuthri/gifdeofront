import React from "react";
import SingleRow from "../SingleRow";
import "./MoviesRows.css";
import FetchCategories from "../../hooks/fetchCategories";

const MoviesRows = () => {
    const { categories } = FetchCategories("https://gifdeo.herokuapp.com/get_all_videos_by_category")
    return (
        <section className="moviesRows">
            {categories.map((category) => (
                <SingleRow title={category.name} videos={category.videos} />
            ))}
        </section>
    );
};

export default MoviesRows;
