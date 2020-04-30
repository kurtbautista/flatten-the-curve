import React from "react";
import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";

const ChartLine = ({ data }) => {
  const { labels, dataSet } = data;
  const datasets = dataSet.map(item => ({
    label: item.label,
    fill: false,
    lineTension: 0.1,
    backgroundColor: item.color,
    borderColor: item.color,
    borderCapStyle: "butt",
    borderDash: [],
    borderDashOffset: 0.0,
    borderJoinStyle: "miter",
    pointBorderColor: item.color,
    pointBackgroundColor: item.color,
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: item.color,
    pointHoverBorderColor: item.color,
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10,
    data: item.data
  }));
  const statistics = {
    labels,
    datasets
  };
  return <Line data={statistics} />;
};

ChartLine.propTypes = {
  data: PropTypes.arrayOf({
    labels: PropTypes.string,
    dataSet: PropTypes.dataSet
  })
};

ChartLine.defaultProps = {
  data: []
};

export default ChartLine;
