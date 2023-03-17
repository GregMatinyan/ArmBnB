import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { auth } from "../../../configs/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import styles from "./LoginDialog.module.css";

export default function LogInDialog({ open, handleClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const logInWithEmail = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => {
          handleClose();
          setEmail("");
          setPassword("");
        }}
      >
        <DialogTitle className={styles.title}>
          LogIn to your ArmBnB account
        </DialogTitle>
        <DialogContent className={styles.dialogContent}>
          <TextField
            className={styles.input}
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", alignItems: "center" }}>
          {/* <Button
            sx={{ color: "#3f3b34", borderColor: "#3f3b34" }}
            onClick={() => {
              handleClose();
              setEmail("");
              setPassword("");
            }}
          >
            Cancel
          </Button> */}
          <Button
            sx={{
              color: "#3f3b34",
              borderColor: "#3f3b34",
            }}
            onClick={logInWithEmail}
          >
            Log In
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
