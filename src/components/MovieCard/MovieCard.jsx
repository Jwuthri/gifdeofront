import React from "react";
import { Link } from "react-router-dom";
import "./MovieCard.css";


const MovieCard = ({ id, title, poster, watching }) => {
  return (
    <div className={watching ? "movieCard watching" : "movieCard "}>
      <Link to={`/play/${id}`}>
        <div className="movieCard__container">
          {poster == null ? (
            <span className="movieCard__t   itle">{title}</span>
          ) : null}
          <img
            className="movieCard__poster"
            src={
              poster !== null
                ? poster
                : "../noImage.png"
            }
            alt={title}
          />
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
