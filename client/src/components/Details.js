import React, { Component } from "react";
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import { connect } from 'react-redux';
import { addToCart } from '../actions'

class Details extends Component {
    render() {
        const id = this.props.match.params.id
        const product = this.props.products.find(product => product._id == id);

        return (
            <div className="container">
                <Row>
                    <Col md={6}>
                        <Image style={{width:'100%', height: '100%'}} src={product.imgPath} />
                    </Col>
                    <Col md={6}>
                        <h1> {product.name} </h1>
                        <p>Price: {product.price}</p>
                        <p>At stock: {product.atStore}</p>
                        <Link to="/cart" classname="unstyled" >
                            <Button variant="dark" size="lg" onClick={() => this.addProductToCart(product)} >Add to cart</Button>
                        </Link>
                    </Col>
                </Row>
                <h3>Description</h3>
                <p style={{'whiteSpace': 'pre-wrap'}}>{product.description}</p>
            </div>
        );
    }

    addProductToCart(product) {
        const item = {
            id: product._id,
            name: product.name,
            price: product.price,
            quantity: 1,
            atStore: product.atStore
        }

        this.props.addToCart(item)
    }
}

const mapStateToProps = (state)=>{
    return{
        products: state.productReducer.products
    }
}

const mapDispatchToProps = dispatch => ({
    addToCart: item => dispatch(addToCart(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(Details)