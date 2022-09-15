import { useState } from "react";

const useInput = (validityFn) => {
  const [inputValue, setInputValue] = useState("");
  const [isInputTouched, setIsInputTouched] = useState(false);

  const isInputValid = validityFn(inputValue);

  let hasError = isInputTouched && !isInputValid;

  const changeValueHandler = (event) => {
    setInputValue(event.target.value);
  };

  const blurInputHandler = () => {
    setIsInputTouched(true);
  };

  const reset = () => {
    setInputValue("");
  };

  const checkboxInputChangeHandler = (event) => {
    const { value, checked } = event.target;
    let arrayCopy = [...inputValue];

    if (checked) {
      arrayCopy.push(value);
      setInputValue(arrayCopy);
    } else {
      const valueIndex = arrayCopy.findIndex((lev) => lev === value);
      arrayCopy.splice(valueIndex, 1);
      setInputValue(arrayCopy);
    }
  };

  return {
    inputValue,
    isInputValid,
    hasError,
    blurInputHandler,
    changeValueHandler,
    reset,
    checkboxInputChangeHandler,
  };
};

export default useInput;
