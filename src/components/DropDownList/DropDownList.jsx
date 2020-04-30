/* eslint-disable react/jsx-no-duplicate-props */
import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";

const DropDownList = ({
  options,
  placeholder,
  handleChange,
  name,
  isLoading,
  className,
  isClearable,
  classNamePrefix,
  handleInputChange
}) => {
  return (
    <Select
      className={className}
      isLoading={isLoading}
      isClearable={isClearable}
      placeholder={placeholder}
      classNamePrefix={classNamePrefix}
      name={name}
      options={options}
      onChange={event => handleChange(event)}
      onInputChange={handleInputChange}
    />
  );
};

DropDownList.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string
    })
  ),
  placeholder: PropTypes.string,
  handleChange: PropTypes.func,
  name: PropTypes.string,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
  isClearable: PropTypes.string
};

DropDownList.defaultProps = {
  options: [],
  placeholder: "",
  handleChange: () => {},
  name: "",
  isLoading: false,
  className: "",
  isClearable: true
};

export default DropDownList;
