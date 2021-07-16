import {useEffect, useState} from "react";
import axios from "../axios";


const FetchCategories = (url) => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        async function GetVideoPerCategories() {
            const request = await axios.get(url);
            setCategories(request.data);
        }
        GetVideoPerCategories();
    }, [url]);
    return {categories}
}

export default FetchCategories;