import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import styles from "./InputForm.module.css";
import { auth, googleProvider, usersCollection } from "../../configs/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { HOME_PATH } from "../../constants/path";

export default function SignUpForm() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigate();

  const signUpWithEmail = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await addDoc(usersCollection, {
        name,
        surname,
        email,
        userID: auth?.currentUser?.uid,
      });
      setName("");
      setSurname("");
      setEmail("");
      setPassword("");
      navigation(HOME_PATH);
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

  return (
    <Box
      sx={{
        py: 2,
        display: "flex",
        flexDirection: "column",
        paddingTop: "20px",
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
          sx={{ mb: 1, bgcolor: "#b9c0e0" }}
        />
        <Input
          placeholder="Surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          required
          sx={{ mb: 1, bgcolor: "#b9c0e0" }}
        />
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
          sx={{ mb: 1, bgcolor: "#b9c0e0" }}
        />
        <Input
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
          sx={{ mb: 1, bgcolor: "#b9c0e0" }}
        />

        <Button type="submit" onClick={signUpWithEmail}>
          Sign Up
        </Button>
        <Button onClick={signUpWithGoogleAcc}>Sign Up With Google</Button>
      </form>
    </Box>
  );
}
