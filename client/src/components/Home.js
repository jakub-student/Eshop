import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Button from 'react-bootstrap/Button'
import CardGroup from 'react-bootstrap/CardGroup'
import ProductCard from './ProductCard';
import { loadProducts } from '../actions'
import '../css/home.css'

class Home extends Component {
    render() {
        let products = this.props.products.length ?
            (
                <CardGroup>
                    {this.props.products.map(product => {
                        return (
                        <ProductCard product={product} key={product._id} />
                        )
                    })}
                </CardGroup>
            ):
            (
                <p>No products</p>
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
}

const mapStateToProps = (state)=>{
    return{
        products: state.productReducer.products
    }
}

const mapDispatchToProps = dispatch => ({
    loadProducts: products => dispatch(loadProducts(products))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)