import React from "react";
import { Link } from "react-router-dom";
import styles from "./RenderHost.module.css";
// import { User } from "../../context/UserStateContext";

function RenderHost({ info }) {
  // const user = useContext(User);

  return (
    <>
      <Link className={styles.hosts} to={`item/${info.id}`}>
        <div className={styles.hostContainer} key={info.id}>
          <div className={styles.imgContainer}>
            <div href="#" className={styles.like}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={styles.faheart}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </div>
            <img src={info.url} alt="hostImg" />
          </div>
          <div className={styles.hostInfo}>
            <p> {info.hostName}</p>
            <p> {info.location}</p>

            <p>
              <strong>{info.price} $</strong> per/night
            </p>
          </div>
        </div>
      </Link>
    </>
  );
}

export default RenderHost;
