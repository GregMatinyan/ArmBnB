import React from "react";
import { Link } from "react-router-dom";
import styles from "./RenderHost.module.css";
// import like from "../../icons/like.png";

function RenderHost({ info }) {
  return (
    <>
      <Link className={styles.hosts} to={`item/${info.id}`}>
        <div className={styles.hostContainer} key={info.id}>
          <div className={styles.imgContainer}>
            <div href="#" className={styles.like}>
              <i className={styles.faHeart}></i>
            </div>
            <img src={info.url} alt="hostImg" />
          </div>
          <p style={{ fontSize: 26 }}> {info.hostName}</p>
          <p> {info.location}</p>
          <p>{info.price} $ per/night</p>
        </div>
      </Link>
    </>
  );
}

export default RenderHost;
