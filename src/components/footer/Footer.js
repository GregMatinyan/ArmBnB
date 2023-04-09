import React from "react";
import styles from "./Footer.module.css";
import insta from "../../assets/icons/instagram.png";
import facebook from "../../assets/icons/facebook.png";
import twitter from "../../assets/icons/twitter.png";
import google from "../../assets/icons/google-plus.png";
import linkedin from "../../assets/icons/linkedin.png";

function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.aboutContainer}>
        <div>
          <p>ABOUT US</p>
        </div>
        <div>
          <p>CONTACT US</p>
        </div>
        <div className={styles.linkContainer}>
          <span>FOLLOW US</span>
          <img src={insta} alt="instagram" />
          <img src={facebook} alt="facebook" />
          <img src={linkedin} alt="linkedin" />
          <img src={twitter} alt="twitter" />
          <img src={google} alt="google" />
        </div>
      </div>
      <div>
        <hr
          style={{
            width: "80%",
            alignSelf: "center",
            background: "black",
            color: "black",
            borderColor: "black",
            // height: "0.1px",
          }}
        />
      </div>
      <div className={styles.copyRight}>
        <span>
          <strong style={{ fontSize: 20 }}>© </strong>ArmBnB 2023
        </span>
      </div>
    </div>
  );
}
export default Footer;
