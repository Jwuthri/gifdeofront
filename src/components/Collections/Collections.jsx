import React from "react";
import CollectionsCard from "./../CollectionsCard";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Collections.css";
const Collections = () => {
  const cards = [
    {
      brand: "southpark",
      image:
        "/images/brands/southpark.png",
      video:
        "/videos/alerte-gogoles.mp4",
    },
    {
      brand: "simpsons",
      image:
          "/images/brands/simpsons.png",
      video:
          "/videos/simpsons-intro.mp4",
    },
    {
      brand: "house",
      image:
          "/images/brands/house.png",
      video:
        "/videos/house-asthma.mp4"
    },
    {
      brand: "movies",
      image:
          "/images/brands/movies.png",
      video:
          "/videos/movie.mp4"
    },
    {
      brand: "youtube",
      image:
          "/images/brands/youtube.png",
      video:
          "/videos/youtube.mp4",
    },
  ];
  const config = {
    slidesToShow: 2,
    slidesToScroll: 1,
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 768,
      },
      {
        breakpoint: 10000, // a unrealistically big number to cover up greatest screen resolution
        settings: "unslick",
      },
    ],
  };
  return (
    <section className="collections">
      <Slider {...config}>
        {cards.map((card) => (
          <Link key={card.brand} to={`/brand/${card.brand}`}>
            <CollectionsCard
              key={card.brand}
              brand={card.brand}
              video={card.video}
              image={card.image}
            />
          </Link>
        ))}
      </Slider>
    </section>
  );
};

export default Collections;
