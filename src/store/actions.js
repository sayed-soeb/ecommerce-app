import axios from 'axios';
import {
  FETCH_PRODUCTS_SUCCESS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  REMOVE_PRODUCT,
  ADD_TO_PRODUCTS,
  EDIT_PRODUCT,
  INCREASE_CART_ITEM_QUANTITY,
  DECREASE_CART_ITEM_QUANTITY,
  SET_SEARCH_QUERY,

} from './actionTypes';

export const fetchProductsSuccess = (products) => {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    payload: products,
  };
};

export const fetchProducts = () => {
  return (dispatch) => {
    axios
      .get('https://my-json-server.typicode.com/sayed-soeb/ecommerce-app/db')
      .then((response) => {
        dispatch(fetchProductsSuccess(response.data.products));
      })
      .catch((error) => {
        // Handle error
      });
  };
};

export const addToCart = (product) => {
  const updatedProduct = { ...product, units: 1 };
  return {
    type: ADD_TO_CART,
    payload: updatedProduct,
  };
};

export const increaseCartItemQuantity = (product) => {
  return {
    type: INCREASE_CART_ITEM_QUANTITY,
    payload: product.name,
  };
};

export const decreaseCartItemQuantity = (product) => {
  return {
    type: DECREASE_CART_ITEM_QUANTITY,
    payload: product.name,
  };
};

export const removeFromCart = (productName) => {
  return {
    type: REMOVE_FROM_CART,
    payload: productName,
  };
};

export const removeFromProducts = (productName) => {
  return {
    type: REMOVE_PRODUCT,
    payload: productName,
  };
};

export const addToProducts = (product) => {
  return {
    type: ADD_TO_PRODUCTS,
    payload: product,
  };
};

export const setSearchQuery = (searchQuery) => {
  return {
    type: SET_SEARCH_QUERY,
    payload: searchQuery,
  };
};

export const editProduct = (name, newName, newPrice, newDetail) => {
  return {
    type: EDIT_PRODUCT,
    payload: {
      name,
      newName,
      newPrice,
      newDetail,  // Add the newDetail parameter
    },
  };
};

