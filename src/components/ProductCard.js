import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div>
      <h2>{product.productName}</h2>
      <p>Price: {product.price}</p>
      <p>Rating: {product.rating}</p>
      <p>Discount: {product.discount}%</p>
      <p>Availability: {product.availability}</p>
      <img src={`https://via.placeholder.com/150x150`} alt={product.productName} />
    </div>
  );
};

export default ProductCard;