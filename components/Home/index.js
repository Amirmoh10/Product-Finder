import React, { useReducer } from "react";
import StoresModal from "../StoresModal";
import AdvancedSearchModal from "../AdvancedSearchModal";
import Stack from "../Stack";
import Button from "../Button";
import Input from "../Input";
import ProductsList from "../ProductsList";
import { REQUEST } from "../../constants";
import style from "./Home.module.css";

const initialState = {
  products: [],
  request: REQUEST.DEFAULT,
  search: "",
  selectedProduct: null,
  isAdvancedSearch: false,
};

const ACTION = {
  LOADING_SET: "LOADING_SET",
  ERROR_SET: "ERROR_SET",
  PRODUCTS_FETCHED: "PRODUCTS_FETCHED",
  SEARCH_CHANGED: "SEARCH_CHANGED",
  PRODUCT_SELECTED: "PRODUCT_SELECTED",
  ADVANCED_SEARCH_SET: "ADVANCED_SEARCH_SET",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTION.SEARCH_CHANGED:
      return { ...state, search: action.payload };

    case ACTION.LOADING_SET:
      return { ...state, request: REQUEST.LOADING };

    case ACTION.ERROR_SET:
      return { ...state, request: REQUEST.ERROR };

    case ACTION.PRODUCTS_FETCHED:
      return { ...state, products: action.payload, request: REQUEST.SUCCESS };

    case ACTION.PRODUCT_SELECTED:
      return { ...state, selectedProduct: action.payload };

    case ACTION.ADVANCED_SEARCH_SET:
      return { ...state, isAdvancedSearch: action.payload };

    default:
      return state;
  }
}

function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);

  async function handleSubmit(e) {
    e.preventDefault();
    fetchProducts({ search: state.search });
  }

  async function fetchProducts(filter) {
    // only consider filled values
    let cleanedFilter = {};
    for (let key in filter) {
      if (filter[key]) {
        cleanedFilter[key] = filter[key];
      }
    }

    dispatch({
      type: ACTION.LOADING_SET,
    });

    try {
      const { products } = await requestProducts(cleanedFilter);
      dispatch({
        type: ACTION.PRODUCTS_FETCHED,
        payload: products,
      });
    } catch (e) {
      dispatch({ type: ACTION.ERROR_SET });
    }
  }

  return (
    <div className={style.home}>
      {!state.selectedProduct ? null : (
        <StoresModal
          product={state.selectedProduct}
          onClose={() =>
            dispatch({ type: ACTION.PRODUCT_SELECTED, payload: null })
          }
        />
      )}
      {!state.isAdvancedSearch ? null : (
        <AdvancedSearchModal
          onSubmit={fetchProducts}
          onClose={() =>
            dispatch({ type: ACTION.ADVANCED_SEARCH_SET, payload: false })
          }
        />
      )}
      <Stack gap={55} align="stretch">
        <h1 className={style.title}>Products Finder</h1>
        <form className={style.form} onSubmit={handleSubmit}>
          <Input
            placeholder="Search..."
            onChange={(e) =>
              dispatch({
                type: ACTION.SEARCH_CHANGED,
                payload: e.target.value,
              })
            }
            name="search"
            value={state.search}
          />
          <div className={style.buttonsContainer}>
            <Button type="submit" disabled={!state.search}>
              Search
            </Button>
            <Button
              type="button"
              isPrimary={false}
              onClick={() => {
                dispatch({
                  type: ACTION.ADVANCED_SEARCH_SET,
                  payload: true,
                });
              }}
            >
              Advanced search
            </Button>
          </div>
        </form>
        <Stack gap={16} align="stretch">
          <ProductsList
            request={state.request}
            products={state.products}
            onProductClick={(product) => {
              dispatch({
                type: ACTION.PRODUCT_SELECTED,
                payload: product,
              });
            }}
          />
        </Stack>
      </Stack>
    </div>
  );
}

async function requestProducts(body) {
  const response = await fetch("/api/products", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });

  if (response.status >= 200 && response.status < 300) {
    return await response.json();
  }

  throw response;
}

export default Home;
