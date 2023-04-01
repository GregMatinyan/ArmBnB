import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import filterIcon from "../../icons/filter.png";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";

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

  //   console.log(filters);
  return (
    <div>
      <div
        className={styles.filterButton}
        onClick={() => {
          setDialog(true);
        }}
      >
        <span>Filters</span>
        <img src={filterIcon} alt="filter icon" />
      </div>
      <Dialog
        open={dialog}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <button className={styles.Xclose} onClick={onClose}>
            X
          </button>
          <span style={styles.titlename}>Filters</span>
        </DialogTitle>
        <DialogContent>
          <div style={styles.rooms}>
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
          <div style={styles.guests}>
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

          <div>
            <span>Price for one night</span>
            <input
              onChange={(e) => setPrice({ ...price, minimum: e.target.value })}
              value={price.minimum}
              placeholder="minimum"
            />
            <input
              onChange={(e) => setPrice({ ...price, maximum: e.target.value })}
              value={price.maximum}
              placeholder="maximum"
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
        <DialogActions>
          <Button
            onClick={() => {
              dispatch(setFilters(filters));
              onClose();
            }}
          >
            Filter
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FiltersDialog;
