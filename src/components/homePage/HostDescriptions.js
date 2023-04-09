import React, { useEffect, useState } from "react";
import { doc, getDoc, getDocs } from "firebase/firestore";
import {
  auth,
  offersCollection,
  usersCollection,
} from "../../configs/firebase";
import styles from "./Home.module.css";
import RenderHost from "../hostPage/RenderHosts";
import { useSelector } from "react-redux";
import { getIconName } from "../../features/searchByIcon/searchByIconSlice";
import { getSearchValue } from "../../features/searchByInput/searchByInputSlice";
import { getFilters } from "../../features/searchByFilters/serchByFiltersSlice";
import { getUserStatus } from "../../features/currentUser/currentUserSlice";

function HostDescriptions() {
  const [hostsDescriptions, setHostsDescriptions] = useState([]);
  const [favorites, setFavorites] = useState({});

  const user = useSelector(getUserStatus);

  useEffect(() => {
    if (user) {
      async function getFavorites() {
        const current = await getDoc(
          doc(usersCollection, auth?.currentUser?.uid)
        );
        setFavorites({ ...current.data().favorites });
      }
      getFavorites();
    }
  }, [user]);

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

  function changeFavs(id) {
    if (favorites.hasOwnProperty(id)) {
      delete favorites[id];
      setFavorites({ ...favorites });
    } else {
      setFavorites({ ...favorites, [id]: true });
    }
  }

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

  return (
    <div className={styles.hostDescription}>
      {iconName
        ? filterByIcon.map((el) => (
            <RenderHost
              favorites={favorites}
              changeFavs={changeFavs}
              key={el.id}
              data={el}
            />
          ))
        : searchValue
        ? filterBySearch.map((el) => (
            <RenderHost
              favorites={favorites}
              changeFavs={changeFavs}
              key={el.id}
              data={el}
            />
          ))
        : filters
        ? filterByFilters.map((el) => {
            return (
              <RenderHost
                changeFavs={changeFavs}
                favorites={favorites}
                key={el.id}
                data={el}
              />
            );
          })
        : hostsDescriptions.map((el) => (
            <RenderHost
              changeFavs={changeFavs}
              favorites={favorites}
              key={el.id}
              data={el}
            />
          ))}
    </div>
  );
}

export default HostDescriptions;
