import styles from "./TutorItem.module.css";
import ModalContext from "../../store/modal-context";
import React, { useContext, useEffect } from "react";

import defaultAvatar from "../../assets/default-avatar.jpg";

const TutorItem = (props) => {
  const ctx = useContext(ModalContext);
  console.log(props.photoUrl);

  return (
    <div onClick={ctx.onOpenModal.bind(null, props)} className={styles.tutor}>
      <img src={props.photoUrl === "" ? defaultAvatar : props.photoUrl} />
      <div className={styles.details}>
        <h2>{props.name}</h2>

        <p className={styles.price}>${props.price}/h</p>
      </div>
    </div>
  );
};
export default TutorItem;
