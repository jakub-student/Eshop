import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { createProduct } from '../actions'
import { Redirect } from 'react-router-dom'

class AdminAdd extends Component {
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeAtStore = this.onChangeAtStore.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.getConfig = this.getConfig.bind(this);

        this.state = {
            name: '',
            price: 0,
            atStore: 1,
            description: '',
            img: undefined,
            imgPath: '',
        }
    }

    render() {
        if(this.state.redirect === true){
            return <Redirect to="/admin/list" />
        }
        const id = this.props.match.params._id
        const product = this.props.products.find(product => product._id == id);
        return (
            <div>
                <h3>Create New Product</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Name: </label>
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
                            value={this.state.description}
                            className="form-control"
                            onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group"> 
                        <label>Image </label>
                        <input  type="file"
                            required
                            single="true"
                            className="form-control"
                            onChange={this.onChangeImage}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create New Product" className="btn btn-primary" />
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

    onChangeImage(e){
        this.setState({
            img: e.target.files[0]
        });
    }

    async onSubmit(e) {
        e.preventDefault();
        const data = new FormData();
        data.append('file', this.state.img);
        
        const token = this.props.token; 

        const configFD = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        if(token) {
            configFD.headers['x-auth-token'] = token;
        }

        await axios.post('http://localhost:5000/products/upload', data, configFD)
            .then(res => {
                this.setState({
                    imgPath: res.data.filePath
                });
            })
            .catch(err => console.log(err));

        const newProduct = {
            name: this.state.name,
            price: this.state.price,
            atStore: this.state.atStore,
            description: this.state.description,
            imgPath: this.state.imgPath,
        }

        await axios.post('http://localhost:5000/products/add', newProduct, this.getConfig())
            .then(res => {
                this.props.createProduct(res.data);
                window.location.href = '/admin/list';
            })
            .catch(err => console.log(err));
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

    createProduct
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminAdd)