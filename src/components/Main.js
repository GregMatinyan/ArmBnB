import SignUp from "./SignUp";
import Home from "./Home";
import { Route, Routes } from "react-router-dom";

export default function Main() {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"signing"} element={<SignUp />} />
      </Routes>
    </>
  );
}
