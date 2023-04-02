import React, { useEffect, useState } from "react";
import { getDocs } from "firebase/firestore";
import { offersCollection } from "../../configs/firebase";
import styles from "./Home.module.css";
import RenderHost from "../hostPage/RenderHosts";
import { useSelector } from "react-redux";
import { getIconName } from "../../features/searchByIcon/searchByIconSlice";
import { getSearchValue } from "../../features/searchByInput/searchByInputSlice";
import { getFilters } from "../../features/searchByFilters/serchByFiltersSlice";

function HostDescriptions() {
  const [hostsDescriptions, setHostsDescriptions] = useState([]);

  const iconName = useSelector(getIconName);

  const searchValue = useSelector(getSearchValue);

  const filters = useSelector(getFilters);

  const filterByFilters = filters
    ? hostsDescriptions.filter(
        (el) =>
          el.rooms === filters.rooms &&
          el.guests === filters.guests &&
          +el.price >= +filters.price.minimum &&
          +el.price <= +filters.price.maximum &&
          filters.features.every((feature) => el[feature[0]])
      )
    : null;

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
        : filters
        ? filterByFilters.map((el) => {
            return <RenderHost key={el.id} data={el} />;
          })
        : hostsDescriptions.map((el) => <RenderHost key={el.id} data={el} />)}
    </div>
  );
}

export default HostDescriptions;
