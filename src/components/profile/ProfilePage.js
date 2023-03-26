import React, { useEffect, useState } from "react";
import Header from "../headerComponents/Header";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { usersCollection } from "../../configs/firebase";
import styles from "./ProfilePage.module.css";
import Logo from "../../icons/user.png";

function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const params = useParams();

  useEffect(() => {
    const render = async () => {
      const dataRef = doc(usersCollection, params.userId);
      const data = await getDoc(dataRef);
      setUserData({ ...data.data() });
    };
    render();
  }, [params.userId]);

  return (
    <div>
      {userData && (
        <>
          <Header />
          <div className={styles.profileContainer}>
            <div className={styles.avatar}>
              <img src={Logo} width="200px" height="200px" alt="avatar" />
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
          </div>
        </>
      )}
    </div>
  );
}

export default ProfilePage;
