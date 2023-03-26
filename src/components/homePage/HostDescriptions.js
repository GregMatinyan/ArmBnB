import React, { useEffect, useState } from "react";
import { getDocs } from "firebase/firestore";
import { offersCollection } from "../../configs/firebase";
import styles from "./Home.module.css";
import RenderHost from "../hostPage/RenderHosts";
import { useSelector } from "react-redux";

function HostDescriptions() {
  const [hostsDescriptions, setHostsDescriptions] = useState([]);

  const iconName = useSelector(function (state) {
    return state.iconFilter.name;
  });

  const filterByIcon = hostsDescriptions.filter(
    (el) => el.hostType === iconName
  );

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
      {!iconName
        ? hostsDescriptions.map((el) => <RenderHost key={el.id} data={el} />)
        : filterByIcon.map((el) => <RenderHost key={el.id} data={el} />)}
    </div>
  );
}

export default HostDescriptions;
