import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";

import style from "./Button.module.css";

function Button({
  isPrimary = true,
  disabled,
  onClick,
  type = "button",
  children,
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        style.button,
        { [style.primary]: isPrimary },
        { [style.secondary]: !isPrimary }
      )}
      type={type}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  isPrimary: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Button;
