import React from "react";
import { useDispatch } from "react-redux";
import { setIconName } from "../../features/searchByIcon/searchByIconSlice";
import { hostTypeIcons } from "../../assets/icons/icons";
import styles from "./Home.module.css";

function Categories() {
  const dispatch = useDispatch();
  function renderIcons(icons, styles) {
    const filter = (icon) => {
      dispatch(setIconName(icon));
    };
    return Object.entries(icons).map((item) => {
      return (
        <span
          onClick={() => {
            filter(item[0]);
          }}
          className={styles.iconspan}
          key={item[0]}
        >
          <img src={item[1]} alt="icon" />
          <span className={styles.textspan}>{item[0]}</span>
        </span>
      );
    });
  }
  return (
    <div className={styles.container}>{renderIcons(hostTypeIcons, styles)}</div>
  );
}

export default Categories;
