import React, { useState } from "react";
import { UserStateContext } from "../../context/UserStateContext";
// import { SIGNUP_PATH } from "../../constants/auth";
// import { useNavigate } from "react-router-dom";
import Logo from "../../images/Logo.png";
import styles from "./Header.module.css";
import avatar from "../../icons/user.png";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { auth } from "../../configs/firebase";
import { signOut } from "firebase/auth";
import LogInDialog from "../Dialogs/LoginDialog/LogInDialog";
import SignUpDialog from "../Dialogs/SignUpDialog/SignUpDIalog";

function Header() {
  const userState = React.useContext(UserStateContext);
  const [loginDialog, setLoginDialog] = useState(false);
  const [signUpDialog, setSignUpDialog] = useState(false);

  // const navigation = useNavigate();
  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.logocontainer}>
        <img className={styles.logo} src={Logo} alt="logo"></img>
      </div>

      <div className={styles.search}>
        <TextField id="outlined-basic" label="Search" variant="outlined" />
      </div>

      {!userState && (
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
              setSignUpDialog(true);
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
          <SignUpDialog
            open={signUpDialog}
            handleClose={() => {
              setSignUpDialog(false);
            }}
          />
        </div>
      )}
      {userState && (
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
      )}
    </header>
  );
}

export default Header;