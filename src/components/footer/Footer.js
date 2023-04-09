import React, { useState } from "react";
import styles from "./Footer.module.css";
import insta from "../../assets/icons/instagram.png";
import facebook from "../../assets/icons/facebook.png";
import twitter from "../../assets/icons/twitter.png";
import linkedin from "../../assets/icons/linkedin.png";

function Footer() {
  const [about, setAbout] = useState(false);
  const [contact, setContact] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div
          style={{
            width: "47%",
            textAlign: "left",
            paddingLeft: 15,
            height: about ? "100%" : 20,
            borderRadius: 10,
            backgroundColor: "antiquewhite",
            visibility: about ? "visible" : "hidden",
          }}
        >
          <p>
            ARMBNB was born to help people organize their vacation correctly and
            beautifully. At the same time ARMBNB helps people to find tenants
            for their hosts. Every day, our dealers offer unique stays and
            experiences that make it possible for guests to connect with
            communities in a more authentic way. Pick your price range, the
            number of rooms you want, and other key amenities to find the stay
            that fits your needs. Every booking is protected!
          </p>
        </div>
        <div
          style={{
            width: "30%",
            textAlign: "left",
            paddingLeft: 15,
            height: contact ? 140 : 20,
            borderRadius: 10,
            backgroundColor: "antiquewhite",
            visibility: contact ? "visible" : "hidden",
          }}
        >
          <p>
            Call us: <strong>+374-94-44-44-02 </strong>
          </p>
          <span>Or write to: </span>
          <a href="mailto:aca.react.group1@gmail.com">
            <strong>aca.react.group1@gmail.com </strong>
          </a>
        </div>
      </div>
      <div className={styles.aboutContainer}>
        <div>
          <p style={{ cursor: "pointer" }} onClick={() => setAbout(!about)}>
            ABOUT US
          </p>
        </div>
        <div>
          <p style={{ cursor: "pointer" }} onClick={() => setContact(!contact)}>
            CONTACT US
          </p>
        </div>
        <div className={styles.linkContainer}>
          <span>FOLLOW US</span>
          <a href="https://www.instagram.com">
            <img src={insta} alt="ig" />
          </a>
          <a href="https://www.facebook.com">
            <img src={facebook} alt="fb" />
          </a>
          <a href="https://www.linkedin.com">
            <img src={linkedin} alt="in" />
          </a>
          <a href="https://www.twitter.com">
            <img src={twitter} alt="twitter" />
          </a>
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
