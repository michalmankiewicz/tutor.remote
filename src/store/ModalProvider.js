import ModalContext from "./modal-context";
import React, { useState } from "react";
import useHttp from "../hooks/use-http";

const ModalProvider = (props) => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isFormOpened, setIsFormOpened] = useState(false);
  const [tutorModal, setTutorModal] = useState({});
  const [filterState, setFilterState] = useState({
    category: "All categories",
    level: "All levels",
    sort: "Sort by: Date",
  });
  const [tutors, setTutors] = useState([]);

  const closeModalHandler = () => {
    setIsModalOpened(false);
  };

  const openModalHandler = (tutorData) => {
    setTutorModal(tutorData);
    setIsModalOpened(true);
  };
  const closeFormHandler = () => {
    setIsFormOpened(false);
  };

  const openFormHandler = () => {
    setIsFormOpened(true);
  };

  const addNewOffer = (newOfferData) => {};

  const modalContext = {
    isModalOpened: isModalOpened,
    onOpenModal: openModalHandler,
    onCloseModal: closeModalHandler,
    isFormOpened: isFormOpened,
    onOpenForm: openFormHandler,
    onCloseForm: closeFormHandler,
    tutorModal: tutorModal,
    tutors: tutors,
    setTutors: setTutors,
    filterState: filterState,
    setFilterState: setFilterState,
  };
  return (
    <ModalContext.Provider value={modalContext}>
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
