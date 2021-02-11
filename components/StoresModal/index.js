import React from "react";
import PropTypes from "prop-types";

import Modal from "../Modal";

import style from "./StoresModal.module.css";

function StoresModal({ product, onClose }) {
  return (
    <Modal
      title={`${product.product_name}: Stores availability`}
      onClose={onClose}
    >
      {product.stores.length > 0
        ? product.stores.map(
            ({ store_name, store_price, product_url }, index) => (
              <div className={style.store} key={index}>
                <a href={product_url} target="_blank">
                  {store_name}
                </a>
                : <span>${store_price}</span>
              </div>
            )
          )
        : "No stores availability found."}
    </Modal>
  );
}

StoresModal.propTypes = {
  product: PropTypes.object.isRequired,
  onClose: PropTypes.func,
};

export default StoresModal;
