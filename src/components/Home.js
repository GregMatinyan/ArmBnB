import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import LogInForm from "./LogInForm";

export default function Home() {
  const navigation = useNavigate();
  return (
    <>
      <div>
        <span>Log In if you already have an account</span>
        <br />
        <LogInForm />
      </div>
      <div>
        <span>Or</span>
        <br />
        <Button variant="contained" onClick={() => navigation("signing")}>
          Sign Up
        </Button>
      </div>
    </>
  );
}
