import styles from "./TutorDetails.module.css";
import Modal from "../UI/Modal";
import { Fragment, useContext, useState } from "react";
import ModalContext from "../../store/modal-context";
import { Phone } from "phosphor-react";
import defaultAvatar from "../../assets/default-avatar.jpg";
const TutorDetails = (props) => {
  const ctx = useContext(ModalContext);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const revealPhoneNumber = () => {
    setIsButtonClicked(true);
  };

  const phoneNumber = ctx.tutorModal.phoneNumber
    .toString()
    .replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3");

  const contactEl = isButtonClicked ? (
    <button className={styles["phone-number"]}>
      <Phone className={styles["phone-icon"]} /> {phoneNumber}
    </button>
  ) : (
    <button onClick={revealPhoneNumber} className={styles.contact}>
      Contact me
    </button>
  );
  return (
    <Modal>
      <div className={styles["tutor-details"]}>
        <img
          src={
            ctx.tutorModal.photoUrl === ""
              ? defaultAvatar
              : ctx.tutorModal.photoUrl
          }
        />
        <div className={styles.introduction}>
          <h2>{ctx.tutorModal.name}</h2>
          <div className={styles.description}>
            <h3>Description</h3>
            <p className={styles.description}>{ctx.tutorModal.description}</p>
          </div>
          <div className={styles.info}>
            <div className={styles["info-categories"]}>
              <h3>Categories</h3>
              <div className={styles.skills}>
                {ctx.tutorModal.category.map((cat) => (
                  <div className={styles.skill}>{cat}</div>
                ))}
              </div>
            </div>
            <div className={styles["info-levels"]}>
              <h3>Levels</h3>
              <div className={styles.skills}>
                {ctx.tutorModal.level.map((lev) => (
                  <div className={styles.skill}>{lev}</div>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.action}>
            <div className={styles.pricing}>
              <div>Hourly rate:</div>
              <div className={styles.price}>${ctx.tutorModal.price}/h</div>
            </div>
            {contactEl}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TutorDetails;
