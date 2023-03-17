import { useEffect, useState } from "react";
import { UserStateContext } from "../context/UserStateContext";
import SignUp from "./signComponents/SignUp";
import Home from "./Home";
import LogIn from "./signComponents/LogIn";
import { Route, Routes, useFetcher } from "react-router-dom";
import { HOME_PATH, SIGNUP_PATH, OFFER_PATH } from "../constants/path";
import { auth } from "../configs/firebase";
import AddItem from "./AddItem/AddItem";

export default function Main() {
  const [logedInUser, setLogedInUser] = useState(null); // for saving users data
  const [userStatus, setUserState] = useState(false); // for loading

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUserState(true);
      if (user) {
        setLogedInUser(user);
      } else {
        setLogedInUser(null);
      }
    });
  }, []);

  return (
    <>
      <UserStateContext.Provider value={userStatus}>
        <Routes>
          <Route path={HOME_PATH} element={<Home />} />
          {/* {/* <Route path={LOGIN_PATH} element={<LogIn />} /> */}
          <Route path={OFFER_PATH} element={<AddItem />} />
        </Routes>
      </UserStateContext.Provider>
    </>
  );
}
