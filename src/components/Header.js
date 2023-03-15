import React, { useState } from "react";
import Logo from "../images/A.png";
import styles from "./Header.module.css";
import avatar from "../icons/user.png";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../configs/firebase";

function Header(props) {
  const [userState, setUserState] = useState(true);
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
          <Button variant="text">Sign In</Button>
          <Button variant="outlined">Sign Up</Button>
        </div>
      )}
      {userState && (
        <div className={styles.sign}>
          <Button variant="outlined">Log Out</Button>

          <img src={avatar} />
        </div>
      )}
    </div>
  );
}

export default Header;
