import React, { Component } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductService from '../services/ProductService';
import { withRouter } from "../services/Navigate";
import { Navigate } from 'react-router';

class CreateProductComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            price: '',
            stock: ''
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changePriceHandler = this.changePriceHandler.bind(this);
        this.changeStockHandler = this.changeStockHandler.bind(this);
        this.saveProduct = this.saveProduct.bind(this);

    }
    isProductEmpty(product) {
        if (product.name == '' || product.price == '' || product.stock == '') {
            return true;
        }
        return false;
    }
    saveProduct = (e) => {
        e.preventDefault();
        let product = {
            name: this.state.name,
            price: this.state.price,
            stock: this.state.stock
        };
        console.log('product=> ' + JSON.stringify(product))
        if (!this.isProductEmpty(product)){
            ProductService.createProduct(product).then(res => {
                this.props.router.navigate('/products');
            })
        }
    }

    changeNameHandler = (event) => {
        this.setState({ name: event.target.value });
    }
    changePriceHandler = (event) => {
        this.setState({ price: event.target.value });
    }
    changeStockHandler = (event) => {
        this.setState({ stock: event.target.value });
    }
    render() {
        return (
            <div>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='card col-md-6 offset-md-3 offset-md-3'></div>
                        <h3 className='text-center'>Add a product</h3>
                        <div className='card-body'>
                            <form>
                                <div className='form-group'>
                                    <label>Name</label>
                                    <input className="form-control" name="name" placeholder="Product"
                                        value={this.state.name} onChange={this.changeNameHandler} />
                                </div>
                                <div className='form-group'>
                                    <label>Price</label>
                                    <input className="form-control" name="price" placeholder="Price"
                                        value={this.state.price} onChange={this.changePriceHandler} />
                                </div>
                                <div className='form-group'>
                                    <label>Quantity</label>
                                    <input className="form-control" name="stock" placeholder="Stock"
                                        value={this.state.stock} onChange={this.changeStockHandler} />
                                </div>
                                <Link to='/products'>
                                    <button type="button" className="btn btn-danger" >Cancel</button>
                                </Link>
                                <button type="button" className="btn btn-success" onClick={this.saveProduct} style={{ marginLeft: '10px' }}>Save</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(CreateProductComponent)
