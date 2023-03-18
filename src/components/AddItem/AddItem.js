import React, { useState } from "react";
import Header from "../headerComponents/Header";
import styles from "./AddItem.module.css";
import { storage } from "../../configs/firebase";
import { ref, uploadBytes } from "firebase/storage";

function AddItem() {
  const [uploadedImage, setUploadedImage] = useState(null);

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
          <input id="hname" type="text"></input>
        </div>

        <div>
          <select>
            <option> Choose your host type</option>
            <option>Motel</option>
            <option>Cottage</option>
          </select>
        </div>
        <div>
          <fieldset>
            <legend>Choose your host features:</legend>

            <div>
              <input type="checkbox" id="tv" />
              <label htmlFor="tv">TV</label>
            </div>

            <div>
              <input type="checkbox" id="wifi" />
              <label htmlFor="wifi">Wifi</label>
            </div>

            <div>
              <input type="checkbox" id="air" />
              <label htmlFor="air">Air conditioning</label>
            </div>

            <div>
              <input type="checkbox" id="crib" />
              <label htmlFor="crib">Crib</label>
            </div>

            <div>
              <input type="checkbox" id="kitchen" />
              <label htmlFor="kitchen">Kitchen</label>
            </div>

            <div>
              <input type="checkbox" id="washer" />
              <label htmlFor="washer">Washer</label>
            </div>

            <div>
              <input type="checkbox" id="patio" />
              <label htmlFor="patio">Patio or balcony</label>
            </div>

            <div>
              <input type="checkbox" id="skyline" />
              <label htmlFor="skyline">City skyline view</label>
            </div>
            <div>
              <input type="checkbox" id="breakfast" />
              <label htmlFor="breakfast">Breakfast</label>
            </div>
          </fieldset>
        </div>
        <div>
          <label htmlFor="ng">Number of guests</label>
          <input id="ng" type="number"></input>
        </div>
        <div>
          <label htmlFor="nr">Number of rooms</label>
          <input id="nr" type="number"></input>
        </div>
        <div>
          <label htmlFor="costpn">Cost per night</label>
          <input id="costpn" type="text"></input>
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
