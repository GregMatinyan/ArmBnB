import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { offersCollection } from "../../configs/firebase";
import Header from "../headerComponents/Header";
import styles from "./HostPage.module.css";
import Location from "../../icons/location.png";
import Like from "../../icons/heart.png";
//import ImageList from "@mui/material/ImageList";
//import ImageListItem from "@mui/material/ImageListItem";
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
import { motion } from "framer-motion";

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
        </div>
        {/*<div className={styles.pictures}>
            <ImageList
              sx={{ width: 800, height: 450 }}
              cols={3}
              rowHeight={150}
            >
              {data.urls.map((url) => (
                <ImageListItem key={url.img}>
                  <img
                    src={url}
                    srcSet={`${url.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    alt={url.title}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </div>*/}

        <div className={styles.imgGrid}>
          {data.urls.map((url) => (
            <motion.div
              className={styles.imgWrap}
              key={url.img}
              whileHover={{ opacity: 1 }}
              onClick={() => setSelectedImg(url)}
            >
              <img src={url} alt="url title" />
            </motion.div>
          ))}
        </div>
        {selectedImg && (
          <LargeImg selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
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
            <div className={data.lovelyView ? styles.icon : styles.absenceIcon}>
              <YardTwoToneIcon />
              Lovely view
            </div>
            <div className={data.breakfast ? styles.icon : styles.absenceIcon}>
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
      </>
    )
  );
}

export default HostPage;
