import Context from "./context";
import React, { useState } from "react";

const ContextProvider = (props) => {
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

  const context = {
    isFormOpened: isFormOpened,
    onOpenForm: openFormHandler,
    onCloseForm: closeFormHandler,
    tutors: tutors,
    setTutors: setTutors,
    filterState: filterState,
    setFilterState: setFilterState,
  };
  return <Context.Provider value={context}>{props.children}</Context.Provider>;
};

export default ContextProvider;
