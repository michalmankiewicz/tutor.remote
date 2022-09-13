import React from "react";

const ModalContext = React.createContext({
  isModalOpened: false,
  onCloseModal: () => {},
  onOpenModal: () => {},
  isFormOpened: false,
  onCloseForm: () => {},
  onOpenForm: () => {},
  tutorModal: {},
  tutors: [],
  setTutors: () => {},
  filterState: {},
  setFilterState: () => {},
});

export default ModalContext;
