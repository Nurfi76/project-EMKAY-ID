// Import useState, useEffect, useNavigate, and useParams
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Import API
import api from '../../api';

export default function ProductEdit() {

    // Define state
    const [productName, setProductName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [discount, setDiscount] = useState('');

    // State validation
    const [errors, setErrors] = useState([]);

    // useNavigate
    const navigate = useNavigate();

    // Destruct ID from URL parameters
    const { id } = useParams();

    // Method to fetch product details
    const fetchDetailProduct = async () => {
        
        // Fetch data
        await api.get(`/api/product/${id}`)
            .then(response => {
                
                // Assign to state
                const { product_name, category, price, discount } = response.data.data;
                setProductName(product_name);
                setCategory(category);
                setPrice(price);
                setDiscount(discount);
            })
            .catch(error => {
                console.error("There was an error fetching the product details!", error);
            });
    }

    // useEffect hook
    useEffect(() => {
        
        // Call method "fetchDetailProduct"
        fetchDetailProduct();

    }, [id]);

    // Method to handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'productName':
                setProductName(value);
                break;
            case 'category':
                setCategory(value);
                break;
            case 'price':
                setPrice(value);
                break;
            case 'discount':
                setDiscount(value);
                break;
            default:
                break;
        }
    }

    // Method to update product
    const updateProduct = async (e) => {
        e.preventDefault();
        
        // Init FormData
        const formData = new FormData();

        // Append data
        formData.append('product_name', productName);
        formData.append('category', category);
        formData.append('price', price);
        formData.append('discount', discount);
        formData.append('_method', 'PUT');

        // Send data with API
        await api.post(`/api/product/${id}`, formData)
            .then(() => {
                
                // Redirect to products index
                navigate('/product');

            })
            .catch(error => {
                
                // Set errors response to state "errors"
                setErrors(error.response.data);
            })
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card border-0 rounded shadow">
                        <div className="card-body">
                            <form onSubmit={updateProduct}>
                            
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Product Name</label>
                                    <input type="text" name="productName" className="form-control" value={productName} onChange={handleChange} placeholder="Product Name"/>
                                    {
                                        errors.product_name && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.product_name[0]}
                                            </div>
                                        )
                                    }
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Category</label>
                                    <input type="text" name="category" className="form-control" value={category} onChange={handleChange} placeholder="Category"/>
                                    {
                                        errors.category && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.category[0]}
                                            </div>
                                        )
                                    }
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Price</label>
                                    <input type="number" name="price" className="form-control" value={price} onChange={handleChange} placeholder="Price"/>
                                    {
                                        errors.price && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.price[0]}
                                            </div>
                                        )
                                    }
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Discount</label>
                                    <input type="number" name="discount" className="form-control" value={discount} onChange={handleChange} placeholder="Discount"/>
                                    {
                                        errors.discount && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.discount[0]}
                                            </div>
                                        )
                                    }
                                </div>

                                <button type="submit" className="btn btn-md btn-primary rounded-sm shadow border-0">Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
