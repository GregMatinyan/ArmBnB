import React, { useState } from "react";
import Header from "../headerComponents/Header";
import styles from "./AddItem.module.css";
import { renderIcons } from "../Categories";
import { hostTypeIcons, hostFeatureIcons } from "../../icons/icons";
import { storage } from "../../configs/firebase";
import { ref, uploadBytes } from "firebase/storage";
import { json } from "react-router-dom";

function AddItem(props) {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedFile, setUploadedFile] = useState({ description: "Lav tun " });

  const handleUploadImage = async () => {
    if (uploadedImage == null) return;
    const imageRef = ref(storage, `offer/images/${uploadedImage.name}`);
    const imageNameRef = ref(storage, `offer/images/${uploadedFile}`);
    await setUploadedFile(JSON.stringify(uploadedFile, null, 2));
    console.log(uploadBytes);
    await uploadBytes(imageRef, uploadedImage);
    await uploadBytes(imageNameRef, uploadedFile);
  };

  return (
    <div>
      <Header />
      <form className={styles.form}>
        <div>
          <label for="hname">Your host name</label>
          <input id="hname" type="text"></input>
        </div>
        <div>
          <select>
            <option selected> Choose your host type</option>
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
              <input type="checkbox" id="tv" />
              <label for="tv">TV</label>
            </div>
            <div>
              <input type="checkbox" id="wifi" />
              <label for="wifi">Wifi</label>
            </div>
            <div>
              <input type="checkbox" id="air" />
              <label for="air">Air conditioning</label>
            </div>
            <div>
              <input type="checkbox" id="crib" />
              <label for="crib">Crib</label>
            </div>
            <div>
              <input type="checkbox" id="kitchen" />
              <label for="kitchen">Kitchen</label>
            </div>
            <div>
              <input type="checkbox" id="washer" />
              <label for="washer">Washer</label>
            </div>
            <div>
              <input type="checkbox" id="patio" />
              <label for="patio">Patio or balcony</label>
            </div>
            <div>
              <input type="checkbox" id="skyline" />
              <label for="skyline">City skyline view</label>
            </div>
            <div>
              <input type="checkbox" id="breakfast" />
              <label for="breakfast">Breakfast</label>
            </div>
          </fieldset>
          <select>
            <option selected> Choose your host features</option>
            <option>Motel</option>
            <option>Cottage</option>
          </select>
          {/* <div className={styles.hostTypeContainer}>
            {renderIcons(hostFeatureIcons, styles)}
          </div> */}
        </div>
        <div>
          <label for="ng">Number of guests</label>
          <input id="ng" type="text"></input>
        </div>
        <div>
          <label for="nr">Number of rooms</label>
          <input id="nr" type="text"></input>
        </div>
        <div>
          <label for="costpn">Cost per night</label>
          <input id="costpn" type="text"></input>
        </div>
        <div>
          <label for="loc">Location</label>
          <input id="loc" type="text"></input>
        </div>

        <div>
          <label for="cont">Contacts</label>
          <input id="cont" type="text"></input>
        </div>
        <div>
          <label for="files" className={styles.btn} onClick={handleUploadImage}>
            Select Image
          </label>
          <input
            type="file"
            style={{ visibility: "hidden" }}
            id="files"
            onChange={(e) => setUploadedImage(e.target.files[0])}
          />
          {/* <button onClick={handleUploadImage}>Add image</button> */}
        </div>
      </form>
    </div>
  );
}

export default AddItem;
