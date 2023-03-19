import React, { useEffect, useState } from "react";
import { getDocs } from "firebase/firestore";
import { offersCollection } from "../configs/firebase";
import styles from "./Home.module.css";

function HostDescriptions() {
  const [hostsDescriptions, setHostsDescriptions] = useState([]);

  useEffect(() => {
    const getHostsDescriptions = async () => {
      try {
        const data = await getDocs(offersCollection);
        const hostsDescriptionsData = data.docs.map((doc) => ({
          ...doc.data(),
        }));
        setHostsDescriptions(hostsDescriptionsData);
      } catch (error) {
        console.error(error);
      }
    };
    getHostsDescriptions();
  }, []);

  return (
    <div className={styles.hostDescription}>
      {hostsDescriptions.map((el) => (
        <div key={el}>
          <img src={el.url} alt="hostImg" />
          <p> {el.hostName}</p>
          <p> {el.location}</p>
        </div>
      ))}
    </div>
  );
}

export default HostDescriptions;
