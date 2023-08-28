import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; // Import the navbar stylesheet
import { connect } from 'react-redux';
import { setSearchQuery } from '../store/actions';
import { useDispatch } from 'react-redux';

const Navbar = ({ cart }) => {
  const dispatch = useDispatch();
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  const [searchQuery, setSearchQueryLocal] = useState('');
  const navigate = useNavigate(); // Use the useNavigate hook

  const handleSearchChange = (e) => {
    setSearchQueryLocal(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchQuery(searchQuery));
    navigate(`/search-results?q=${searchQuery}`);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">Ecommerce App</Link>
      <div className="navbar-search">
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search products..."
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/products" className="navbar-link">Products</Link>
        </li>
        <li className="navbar-item">
          <Link to="/add-product" className="add-product-link">Add Product</Link>
        </li>
        <li className="navbar-item">
          <Link to="/cart" className="navbar-link">
            <i className="fas fa-shopping-cart cart-icon"></i>
            Cart ({totalQuantity})
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart,
  searchQuery:state.searchQuery,
});

const mapDispatchToProps = {
  setSearchQuery,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);