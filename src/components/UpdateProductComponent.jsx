import React, { Component } from 'react';
import { Link, useParams} from 'react-router-dom';
import ProductService from '../services/ProductService';
import { withRouter } from "../services/Navigate";

class UpdateProductComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.router.params.id,
            name: '',
            price: '',
            stock: ''
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changePriceHandler = this.changePriceHandler.bind(this);
        this.changeStockHandler = this.changeStockHandler.bind(this);
        this.updateProduct = this.updateProduct.bind(this);

    }
    componentDidMount() {
        ProductService.getProductById(this.state.id).then((res) => {
            let product = res.data;
            this.setState({
                name: product.name,
                price: product.price,
                stock: product.stock
            });
        });
    }

    isProductEmpty(product) {
        if (product.name == '' || product.price == '' || product.stock == '') {
            return true;
        }
        return false;
    }

    updateProduct = (e) => {
        e.preventDefault();
        let product = {
            name: this.state.name,
            price: this.state.price,
            stock: this.state.stock
        };
        console.log('product=> ' + JSON.stringify(product))
        
        if (!this.isProductEmpty(product)) {
            ProductService.updateProduct(product,this.state.id).then(res => {
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
                        <h3 className='text-center'>Update a product</h3>
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
                                <button type="button" className="btn btn-success" onClick={this.updateProduct} style={{ marginLeft: '10px' }}>Save</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(UpdateProductComponent);