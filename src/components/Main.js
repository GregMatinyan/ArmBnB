import { useEffect, useState } from "react";
import { LogedInUser, Sign } from "../context/UserStateContext";
import SignUp from "./signComponents/SignUp";
import Home from "./Home";
import { Route, Routes } from "react-router-dom";
import { HOME_PATH, OFFER_PATH, SIGNUP_PATH } from "../constants/path";
import { auth } from "../configs/firebase";
import AddItem from "./AddItem/AddItem";

export default function Main() {
  const [logedInUser, setLogedInUser] = useState(null);
  const [status, setStatus] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setLogedInUser(user);
        setStatus(false);
      } else {
        setLogedInUser(null);
        setStatus(false);
      }
    });
  }, []);

  return (
    <>
      <Sign.Provider value={status}>
        <LogedInUser.Provider value={logedInUser}>
          <Routes>
            <Route path={HOME_PATH} element={<Home />} />
            <Route path={SIGNUP_PATH} element={<SignUp />} />
            <Route path={OFFER_PATH} element={<AddItem />} />
          </Routes>
        </LogedInUser.Provider>
      </Sign.Provider>
    </>
  );
}
