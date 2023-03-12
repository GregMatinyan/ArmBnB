import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import styles from "./InputForm.module.css";
import { auth, googleProvider, usersListRef } from "../configs/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { addDoc } from "firebase/firestore";

export default function InputForm() {
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
      });
      setName("");
      setSurname("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error(error);
    }
  };

  const signUpWithGoogleAcc = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error(error);
    }
  };

  const logOut = async () => {
    try {
      await signInWithPopup(auth);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        py: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <form
        className={styles.inputForm}
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          sx={{ mb: 1, fontSize: "var(--joy-fontSize-sm)" }}
        />
        <Input
          placeholder="Surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          required
          sx={{ mb: 1, fontSize: "var(--joy-fontSize-sm)" }}
        />
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
          sx={{ mb: 1, fontSize: "var(--joy-fontSize-sm)" }}
        />
        <Input
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
          sx={{ mb: 1, fontSize: "var(--joy-fontSize-sm)" }}
        />
        <Button onClick={signUpWithEmail}>Sign Up</Button>
        <Button onClick={signUpWithGoogleAcc}>Sign Up With Google</Button>
        <Button onClick={logOut}>Log out</Button>
      </form>
    </Box>
  );
}
