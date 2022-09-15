import React from "react";

const Context = React.createContext({
  isFormOpened: false,
  onCloseForm: () => {},
  onOpenForm: () => {},
  tutors: [],
  setTutors: () => {},
  filterState: {},
  setFilterState: () => {},
});

export default Context;
