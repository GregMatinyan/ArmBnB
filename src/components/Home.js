import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import LogInForm from "./LogInForm";
import styles from "./Home.module.css";
import Header from "./Header";
import Filters from "./Filters";

export default function Home() {
  const navigation = useNavigate();

  return (
    <>
      <div className={styles.container}>
        <Header />
        <Filters />
        {/* <h4>Log In if you already have an account</h4>
        <div>
          <LogInForm />
          <div className={styles.child}>
            <span>Or</span>
            <Button
              className={styles.signup}
              variant="outlined"
              onClick={() => navigation("sign-up")}
            >
              Sign Up
            </Button> */}
        {/* </div>
        </div> */}
      </div>
    </>
  );
}
