import React, { useState } from "react";
import Button from "@mui/material/Button";
import styles from "./InputForm.module.css";
import { auth, googleProvider, usersCollection } from "../../configs/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { HOME_PATH } from "../../constants/path";
import DefaultAvatar from "../../assets/icons/user.png";
import { YearPicker, MonthPicker, DayPicker } from "react-dropdown-date";

export default function SignUpForm() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [day, setDay] = useState(null);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const [country, setCountry] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const navigation = useNavigate();

  const signUpWithEmail = async () => {
    if (password === confirmPassword) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(usersCollection, auth?.currentUser?.uid), {
          name,
          surname,
          email,
          url: DefaultAvatar,
          favorites: {},
          userHosts: [],
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
      setMessage("Please enter correct password!");
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
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
        <div className={styles.dateContainer}>
          <DayPicker
            className={styles.dateField}
            defaultValue={"Day"}
            year={year}
            month={month}
            endYearGiven
            required={true}
            disabled={false}
            value={day}
            onChange={(day) => {
              setDay(day);
            }}
            id={"day"}
            name={"day"}
            classes={"classes"}
            optionalClasses={"option classes"}
          />
          <MonthPicker
            className={styles.dateField}
            defaultValue={"Month"}
            numeric
            short
            caps
            endYearGiven
            year={year}
            required={true}
            disabled={false}
            value={month}
            onChange={(month) => {
              setMonth(month);
            }}
            id={"month"}
            name={"month"}
            classes={"classes"}
            optionalClasses={"option classes"}
          />
          <YearPicker
            className={styles.dateField}
            defaultValue={"Year"}
            start={1900}
            end={2023}
            reverse
            value={year}
            onChange={(year) => {
              setYear(year);
            }}
            id={"year"}
            name={"year"}
            classes={"classes"}
            optionClasses={"option classes"}
          />
        </div>
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
        />
        {message && (
          <div style={{ padding: "5px 0px 5px 0px", color: "red" }}>
            {message}
          </div>
        )}
        <Button type="submit" onClick={signUpWithEmail}>
          Sign Up
        </Button>

        <Button onClick={signUpWithGoogleAcc}>Sign Up With Google</Button>
      </form>
    </>
  );
}
