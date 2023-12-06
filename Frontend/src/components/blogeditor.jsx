import React from "react";
import { Link } from "react-router-dom";
import logo from "../imgs/logo.png";
import AnimationWrapper from "../common/pageanimation";
import DefaultBanner from '../imgs/blog banner.png'
export default function Blogeditor() {

    const handleBannerUpload = (e)=>{
            let img = e.target.files[0];
            console.log(img)
    }
  return (
    <>
    <nav className="navbar">
      <Link to="/">
        <img src={logo} className="flex-none w-10 " />
      </Link>
      <p className="max-md:hidden text-black line-clamp-1 w-full">New blog</p>
      <div className="flex gap-4 ml-auto">
        <button className="btn-dark py-2">Publish</button>
        <button className="btn-light py-2">Save Draft</button>
      </div>
    </nav>

    <AnimationWrapper>
        <section>
            <div className="mx-auto max-w-[900px] w-full">
            <div className="relative hover:opacity-80 aspect-video bg-white border-4 border-grey">
                 <label htmlFor="uploadBanner">
                    <img src={DefaultBanner} className="z-20"/>
                    <input
                    id='uploadBanner'
                    type='file'
                    accept=".png, .jpg, .jpeg"
                    hidden
                    onChange={handleBannerUpload}
                    />
                
                 </label>
            </div>
            </div>
        </section>
    </AnimationWrapper>
    </>
  );
}
