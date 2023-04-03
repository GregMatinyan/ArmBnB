import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { offersCollection } from "../../configs/firebase";
import Header from "../headerComponents/Header";
import styles from "./HostPage.module.css";
import Location from "../../assets/icons/location.png";
import Like from "../../assets/icons/heart.png";
import WifiIcon from "@mui/icons-material/Wifi";
import TvIcon from "@mui/icons-material/Tv";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import FlatwareIcon from "@mui/icons-material/Flatware";
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";
import BalconyIcon from "@mui/icons-material/Balcony";
import YardTwoToneIcon from "@mui/icons-material/YardTwoTone";
import PoolIcon from "@mui/icons-material/Pool";
import FreeBreakfastTwoToneIcon from "@mui/icons-material/FreeBreakfastTwoTone";
import WifiCalling3Icon from "@mui/icons-material/WifiCalling3";
import LargeImg from "./LargeImg";
import AwesomeSlider from "react-awesome-slider-fw";
import "react-awesome-slider-fw/dist/styles.css";

function HostPage() {
  const [data, setData] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);
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

          <div className={styles.imgGrid}>
            <AwesomeSlider cssModule={[styles]}>
              {data.urls.map((url) => (
                <div
                  key={url.img}
                  whileHover={{ opacity: 1 }}
                  onClick={() => setSelectedImg(url)}
                >
                  <img src={url} alt="url" />
                </div>
              ))}
            </AwesomeSlider>
          </div>
          {selectedImg && (
            <LargeImg
              selectedImg={selectedImg}
              setSelectedImg={setSelectedImg}
            />
          )}

          <h3 className={styles.price}>Price for nigth {data.price}$</h3>

          <div className={styles.description}>
            <h3>DESCRIPTION</h3>
            {data.description}
          </div>
          <div className={styles.offers}>
            <h3>What this place offers</h3>
          </div>
          <div className={styles.icons}>
            <div className={styles.icons1}>
              <div className={data.tv ? styles.icon : styles.absenceIcon}>
                <TvIcon />
                TV
              </div>

              <div className={data.wifi ? styles.icon : styles.absenceIcon}>
                <WifiIcon />
                Wifi
              </div>
              <div
                className={data.conditioner ? styles.icon : styles.absenceIcon}
              >
                <AcUnitIcon />
                Airconditioner
              </div>
              <div className={data.kitchen ? styles.icon : styles.absenceIcon}>
                <FlatwareIcon />
                Kitchen
              </div>
              <div className={data.washer ? styles.icon : styles.absenceIcon}>
                <LocalLaundryServiceIcon />
                Washer
              </div>
            </div>
            <div className={styles.icons2}>
              <div className={data.patio ? styles.icon : styles.absenceIcon}>
                <BalconyIcon />
                Patio or balcony
              </div>
              <div
                className={data.lovelyView ? styles.icon : styles.absenceIcon}
              >
                <YardTwoToneIcon />
                Lovely view
              </div>
              <div
                className={data.breakfast ? styles.icon : styles.absenceIcon}
              >
                <FreeBreakfastTwoToneIcon />
                Breakfast
              </div>
              <div className={data.pool ? styles.icon : styles.absenceIcon}>
                <PoolIcon />
                Pool
              </div>
            </div>
          </div>
          <div>
            <WifiCalling3Icon />
            CONTACT US {data.contacts}
          </div>
          <p>© 2023 ARMBNB</p>
        </div>
      </>
    )
  );
}

export default HostPage;
