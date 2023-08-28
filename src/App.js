import React from 'react';
import './App.css'; // Import the stylesheet
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
    <Router>
      <Navbar />
      <Routes>
        <Route path="/products" element={<Products />} /> {/* Associate Products component */}
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/" exact element={<Products />} />
        <Route path="/search-results" element={<SearchResult />} />
      </Routes>
    </Router>
    <ToastContainer />
    </div>
  );
};

export default App;
