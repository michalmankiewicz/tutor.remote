import React from "react";

const ModalContext = React.createContext({
  isFormOpened: false,
  onCloseForm: () => {},
  onOpenForm: () => {},
  tutors: [],
  setTutors: () => {},
  filterState: {},
  setFilterState: () => {},
});

export default ModalContext;
