import React from "react";
import PropTypes from "prop-types";

import styles from "./Stack.module.css";

function Stack({ align = "flex-start", gap, children }) {
  return (
    <div className={styles.stack} style={{ rowGap: gap, justifyItems: align }}>
      {children}
    </div>
  );
}

Stack.propTypes = {
  align: PropTypes.string,
  gap: PropTypes.number.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Stack;
