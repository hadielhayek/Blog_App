import React, { useContext, useState } from "react";
import { userContext } from "../App";
import { Navigate } from "react-router-dom";
import Blogeditor from "../components/blogeditor";
import Publishform from "../components/publishform";

export default function editor() {
  const [editorState, setEditor] = useState("editor");
  let { userAuth: { access_token },} = useContext(userContext);
  return access_token == null ? (
    <Navigate to="/signin" />
  ) : editorState == "editor" ? <Blogeditor />
  : 
   <Publishform /> ;
}
