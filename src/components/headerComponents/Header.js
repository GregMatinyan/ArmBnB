import React from "react";
import { UserStateContext } from "../../context/UserStateContext";
import { LOGIN_PATH, SIGNUP_PATH } from "../../constants/auth";
import { useNavigate } from "react-router-dom";
import Logo from "../../images/A.png";
import styles from "./Header.module.css";
import avatar from "../../icons/user.png";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { auth } from "../../configs/firebase";
import { signOut } from "firebase/auth";

function Header() {
  const userState = React.useContext(UserStateContext);

  const navigation = useNavigate();
  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.header}>
      <div className={styles.logocontainer}>
        <img className={styles.logo} src={Logo} alt="logo"></img>
      </div>

      <div className={styles.search}>
        <TextField id="outlined-basic" label="Search" variant="outlined" />
      </div>

      {!userState && (
        <div className={styles.sign}>
          <Button variant="text" onClick={() => navigation(LOGIN_PATH)}>
            Sign In
          </Button>
          <Button variant="outlined" onClick={() => navigation(SIGNUP_PATH)}>
            Sign Up
          </Button>
        </div>
      )}
      {userState && (
        <div className={styles.sign}>
          <Button variant="outlined" onClick={logOut}>
            Log Out
          </Button>

          <img src={avatar} alt="avatar" />
        </div>
      )}
    </div>
  );
}

export default Header;
