import React, { useState, useContext, useCallback } from "react";
import ModalContext from "../store/modal-context";

const useHttp = (extractingDataFn) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const ctx = useContext(ModalContext);

  const fetchData = useCallback(async (method = "GET", newTutor) => {
    try {
      let response = "";
      if (method === "GET")
        response = await fetch(
          "https://tutor-remote-default-rtdb.firebaseio.com/tutors.json"
        );
      else {
        response = await fetch(
          "https://tutor-remote-default-rtdb.firebaseio.com/tutors.json",
          {
            method: "POST",
            body: JSON.stringify(newTutor),
            header: {
              "Content Type": "application/json",
            },
          }
        );
      }

      if (!response.ok) throw new Error("Something went wrong!");
      const data = await response.json();
      setIsLoading(false);
      console.log(data);
      extractingDataFn(data, newTutor);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  }, []);

  return {
    isLoading,
    error,
    fetchData,
  };
};

export default useHttp;
