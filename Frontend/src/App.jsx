import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import UserAuthForm from "./pages/userAuthForm";
import { createContext, useEffect, useState } from "react";
import { lockInSession } from "./common/session";

export const userContext = createContext({});

const App = () => {
  const [userAuth,setuserAuth]=useState({});

  useEffect(()=>{

    let userInSession=lockInSession('user');
    userInSession ? setuserAuth(JSON.parse(userInSession)) :
    setuserAuth({access_token:null})
  }, [])

  return (
    <userContext.Provider value={{userAuth,setuserAuth}}>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="/signin" element={<UserAuthForm type="sign-in" />} />
          <Route path="/signup" element={<UserAuthForm type="sign-up" />} />
        </Route>
      </Routes>
    </userContext.Provider>
  );
};

export default App;
