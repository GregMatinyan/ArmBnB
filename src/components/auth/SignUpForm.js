import React, { useState } from "react";
import Button from "@mui/material/Button";
import { auth, googleProvider, usersCollection } from "../../configs/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { HOME_PATH } from "../../constants/path";
import styles from "./SignUp.module.css";

export default function SignUpForm() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [country, setCountry] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigation = useNavigate();

  const signUpWithEmail = async () => {
    if (password === confirmPassword) {
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
    } else {
      alert("Wrong");
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
    <>
      <form
        className={styles.inputContainer}
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <h2 className={styles.h2}>Welcome to ARMBNB</h2>
        <input
          className={styles.input}
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className={styles.input}
          placeholder="Surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          required
        />
        <input
          className={styles.input}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
        />
        <input
          className={styles.input}
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
        <input
          className={styles.input}
          placeholder="Birthdate(MM/DD/YYYY)"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          required
          sx={{ mb: 1, bgcolor: "#b9c0e0" }}
        />
        <input
          className={styles.input}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
        />
        <input
          className={styles.input}
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          required
          zx
        />

        <Button type="submit" onClick={signUpWithEmail}>
          Sign Up
        </Button>

        <Button onClick={signUpWithGoogleAcc}>Sign Up With Google</Button>
      </form>
    </>
  );
}
