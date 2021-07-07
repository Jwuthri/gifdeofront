import React from "react";
import styled from "styled-components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import FetchCategories from "../../hooks/fetchCategories";
import axios from "axios";


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
    const { categories } = FetchCategories("http://127.0.0.1:8000/get_all_videos_by_category")
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(SignupSchema)
    });
    const onSubmit = (data) => {
        axios.post('http://127.0.0.1:8000/upload_video', data)
        reset()
    };

    return (
        <Styles>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Youtube URL</label>
                <input name="url" placeholder="https://www.youtube.com/watch?v=VBzVlG631qM" type="text" {...register("url")}/>
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
            </form>
        </Styles>
    );
}


export default Login;
