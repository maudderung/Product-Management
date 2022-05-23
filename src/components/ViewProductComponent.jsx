import React, { Component } from 'react';
import { withRouter } from '../services/Navigate'
import ProductService from '../services/ProductService';

class ViewProductComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.router.params.id,
            product: {}
        }

    }

    componentDidMount() {
        ProductService.getProductById(this.state.id).then(res => {
                this.setState({ product: res.data });
        })
    }


    render() {
        return (
            <div>
                <div className='card col-md-6 offset-md-3' style={{marginTop: '20px'}}>
                    <h2>View Product</h2>
                    <div className="card-body">
                    <div className='row'style={{ marginBottom: '10px' }}>
                            <label className='font-italic'>ID: {this.state.id}</label>
                        </div>
                        <div className='row' style={{ marginBottom: '20px' }}>
                            <label className='font-italic'>Product name:</label>
                            <div className='font-weight-bold'>{this.state.product.name}</div>
                        </div>
                        <div className='row' style={{ marginBottom: '20px' }}>
                            <label className='font-italic'>Product price:</label>
                            <div className='font-weight-bold'>{this.state.product.price}</div>
                        </div>
                        <div className='row ' >
                            <label className='font-italic'>Quantity in stock:</label>
                            <div className='font-weight-bold'>{this.state.product.stock}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ViewProductComponent);