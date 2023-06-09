import React, { useState, useEffect } from "react";
import Header from "../header/Header";
import styles from "./AddHost.module.css";
import { v4 } from "uuid";
import {
  usersCollection,
  offersCollection,
  storage,
  auth,
} from "../../configs/firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { setDoc, doc, updateDoc, getDoc } from "@firebase/firestore";
import Checkbox from "@mui/material/Checkbox";
import addPhoto from "../../assets/icons/add-photo.png";
import { HOME_PATH } from "../../constants/path";
import { useNavigate } from "react-router-dom";

function AddHost() {
  const [uploadedImages, setUploadedImages] = useState(null);
  const [hostName, setHotelName] = useState("");
  const [hostType, setHostType] = useState("");
  const [tv, setTv] = useState(false);
  const [wifi, setwifi] = useState(false);
  const [conditioner, setConditioner] = useState(false);
  const [kitchen, setKitchen] = useState(false);
  const [washer, setwasher] = useState(false);
  const [patio, setPatio] = useState(false);
  const [breakfast, setBreakfast] = useState(false);
  const [lovelyView, setLovelyView] = useState(false);
  const [pool, setPool] = useState(false);
  const [rooms, setRooms] = useState(0);
  const [guests, setGuests] = useState(0);
  const [price, setPrice] = useState("");
  const [contacts, setContacts] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const navigation = useNavigate();

  const hostInfo = {
    hostName,
    hostType,
    tv,
    wifi,
    conditioner,
    kitchen,
    washer,
    patio,
    breakfast,
    lovelyView,
    rooms,
    guests,
    price,
    location,
    description,
    contacts,
    pool,
    rating: {},
  };

  const [userHosts, setUserHosts] = useState([]); // why we need this?

  useEffect(() => {
    async function getUserHosts() {
      const current = await getDoc(
        doc(usersCollection, auth?.currentUser?.uid)
      );
      setUserHosts([...current.data().userHosts]);
    }
    getUserHosts();
  }, []);

  async function uploadData(e) {
    e.preventDefault();
    const promises = [];
    const offerId = hostName.replace(" ", "_") + v4();
    const images = Object.values(uploadedImages);
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const metadata = {
        contentType: "image/jpeg",
      };
      const storageRef = ref(storage, `images/${offerId}/${image.name}`);

      promises.push(
        uploadBytes(storageRef, image, metadata).then((uploadResult) => {
          return getDownloadURL(uploadResult.ref);
        })
      );
    }
    const urls = await Promise.all(promises);
    await setDoc(doc(offersCollection, offerId), { ...hostInfo, urls });
    await updateDoc(doc(usersCollection, auth?.currentUser?.uid), {
      userHosts: userHosts.concat([offerId]),
    });
    setUserHosts(userHosts.concat([offerId])); // why we need this?
  }

  return (
    <div className={styles.container}>
      <Header />
      <form className={styles.form}>
        <div>
          <label htmlFor="hname">Your host name</label>

          <input
            value={hostName}
            onChange={(e) => setHotelName(e.target.value)}
            id="hname"
            type="text"
          ></input>
        </div>

        <div>
          <select
            value={hostType}
            onChange={(e) => setHostType(e.target.value)}
          >
            <option>Which of these best describes your place?</option>
            <option>Hotel</option>
            <option>House</option>
            <option>Motel</option>
            <option>Apartment</option>
            <option>Cottage</option>
            <option>Creative</option>
            <option>VIP</option>
            <option>Skiing</option>
            <option>Hiking</option>
            <option>Nature</option>
            <option>Camping</option>
            <option>Around Lake</option>
          </select>
        </div>
        <div>
          <fieldset className={styles.fieldset}>
            <legend>Choose your host features:</legend>

            <div>
              <Checkbox
                id="tv"
                onChange={() => setTv(!tv)}
                checked={tv}
                color="success"
              />
              <label htmlFor="tv">TV</label>
            </div>

            <div>
              <Checkbox
                id="wifi"
                onChange={() => setwifi(!wifi)}
                checked={wifi}
                color="success"
              />
              <label htmlFor="wifi">Wifi</label>
            </div>

            <div>
              <Checkbox
                id="air"
                onChange={() => setConditioner(!conditioner)}
                checked={conditioner}
                color="success"
              />
              <label htmlFor="air">Air conditioning</label>
            </div>

            <div>
              <Checkbox
                id="kitchen"
                onChange={() => setKitchen(!kitchen)}
                checked={kitchen}
                color="success"
              />
              <label htmlFor="kitchen">Kitchen</label>
            </div>

            <div>
              <Checkbox
                id="washer"
                onChange={() => setwasher(!washer)}
                checked={washer}
                color="success"
              />
              <label htmlFor="washer">Washer</label>
            </div>

            <div>
              <Checkbox
                id="patio"
                onChange={() => setPatio(!patio)}
                checked={patio}
                color="success"
              />
              <label htmlFor="patio">Patio or balcony</label>
            </div>

            <div>
              <Checkbox
                id="view"
                onChange={() => setLovelyView(!lovelyView)}
                checked={lovelyView}
                color="success"
              />
              <label htmlFor="view">Lovely view</label>
            </div>

            <div>
              <Checkbox
                id="breakfast"
                onChange={() => setBreakfast(!breakfast)}
                checked={breakfast}
                color="success"
              />
              <label htmlFor="breakfast">Breakfast</label>
            </div>

            <div>
              <Checkbox
                id="pool"
                onChange={() => setPool(!pool)}
                checked={pool}
                color="success"
              />
              <label htmlFor="pool">Pool</label>
            </div>
          </fieldset>
        </div>

        <div>
          <label>Number of guests</label>
          <div className={styles.numberInput}>
            <button
              className={styles.btnSpan}
              onClick={(e) => {
                e.preventDefault();
                if (guests > 0) {
                  setGuests(guests - 1);
                }
              }}
            >
              -
            </button>
            <span>{guests}</span>
            <button
              className={styles.btnSpan}
              onClick={(e) => {
                e.preventDefault();
                setGuests(guests + 1);
              }}
            >
              +
            </button>
          </div>
        </div>
        <div>
          <label>Number of rooms</label>
          <div className={styles.numberInput}>
            <button
              className={styles.btnSpan}
              onClick={(e) => {
                e.preventDefault();
                if (rooms > 0) {
                  setRooms(rooms - 1);
                }
              }}
            >
              -
            </button>
            <span>{rooms}</span>
            <button
              className={styles.btnSpan}
              onClick={(e) => {
                e.preventDefault();
                setRooms(rooms + 1);
              }}
            >
              +
            </button>
          </div>
        </div>
        <div>
          <label>Cost per night</label>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="text"
          ></input>
        </div>
        <div>
          <label>Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Description</label>
          <textarea
            className={styles.description}
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label>Contacts</label>
          <input
            type="text"
            value={contacts}
            onChange={(e) => setContacts(e.target.value)}
          ></input>
        </div>
        <label htmlFor="files">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <img src={addPhoto} alt="Adding" />
            <span>Add photos</span>
          </div>
        </label>

        <div>
          <input
            type="file"
            id="files"
            multiple
            onChange={(e) => setUploadedImages(e.target.files)}
            style={{ display: "none" }}
          />
        </div>
        <button
          className={styles.subBtn}
          onClick={(e) => {
            uploadData(e);
            alert("Your host was added");
            navigation(HOME_PATH);
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddHost;
