import React, { Component } from "react";
import { authenticate } from '../actions/authActions'
import { connect } from 'react-redux';
import axios from 'axios';

class Admin extends Component {
    render() {
        return (
            null
        )
    }

    componentDidMount() {
        const token = this.props.auth.token;

        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }

        if(token) {
            config.headers['x-auth-token'] = token;
        }

        axios.get('http://localhost:5000/auth/user', config)
            .then(res => this.props.authenticate(res.data))
                .then(() => {
                    console.log(this.props.auth.isAuthenticated);
                    console.log((window.location.pathname === '/admin/login' || window.location.pathname === '/admin'))
                    if(this.props.auth.isAuthenticated && (window.location.pathname === '/admin/login' || window.location.pathname === '/admin')){
                        window.location.href = '/admin/list';
                    }
                })
            .catch(err => {
                console.log(err);
                if(window.location.pathname !== '/admin/login'){
                    window.location.href = '/admin/login';
                }
            });
    }
}

const mapStateToProps = (state)=>{
    return{
        auth: state.authReducer
    }
}

const mapDispatchToProps = {
    authenticate
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)