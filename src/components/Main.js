import { useState } from "react";
import { UserStateContext } from "../context/UserStateContext";
import SignUp from "./signComponents/SignUp";
import Home from "./Home";
import LogIn from "./signComponents/LogIn";
import { Route, Routes } from "react-router-dom";
import { HOME_PATH, SIGNUP_PATH, LOGIN_PATH } from "../constants/auth";
import { auth } from "../configs/firebase";

export default function Main() {
  const [userState, setUserState] = useState(false);
  auth.onAuthStateChanged((user) => {
    if (user) {
      setUserState(true);
    } else {
      setUserState(false);
    }
  });
  return (
    <>
      <UserStateContext.Provider value={userState}>
        <Routes>
          <Route path={HOME_PATH} element={<Home />} />
          <Route path={LOGIN_PATH} element={<LogIn />} />
          <Route path={SIGNUP_PATH} element={<SignUp />} />
        </Routes>
      </UserStateContext.Provider>
    </>
  );
}
