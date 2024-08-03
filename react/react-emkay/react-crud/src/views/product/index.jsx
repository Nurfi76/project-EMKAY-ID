// Import useState and useEffect
import { useState, useEffect } from 'react';

// Import API
import api from '../../api';

// Import Link
import { Link } from 'react-router-dom';

export default function ProductIndex() {

    // Define state
    const [products, setProducts] = useState([]);

    // Define method
    const fetchDataProducts = async () => {

        // Fetch data from API with Axios
        await api.get('/api/product')
            .then(response => {
                
                // Assign response data to state "products"
                setProducts(response.data.data.data);
            })
            .catch(error => {
                console.error("There was an error fetching the products!", error);
            });
        
    }

    // Run hook useEffect
    useEffect(() => {
        
        // Call method "fetchDataProducts"
        fetchDataProducts();

    }, []);

    // Method to delete product
    const deleteProduct = async (id) => {
        
        // Delete with API
        await api.delete(`/api/product/${id}`)
            .then(() => {
                
                // Call method "fetchDataProducts"
                fetchDataProducts();

            })
            .catch(error => {
                console.error("There was an error deleting the product!", error);
            });
    }

    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <div className="col-md-12">
                    <Link to="/product/create" className="btn btn-md btn-success rounded shadow border-0 mb-3">ADD NEW PRODUCT</Link>
                    <div className="card border-0 rounded shadow">
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead className="bg-dark text-white">
                                    <tr>
                                        <th scope="col">Product Name</th>
                                        <th scope="col">Category</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Discount</th>
                                        <th scope="col" style={{ 'width': '15%' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        products.length > 0
                                            ?   products.map((product, index) => (
                                                    <tr key={ index }>
                                                        <td>{ product.product_name }</td>
                                                        <td>{ product.category }</td>
                                                        <td>{ product.price }</td>
                                                        <td>{ product.discount }</td>
                                                        <td className="text-center">
                                                            <Link to={`/product/edit/${product.id}`} className="btn btn-sm btn-primary rounded-sm shadow border-0 me-2">EDIT</Link>
                                                            <button onClick={() => deleteProduct(product.id)} className="btn btn-sm btn-danger rounded-sm shadow border-0">DELETE</button>
                                                        </td>
                                                    </tr>
                                                ))

                                            :   <tr>
                                                    <td colSpan="5" className="text-center">
                                                        <div className="alert alert-danger mb-0">
                                                            Data Belum Tersedia!
                                                        </div>
                                                    </td>
                                                </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
