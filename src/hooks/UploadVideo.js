import {useEffect, useState} from "react";
import axios from "../axios";

const FetchSuggestion = (url) => {
    const [movie, setMovie] = useState([]);
    useEffect(() => {
        async function GetVideoSuggestion() {
            const request = await axios.get(url);
            setMovie(request.data);
            return request;
        }
        GetVideoSuggestion();
    }, [url]);
    return { movie }
}

export default FetchSuggestion;
