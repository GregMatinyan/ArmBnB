import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import styles from "./InputForm.module.css";
import { useNavigate } from "react-router-dom";
import { auth } from "../../configs/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { HOME_PATH } from "../../constants/auth";

export default function LogInForm() {
  const navigation = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const logInWithEmail = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation(HOME_PATH);
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
        onSubmit={(event) => {
          event.preventDefault();
        }}
        className={styles.inputForm}
      >
        <Input
          placeholder="Username or email address"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
          sx={{ mb: 1, bgcolor: "#b9c0e0" }}
        />
        <Input
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
          sx={{ mb: 1, bgcolor: "#b9c0e0" }}
        />
        <Button type="submit" onClick={logInWithEmail}>
          Log In
        </Button>
      </form>
    </Box>
  );
}
