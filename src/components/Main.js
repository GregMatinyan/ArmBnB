import { useSelector } from "react-redux";
import SignUp from "./auth/SignUp";
import Home from "./homePage/Home";
import { Route, Routes } from "react-router-dom";
import { HOME_PATH, OFFER_PATH, SIGNUP_PATH } from "../constants/path";
import AddHost from "./addHost/AddHost";
import HostPage from "./hostPage/HostPage";
import NotFound from "./NotFound/NotFound";

export default function Main() {
  const user = useSelector(function (state) {
    return state.currentUser.logedIn;
  });
  return (
    <>
      <Routes>
        <Route path={HOME_PATH} element={<Home />} />
        <Route path={OFFER_PATH} element={<AddHost />} />
        {!user ? (
          <Route path={SIGNUP_PATH} element={<SignUp />} />
        ) : (
          <Route
            path="/*"
            element={<NotFound value={"You are already signed up"} />}
          />
        )}
        <Route path="/*" element={<NotFound value={"Page not found"} />} />
        <Route path={`/item/:id`} element={<HostPage />} />
      </Routes>
    </>
  );
}
