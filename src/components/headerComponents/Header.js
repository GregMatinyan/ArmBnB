import React, { useState } from "react";
import { OFFER_PATH, HOME_PATH, SIGNUP_PATH } from "../../constants/path";
import { User } from "../../context/UserStateContext";
import { useNavigate } from "react-router-dom";
import Logo from "../../images/Logo.png";
import styles from "./Header.module.css";
import avatar from "../../icons/user.png";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { auth } from "../../configs/firebase";
import { signOut } from "firebase/auth";
import LogInDialog from "../dialogs/LogInDialog";

function Header() {
  const user = React.useContext(User);
  const navigation = useNavigate();
  const [loginDialog, setLoginDialog] = useState(false);

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  const renderSign = () => {
    return !user ? (
      <div className={styles.sign}>
        <Button
          variant="text"
          onClick={() => {
            setLoginDialog(true);
          }}
          sx={{
            color: "#3f3b34",
            borderColor: "#3f3b34",
          }}
        >
          Sign In
        </Button>
        <Button
          sx={{
            color: "#3f3b34",
            borderColor: "#3f3b34",
          }}
          variant="outlined"
          onClick={() => {
            navigation(SIGNUP_PATH);
          }}
        >
          Sign Up
        </Button>
        <LogInDialog
          open={loginDialog}
          handleClose={() => {
            setLoginDialog(false);
          }}
        />
      </div>
    ) : (
      <div className={styles.logout}>
        <Button
          sx={{ color: "#3f3b34", borderColor: "#3f3b34" }}
          variant="outlined"
          onClick={logOut}
        >
          Log Out
        </Button>
        <span>
          <img src={avatar} alt="avatar" />
        </span>
      </div>
    );
  };

  return (
    <header className={styles.header}>
      <div className={styles.logocontainer}>
        <img
          onClick={() => navigation(HOME_PATH)}
          className={styles.logo}
          src={Logo}
          alt="logo"
        ></img>
      </div>

      <div className={styles.search}>
        <TextField id="outlined-basic" label="Search" variant="outlined" />
      </div>

      <span
        onClick={() => navigation(OFFER_PATH)}
        className={styles.addOfferSpan}
      >
        Add your host
      </span>
      {renderSign()}
    </header>
  );
}

export default Header;
