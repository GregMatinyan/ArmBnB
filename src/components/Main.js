import { useEffect, useState } from "react";
import { LogedInUser } from "../context/UserStateContext";
import SignUp from "./signComponents/SignUp";
import Home from "./Home";
import { Route, Routes } from "react-router-dom";
import { HOME_PATH, OFFER_PATH, SIGNUP_PATH } from "../constants/path";
import { auth } from "../configs/firebase";
import AddItem from "./AddItem/AddItem";

export default function Main() {
  const [logedInUser, setLogedInUser] = useState(null);

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
      <LogedInUser.Provider value={logedInUser}>
        <Routes>
          <Route path={HOME_PATH} element={<Home />} />
          <Route path={SIGNUP_PATH} element={<SignUp />} />
          <Route path={OFFER_PATH} element={<AddItem />} />
        </Routes>
      </LogedInUser.Provider>
    </>
  );
}
