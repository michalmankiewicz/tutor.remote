import { useState, useCallback } from "react";

const useHttp = (extractingDataFn) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

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
