import React, { useState } from "react";
import Slider from "react-slick";
import MovieCard from "../MovieCard";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import { withRouter } from "react-router-dom";
import { sliderConfig } from "../../utils";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./DetailPage.css";
import "../SingleRow/SingleRow.css";
import FetchMovieInfo from "../../hooks/fetchMovieInfo";
import FetchSuggestion from "../../hooks/fetchSuggestion";


function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return <div {...other}>{value === index && <Box p={3}>{children}</Box>}</div>;
}

const DetailPage = (props) => {
  const data = FetchMovieInfo(`http://127.0.0.1:8000/get_video_info/${props.match.params.movieId}`).movie
  const suggestion = FetchSuggestion(`http://127.0.0.1:8000/get_video_suggestion/${props.match.params.movieId}`).movie

  const [value, setValue] = useState(0);


  return (
      <>
        <main className="detailPage">
            <div className="detailPage__info">
                <h2 className="detailPage__title">{data.title}</h2>
                <div className="detailPage__iframe">
                    <iframe src={`https://muse.ai/embed/${data.svid}?logo=0`} width="600" height="400" allowFullScreen />
                </div>
                <div>
                    <p>Views {data.views} </p>
                </div>
                <AppBar className="detailPage__tabsHeader" position="static">
                <Tabs value={value}>
                  <Tab label="Suggestions" />
                </Tabs>
              </AppBar>
              <TabPanel className="tab__panel" value={value} index={0}>
                <Slider
                    className="singleRow singleRow__slider singleRow__recommendedSlider"
                    {...sliderConfig}
                >
                  {suggestion.map((recommendedMovie) => (
                      <MovieCard
                          id={recommendedMovie.svid}
                          key={recommendedMovie.svid}
                          title={recommendedMovie.title}
                          poster={recommendedMovie.description}
                      />
                  ))}
                </Slider>
              </TabPanel>
            </div>
        </main>
      </>
  );
};

export default withRouter(DetailPage);
