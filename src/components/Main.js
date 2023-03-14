import SignUp from "./SignUp";
import Home from "./Home";
import LogIn from "./LogIn";
import Profile from "./Profile";
import { Route, Routes } from "react-router-dom";
import {
  HOME_PATH,
  PROFILE_PATH,
  SIGNUP_PATH,
  LOGIN_PATH,
} from "../constants/auth";

export default function Main() {
  return (
    <>
      <Routes>
        <Route path={HOME_PATH} element={<Home />} />
        <Route path={LOGIN_PATH} element={<LogIn />} />
        <Route path={PROFILE_PATH} element={<Profile />} />
        <Route path={SIGNUP_PATH} element={<SignUp />} />
      </Routes>
    </>
  );
}
