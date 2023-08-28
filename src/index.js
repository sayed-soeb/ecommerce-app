import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './store/reducers';
import { HashRouter } from 'react-router-dom';
import App from './App';

// Load products from local storage if available
const savedProducts = localStorage.getItem('products');
const savedCart = localStorage.getItem('cart');
const initialState = {
  products: savedProducts ? JSON.parse(savedProducts) : [],
  searchQuery: '',
  cart: savedCart ? JSON.parse(savedCart) : [],
};

const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
});

ReactDOM.render(
  <Provider store={store}>
    <HashRouter> {/* Wrap your app with BrowserRouter */}
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);
