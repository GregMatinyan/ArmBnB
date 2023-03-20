import React, { useState } from "react";
import Header from "../headerComponents/Header";
import styles from "./AddItem.module.css";
import { v4 } from "uuid";
import { offersCollection, storage } from "../../configs/firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { setDoc, doc } from "@firebase/firestore";

function AddItem() {
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
  const [price, setPrice] = useState(0);
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

  // const renderImages = (urls) => {
  //   return urls.map((element) => {
  //     return <img src={element} alt="host-img" />;
  //   });
  // };

  const handleUploadData = async () => {
    if (uploadedImage == null) return;
    const offerId = hostName.replace(" ", "_") + v4();
    const storageRef = ref(storage, `images/${offerId}/${uploadedImage.name}`);
    await uploadBytes(storageRef, uploadedImage);
    const url = await getDownloadURL(storageRef);
    await setDoc(doc(offersCollection, offerId), { ...hostInfo, url });
  };

  return (
    <div>
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
            <option>Motel</option>
            <option>Cottage</option>
          </select>
        </div>
        <div>
          <fieldset>
            <legend>Choose your host features:</legend>

            <div>
              <input
                checked={tv}
                onChange={() => setTv(!tv)}
                type="checkbox"
                id="tv"
              />
              <label htmlFor="tv">TV</label>
            </div>
            <div>
              <input
                checked={wifi}
                onChange={() => setwifi(!wifi)}
                type="checkbox"
                id="wifi"
              />
              <label htmlFor="wifi">Wifi</label>
            </div>
            <div>
              <input
                checked={conditioner}
                onChange={() => setConditioner(!conditioner)}
                type="checkbox"
                id="air"
              />
              <label htmlFor="air">Air conditioning</label>
            </div>
            <div>
              <input
                checked={kitchen}
                onChange={() => setKitchen(!kitchen)}
                type="checkbox"
                id="kitchen"
              />
              <label htmlFor="kitchen">Kitchen</label>
            </div>
            <div>
              <input
                checked={washer}
                onChange={() => setwasher(!washer)}
                type="checkbox"
                id="washer"
              />
              <label htmlFor="washer">Washer</label>
            </div>
            <div>
              <input
                checked={patio}
                onChange={() => setPatio(!patio)}
                type="checkbox"
                id="patio"
              />
              <label htmlFor="patio">Patio or balcony</label>
            </div>
            <div>
              <input
                value={lovelyView}
                onChange={() => setLovelyView(!lovelyView)}
                type="checkbox"
                id="view"
              />
              <label htmlFor="view">Lovely view</label>
            </div>
            <div>
              <input
                value={breakfast}
                onChange={() => setBreakfast(!breakfast)}
                type="checkbox"
                id="breakfast"
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
      </form>

      <button onClick={handleUploadData}>Submit</button>
      {/* {renderImages(imageUrls)} */}
    </div>
  );
}

export default AddItem;
