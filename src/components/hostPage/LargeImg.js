import React from "react";
import styles from "./HostPage.module.css";
import { motion } from "framer-motion";

function LargeImg({ selectedImg, setSelectedImg }) {
  const handleClick = (e) => {
    setSelectedImg(null);
  };

  return (
    <motion.div
      className={styles.backdrop}
      onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 5 }}
    >
      <motion.img
        src={selectedImg}
        alt="enlarged pic"
        initial={{ y: "-100vh" }}
        animate={{ y: "15vh" }}
      />
    </motion.div>
  );
}

export default LargeImg;
