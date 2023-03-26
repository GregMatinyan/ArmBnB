import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { offersCollection } from "../../configs/firebase";
import Header from "../headerComponents/Header";
import styles from "./HostPage.module.css";
import Location from "../../icons/location.png";
import Like from "../../icons/heart.png";

function HostPage() {
  const [data, setData] = useState(null);
  const params = useParams();

  useEffect(() => {
    const render = async () => {
      const dataRef = doc(offersCollection, params.id);
      const hostData = await getDoc(dataRef);
      setData({ ...hostData.data() });
    };
    render();
  }, [params.id]);

  return (
    data && (
      <>
        <Header />
        <div className={styles.container}>
          <div className={styles.hostName}>
            <h2>{data.hostName}</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div className={styles.location}>
              <img src={Location} alt="Location img" />
              <h4>{data.location}</h4>
            </div>
            <div className={styles.favorites}>
              <span>To favorites</span>
              <img src={Like} alt="like img" />
            </div>
          </div>

          <div className={styles.pictures}>
            <img src={data.urls[2]} alt="img" />
          </div>
        </div>
      </>
    )
  );
}

export default HostPage;
