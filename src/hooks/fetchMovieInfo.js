import {useEffect, useState} from "react";
import axios from "../axios";

const FetchMovieInfo = (url) => {
    const [movie, setMovie] = useState([]);
    useEffect(() => {
        async function GetVideoInfo() {
            const request = await axios.get(url);
            setMovie(request.data);
            return request;
        }
        GetVideoInfo();
    }, [url]);
    return { movie }
}

export default FetchMovieInfo;