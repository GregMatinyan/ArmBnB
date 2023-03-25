import { Provider } from "react-redux";
import { store } from "../redux/store";
import SignUp from "./auth/SignUp";
import Home from "./homePage/Home";
import { Route, Routes } from "react-router-dom";
import { HOME_PATH, OFFER_PATH, SIGNUP_PATH } from "../constants/path";
import AddHost from "./addHost/AddHost";
import HostPage from "./hostPage/HostPage";
import ProfilePage from "./profile/ProfilePage";

export default function Main() {
  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route path={HOME_PATH} element={<Home />} />
          <Route path={OFFER_PATH} element={<AddHost />} />
          <Route path={SIGNUP_PATH} element={<SignUp />} />
          <Route path={`/host/:id`} element={<HostPage />} />
          <Route path={`/profile/:userId`} element={<ProfilePage />} />
        </Routes>
      </Provider>
    </>
  );
}
