import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import filterIcon from "../../assets/icons/filter.png";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import close from "../../assets/icons/close.png";

import styles from "./FiltersDialog.module.css";
import { useDispatch } from "react-redux";
import { setFilters } from "../../features/searchByFilters/serchByFiltersSlice";

function FiltersDialog(props) {
  const dispatch = useDispatch();

  const [dialog, setDialog] = useState(false);

  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState(1);
  const [tv, setTv] = useState(false);
  const [wifi, setwifi] = useState(false);
  const [conditioner, setConditioner] = useState(false);
  const [kitchen, setKitchen] = useState(false);
  const [washer, setwasher] = useState(false);
  const [patio, setPatio] = useState(false);
  const [breakfast, setBreakfast] = useState(false);
  const [lovelyView, setLovelyView] = useState(false);
  const [pool, setPool] = useState(false);
  const [price, setPrice] = useState({ minimum: "", maximum: "" });

  const onClose = () => {
    setDialog(false);
    setRooms(1);
    setGuests(1);
    setTv(false);
    setwifi(false);
    setConditioner(false);
    setKitchen(false);
    setwasher(false);
    setPatio(false);
    setBreakfast(false);
    setLovelyView(false);
    setPool(false);
    setPrice(false);
  };

  const features = Object.entries({
    tv,
    wifi,
    conditioner,
    kitchen,
    washer,
    patio,
    breakfast,
    lovelyView,
    pool,
  }).filter((item) => item[1]);

  const filters = {
    rooms,
    guests,
    price,
    features,
  };

  return (
    <>
      <div
        className={styles.filterButton}
        onClick={() => {
          setDialog(true);
        }}
      >
        <img src={filterIcon} alt="filter icon" />
        <span>Filters</span>
      </div>
      <Dialog
        open={dialog}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            marginBottom: "12px",
          }}
          id="alert-dialog-title"
        >
          <button className={styles.Xclose} onClick={onClose}>
            <img alt="X" src={close} />
          </button>
          <span className={styles.titleName}>Filters</span>
        </DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <div className={styles.rooms}>
            <span>Number of rooms</span>
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
          <div className={styles.guests}>
            <span>Number of guests</span>
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

          <div className={styles.priceContainer}>
            <span>Price for one night</span>
            <input
              className={styles.range}
              onChange={(e) => setPrice({ ...price, minimum: e.target.value })}
              value={price.minimum}
              placeholder="minimum"
              required
            />
            <input
              className={styles.range}
              onChange={(e) => setPrice({ ...price, maximum: e.target.value })}
              value={price.maximum}
              placeholder="maximum"
              required
            />
          </div>

          <div className={styles.features}>
            <fieldset className={styles.fieldset}>
              <legend>Host features</legend>
              <div>
                <Checkbox
                  id="tv"
                  onChange={() => {
                    setTv(!tv);
                  }}
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
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "20px",
          }}
        >
          <Button
            sx={{
              border: "1px solid #838383",
              color: "#212121",
              padding: "5px 16px",
              borderRadius: "4px",
              textTransform: "capitalize",
            }}
            onClick={() => {
              dispatch(setFilters(filters));
              onClose();
            }}
          >
            Apply Filters
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default FiltersDialog;
