import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addToProducts } from '../store/actions';
import { toast } from 'react-toastify'; // Import toast from react-toastify
import './AddProduct.css'; // Import your AddProduct.css file

const AddProduct = ({ addToProducts }) => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState('');
  const [productDetail, setProductDetail] = useState(''); // State for product detail
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      name: productName,
      price: parseFloat(productPrice),
      url: productImage,
      detail: productDetail, // Include the product detail in the newProduct object
    };

    addToProducts(newProduct);

    setProductName('');
    setProductPrice('');
    setProductImage('');
    setProductDetail('');

    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  return (
    <div className="form-container">
      <h2>Add Product</h2>
      {showAlert && <p className="alert">Product is added!</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="label">Product Name:</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label className="label">Product Price:</label>
          <input
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label className="label">Product Image URL:</label>
          <input
            type="url"
            value={productImage}
            onChange={(e) => setProductImage(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label className="label">Product Detail:</label>
          <textarea
            value={productDetail}
            onChange={(e) => setProductDetail(e.target.value)}
            required
            className="textarea-field"
          />
        </div>
        <button type="submit" className="button">
          Add Product
        </button>
      </form>
    </div>
  );
};

const mapDispatchToProps = {
  addToProducts,
};

export default connect(null, mapDispatchToProps)(AddProduct);
