import React, { useState } from "react";
import Header from "../headerComponents/Header";
import styles from "./AddItem.module.css";
import { storage } from "../../configs/firebase";
import { ref, uploadBytes } from "firebase/storage";

function AddItem(props) {
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

  const handleUploadImage = async () => {
    if (uploadedImage === null) return;
    const imageRef = ref(storage, `offer/images/${uploadedImage.name}`);

    await uploadBytes(imageRef, uploadedImage);
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

          {/* <div className={styles.hostTypeContainer}>
            {renderIcons(hostTypeIcons, styles)}
          </div> */}
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

          {/* <div className={styles.hostTypeContainer}>
            {renderIcons(hostFeatureIcons, styles)}
          </div> */}
        </div>
        <div>
          <label htmlFor="ng">Number of guests</label>
          <input
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            id="ng"
            type="text"
          ></input>
        </div>
        <div>
          <label htmlFor="nr">Number of rooms</label>
          <input
            value={rooms}
            onChange={(e) => setRooms(e.target.value)}
            id="nr"
            type="text"
          ></input>
        </div>
        <div>
          <label htmlFor="costpn">Cost per night</label>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            id="costpn"
            type="text"
          ></input>
        </div>
        <div>
          <label htmlFor="loc">Location</label>
          <input id="loc" type="text"></input>
        </div>

        <div>
          <label htmlFor="cont">Contacts</label>
          <input id="cont" type="text"></input>
        </div>
        <div>
          {/* <label htmlFor="files" className={styles.btn}>
            Select Image
          </label> */}
          <input
            type="file"
            id="files"
            onChange={(e) => setUploadedImage(e.target.files[0])}
          />
          <button onClick={handleUploadImage}>Add image</button>
        </div>
      </form>
    </div>
  );
}

export default AddItem;
