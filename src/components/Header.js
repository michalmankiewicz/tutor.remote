import styles from "./Header.module.css";
import React, { useContext } from "react";
import { NotePencil } from "phosphor-react";
import context from "../store/context";

const Header = () => {
  const ctx = useContext(context);
  return (
    <header>
      <div className={styles["header-container"]}>
        <div className={styles.logo}>
          <span>Tutor</span>.remote
        </div>
        <button onClick={ctx.onOpenForm} className={styles["add-offer-btn"]}>
          <NotePencil className={styles["note-icon"]} />
          <span>Become a tutor</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
