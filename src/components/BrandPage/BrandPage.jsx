import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import SingleRow from "../SingleRow";
import "./BrandPage.css";
import FetchCategories from "../../hooks/fetchCategories";


const BrandPage = (props) => {
  const brand = props.match.params.brand;
  const { categories } = FetchCategories(`https://gifdeo.herokuapp.com/get_video_from_category/${brand}`)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="brandPage">

      <div className="brandPage__background">
        <img alt="" src={`/images/brands/${brand}-bg.jpg`} />
      </div>
      <div className="brandPage__image">
        {brand !== "" ? (
          <img src={`/images/brands/${brand}.png`} alt="" />
        ) : null}
      </div>
      <div className="brandPage__movies movieRows__container">
          {categories.map((category) => (
              <SingleRow title="" videos={category.videos} />
          ))}
      </div>
    </main>
  );
};

export default withRouter(BrandPage);
