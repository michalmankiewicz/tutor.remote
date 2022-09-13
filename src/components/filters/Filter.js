import { Export, MathOperations } from "phosphor-react";
import styles from "./Filter.module.css";
import { useRef, useContext } from "react";
import ModalContext from "../../store/modal-context";
const Filter = (props) => {
  const ctx = useContext(ModalContext);
  const changeFilter = (event) => {
    const filterCopy = { ...ctx.filterState };
    filterCopy[props.type] = event.target.value;
    ctx.setFilterState(filterCopy);
    console.log(ctx.filterState);
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
