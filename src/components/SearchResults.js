import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../store/actions';
import { setSearchQuery } from '../store/actions';
import { useSelector, useDispatch } from 'react-redux';
import './Product.css'; // Import the CSS file

const SearchResult = ({ addToCart }) => {
  const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
  const search = new URLSearchParams(window.location.search).get('q') || '';
  setSearchQuery(search);
  const searchQuery = useSelector((state) => state.search);
  console.log(searchQuery);
  const dispatch = useDispatch();

  // Filter products based on search query
  const filteredProducts = search
    ? storedProducts.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      )
    : storedProducts;

  useEffect(() => {
    const search = new URLSearchParams(window.location.search).get('q') || '';
    dispatch(setSearchQuery(search));
  }, [dispatch,search]);

  return (
    <div className="search-result">
      <h2>Search Results</h2>
      {filteredProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div>
          <ul className="product-list">
            {filteredProducts.map((product) => (
              <li key={product.name} className="product-card">
                <img src={product.url} alt={product.name} className="product-image" />
                <h3 className="product-title">{product.name}</h3>
                <p className="product-price">${product.price}</p>
                <p className="product-detail">{product.detail}</p>
                <button className="add-to-cart-button" onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  products: state.products,
  cart: state.cart,
});

const mapDispatchToProps = {
  addToCart,
  setSearchQuery,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);
