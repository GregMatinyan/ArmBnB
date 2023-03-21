import React, { useState } from "react";
import Header from "../headerComponents/Header";
import styles from "./AddHost.module.css";
import { v4 } from "uuid";
import { offersCollection, storage } from "../../configs/firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { setDoc, doc } from "@firebase/firestore";
import Checkbox from "@mui/material/Checkbox";

function AddHost() {
  const [uploadedImage, setUploadedImage] = useState(null);
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
  const [rooms, setRooms] = useState(0);
  const [guests, setGuests] = useState(0);
  const [price, setPrice] = useState();
  const [contacts, setContacts] = useState("");
  const [location, setLocation] = useState("");

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
    contacts,
  };

  const handleUploadData = async (e) => {
    e.preventDefault();
    if (uploadedImage == null) return;
    const offerId = hostName.replace(" ", "_") + v4();
    const storageRef = ref(storage, `images/${offerId}/${uploadedImage.name}`);
    await uploadBytes(storageRef, uploadedImage);
    const url = await getDownloadURL(storageRef);
    await setDoc(doc(offersCollection, offerId), { ...hostInfo, url });
  };

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
            <option> Choose your host type</option>
            <option>Hotel</option>
            <option>Motel</option>
            <option>House</option>
            <option>Apartment</option>
            <option>Cottage</option>
            <option>VIP</option>
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
          <label>Contacts</label>
          <input
            type="text"
            value={contacts}
            onChange={(e) => setContacts(e.target.value)}
          ></input>
        </div>
        <div>
          <input
            type="file"
            id="files"
            onChange={(e) => setUploadedImage(e.target.files[0])}
          />
        </div>
        <button className={styles.subBtn} onClick={handleUploadData}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddHost;
