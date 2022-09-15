import styles from "./Filter.module.css";
import { useContext } from "react";
import context from "../../store/context";
const Filter = (props) => {
  const ctx = useContext(context);
  const changeFilter = (event) => {
    const filterCopy = { ...ctx.filterState };
    filterCopy[props.type] = event.target.value;
    ctx.setFilterState(filterCopy);
  };
  return (
    <select className={styles.filter} onChange={changeFilter}>
      {props.options.map((option) => (
        <option value={option} key={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Filter;
