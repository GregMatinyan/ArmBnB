import React, { useEffect, useState } from "react";
import { getDocs } from "firebase/firestore";
import { offersCollection } from "../../configs/firebase";
import styles from "./Home.module.css";
import RenderHost from "../hostPage/RenderHosts";

function HostDescriptions() {
  const [hostsDescriptions, setHostsDescriptions] = useState([]);

  useEffect(() => {
    const getHostsDescriptions = async () => {
      try {
        const data = await getDocs(offersCollection);
        const hostsDescriptionsData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
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
        <RenderHost key={el.id} info={el} />
      ))}
    </div>
  );
}

export default HostDescriptions;
