import { toHaveAccessibleDescription } from '@testing-library/jest-dom/dist/matchers';
import React, { Component } from 'react';
import ProductService from '../services/ProductService';
import { Link } from "react-router-dom"
import { withRouter } from "../services/Navigate";


class ListProductComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product: []
        }
        this.editProduct = this.editProduct.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.viewProduct= this.viewProduct.bind(this);
    }

    componentDidMount() {
        ProductService.getProducts().then((res) => {
            this.setState({
                product: res.data
            });
        });
    }

    editProduct(id) {
        this.props.router.navigate(`/update-products/${id}`)
    }

    viewProduct(id){
        this.props.router.navigate(`/view-products/${id}`)
    }

    deleteProduct(id) {
        ProductService.deleteProduct(id).then(res=>{
            this.setState({product: this.state.product.filter(
                product=>product.id!==id
            )})
        });
        
    }
    render() {
        return (
            <div>
                <h2 className="text-center">Products List</h2>
                <div className="row">
                    <Link to='/add-products'>
                        <button className="btn btn-dark"  style={{ marginBottom: '10px' }}>Add Product</button>
                    </Link>
                </div>
                <div className="row">
                    <table className="table table-striped table-bordered">

                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Product Price</th>
                                <th>Product Quantity</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.product.map(
                                    product =>
                                        <tr key={product.id}>
                                            <td>{product.name}</td>
                                            <td>{product.price}</td>
                                            <td>{product.stock}</td>
                                            <td>
                                                <button type="button" className="btn btn-success"
                                                 onClick={() => this.editProduct(product.id)}>Update</button>
                                                <button type="button" className="btn btn-danger"
                                                    style={{ marginLeft: '10px'}} 
                                                    onClick={() => this.deleteProduct(product.id)} >Delete</button>
                                                <button type="button" className="btn btn-primary"
                                                    style={{ marginLeft: '10px' }}
                                                    onClick={() => this.viewProduct(product.id)} >View</button>

                                            </td>
                                        </tr>
                                )
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default withRouter(ListProductComponent);
