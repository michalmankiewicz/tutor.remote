import styles from "./Header.module.css";
import React, { useContext } from "react";
import { NotePencil } from "phosphor-react";
import ModalContext from "../store/modal-context";

const Header = () => {
  const ctx = useContext(ModalContext);
  return (
    <header>
      <div className={styles.logo}>
        <span>Tutor</span>.remote
      </div>
      <button onClick={ctx.onOpenForm} className={styles["add-offer-btn"]}>
        <NotePencil className={styles["note-icon"]} />
        <span>Become a tutor</span>
      </button>
    </header>
  );
};

export default Header;
