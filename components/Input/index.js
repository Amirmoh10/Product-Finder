import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";

import style from "./Input.module.css";

function Input({
  withBorder = false,
  fullWidth = false,
  placeholder,
  value,
  name,
  onChange,
}) {
  return (
    <input
      placeholder={placeholder}
      type="text"
      name={name}
      onChange={onChange}
      value={value}
      className={cn(
        style.input,
        { [style.withBorder]: withBorder },
        { [style.fullWidth]: fullWidth }
      )}
    />
  );
}

Input.propTypes = {
  withBorder: PropTypes.bool,
  fullWidth: PropTypes.bool,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
};

export default Input;
