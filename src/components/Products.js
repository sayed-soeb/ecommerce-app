import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  fetchProducts,
  addToCart,
  removeFromCart,
  removeFromProducts,
  editProduct,
} from '../store/actions';
import './Product.css'; // Import the product grid stylesheet

const Products = ({
  products,
  fetchProducts,
  addToCart,
  removeFromCart,
  removeFromProducts,
  editProduct,
  cart,
}) => {
  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [products, fetchProducts]);

  const [editingProduct, setEditingProduct] = useState(null);
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductDetail, setNewProductDetail] = useState('');

  const handleDeleteProduct = (productName) => {
    removeFromCart(productName);
    removeFromProducts(productName);
  };

  const handleEditButtonClick = (productName, productPrice, productDetail) => {
    setEditingProduct(productName);
    setNewProductName(productName);
    setNewProductPrice(productPrice);
    setNewProductDetail(productDetail);
  };

  const handleSaveButtonClick = (productName) => {
    if (newProductName || newProductPrice || newProductDetail) {
      editProduct(
        productName,
        newProductName,
        newProductPrice,
        newProductDetail // Pass detail here
      );
      setEditingProduct(null);
    }
  };

  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.name} className="product-card">
          <img src={product.url} alt={product.title} />
          {editingProduct === product.name ? (
            <div className="edit-container">
              <input
                type="text"
                value={newProductName}
                onChange={(e) => setNewProductName(e.target.value)}
              />
              <input
                type="number"
                value={newProductPrice}
                onChange={(e) => setNewProductPrice(e.target.value)}
              />
              <textarea // Use a textarea for detail
                value={newProductDetail}
                onChange={(e) => setNewProductDetail(e.target.value)}
              />
              <button onClick={() => handleSaveButtonClick(product.name)}>Save</button>
            </div>
          ) : (
            <>
              <h3 className="product-title">{product.name}</h3>
              <p className="product-price">Price: ${product.price}</p>
              <p className="product-detail">{product.detail}</p>
            </>
          )}
          <div className="button-group">
            <button className="add-to-cart-button" onClick={() => addToCart(product)}>
              <i className="fas fa-cart-plus button-icon"></i>
            </button>
            {editingProduct === product.name ? null : (
              <button
                className="edit-button"
                onClick={() =>
                  handleEditButtonClick(product.name, product.price, product.detail)
                }
              >
                <i className="fas fa-pencil-alt button-icon"></i>
              </button>
            )}
            <button
              className="delete-button"
              onClick={() => handleDeleteProduct(product.name)}
            >
              <i className="fas fa-trash button-icon"></i>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  products: state.products,
  cart: state.cart,
});

const mapDispatchToProps = {
  fetchProducts,
  addToCart,
  removeFromCart,
  removeFromProducts,
  editProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
