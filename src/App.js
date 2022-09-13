import "./App.css";
import Header from "./components/Header";
import Filters from "./components/filters/Filters";
import Tutors from "./components/Tutors/Tutors";
import TutorDetails from "./components/TutorDetails/TutorDetails";
import Form from "./components/Form/Form";

import ModalContext from "./store/modal-context";
import { useContext, useEffect, useState, useCallback } from "react";

function App() {
  const ctx = useContext(ModalContext);

  return (
    <div className="App">
      <Header />
      <Filters />
      <Tutors />
      {ctx.isModalOpened && <TutorDetails />}
      {ctx.isFormOpened && <Form />}
    </div>
  );
}

export default App;
