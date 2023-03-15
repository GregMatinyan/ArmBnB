import React from "react";
import icons from "../icons/icons";
import styles from "./Filters.module.css";

function renderFilterIcons() {
  return Object.entries(icons).map((item) => {
    return (
      <span className={styles.iconspan} key={item[0]}>
        <img src={item[1]} />
        <span className={styles.textspan}>{item[0]}</span>
      </span>
    );
  });
}

function Filters(props) {
  return <div className={styles.container}>{renderFilterIcons()}</div>;
}

export default Filters;
