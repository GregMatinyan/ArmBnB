import { useEffect, useState } from "react";
import { User } from "../context/UserStateContext";
import SignUp from "./auth/SignUp";
import Home from "./homePage/Home";
import { Route, Routes } from "react-router-dom";
import { HOME_PATH, OFFER_PATH, SIGNUP_PATH } from "../constants/path";
import { auth } from "../configs/firebase";
import AddHost from "./addHost/AddHost";
import HostPage from "./hostPage/HostPage";

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
      <User.Provider value={logedInUser}>
        <Routes>
          <Route path={HOME_PATH} element={<Home />} />
          <Route path={OFFER_PATH} element={<AddHost />} />
          <Route path={SIGNUP_PATH} element={<SignUp />} />
          <Route path={`/item/:id`} element={<HostPage />} />
        </Routes>
      </User.Provider>
    </>
  );
}
