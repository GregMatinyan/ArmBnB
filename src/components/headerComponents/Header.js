import React from "react";
import { OFFER_PATH, HOME_PATH, SIGNUP_PATH } from "../../constants/path";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../images/Logo.png";
import styles from "./Header.module.css";
import avatar from "../../icons/user.png";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { auth } from "../../configs/firebase";
import { signOut } from "firebase/auth";
import LogInDialog from "../dialogs/LogInDialog";

function Header() {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(function (state) {
    return state.currentUser.logedIn;
  });
  auth.onAuthStateChanged((user) => {
    if (user) {
      dispatch({
        type: "user-loged-in",
        payload: {
          logedIn: true,
        },
      });
    } else {
      dispatch({
        type: "user-loged-in",
        payload: {
          logedIn: false,
        },
      });
    }
  });

  const loginDialog = useSelector(function (state) {
    return state.loginDialog.open;
  });

  const openDialog = () => {
    dispatch({
      type: "login-dialog-handler",
      payload: {
        open: true,
      },
    });
  };
  const closeDialog = () => {
    dispatch({
      type: "login-dialog-handler",
      payload: {
        open: false,
      },
    });
  };

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
          onClick={openDialog}
          sx={{
            color: "#3f3b34",
            borderColor: "#3f3b34",
            fontFamily: "inherit",
          }}
        >
          Sign In
        </Button>
        <Button
          sx={{
            color: "#3f3b34",
            borderColor: "#3f3b34",
            fontFamily: "inherit",
          }}
          variant="outlined"
          onClick={() => {
            navigation(SIGNUP_PATH);
          }}
        >
          Sign Up
        </Button>
        <LogInDialog open={loginDialog} handleClose={closeDialog} />
      </div>
    ) : (
      <div className={styles.logout}>
        <Button
          sx={{
            color: "#3f3b34",
            borderColor: "#3f3b34",
            fontFamily: "inherit",
          }}
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
        <Link to={HOME_PATH}>
          <img className={styles.logo} src={Logo} alt="logo"></img>
        </Link>
      </div>

      <div className={styles.search}>
        <TextField id="outlined-basic" label="Search" variant="outlined" />
      </div>

      <button
        onClick={() => {
          if (user) {
            navigation(OFFER_PATH);
          } else {
            openDialog();
          }
        }}
        className={styles.addOfferSpan}
      >
        Add your host
      </button>
      {renderSign()}
    </header>
  );
}

export default Header;
