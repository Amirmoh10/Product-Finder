import React from "react";
import PropTypes from "prop-types";

import Card from "../Card";
import Stack from "../Stack";

import style from "./Product.module.css";

function Property({ propName, propValue }) {
  return (
    <div>
      <strong>{`${propName}:`}</strong>{" "}
      <span>{!propValue ? "No value set for this product." : propValue}</span>
    </div>
  );
}

function Product({ product, onClick }) {
  return (
    <div className={style.product} onClick={onClick}>
      <Card>
        <Stack gap={10}>
          <h1>{product.product_name}</h1>
          <Property propName={"Barcode"} propValue={product.barcode_number} />
          <Property propName={"Brand"} propValue={product.brand} />
          <Property propName={"Color"} propValue={product.color} />
          <Property propName={"Description"} propValue={product.description} />
        </Stack>
      </Card>
    </div>
  );
}

Product.propTypes = {
  product: PropTypes.object,
  onClick: PropTypes.func,
};

export default Product;
