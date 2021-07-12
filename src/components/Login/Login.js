import React, {useState} from "react";
import styled from "styled-components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import FetchCategories from "../../hooks/fetchCategories";
import axios from "axios";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import YouTube from 'react-youtube';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function YouTubeGetID(url){
    url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    return (url[2] !== undefined) ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
}

function matchYoutubeUrl(url) {
    var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if(url.match(p)){
        return url.match(p)[1];
    }
    return false;
}

const Styles = styled.div`
 background: #181818;
 padding: 30px;
  
 h1 {
   border-bottom: 1px solid white;
   color: #3d3d3d;
   font-family: sans-serif;
   font-size: 20px;
   font-weight: 600;
   line-height: 24px;
   padding: 10px;
   text-align: center;
 }

  .detailPage__iframe{
    display: flex;
    //padding-top: 50px;
    justify-content: center;
  }
  
 form {
   display: flex;
   flex-direction: column;
   justify-content: space-evenly;
   margin: 0 auto;
   max-width: 500px;
   max-height: 1000px;
   padding: 100px 50px;
 }

 input {
   border: 1px solid ;
   border-radius: 4px;
   box-sizing: border-box;
   padding: 10px;
   width: 100%;
 }

 select {
    border: 1px solid ;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 10px;
    width: 100%;
    background-color: white;
   font-family: sans-serif;
 }

 label {
   color: white;
   display: block;
   font-family: sans-serif;
   font-size: 14px;
   font-weight: 500;
   margin-bottom: 1px;
   padding: 10px;
 }

  /* for Opera,webkit chrome browsers */
  input::-webkit-input-placeholder {
    color: wheat;
  }
  /*firefox 19+ versions*/
  input::-moz-placeholder {
    color: wheat;
  }
  /*Latest modern browsers */
  input::placeholder {
    color: wheat;
  }
  
 .error {
   color: red;
   font-family: sans-serif;
   font-size: 12px;
   height: 30px;
 }
  
 .submitButton {
   background-color: #3C83EE;
   color: white;
   font-family: sans-serif;
   font-size: 14px;
   border: 0;
   margin: 20px 0px;
`;


const SignupSchema = yup.object().shape({
    start: yup.number().required().positive(),
    end: yup.number().required().positive(),
    url: yup.string().url().required()
});


const Login = () => {
    const [url, setUrl] = useState("")
    const { categories } = FetchCategories("https://gifdeo.herokuapp.com/get_all_videos_by_category")
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(SignupSchema)
    });
    const opts = {
        height: '250',
        width: '400',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };
    const notify_success = () => toast.info('Thank you for your video', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
    });

    const notify_error = (msg) => toast.error(msg, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
    });

    const onSubmit = (data) => {
        const duration = data.end - data.start
        if (duration < 1) {
            notify_error('Is the start/end correct?')
        } else if (duration > 100) {
            notify_error('The video is too long (max 100 sec)')
        } else {
            axios.post('https://gifdeo.herokuapp.com/upload_video', data)
            notify_success()
            reset()
        }
    };

    const handleChange = (e) => {
        if (matchYoutubeUrl(e.target.value)) {
            setUrl(YouTubeGetID(e.target.value))
        } else {
            setUrl("")
        }
    }

    return (
        <Styles>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="detailPage__iframe">
                    {url !== "" ? ( <YouTube videoId={url} opts={opts} /> ) : null }
                </div>
                <label>Youtube URL</label>
                <input name="url" placeholder="https://www.youtube.com/watch?v=VBzVlG631qM" type="text" {...register("url")} onChange={handleChange}/>
                {errors.url && <p style={{ color: 'red' }}>{errors.url.message}</p>}
                <label>Title</label>
                <input name="title" placeholder="Berywam - Give It Up (INTRO)" type="text" {...register("title")}/>
                <label>Start (in seconds)</label>
                <input name="start" placeholder="24" type="number" step="0.01" {...register("start", { valueAsNumber: true })}/>
                {errors.start && <p style={{ color: 'red' }}>{errors.start.message}</p>}
                <label>End (in seconds)</label>
                <input name="end" placeholder="43" type="number" step="0.01" {...register("end", { valueAsNumber: true })}/>
                {errors.end && <p style={{ color: 'red' }}>{errors.end.message}</p>}
                <label>Category</label>
                <select   {...register("collection")}>
                    {categories.map((category) => (
                        <option value={category.name}>{category.name}</option>
                    ))}
                </select>
                <input type="submit" className="submitButton"/>
                <ToastContainer />
            </form>
        </Styles>
    );
}


export default Login;
