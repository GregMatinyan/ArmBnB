import React from "react";
import icons from "../icons/icons";
import styles from "./Categories.module.css";

const {
  motel,
  skiing,
  climbing,
  landscape,
  tent,
  vip,
  window,
  lake,
  pool,
  cottage,
} = icons;

function Filters() {
  return (
    <div className={styles.container}>
      <span>
        <img src={motel} alt="icon" />
        <p>Motel</p>
      </span>
      <span>
        <img src={skiing} alt="icon" />
        <p>Skiing</p>
      </span>
      <span>
        <img src={climbing} alt="icon" />
        <p>Hicking</p>
      </span>
      <span>
        <img src={landscape} alt="icon" />
        <p>Nature</p>
      </span>
      <span>
        <img src={tent} alt="icon" />
        <p>Camping</p>
      </span>
      <span>
        <img src={vip} alt="icon" />
        <p>VIP</p>
      </span>
      <span>
        <img src={window} alt="icon" />
        <p>Lovely view</p>
      </span>
      <span>
        <img src={lake} alt="icon" />
        <p>Around lake</p>
      </span>
      <span>
        <img src={pool} alt="icon" />
        <p>With pool</p>
      </span>
      <span>
        <img src={cottage} alt="icon" />
        <p>Cottages</p>
      </span>
    </div>
  );
}

export default Filters;
