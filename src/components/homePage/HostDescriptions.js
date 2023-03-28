import React, { useEffect, useState } from "react";
import { getDocs } from "firebase/firestore";
import { offersCollection } from "../../configs/firebase";
import styles from "./Home.module.css";
import RenderHost from "../hostPage/RenderHosts";
import { useSelector } from "react-redux";

function HostDescriptions() {
  const [hostsDescriptions, setHostsDescriptions] = useState([]);

  const iconName = useSelector(function (state) {
    return state.searchByIcon.type;
  });

  const searchValue = useSelector(function (state) {
    return state.searchByInput.inputValue;
  });

  const filterByIcon = hostsDescriptions.filter(
    (el) => el.hostType === iconName
  );

  const filterBySearch = hostsDescriptions.filter(
    (el) =>
      el.hostName.toLowerCase().includes(searchValue.toLowerCase()) ||
      el.location.toLowerCase().includes(searchValue.toLowerCase())
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
      {iconName
        ? filterByIcon.map((el) => <RenderHost key={el.id} data={el} />)
        : searchValue
        ? filterBySearch.map((el) => <RenderHost key={el.id} data={el} />)
        : hostsDescriptions.map((el) => <RenderHost key={el.id} data={el} />)}
    </div>
  );
}

export default HostDescriptions;
