import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { isNil, isEmpty } from "ramda";
import classNames from "classnames";
import Fade from "react-reveal/Fade";
import DropDownList from "../DropDownList";
import ChartLine from "./ChartLine";
import CovidCount from "./CovidCount";
import {
  fetchGlobalCovidAction,
  fetchSelectedCountryAction
} from "../../actions/thunks";
import { setGlobalStatus as setGlobalStatusAction } from "../../actions";
import styles from "./CovidStatus.module.scss";

const CovidStatus = ({
  fetchGlobalCovid,
  fetchSelectedCountry,
  covidStatus,
  countries,
  setGlobalStatus,
  covidStatistics,
  isFetching
}) => {
  const [covidStat, setCovidStat] = useState(covidStatistics);
  const [isChartShow, setIsChartShow] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("Global");

  const prevCountRef = useRef();

  useEffect(() => {
    if (isEmpty(countries)) {
      fetchGlobalCovid();
    }

    if (covidStat !== prevCountRef.covidStat) {
      const {
        date: dateStat,
        totalConfirmed: totalConfirmedStat,
        totalRecovered: totalRecoveredStat,
        totalDeaths: totalDeathsStat
      } = covidStatistics;

      const statistics = {
        labels: dateStat,
        dataSet: [
          {
            label: "Confirmed",
            color: "#ffd07a",
            data: totalConfirmedStat
          },
          {
            label: "Recovered",
            color: "#6ad57b",
            data: totalRecoveredStat
          },
          {
            label: "Deaths",
            color: "#ff7272",
            data: totalDeathsStat
          }
        ]
      };

      setCovidStat(statistics);
    }
  }, [countries, covidStatistics]);

  const handleChange = country => {
    if (isNil(country)) {
      setGlobalStatus();
      setIsChartShow(false);
      setSelectedCountry("Global");
      return null;
    }
    const { value, label } = country;
    fetchSelectedCountry(value);
    setIsChartShow(true);
    setSelectedCountry(label);
    return true;
  };

  return (
    <div
      className={classNames(
        styles.covidContainer,
        isChartShow && styles.withChart
      )}
    >
      <div className={classNames(styles.col, styles.colVertical)}>
        <div className={styles.headerTitle}>
          <Fade bottom when={!isFetching}>
            <h1 className={styles.title}>{selectedCountry} Covid-19 Updates</h1>
          </Fade>
        </div>
        <Fade bottom when={!isFetching}>
          <CovidCount data={covidStatus} />
        </Fade>
        <div className={styles.searchCountryWrapper}>
          <DropDownList
            handleChange={handleChange}
            isLoading={isFetching}
            className="searchCountry"
            placeholder="Find Country"
            options={countries}
            classNamePrefix="searchCountry"
          />
        </div>
        <div className={styles.chartContainer}>
          <div className={styles.chartWrapper}>
            <Fade when={!isFetching}>
              {isChartShow && !isFetching && <ChartLine data={covidStat} />}
            </Fade>
          </div>
        </div>
      </div>
    </div>
  );
};

CovidStatus.propTypes = {
  fetchGlobalCovid: PropTypes.func,
  fetchSelectedCountry: PropTypes.func,
  covidStatus: PropTypes.shape({
    TotalConfirmed: PropTypes.number,
    NewConfirmed: PropTypes.number,
    NewDeaths: PropTypes.number,
    TotalDeaths: PropTypes.number,
    NewRecovered: PropTypes.number,
    TotalRecovered: PropTypes.number
  }),
  countries: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    })
  ),
  setGlobalStatus: PropTypes.func,
  covidStatistics: PropTypes.shape({
    date: PropTypes.array,
    totalConfirmed: PropTypes.array,
    totalRecovered: PropTypes.array,
    totalDeaths: PropTypes.array
  }),
  isFetching: PropTypes.bool
};

CovidStatus.defaultProps = {
  fetchGlobalCovid: () => {},
  fetchSelectedCountry: () => {},
  covidStatus: {},
  countries: [],
  setGlobalStatus: () => {},
  covidStatistics: {},
  isFetching: false
};

const mapStateToProps = ({ flattenTheCurve }) => ({
  isFetching: flattenTheCurve.get("isFetching"),
  covidStatus: flattenTheCurve.get("covidStatus").toJS() || null,
  countries: flattenTheCurve.get("countries").toJS(),
  covidStatistics: flattenTheCurve.get("covidStatistics").toJS()
});

const mapDispatchToProps = dispatch => ({
  fetchGlobalCovid: () => dispatch(fetchGlobalCovidAction()),
  fetchSelectedCountry: country =>
    dispatch(fetchSelectedCountryAction(country)),
  setGlobalStatus: () => dispatch(setGlobalStatusAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(CovidStatus);
