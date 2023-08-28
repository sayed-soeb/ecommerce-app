import { combineReducers } from 'redux';
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

// Get persisted products and cart from local storage
const persistedProducts = JSON.parse(localStorage.getItem('products')) || [];
const persistedCart = JSON.parse(localStorage.getItem('cart')) || [];

const productsReducer = (state = persistedProducts, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_SUCCESS:
     // localStorage.setItem('products', JSON.stringify(action.payload));
      return action.payload;
    case ADD_TO_PRODUCTS:
      const updatedProducts = [...state, action.payload];
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      return updatedProducts;
    case REMOVE_PRODUCT:
      const filteredProducts = state.filter((product) => product.name !== action.payload);
      localStorage.setItem('products', JSON.stringify(filteredProducts));
      return filteredProducts;
      case EDIT_PRODUCT:
        const editedProductIndex = state.findIndex(
          (product) => product.name === action.payload.name
        );
        if (editedProductIndex !== -1) {
          const updatedProducts = [...state];
          updatedProducts[editedProductIndex] = {
            ...updatedProducts[editedProductIndex],
            name: action.payload.newName,
            price: action.payload.newPrice,
            detail: action.payload.newDetail, // Update detail
          };
          localStorage.setItem('products', JSON.stringify(updatedProducts));
          return updatedProducts;
        }
        return state;
      default:
        return state;
    }
};

const cartReducer = (state = persistedCart, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingCartItem = state.find(item => item.name === action.payload.name);

      if (existingCartItem) {
        const updatedCart = state.map(item =>
          item.name === existingCartItem.name ? { ...item, quantity: item.quantity + 1 } : item
        );
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        return updatedCart;
      } else {
        const updatedCart = [...state, { ...action.payload, quantity: 1 }];
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        return updatedCart;
      }

    case REMOVE_FROM_CART:
      const filteredCart = state.filter(product => product.name !== action.payload);
      localStorage.setItem('cart', JSON.stringify(filteredCart));
      return filteredCart;

    case INCREASE_CART_ITEM_QUANTITY:
      const increasedCart = state.map(item =>
        item.name === action.payload ? { ...item, quantity: item.quantity + 1 } : item
      );
      localStorage.setItem('cart', JSON.stringify(increasedCart));
      return increasedCart;

    case DECREASE_CART_ITEM_QUANTITY:
      const decreasedCart = state.map(item =>
        item.name === action.payload ? { ...item, quantity: item.quantity - 1 } : item
      ).filter(item => item.quantity > 0);
      localStorage.setItem('cart', JSON.stringify(decreasedCart));
      return decreasedCart;

    default:
      return state;
  }
};

const initialState = {
  searchQuery: '',
};

const navReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  searchQuery: navReducer,
});

export default rootReducer;
