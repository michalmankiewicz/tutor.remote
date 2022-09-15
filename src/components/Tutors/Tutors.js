import { useContext, useEffect, useState } from "react";
import context from "../../store/context";
import TutorItem from "./TutorItem";
import styles from "./Tutors.module.css";
import { CircleNotch } from "phosphor-react";
import useHttp from "../../hooks/use-http";

const Tutors = () => {
  const ctx = useContext(context);
  const [tutorsOnPage, setTutorsOnPage] = useState(5);

  const chosenCategory = ctx.filterState["category"];
  const chosenLevel = ctx.filterState["level"];
  const chosenSorting = ctx.filterState["sort"];

  // HTTP REQUEST
  const extractTutorsData = (data) => {
    const newData = Object.keys(data).map((key) => data[key]);
    ctx.setTutors(newData);
  };

  const {
    error,
    isLoading,
    fetchData: loadTutors,
  } = useHttp(extractTutorsData);

  useEffect(() => {
    loadTutors();
  }, [loadTutors]);

  // FILTRING TUTORS BY CATEGORY AND LEVEL
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
  let sortedTutors = [];
  if (chosenSorting === "Sort by: Date")
    sortedTutors = filteredTutors.sort((a, b) => b.releaseDate - a.releaseDate);
  else if (chosenSorting === "Price: high to low")
    sortedTutors = filteredTutors.sort((a, b) => b.price - a.price);
  else if (chosenSorting === "Price: low to high")
    sortedTutors = filteredTutors.sort((a, b) => a.price - b.price);

  // REVEALING TUTORS (DEPENDS ON TUTORS ON PAGE VARIABLE)
  let revealedTutors = sortedTutors.filter((_, i) => i <= tutorsOnPage - 1);
  const areAllTutorsRevealed = sortedTutors.length <= tutorsOnPage;

  const showMoreTutorsHandler = () => {
    setTutorsOnPage((prevState) => {
      return prevState + 5;
    });
  };

  // INFORMATION ABOUT SEARCH
  let searchInfo = "";
  if (chosenCategory === "All categories" || chosenSorting === "All levels")
    searchInfo = <h1>{sortedTutors.length} tutors are waiting for you.</h1>;
  else
    searchInfo = (
      <h1>
        {sortedTutors.length} tutors are waiting to teach you: {chosenCategory}
      </h1>
    );

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
              key={Math.random()}
              name={tutor.name}
              description={tutor.description}
              phoneNumber={tutor.phoneNumber}
              category={tutor.category}
              level={tutor.level}
              price={tutor.price}
              photoUrl={tutor.photoUrl}
              releaseDate={tutor.releaseDate}
            />
          ))}
      </div>
      {!isLoading && !error && !areAllTutorsRevealed && (
        <button onClick={showMoreTutorsHandler} className={styles["show-more"]}>
          Show more Tutors
        </button>
      )}
    </div>
  );
};

export default Tutors;
