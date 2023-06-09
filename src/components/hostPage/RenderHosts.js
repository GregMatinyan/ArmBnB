import React from "react";
import { Link } from "react-router-dom";
import styles from "./RenderHost.module.css";
import { useDispatch, useSelector } from "react-redux";
import { doc, updateDoc, deleteField } from "firebase/firestore";
import { auth } from "../../configs/firebase";
import { usersCollection } from "../../configs/firebase";
import AwesomeSlider from "react-awesome-slider-fw";
import "react-awesome-slider-fw/dist/styles.css";
import clsx from "clsx";
import { getUserStatus } from "../../features/currentUser/currentUserSlice";
import { setLoginDialogStatus } from "../../features/loginDialog/loginDialogSlice";

function RenderHost({ data, favorites, changeFavs }) {
  const { id, urls, hostName, price, location } = data;
  const dispatch = useDispatch();

  const user = useSelector(getUserStatus);

  const handleLike = async () => {
    if (!user) {
      dispatch(setLoginDialogStatus(true));
    } else if (favorites.hasOwnProperty(id)) {
      await updateDoc(doc(usersCollection, auth?.currentUser?.uid), {
        ["favorites." + id]: deleteField(),
      });
      changeFavs(id);
    } else {
      await updateDoc(doc(usersCollection, auth?.currentUser?.uid), {
        favorites: {
          ...favorites,
          [id]: true,
        },
      });
      changeFavs(id);
    }
  };

  const slide = (
    <AwesomeSlider cssModule={[styles]}>
      {urls.map((image, index) => (
        <div key={index}>
          <div onClick={handleLike} href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={clsx(styles.faheart, {
                [styles.fillred]: favorites.hasOwnProperty(id),
              })}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </div>

          <Link to={`/item/${id}`}>
            <img style={{ width: "100%" }} src={image} alt="host img" />
          </Link>
        </div>
      ))}
    </AwesomeSlider>
  );

  return (
    <>
      <div className={styles.hostContainer}>
        <div>{slide}</div>
        <div className={styles.hostInfo}>
          <p> {hostName}</p>
          <p> {location}</p>
          <p>
            <strong>{price} $</strong> per/night
          </p>
        </div>
      </div>
    </>
  );
}

export default RenderHost;
