import React from "react";
import filterIcons from "../icons/icons";
import styles from "./Home.module.css";

export function renderIcons(icons, styles) {
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
  return (
    <div className={styles.container}>{renderIcons(filterIcons, styles)}</div>
  );
}

export default Categories;
