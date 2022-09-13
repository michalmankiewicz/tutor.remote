import { useContext, useEffect, useState, useCallback } from "react";
import ModalContext from "../../store/modal-context";
import TutorItem from "./TutorItem";
import styles from "./Tutors.module.css";
import { CircleNotch } from "phosphor-react";
import useHttp from "../../hooks/use-http";

const Tutors = (props) => {
  const ctx = useContext(ModalContext);
  const [tutorsOnPage, setTutorsOnPage] = useState(6);

  const chosenCategory = ctx.filterState["category"];
  const chosenLevel = ctx.filterState["level"];
  const chosenSorting = ctx.filterState["sort"];

  const extractTutorsData = (data) => {
    const newData = Object.keys(data).map((key) => data[key]);

    ctx.setTutors(newData);
  };

  const {
    error,
    isLoading,
    fetchData: loadTutors,
  } = useHttp(extractTutorsData);

  // HTTP REQUEST (MOŻE TUTORS TUTAJ MOGĄ BYĆ)
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(false);

  // const loadTutors = useCallback(async () => {
  //   try {
  //     const response = await fetch(
  //       "https://tutor-remote-default-rtdb.firebaseio.com/tutors.json"
  //     );
  //     if (!response.ok) throw new Error("Something went wrong!");
  //     const data = await response.json();
  //     setIsLoading(false);
  //     ctx.setTutors(data);
  //   } catch (error) {
  //     console.error(error);
  //     setError(error.message);
  //   }
  // }, []);

  useEffect(() => {
    loadTutors();
  }, [loadTutors]);

  // FILTRING BY CATEGORY AND LEVEL
  const filteredTutors = ctx.tutors
    .filter(
      (tutor) =>
        chosenCategory === "All categories" ||
        tutor.category.includes(ctx.filterState["category"])
    )
    .filter(
      (tutor) =>
        chosenLevel === "All levels" ||
        tutor.level.includes(ctx.filterState["level"])
    );

  // SORTING RESULTS ???????????????? HIGH DEMAND OPERATION
  console.log(filteredTutors);
  let sortedTutors = [];
  console.log(chosenSorting);
  if (chosenSorting === "Sort by: Date")
    sortedTutors = filteredTutors.sort((a, b) => b.releaseDate - a.releaseDate);
  else if (chosenSorting === "Price: high to low")
    sortedTutors = filteredTutors.sort((a, b) => b.price - a.price);
  else if (chosenSorting === "Price: low to high")
    sortedTutors = filteredTutors.sort((a, b) => a.price - b.price);

  let revealedTutors = sortedTutors.filter((_, i) => i <= tutorsOnPage - 1);

  let searchInfo = "";
  if (chosenCategory === "All categories" || chosenSorting === "All levels")
    searchInfo = <h1>{sortedTutors.length} tutors are waiting for you.</h1>;
  else
    searchInfo = (
      <h1>
        {sortedTutors.length} tutors are waiting to teach you: {chosenCategory}
      </h1>
    );

  const showMoreTutorsHandler = () => {
    setTutorsOnPage((prevState) => {
      return prevState + 6;
    });
  };

  return (
    <div className={styles["tutors-container"]}>
      {!isLoading && !error && searchInfo}
      <div className={styles.tutors}>
        {error && (
          <h1 className={styles["error-message"]}>Something went wrong!</h1>
        )}
        {!error && isLoading && <CircleNotch className={styles.spinner} />}
        {!isLoading &&
          revealedTutors.map((tutor) => (
            <TutorItem
              key={tutor.id}
              name={tutor.name}
              description={tutor.description}
              phoneNumber={tutor.phoneNumber}
              category={tutor.category}
              level={tutor.level}
              price={tutor.price}
              photoUrl={tutor.photoUrl}
            />
          ))}
      </div>
      {!isLoading && !error && (
        <button onClick={showMoreTutorsHandler} className={styles["show-more"]}>
          Show more Tutors
        </button>
      )}
    </div>
  );
};

export default Tutors;
