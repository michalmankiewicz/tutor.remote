import styles from "./TutorItem.module.css";
import React from "react";

import defaultAvatar from "../../assets/default-avatar.jpg";
import { Phone } from "phosphor-react";
import { useState } from "react";

const TutorItem = (props) => {
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  // DATE FORMATING
  const date = new Date(props.releaseDate);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // PHONE NUMBER FORMATTING
  const phoneNumber = props.phoneNumber
    .toString()
    .replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3");
  const revealedNumber = phoneNumber.slice(0, 4);

  const revealPhoneNumber = () => {
    setIsButtonClicked(true);
  };

  const phoneNumberEl = isButtonClicked ? (
    <div className={styles["phone-number"]}>
      <Phone className={styles["phone-icon"]} /> {phoneNumber}
    </div>
  ) : (
    <div className={styles["phone-number"]}>
      <Phone className={styles["phone-icon"]} /> {revealedNumber}{" "}
      <button
        onClick={revealPhoneNumber}
        className={styles["last-digits-hidden"]}
      >
        SHOW
      </button>
    </div>
  );

  return (
    <div className={styles.tutor}>
      <div className={styles.avatar}>
        {" "}
        <img src={props.photoUrl === "" ? defaultAvatar : props.photoUrl} />
      </div>

      <div className={styles.introduction}>
        <h2>{props.name}</h2>
        <p className={styles.description}>{props.description}</p>
        <div className={styles.info}>
          <div className={styles["info-categories"]}>
            <h3>Categories:</h3>
            <div className={styles.skills}>
              {props.category.map((cat) => (
                <div key={cat} className={styles.skill}>
                  {cat}
                </div>
              ))}
            </div>
          </div>
          <div className={styles["info-levels"]}>
            <h3>Levels:</h3>
            <div className={styles.skills}>
              {props.level.map((lev) => (
                <div key={lev} className={styles.skill}>
                  {lev}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.rate}></div>
      </div>
      <div className={styles["offer-details"]}>
        <div className={styles.price}>
          ${props.price}
          <span> /60 min</span>
        </div>
        <div className={styles["free-class"]}>First class for free</div>
        {phoneNumberEl}
        <div className={styles["release-date"]}>
          Posted on {day}/{month}/{year} at {hours}:{minutes}
        </div>
      </div>
    </div>
  );
};
export default TutorItem;
