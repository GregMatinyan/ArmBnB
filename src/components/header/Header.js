import React, { useEffect, useState } from "react";
import { OFFER_PATH, HOME_PATH, SIGNUP_PATH } from "../../constants/path";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/Logo.png";
import find from "../../assets/icons/search.png";
import styles from "./Header.module.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { auth } from "../../configs/firebase";
import { signOut } from "firebase/auth";
import LogInDialog from "../dialogs/LogInDialog";
import avatar from "../../assets/icons/user.png";
import {
  getUserStatus,
  setUserStatus,
} from "../../features/currentUser/currentUserSlice";
import {
  getLoginDialogStatus,
  setLoginDialogStatus,
} from "../../features/loginDialog/loginDialogSlice";
import { setIconName } from "../../features/searchByIcon/searchByIconSlice";
import { setInputvalue } from "../../features/searchByInput/searchByInputSlice";
import { setFilters } from "../../features/searchByFilters/serchByFiltersSlice";

function Header(props) {
  const [search, setSearch] = useState("");
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const [log, setLog] = useState(true);

  const user = useSelector(getUserStatus);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUserStatus(true));
      } else {
        dispatch(setUserStatus(false));
      }
      setLog(false);
    });
  }, [dispatch]);

  const loginDialog = useSelector(getLoginDialogStatus);

  const openDialog = () => {
    dispatch(setLoginDialogStatus(true));
  };

  const closeDialog = () => {
    dispatch(setLoginDialogStatus(false));
  };

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  const renderSign = () => {
    if (log) {
      return null;
    }
    return user ? (
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
        <Link to={`/profile/${auth?.currentUser?.uid}`}>
          <span>
            <img src={avatar} alt="avatar" />
          </span>
        </Link>
      </div>
    ) : (
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
    );
  };

  return (
    <header className={styles.header}>
      <div className={styles.logocontainer}>
        <Link to={HOME_PATH}>
          <img
            onClick={() => {
              dispatch(setIconName(""));
              dispatch(setInputvalue(""));
              dispatch(setFilters(null));
            }}
            className={styles.logo}
            src={Logo}
            alt="logo"
          ></img>
        </Link>
      </div>

      {props.search && (
        <div className={styles.searchContainer}>
          <TextField
            id="outlined-basic"
            label="Enter name or location of host"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <img
            alt="find"
            onClick={() => {
              dispatch(setInputvalue(search));
              setSearch("");
            }}
            className={styles.findIcon}
            src={find}
          />
        </div>
      )}

      <button
        onClick={() => {
          if (user) {
            navigation(OFFER_PATH);
          } else {
            openDialog();
          }
        }}
        className={styles.addOffer}
      >
        Add your host
      </button>
      {renderSign()}
    </header>
  );
}

export default Header;
