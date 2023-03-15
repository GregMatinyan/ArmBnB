import React from "react";
import icons from "../icons/icons";
import styles from "./Filters.module.css";

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

function Filters(props) {
  return (
    <div className={styles.container}>
      <span>
        <img src={motel} />
        <p>Motel</p>
      </span>
      <span>
        <img src={skiing} />
        <p>Skiing</p>
      </span>
      <span>
        <img src={climbing} />
        <p>Hicking</p>
      </span>
      <span>
        <img src={landscape} />
        <p>Nature</p>
      </span>
      <span>
        <img src={tent} />
        <p>Camping</p>
      </span>
      <span>
        <img src={vip} />
        <p>VIP</p>
      </span>
      <span>
        <img src={window} />
        <p>Lovely view</p>
      </span>
      <span>
        <img src={lake} />
        <p>Around lake</p>
      </span>
      <span>
        <img src={pool} />
        <p>With pool</p>
      </span>
      <span>
        <img src={cottage} />
        <p>Cottages</p>
      </span>
    </div>
  );
}

export default Filters;
