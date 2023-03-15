import React from "react";
import icons from "../icons/icons";
import styles from "./Categories.module.css";

function renderFilterIcons() {
  return Object.entries(icons).map((item) => {
    return (
      <span className={styles.iconspan} key={item[0]}>
        <img src={item[1]} alt="icon" />
        <span className={styles.textspan}>{item[0]}</span>
      </span>
    );
  });
}
function Categories() {
  return <div className={styles.container}>{renderFilterIcons()}</div>;
}

export default Categories;
