import React from "react";
import MovieCard from "../MovieCard";
import Slider from "react-slick";
import { withRouter } from "react-router-dom";
import { sliderConfig } from "../../utils";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SingleRow.css";


const SingleRow = ({ title, videos }) => {
  return (
      <>
        {videos.length > 0 ? (
            <article className="singleRow">
              <h2 className="singleRow__title">{title}</h2>
              <Slider className="singleRow__slider" {...sliderConfig}>
                {videos.map((video) => (
                    <MovieCard
                        id={video.svid}
                        key={video.svid}
                        poster={video.description}
                        title={video.title}
                    />
                ))}
              </Slider>
            </article>
        ) : (
            <></>
        )}
      </>
  );
};

export default withRouter(SingleRow);
