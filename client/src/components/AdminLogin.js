import React, { Component } from "react";
import { login, attemptFailed } from '../actions/authActions'
import { connect } from 'react-redux';
import axios from 'axios';

class AdminLogin extends Component {
    constructor(props){
        super(props)

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            password: '',
        }
    }

    render() {
        return (
            <div>
                <h3>Welcome</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Username </label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password </label>
                        <input
                            required 
                            type="password" 
                            className="form-control"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Login" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }

    onChangeUsername(e){
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword(e){
        this.setState({
            password: e.target.value
        });
    }

    async onSubmit(e) {
        e.preventDefault();

        const newUser = {
            username: this.state.username,
            password: this.state.password,
        }

        await axios.post('http://localhost:5000/auth/', newUser)
            .then(res => {
                console.log(res)
                this.props.login(res.data);
                window.location.href = '/admin/list';
            })
            .catch(err => {
                console.log(err);
                this.props.attemptFailed();
            });
    }
}

const mapStateToProps = (state)=>{
    return{
        auth: state.authReducer
    }
}

const mapDispatchToProps = {
    login,
    attemptFailed
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminLogin)