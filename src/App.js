import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './/components/ProductCard';

const AllProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [rating, setRating] = useState(0);
  const [availability, setAvailability] = useState('');

  useEffect(() => {
    axios.get('http://20.244.56.144/test/companies')
      .then(response => {
        setCompanies(response.data);
      })
      .catch(error => {
        console.error(error);
      });

    axios.get('http://20.244.56.144/test/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'company':
        setSelectedCompany(value);
        break;
      case 'category':
        setSelectedCategory(value);
        break;
      case 'minPrice':
        setMinPrice(value);
        break;
      case 'maxPrice':
        setMaxPrice(value);
        break;
      case 'rating':
        setRating(value);
        break;
      case 'availability':
        setAvailability(value);
        break;
      default:
        break;
    }
  };

  const fetchProducts = () => {
    axios.get(`http://20.244.56.144/test/companies/${selectedCompany}/categories/${selectedCategory}/products?top=10&minPrice=${minPrice}&maxPrice=${maxPrice}`)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div style={{backgroundColor: '#00DBDE',
      backgroundImage: 'linear-gradient(90deg, #00DBDE 0%, #FC00FF 100%)', margin:'0', padding:'0'}}>
      <h1 style={{display:'flex', justifyContent:'center', margin:'10px'}}>E-Commerce Website </h1>
      <form style={{display:'flex', justifyContent:'center', flexDirection:'column', backgroundColor:'lightblue', margin:'5% 30%', padding:'30px'}}>
        <label>Company:</label>
        <select name="company" value={selectedCompany} onChange={handleFilterChange}>
          {companies.map((company, index) => (
            <option key={index} value={company}>{company}</option>
          ))}
        </select>
        <br />
        <label>Category:</label>
        <select name="category" value={selectedCategory} onChange={handleFilterChange}>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
        <br />
        <label>Min Price:</label>
        <input type="number" name="minPrice" value={minPrice} onChange={handleFilterChange} />
        <br />
        <label>Max Price:</label>
        <input type="number" name="maxPrice" value={maxPrice} onChange={handleFilterChange} />
        <br />
        <label>Rating:</label>
        <input type="number" name="rating" value={rating} onChange={handleFilterChange} />
        <br />
        <label>Availability:</label>
        <select name="availability" value={availability} onChange={handleFilterChange}>
          <option value="">All</option>
          <option value="yes">In Stock</option>
          <option value="out-of-stock">Out of Stock</option>
        </select>
        <br />
        <button type="button" onClick={fetchProducts}>Filter</button>
      </form>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllProductsPage;