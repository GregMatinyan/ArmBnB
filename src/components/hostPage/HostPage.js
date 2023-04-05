import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc, deleteField } from "firebase/firestore";
import {
  offersCollection,
  usersCollection,
  auth,
} from "../../configs/firebase";
import Header from "../header/Header";
import styles from "./HostPage.module.css";
import Location from "../../assets/icons/location.png";
import Like from "../../assets/icons/heart.png";
import fillRed from "../../assets/icons/red-heart.png";
import { hostFeatureIcons } from "../../assets/icons/icons";
import LargeImg from "./LargeImg";
import AwesomeSlider from "react-awesome-slider-fw";
import "react-awesome-slider-fw/dist/styles.css";
import { useSelector, useDispatch } from "react-redux";
import { getUserStatus } from "../../features/currentUser/currentUserSlice";
import { setLoginDialogStatus } from "../../features/loginDialog/loginDialogSlice";
import { v4 } from "uuid";

function HostPage() {
  const [data, setData] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);
  const [favorites, setFavorites] = useState({});

  const params = useParams();
  const user = useSelector(getUserStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    const render = async () => {
      const dataRef = doc(offersCollection, params.id);
      const hostData = await getDoc(dataRef);
      setData({ ...hostData.data() });
    };
    render();
  }, [params.id]);

  useEffect(() => {
    if (user) {
      async function getFavorites() {
        const current = await getDoc(
          doc(usersCollection, auth?.currentUser?.uid)
        );

        setFavorites({ ...current.data().favorites });
      }
      getFavorites();
    }
  }, [user, favorites]);

  const handleLike = async () => {
    if (!user) {
      dispatch(setLoginDialogStatus(true));
    } else if (favorites.hasOwnProperty(params.id)) {
      await updateDoc(doc(usersCollection, auth?.currentUser?.uid), {
        ["favorites." + params.id]: deleteField(),
      });
      delete favorites[params.id];
      setFavorites({ ...favorites });
    } else {
      await updateDoc(doc(usersCollection, auth?.currentUser?.uid), {
        favorites: {
          ...favorites,
          [params.id]: true,
        },
      });
      setFavorites({ ...favorites, [params.id]: true });
    }
  };

  return (
    data && (
      <>
        <Header />
        <div className={styles.container}>
          <div className={styles.hostName}>
            <h2>{data.hostName}</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div className={styles.location}>
              <img src={Location} alt="Location img" />
              <h4>{data.location}</h4>
            </div>
            <div className={styles.favorites} onClick={handleLike}>
              <span>To favorites</span>
              <img
                src={favorites.hasOwnProperty(params.id) ? fillRed : Like}
                alt="like img"
              />
            </div>
          </div>

          <div className={styles.hostDescription}>
            <div className={styles.imgGrid}>
              <AwesomeSlider cssModule={[styles]}>
                {data.urls.map((url) => (
                  <div
                    key={url.img}
                    whilehover={{ opacity: 1 }}
                    onClick={() => setSelectedImg(url)}
                  >
                    <img src={url} alt="url" />
                  </div>
                ))}
              </AwesomeSlider>
            </div>

            {selectedImg && (
              <LargeImg
                selectedImg={selectedImg}
                setSelectedImg={setSelectedImg}
              />
            )}
            <div className={styles.description}>
              <strong>DESCRIPTION</strong>
              <p>{data.description}</p>
            </div>
          </div>

          <h3 className={styles.price}>Price for nigth {data.price}$</h3>

          <div className={styles.offers}>
            <h3>What this place offers</h3>
          </div>
          <div className={styles.iconsContainer}>
            {Object.entries(hostFeatureIcons).map((icon, index) => {
              return (
                <div key={v4()} className={styles.icons}>
                  <img key={v4()} src={icon[1]} alt="icon" />
                  <span
                    key={v4()}
                    className={!data[icon[0]] ? styles.absenceIcon : null}
                  >
                    {icon[0]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </>
    )
  );
}
export default HostPage;
