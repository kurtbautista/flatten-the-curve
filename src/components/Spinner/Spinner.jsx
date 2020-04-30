import React from "react";
import styles from "./Spinner.module.scss";

const Spinner = () => {
  return (
    <div className={styles.spinnerWrapper}>
      <div className={styles.spinner} />
    </div>
  );
};

Spinner.propTypes = {};

export default Spinner;
