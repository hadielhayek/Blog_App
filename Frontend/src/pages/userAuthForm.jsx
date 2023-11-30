import React, { useRef } from "react";
import Input from "../components/input";
import googleIcon from '../imgs/google.png'
import { Link } from "react-router-dom";
import AnimationWrapper from '../common/pageanimation';
import {Toaster,toast} from 'react-hot-toast';
import axios from 'axios'


export default function userAuthForm({ type }) {


   const userAuthServer = (serverRoute, formData) => {
    axios.post('http://localhost:3000' + serverRoute, formData)
      .then(({ data }) => {
        console.log(data);
      })
      .catch(({ response }) => {
        toast.error(response?.data?.error || 'An error occurred');
      });
  };

  const handleSubmit=(e)=>{
    e.preventDefault();

    let serverRoute= type == 'sign-in' ? '/signin' : '/signup';
    console.log('Server Route:', serverRoute);

    let emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/;
    
  

    let form= new FormData(formElement);
    let formData={};

    for (let[key,value] of form.entries()){
      formData[key]=value;
    }

    let {fullname,email,password}=formData;

    if (type !== 'sign-in' &&fullname.length < 3) {
      return toast.error( "Fullname must be at least 3 letters" )
  }
  if (!email.length) {
      return toast.error(  " Email cannot be empty" )
  }
  if (!emailRegex.test(email)) {
      return toast.error( "Email is invalid" )

  }
  if (!passwordRegex.test(password)) {
      return toast.error( "Password must be 8+ characters with at least 1 uppercase, 1 lowercase, 1 digit, and 1 special character " )

  }

  userAuthServer(serverRoute,formData);

  }

  return (
    <AnimationWrapper keyVal={type}>
    <section className="h-cover flex items-center justify-center">
      <Toaster/>
      <form id='formElement' className="w-[88%] max-w-[480px]" >
        <h1 className="text-4xl font-gelasio capitalize text-center mb-24">
          {type == "sign-in" ? "Welcome back" : "Join Us"}
        </h1>
        {type != "sign-in" ? (
          <Input
            name="fullname"
            type="text"
            placeholder="Full Name"
            icon="fi-rr-user"
          />
        ) : (
          ""
        )}
        <Input
          name="email"
          type="email"
          placeholder="Email"
          icon="fi-rr-envelope"
        />

        <Input
          name="password"
          type="password"
          placeholder="Password"
          icon="fi-rr-lock"
        />

        <button className="btn-dark center mt-14"
        type="submit"
        onClick={handleSubmit}
        >
            { type.replace('-','') }

        </button>

        <div className="relative w-full flex items-center 
        gap-2 my-10 opacity-10 uppercase text-black font-bold">

           <hr className="w-1/2 border-black"/>
            <p>Or</p>
           <hr className="w-1/2 border-black"/>
        </div>
              <button className="btn-dark flex items-center 
              justify-center gap-4 w-[90%] center">
                <img src={googleIcon} className="w-5"/>
                continue with google
              </button>

             {
                type=='sign-in' ? 
                <p className="mt-6 text-dark-grey text-xl text-center"> 
                    Don't have an account?
                        <Link to='/signup' className='underline text-black text-xl ml-1'>
                        Sign Up
                        </Link>
                    `
                </p>
                   :
                   <p className="mt-6 text-dark-grey text-xl text-center"> 
                   Already a member?
                       <Link to='/signin' className='underline text-black text-xl ml-1'>
                        Sign In
                       </Link>
                   
               </p>

             }
      </form>

    </section>
    </AnimationWrapper>
  );
}
