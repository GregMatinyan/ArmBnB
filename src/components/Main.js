import { useEffect, useState } from "react";
import { Loading, User } from "../context/UserStateContext";
import SignUp from "./signComponents/SignUp";
import Home from "./Home";
import LogIn from "./signComponents/LogIn";
import { Route, Routes, useFetcher } from "react-router-dom";
import { HOME_PATH, SIGNUP_PATH, OFFER_PATH } from "../constants/path";
import { auth } from "../configs/firebase";
import AddItem from "./AddItem/AddItem";

export default function Main() {
  const [logedInUser, setLogedInUser] = useState(null); // for saving users data

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setLogedInUser(user);
      } else {
        setLogedInUser(null);
      }
    });
  }, []);

  return (
    <>
      <User.Provider value={logedInUser}>
        <Routes>
          <Route path={HOME_PATH} element={<Home />} />
          {/* {/* <Route path={LOGIN_PATH} element={<LogIn />} /> */}
          <Route path={OFFER_PATH} element={<AddItem />} />
        </Routes>
      </User.Provider>
    </>
  );
}
