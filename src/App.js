import React from 'react';
import './App.css'; // Import the stylesheet
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Products from './components/Products'; // Import Products component
import SearchResult from './components/SearchResults';
import AddProduct from './components/AddProduct';
import Cart from './components/Cart';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/products"  element={<Products />} />
        <Route exact path="/add-product"  element={<AddProduct />} />
        <Route exact path="/cart"  element={<Cart />} />
        <Route exact path="/"  element={<Products />} />
        <Route exact path="/search-results"  element={<SearchResult />} />
      </Routes>
    <ToastContainer />
    </div>
  );
};

export default App;
