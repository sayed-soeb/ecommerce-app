import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

// Load cart from local storage if available
const savedCart = localStorage.getItem('cart');
const initialState = {
  products: [],
  searchQuery:'', // Initialize products state as needed
  cart: savedCart ? JSON.parse(savedCart) : [], // Use the persisted cart state
};

const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState, // Provide the initial state
});

export default store;
