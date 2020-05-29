import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { editProduct } from '../actions'
import { Redirect } from 'react-router-dom'

class AdminEdit extends Component {
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeAtStore = this.onChangeAtStore.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.getConfig = this.getConfig.bind(this);

        const id = this.props.match.params.id
        const product = this.props.products.find(product => product._id == id);

        this.state = {
            name: product.name,
            price: product.price,
            atStore: product.atStore,
            description: product.description,
        }
    }

    render() {
        if(this.state.redirect === true){
            return <Redirect to="/admin/list" />
        }
        return (
            <div>
                <h3>Edit Product</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Name </label>
                        <input  type="text"
                            required
                            className="form-control"
                            value={this.state.name}
                            onChange={this.onChangeName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Price </label>
                        <input 
                            type="number" 
                            className="form-control"
                            value={this.state.price}
                            onChange={this.onChangePrice}
                        />
                    </div>
                    <div className="form-group">
                        <label>At Store </label>
                        <input 
                            type="number" 
                            className="form-control"
                            value={this.state.atStore}
                            onChange={this.onChangeAtStore}
                        />
                    </div>
                    <div className="form-group"> 
                        <label>Description </label>
                        <input  type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Edit Product" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }

    onChangeName(e){
        this.setState({
            name: e.target.value
        });
    }

    onChangePrice(e){
        this.setState({
            price: e.target.value
        });
    }

    onChangeAtStore(e){
        this.setState({
            atStore: e.target.value
        });
    }

    onChangeDescription(e){
        this.setState({
            description: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const product = {
            name: this.state.name,
            price: this.state.price,
            atStore: this.state.atStore,
            description: this.state.description
        }

        axios.post('http://localhost:5000/products/update/'+this.props.match.params.id, product, this.getConfig())
            .then(res => {
                this.props.editProduct(res.data);
                window.location.href = '/admin/list';
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

    editProduct
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminEdit)