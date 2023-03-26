import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { addDoc } from "firebase/firestore";
import { auth, googleProvider, usersListRef } from "../../configs/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

import styles from "./SignUpDialog.module.css";

export default function SignUpDialog({ open, handleClose }) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUpWithEmail = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await addDoc(usersListRef, {
        name,
        surname,
        email,
        userID: auth?.currentUser?.uid,
      });
      setName("");
      setSurname("");
      setEmail("");
      setPassword("");
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
          setName("");
          setSurname("");
        }}
      >
        <DialogTitle className={styles.title}>
          Create your ArmBnB account
        </DialogTitle>
        <DialogContent className={styles.dialogContent}>
          <TextField
            className={styles.input}
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
          />
          <TextField
            className={styles.input}
            autoFocus
            margin="dense"
            id="name"
            label="Surname"
            type="text"
            fullWidth
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            variant="outlined"
          />
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
            onClick={signUpWithEmail}
            sx={{
              color: "#3f3b34",
              borderColor: "#3f3b34",
            }}
          >
            Create account
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
