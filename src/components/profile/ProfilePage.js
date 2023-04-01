import React, { useEffect, useState } from "react";
import Header from "../headerComponents/Header";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import {
  usersCollection,
  storage,
  offersCollection,
} from "../../configs/firebase";
import styles from "./ProfilePage.module.css";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import ModeIcon from "@mui/icons-material/Mode";
import EditProfile from "./EditProfile";

function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [dialog, setDialog] = useState(false);
  const [favs, setFavs] = useState([]);

  const params = useParams();

  useEffect(() => {
    const render = async () => {
      const dataRef = doc(usersCollection, params.userId);
      const data = await getDoc(dataRef);
      setUserData({ ...data.data() });
    };
    render();
  }, [params.userId]);

  useEffect(() => {
    if (!userData) return;
    Object.keys(userData.favorites).map(async (id) => {
      const offerPureData = await getDoc(doc(offersCollection, id));

      setFavs((prev) => [...prev, offerPureData.data()]);
    });
  }, [userData]);

  function renderFavorites() {
    return favs.map((item, index) => {
      return (
        <>
          <img width="200px" src={item.urls[0]} alt="host img" />
          <span key={index}>{item.hostName}</span>;
        </>
      );
    });
  }

  async function updateProfileData(name, surname, avatar) {
    const storageRef = ref(storage, `avatars/${userData.email}`);
    await uploadBytes(storageRef, avatar);
    const url = await getDownloadURL(storageRef);
    await updateDoc(doc(usersCollection, params.userId), {
      name,
      surname,
      url,
    });
  }

  const openDialog = () => {
    setDialog(true);
  };
  const closeDialog = () => {
    setDialog(false);
  };

  return (
    <div>
      {userData && (
        <>
          <Header />
          <div className={styles.profileContainer}>
            <div className={styles.avatar}>
              <img
                src={userData.url}
                width="200px"
                height="200px"
                alt="avatar"
              />
              <div>
                <span onClick={openDialog} style={{ cursor: "pointer" }}>
                  Edit profile: <ModeIcon />
                </span>
              </div>
            </div>
            <div className={styles.profileDataContainer}>
              <p>
                First name: <strong> {userData.name} </strong>
              </p>
              <p>
                Last name: <strong>{userData.surname}</strong>
              </p>
              <p>
                Contacts: <strong>{userData.email}</strong>
              </p>
            </div>
            <div>{renderFavorites()}</div>
          </div>

          <EditProfile
            open={dialog}
            handleClose={closeDialog}
            updateData={updateProfileData}
            avatar={userData.url}
          />
        </>
      )}
    </div>
  );
}

export default ProfilePage;
