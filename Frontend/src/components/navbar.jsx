import React, { useContext, useState } from "react";
import logo from "../imgs/logo.png";
import { Link, Outlet } from "react-router-dom";
import { userContext } from "../App";
import Usernavigation from "./usernavigation";

const Navbar = () => {
  const [searchBoxVisibility, setSearchBoxVisibility] = useState(false);
  const {
    userAuth,
    userAuth: { access_token, profile_img },
  } = useContext(userContext);
  const [usernavpanel, setuserNavpanel] = useState(false);
  const handleUserNav = () => {
    setuserNavpanel((currentVal) => !currentVal);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setuserNavpanel(false);
    }, 200);
  };

  return (
    <>
      <nav className="navbar flex items-center justify-between">
        <Link to="/" className="flex-none w-10">
          <img src={logo} className="w-full" alt="Logo" />
        </Link>

        <div className={`md:hidden ml-auto`}>
          <button
            className="bg-grey w-12 h-12 rounded-full flex items-center justify-center"
            onClick={() => setSearchBoxVisibility((currentVal) => !currentVal)}
          >
            <i className="fi fi-br-search text-xl"></i>
          </button>
        </div>

        <div className="hidden md:flex items-center gap-6 ml-auto">
          <Link to="/editor" className="flex gap-2 link">
            <i className="fi fi-rr-file-edit"></i>
            <p>Write</p>
          </Link>

          {access_token ? (
            <>
              <Link to="/dashboard/notifications">
                <button className="w-12 h-12 rounded-full bg-grey relative hover:bg-black/10">
                  <i className="fi fi-rr-bell text-2xl block-mt-1"></i>
                </button>
              </Link>

              <div
                className="relative"
                onClick={handleUserNav}
                onBlur={handleBlur}
              >
                <button className="w-12 h-12 mt-1">
                  <img
                    src={profile_img}
                    className="w-full h-full object-cover rounded-full"
                    alt="Profile"
                  />
                </button>
                {usernavpanel ? <Usernavigation /> : ""}
              </div>
            </>
          ) : (
            <div className="flex gap-2"> 
              <Link className="btn-dark py-2" to="/signin">
                Sign In
              </Link>

              <Link className="btn-light py-2" to="/signup">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
