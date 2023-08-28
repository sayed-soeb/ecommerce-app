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
        <Route path="/products" exact element={<Products />} />
        <Route path="/add-product" exact element={<AddProduct />} />
        <Route path="/cart" exact element={<Cart />} />
        <Route path="/" exact element={<Products />} />
        <Route path="/search-results" exact element={<SearchResult />} />
      </Routes>
    <ToastContainer />
    </div>
  );
};

export default App;
