import React, { Component } from "react";
import { connect } from 'react-redux';
import axios from 'axios';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import AdminProductInfo from "./AdminProductInfo";
import { deleteProduct, loadProducts } from '../actions'

class AdminList extends Component {
    constructor (props) {
        super(props);

        this.removeProductFromStore = this.removeProductFromStore.bind(this);
        this.getConfig = this.getConfig.bind(this);
    }

    render() {
        let products = this.props.products.length ?
            (
                <div>
                    <Table>
                        <thead className="thead-light">
                            <tr>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th></th>
                                <th>
                                    <Link to="/admin/add" classname="unstyled" >
                                        <Button>Create New Product</Button>
                                    </Link>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.products.map(product => {
                                return (
                                    <AdminProductInfo product={product} onClickRemove={this.removeProductFromStore} key={product._id}/> 
                                )
                            })}
                        </tbody>
                    </Table>
                </div>
            ):
            (
                <div>
                    <Table>
                        <thead className="thead-light">
                            <tr>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th></th>
                                <th>
                                    <Link to="/admin/add" classname="unstyled" >
                                        <Button>Create New Product</Button>
                                    </Link>
                                </th>
                            </tr>
                        </thead>
                    </Table>
                    <p>You have no products to sell</p>
                </div>
            )

        return (
            <div className="container">
                { products }
            </div>
        )
    }

    componentDidMount() {
        if(this.props.products.length < 1){
            axios.get('http://localhost:5000/products/')
                .then(response => {
                    this.props.loadProducts(response.data)
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    removeProductFromStore(id) {
        axios.delete('http://localhost:5000/products/' + id, this.getConfig())
                .then(response => {
                    this.props.deleteProduct(id)
                })
                .catch(err => {
                    console.log(err);
                });
    }

    getConfig(){
        const token = this.props.token;

        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }

        if(token) {
            config.headers['x-auth-token'] = token;
        }

        return config;
    }
}

const mapStateToProps = (state)=>{
    return{
        products: state.productReducer.products,
        token: state.authReducer.token
    }
}

const mapDispatchToProps = {

    deleteProduct,
    loadProducts
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminList)