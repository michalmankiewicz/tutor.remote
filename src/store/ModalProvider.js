import ModalContext from "./modal-context";
import React, { useState } from "react";
import useHttp from "../hooks/use-http";

const ModalProvider = (props) => {
  const [isFormOpened, setIsFormOpened] = useState(false);
  const [filterState, setFilterState] = useState({
    category: "All categories",
    level: "All levels",
    sort: "Sort by: Date",
  });
  const [tutors, setTutors] = useState([]);

  const closeFormHandler = () => {
    setIsFormOpened(false);
  };

  const openFormHandler = () => {
    setIsFormOpened(true);
  };

  const modalContext = {
    isFormOpened: isFormOpened,
    onOpenForm: openFormHandler,
    onCloseForm: closeFormHandler,
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
