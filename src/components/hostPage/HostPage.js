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
// import Rating from "@mui/material/Rating";

function HostPage() {
  const [data, setData] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);
  const [userData, setUserData] = useState({});
  const [favorites, setFavorites] = useState({});
  const [comment, setComment] = useState("");
  // const [rating, setRating] = React.useState({
  //   averageRate: 0,
  //   totalRate: 0,
  //   reviews: 0,
  // });
  const params = useParams();
  const user = useSelector(getUserStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    const render = async () => {
      const dataRef = await getDoc(doc(offersCollection, params.id));
      const hostData = { ...dataRef.data() };
      setData(hostData);
      // setRating(hostData.rating);
    };
    render();
  }, [params.id]);

  useEffect(() => {
    if (user) {
      async function getFavorites() {
        const current = await getDoc(
          doc(usersCollection, auth?.currentUser?.uid)
        );
        const data = { ...current.data() };
        setUserData({
          fullName: `${data.name} ${data.surname}`,
          url: data.url,
        });
        setFavorites(data.favorites);
      }
      getFavorites();
    }
  }, [user]);

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

  const addComment = async () => {
    if (!user) {
      dispatch(setLoginDialogStatus(true));
    } else {
      await updateDoc(doc(offersCollection, params.id), {
        comments: {
          ...data.comments,
          [auth?.currentUser?.uid]: {
            text: comment,
            name: userData.fullName,
            avatar: userData.url,
          },
        },
      });
    }
  };

  // const handleRate = async () => {
  //   if (!user) {
  //     dispatch(setLoginDialogStatus(true));
  //   } else {
  //     await updateDoc(doc(offersCollection, params.id), {
  //       rating: {
  //         ...rating,
  //       },
  //     });
  //   }
  // };

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
                    key={url}
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

          <h3 className={styles.price}>Price for night {data.price}$</h3>

          <div className={styles.offers}>
            <h3>What this place offers</h3>
          </div>
          <div className={styles.iconsContainer}>
            {Object.entries(hostFeatureIcons).map((icon, index) => {
              return (
                <div key={index} className={styles.icons}>
                  <img src={icon[1]} alt="icon" />
                  <span className={!data[icon[0]] ? styles.absenceIcon : null}>
                    {icon[0]}
                  </span>
                </div>
              );
            })}
          </div>
          <div>
            <h3>Guest reviews</h3>
            {!data.comments ? (
              <p>No comments yet</p>
            ) : (
              Object.entries(data.comments).map((elem) => {
                return (
                  <div key={elem[0]}>
                    <img width="40px" src={elem[1].avatar} alt="avatar" />
                    <p>{elem[1].name}</p>
                    <p>{elem[1].text}</p>
                  </div>
                );
              })
            )}
            <input onChange={(e) => setComment(e.target.value)} />
            <button onClick={addComment}>Add comment</button>
          </div>
        </div>
        {/* <Rating
          name="simple-controlled"
          value={rating.averageRate}
          onChange={(e, newValue) => {
            setRating({
              ...rating,
              reviews: rating.reviews + 1,
              totalRate: rating.totalRate + newValue,
              averageRate: (rating.totalRate + newValue) / (rating.reviews + 1),
            });

            handleRate();
          }}
        /> */}
      </>
    )
  );
}
export default HostPage;
