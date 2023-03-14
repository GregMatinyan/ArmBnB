import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import styles from "./Home.module.css";
import { auth, usersListRef } from "../configs/firebase";
import { getDocs } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { HOME_PATH } from "../constants/auth";

function Profile() {
  const [usersInfo, setUsersInfo] = useState([]);
  const navigation = useNavigate();
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const info = await getDocs(usersListRef);
        const data = info.docs.map((elem) => {
          return { ...elem.data() };
        });
        setUsersInfo(data);
      } catch (error) {
        console.error(error);
      }
    };
    getUserInfo();
  }, []);
  const logOut = async () => {
    try {
      await signOut(auth);
      navigation(HOME_PATH);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      {usersInfo.map((user) => (
        <div key={user.userID} className={styles.container}>
          <h3>{user.name}</h3>
          <h3>{user.surname}</h3>
        </div>
      ))}
      <Button onClick={logOut}>Log out</Button>
    </>
  );
}

export default Profile;
