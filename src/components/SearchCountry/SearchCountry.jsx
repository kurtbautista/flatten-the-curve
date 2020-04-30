import React, { useEffect } from "react";
import { connect } from "react-redux";
import { List } from "immutable";
import ImmutablePropTypes from "immutable-prop-types";
import PropTypes from "prop-types";
import DropDownList from "../DropDownList";
import { fetchCountryAction } from "../../actions/thunks";

const SearchCountry = ({
  fetchCountry,
  isFetching,
  country,
  handleChange,
  className,
  classNamePrefix
}) => {
  useEffect(() => {
    fetchCountry();
  }, []);

  return (
    <DropDownList
      handleChange={handleChange}
      isLoading={isFetching}
      className={className}
      placeholder="Find Country"
      options={country}
      classNamePrefix={classNamePrefix}
    />
  );
};

SearchCountry.propTypes = {
  fetchCountry: PropTypes.func,
  isFetching: PropTypes.bool,
  country: ImmutablePropTypes.list,
  handleChange: PropTypes.func,
  className: PropTypes.string
};

SearchCountry.defaultProps = {
  fetchCountry: () => {},
  isFetching: false,
  country: List([]),
  handleChange: () => {},
  className: ""
};

const mapStateToProps = ({ flattenTheCurve }) => ({
  isFetching: flattenTheCurve.get("isFetching"),
  country: flattenTheCurve.get("country").toJS() || []
});

const mapDispatchToProps = dispatch => ({
  fetchCountry: () => dispatch(fetchCountryAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchCountry);
