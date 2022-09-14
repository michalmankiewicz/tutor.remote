import styles from "./Modal.module.css";
import React, { useContext } from "react";
import ReactDOM from "react-dom";

import ModalContext from "../../store/modal-context";

const Backdrop = (props) => {
  const ctx = useContext(ModalContext);

  return <div onClick={ctx.onCloseForm} className={styles.backdrop}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  const ctx = useContext(ModalContext);
  return (
    <React.Fragment>
      {ReactDOM.createPortal(<Backdrop />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </React.Fragment>
  );
};

export default Modal;
