import SignUp from "./SignUp";
import Home from "./Home";
import Profile from "./Profile";
import { Route, Routes } from "react-router-dom";

export default function Main() {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"profile"} element={<Profile />} />
        <Route path={"sign-up"} element={<SignUp />} />
      </Routes>
    </>
  );
}
