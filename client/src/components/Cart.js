import React, { Component } from "react";
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import ProductInfo from "./ProductInfo";
import { PPButton } from "./PPButton";
import { removeFromCart, increaseQuantity, decreaseQuantity, setQuantity, clearCart, decreaseProductAtStore } from '../actions'

class Cart extends Component {
    constructor (props) {
        super(props);

        this.increaseProductQuantity = this.increaseProductQuantity.bind(this);
        this.decreaseProductQuantity = this.decreaseProductQuantity.bind(this);
        this.removeProductFromCart = this.removeProductFromCart.bind(this);
        this.setProductQuantity = this.setProductQuantity.bind(this);
        this.validateProductQuantity = this.validateProductQuantity.bind(this);
        this.emptyCartAfterPurchase = this.emptyCartAfterPurchase.bind(this);
    }

    render() {
        let sum = 0;
        let cart = this.props.cart.length ?
            (
                <div>
                    <Table>
                        <thead className="thead-light">
                            <tr>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>At store</th>
                            <th>Price</th>
                            <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.cart.map(item => {
                                sum += item.quantity * item.price;
                                return (
                                    <ProductInfo item={item} onClickIncrease={this.increaseProductQuantity} onClickDecrease={this.decreaseProductQuantity} onClickRemove={this.removeProductFromCart} onChange={this.setProductQuantity} onBlur={this.validateProductQuantity} key={item.id} /> 
                                )
                            })}
                        </tbody>
                    </Table>
                    <p>Total: {sum}</p>
                </div>
            ):
            (
                <p>Your cart is empty</p>
            )
        return (
            <div className="container">
                { cart }
                <PPButton cart={this.props.cart} total={sum} emptyCart={this.emptyCartAfterPurchase} />
            </div>
        )
    }

    increaseProductQuantity(item) {
        if (item.quantity < item.atStore){
            this.props.increaseQuantity(item.id)
        } else {
            
        }
        this.validateProductQuantity(item);
    }

    decreaseProductQuantity(item) {
        if (item.quantity > 1) {
            this.props.decreaseQuantity(item.id)
        } else {
            this.removeProductFromCart(item.id)
        }
        this.validateProductQuantity(item);
    }

    removeProductFromCart(id) {
        this.props.removeFromCart(id)
    }

    setProductQuantity(item, value) {
        this.props.setQuantity(item.id, value)
    }

    validateProductQuantity(item) {
        if (isNaN(item.quantity)){
            this.props.setQuantity(item.id, 1)
        } else if (item.quantity > item.atStore){
            this.props.setQuantity(item.id, item.atStore)
        } else if (item.quantity >= 1){
            this.props.setQuantity(item.id, item.quantity)
        } else {
            this.props.setQuantity(item.quantity, 1);
        }
    }

    emptyCartAfterPurchase() {
        this.props.cart.map(item => {
            this.props.decreaseProductAtStore(item.id, item.quantity)
        })

        this.props.clearCart();
    }
}

const mapStateToProps = (state)=>{
    return{
        cart: state.cartReducer.cart
    }
}

const mapDispatchToProps = {

        increaseQuantity,
        decreaseQuantity,
        setQuantity,
        removeFromCart,
        clearCart,
        decreaseProductAtStore
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)