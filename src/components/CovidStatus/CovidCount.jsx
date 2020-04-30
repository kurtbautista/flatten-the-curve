import React, { Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./CovidStatus.module.scss";

const CovidCount = ({ data }) => {
  const {
    TotalConfirmed,
    TotalRecovered,
    TotalDeaths,
    NewConfirmed,
    NewRecovered,
    NewDeaths
  } = data;
  return (
    <Fragment>
      <div className={styles.covidDetails}>
        <div className={styles.statusWrapper}>
          <span className={styles.count}>{TotalConfirmed} </span>
          <span className={classNames(styles.statusLabel, styles.yellow)}>
            {NewConfirmed} New Confirmed
          </span>
        </div>
        <div className={styles.statusWrapper}>
          <span className={styles.count}>{TotalRecovered}</span>
          <span className={classNames(styles.statusLabel, styles.green)}>
            {NewRecovered} New Recovered
          </span>
        </div>
        <div className={styles.statusWrapper}>
          <span className={styles.count}>{TotalDeaths}</span>
          <span className={classNames(styles.statusLabel, styles.red)}>
            {NewDeaths} New Death
          </span>
        </div>
      </div>
    </Fragment>
  );
};

CovidCount.propTypes = {
  data: PropTypes.shape({
    TotalConfirmed: PropTypes.number,
    TotalRecovered: PropTypes.number,
    TotalDeaths: PropTypes.number,
    NewConfirmed: PropTypes.number,
    NewRecovered: PropTypes.number,
    NewDeaths: PropTypes.number
  })
};

CovidCount.defaultProps = {
  data: {}
};

export default CovidCount;
