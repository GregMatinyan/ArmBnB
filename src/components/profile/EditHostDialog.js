import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React, { useState } from "react";
import styles from "./EditHostDialog.module.css";
import addPhoto from "../../assets/icons/add-photo.png";
import { doc, updateDoc } from "firebase/firestore";
import { offersCollection, storage } from "../../configs/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

function EditHostDialog({ editOpen, closeEdit, hosts }) {
  const {
    hostName: defHostName,
    hostType: defHostType,
    tv: defTv,
    wifi: defWifi,
    conditioner: defConditioner,
    kitchen: defKitchen,
    washer: defWasher,
    patio: defPatio,
    breakfast: defBreakfast,
    lovelyView: defLovelyView,
    pool: defPool,
    rooms: defRooms,
    guests: defGuests,
    price: defPrice,
    contacts: defContacts,
    location: deflocation,
    description: defDescription,
    urls: defUrls,
  } = editOpen.host;

  const [uploadedImages, setUploadedImages] = useState(null);
  const [hostName, setHotelName] = useState(defHostName);
  const [hostType, setHostType] = useState(defHostType);
  const [tv, setTv] = useState(defTv);
  const [wifi, setwifi] = useState(defWifi);
  const [conditioner, setConditioner] = useState(defConditioner);
  const [kitchen, setKitchen] = useState(defKitchen);
  const [washer, setwasher] = useState(defWasher);
  const [patio, setPatio] = useState(defPatio);
  const [breakfast, setBreakfast] = useState(defBreakfast);
  const [lovelyView, setLovelyView] = useState(defLovelyView);
  const [pool, setPool] = useState(defPool);
  const [rooms, setRooms] = useState(defRooms);
  const [guests, setGuests] = useState(defGuests);
  const [price, setPrice] = useState(defPrice);
  const [contacts, setContacts] = useState(defContacts);
  const [location, setLocation] = useState(deflocation);
  const [description, setDescription] = useState(defDescription);
  //   const [urls, setUrls] = useState(defUrls);

  const [old, setOld] = useState(false);

  const newData = {
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
  };

  async function uploadNewData(e) {
    e.preventDefault();
    if (!old) {
      const promises = [];
      const images = Object.values(uploadedImages);
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const metadata = {
          contentType: "image/jpeg",
        };
        const storageRef = ref(
          storage,
          `images/${editOpen.host.id}/${image.name}`
        );

        promises.push(
          uploadBytes(storageRef, image, metadata).then((uploadResult) => {
            return getDownloadURL(uploadResult.ref);
          })
        );
      }
      const newUrls = await Promise.all(promises);
      await updateDoc(doc(offersCollection, editOpen.host.id), {
        ...newData,
        newUrls,
      });
    } else {
      await updateDoc(doc(offersCollection, editOpen.host.id), {
        ...newData,
        defUrls,
      });
    }
  }

  return (
    <div>
      <Dialog open={editOpen.open} onClose={closeEdit}>
        <DialogTitle className={styles.title}>
          Make changes and save
        </DialogTitle>
        <DialogContent className={styles.dialogContent}>
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

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <label
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                htmlFor={!old ? "files" : "none"}
              >
                <img src={addPhoto} alt="Adding" />
                <span>New photos or</span>
              </label>

              <div>
                <Checkbox
                  id="adding"
                  onChange={() => setOld(!old)}
                  checked={old}
                  color="success"
                />
                <label htmlFor="adding">Leave old ones</label>
              </div>
            </div>

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
                uploadNewData(e);
                alert("Changes saved");
                window.location.reload(false);
              }}
            >
              Save
            </button>
          </form>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", alignItems: "center" }}>
          <Button
            sx={{ color: "#3f3b34", borderColor: "#3f3b34" }}
            onClick={closeEdit}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditHostDialog;
