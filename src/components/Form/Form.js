import styles from "./Form.module.css";
import Modal from "../UI/Modal";
import React, { useContext, useState, useRef, useEffect } from "react";
import ModalContext from "../../store/modal-context";
import useInput from "../../hooks/use-input";
import useHttp from "../../hooks/use-http";

const categories = [
  "Mathematics",
  "Physics",
  "English",
  "Chemistry",
  "Biology",
];
const levels = ["Primary School", "Highschool", "Academic"];

const textValidation = (value) => value.trim() !== "";
const phoneNumberValidation = (value) => value.trim().length === 9;
const priceValidation = (value) => Number(value) > 0;
const categoryValidation = (array) => array.length > 0;

const Form = () => {
  const ctx = useContext(ModalContext);

  const {
    inputValue: enteredName,
    isInputValid: isNameInputValid,
    hasError: hasNameError,
    blurInputHandler: blurNameInput,
    changeValueHandler: changeName,
  } = useInput(textValidation);

  const {
    inputValue: enteredDescription,
    isInputValid: isDescriptionInputValid,
    hasError: hasDescriptionError,
    blurInputHandler: blurDescriptionInput,
    changeValueHandler: changeDescription,
  } = useInput(textValidation);

  const {
    inputValue: enteredPhotoUrl,
    isInputValid: isPhotoUrlInputValid,
    hasError: hasPhotoUrlError,
    blurInputHandler: blurPhotoUrlInput,
    changeValueHandler: changePhotoUrl,
  } = useInput(textValidation);

  const {
    inputValue: enteredPhoneNumber,
    isInputValid: isPhoneNumberInputValid,
    hasError: hasPhoneNumberError,
    blurInputHandler: blurPhoneNumberInput,
    changeValueHandler: changePhoneNumber,
  } = useInput(phoneNumberValidation);

  const {
    inputValue: enteredPrice,
    isInputValid: isPriceInputValid,
    hasError: hasPriceError,
    blurInputHandler: blurPriceInput,
    changeValueHandler: changePrice,
  } = useInput(priceValidation);

  const {
    inputValue: chosenLevels,
    isInputValid: isChosenLevelsValid,
    checkboxInputChangeHandler: checkboxLevelsChange,
  } = useInput(categoryValidation);
  const {
    inputValue: chosenCategories,
    isInputValid: isChosenCategoriesValid,
    checkboxInputChangeHandler: checkboxCategoriesChange,
  } = useInput(categoryValidation);

  let isFormValid = false;
  if (
    isDescriptionInputValid &&
    isNameInputValid &&
    isPhoneNumberInputValid &&
    isPriceInputValid &&
    isChosenLevelsValid &&
    isChosenCategoriesValid
  )
    isFormValid = true;

  // SUBMITING FORM

  const submitFormHandler = (event) => {
    event.preventDefault();
    console.log(isFormValid);

    if (!isFormValid) {
      return;
    } else console.log("form valid");
    ctx.onCloseForm();
    addNewTutor();
  };

  const extractNewOffer = (_, newOfferData) => {
    let tutorsCopy = [...ctx.tutors];

    console.log(ctx.tutors, newOfferData);
    tutorsCopy.unshift(newOfferData);
    console.log(tutorsCopy);
    ctx.setTutors(tutorsCopy);
  };

  const { fetchData: uploadNewTutorOffer } = useHttp(extractNewOffer);

  const addNewTutor = () => {
    const newTutorData = {
      id: Math.random(),
      name: enteredName,
      description: enteredDescription,
      phoneNumber: enteredPhoneNumber,
      photoUrl: enteredPhotoUrl,
      price: enteredPrice,
      category: chosenCategories,
      level: chosenLevels,
      releaseDate: Date.now(),
    };

    uploadNewTutorOffer("POST", newTutorData);
  };

  // CLASSES

  const nameClasses = !hasNameError
    ? styles.control
    : `${styles.control} ${styles.invalid}`;

  const descriptionClasses = !hasDescriptionError
    ? styles.control
    : `${styles.control} ${styles.invalid}`;

  const phoneNumberClasses = !hasPhoneNumberError
    ? styles.control
    : `${styles.control} ${styles.invalid}`;

  const priceClasses = !hasPriceError
    ? styles.control
    : `${styles.control} ${styles.invalid}`;

  return (
    <Modal>
      <form onSubmit={submitFormHandler}>
        <div className={styles.controls}>
          <div className={nameClasses}>
            <label className={styles.label} htmlFor="name">
              Name*
            </label>
            <input
              onChange={changeName}
              onBlur={blurNameInput}
              className={styles.input}
              type="text"
              id="name"
            />
            {hasNameError ? (
              <p className={styles["error-message"]}>Name input is empty.</p>
            ) : (
              ""
            )}
          </div>
          <div className={phoneNumberClasses}>
            <label className={styles.label} htmlFor="phone number">
              Phone number*
            </label>
            <input
              onChange={changePhoneNumber}
              onBlur={blurPhoneNumberInput}
              className={styles.input}
              type="tel"
              id="phone number"
            />
            {hasPhoneNumberError ? (
              <p className={styles["error-message"]}>
                Phone number has to consist 9 digits
              </p>
            ) : (
              ""
            )}
          </div>
          <div className={descriptionClasses}>
            <label className={styles.label} htmlFor="description">
              Description*
            </label>
            <textarea
              onChange={changeDescription}
              onBlur={blurDescriptionInput}
              rows="3"
              id="description"
              className={styles.input}
            ></textarea>
            {hasDescriptionError ? (
              <p className={styles["error-message"]}>Name input is empty.</p>
            ) : (
              ""
            )}
          </div>
          <div className={styles.control}>
            <label className={styles.label} htmlFor="photo-url">
              Photo Url
            </label>
            <input
              onChange={changePhotoUrl}
              onBlur={blurPhotoUrlInput}
              id="photo-url"
              className={styles.input}
            ></input>
          </div>
          <div className={styles.control}>
            <h2 className={styles.label}>Categories*</h2>
            <ul className={styles.categories}>
              {categories.map((cat) => (
                <li key={cat} className={styles.category}>
                  <input
                    id={cat}
                    type="checkbox"
                    value={cat}
                    name="categories"
                    onChange={checkboxCategoriesChange}
                  />
                  <label htmlFor={cat}>{cat}</label>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.control}>
            <h2 className={styles.label}>Levels*</h2>
            <ul className={styles.categories}>
              {levels.map((lev) => (
                <li key={lev} className={styles.category}>
                  <input
                    id={lev}
                    type="checkbox"
                    value={lev}
                    name="levels"
                    onChange={checkboxLevelsChange}
                  />
                  <label htmlFor={lev}>{lev}</label>
                </li>
              ))}
            </ul>
          </div>
          <div className={priceClasses}>
            <label className={styles.label} htmlFor="price">
              Price*
            </label>
            <input
              onChange={changePrice}
              onBlur={blurPriceInput}
              className={styles.input}
              type="number"
              id="price"
            />
            {hasPriceError ? (
              <p className={styles["error-message"]}>
                Price has to be bigger than 0.
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className={styles.actions}>
          <button className={!isFormValid ? styles.disabled : ""} type="submit">
            Post you offer
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default Form;
