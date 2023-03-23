import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
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
      <Provider store={store}>
        <Routes>
          <Route path={HOME_PATH} element={<Home />} />
          <Route path={OFFER_PATH} element={<AddHost />} />
          <Route path={SIGNUP_PATH} element={<SignUp />} />
          <Route path={`/item/:id`} element={<HostPage />} />
        </Routes>
      </Provider>
    </>
  );
}
