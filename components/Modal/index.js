import React from "react";
import ReactDOM from "react-dom";
import { AiOutlineClose } from "react-icons/ai";
import PropTypes from "prop-types";

import Stack from "../Stack";
import Divider from "../Divider";
import style from "./Modal.module.css";

function Modal({ title, children, onClose }) {
  return ReactDOM.createPortal(
    <div className={style.modalContainer}>
      <div className={style.modal}>
        <Stack gap={16}>
          <div className={style.modalHeader}>
            <AiOutlineClose className={style.icon} onClick={onClose} />
            <span className={style.productTitle}>{title}</span>
          </div>
          <Divider />
          {children}
        </Stack>
      </div>
    </div>,
    getPortalContainer()
  );
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  onClose: PropTypes.func.isRequired,
};

function getPortalContainer() {
  const id = "NOON_PORTAL";
  let element = document.getElementById(id);

  if (element) {
    return element;
  }

  element = document.createElement("div");
  element.id = id;
  document.body.appendChild(element);
  return element;
}

export default Modal;
