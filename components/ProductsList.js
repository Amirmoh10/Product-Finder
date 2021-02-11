import React from "react";
import PropTypes from "prop-types";

import Card from "./Card";
import Product from "./Product";
import { REQUEST } from "../constants";

function ProductsList({ request, products, onProductClick }) {
  if (request === REQUEST.DEFAULT) {
    return <Card>Search for a keyword or use the filters to see results</Card>;
  }

  if (request === REQUEST.LOADING) {
    return <Card>Fetching products...</Card>;
  }

  if (request === REQUEST.ERROR) {
    return (
      <Card>
        There was an error fetching the products, please try another search.
      </Card>
    );
  }

  if (products.length === 0) {
    return <Card>There are no results for your search.</Card>;
  }

  return products.map((product, index) => (
    <Product
      key={index}
      product={product}
      onClick={() => onProductClick(product)}
    />
  ));
}

ProductsList.propTypes = {
  request: PropTypes.string.isRequired,
  products: PropTypes.array.isRequired,
  onProductClick: PropTypes.func.isRequired,
};

export default ProductsList;
