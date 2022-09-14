import styles from "./Filters.module.css";
import Filter from "./Filter";
import React from "react";

import SortFilter from "./Filter/SortFilter";
import CategoriesFilter from "./Filter/CategoriesFilter";
import LevelFilter from "./Filter/LevelFilter";

const categoriesFilterOptions = [
  "All categories",
  "Mathematics",
  "Physics",
  "English",
  "Chemistry",
  "Biology",
];
const levelsFilterOptions = [
  "All levels",
  "Primary School",
  "Highschool",
  "Academic",
];
const sortByOptions = [
  "Sort by: Date",
  "Price: high to low",
  "Price: low to high",
];

const Filters = () => {
  return (
    <div className={styles.filters}>
      <Filter options={categoriesFilterOptions} type="category" />
      <Filter options={levelsFilterOptions} type="level" />
      <Filter options={sortByOptions} type="sort" />
    </div>
  );
};

export default Filters;
