import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import LoginForm from '../components/LoginForm'
import { unauthenticated } from '../actions/actionCreators'
import { createBrowserHistory } from 'history'

const history = createBrowserHistory();

//axios.defaults.baseURL = 'https://portal.milestep.io';
axios.defaults.baseURL = 'http://localhost:4000';
// axios.defaults.baseURL = 'https://active-mind-api.herokuapp.com';
axios.defaults.timeout = 10000;
axios.defaults.headers = { 'Access-Control-Allow-Origin': '*' }

class LoginContainer extends Component {

    handleSubmit = (params) => {
        let data = {
            email: params.email,
            password: params.password
        }
        console.log('Login data:')
        console.log({ data })
        axios.post('/api/signin', data)
            .then(response => {
                console.log(response.data)
                localStorage.setItem('is_admin', response.data.user.is_admin);
                console.log(response.data.token)
                console.log(response.data.user.is_admin)
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('id', response.data.user.id);
                localStorage.setItem('firstname', response.data.user.firstname);
                localStorage.setItem('lastname', response.data.user.lastname);
                history.push('/')
                history.go(0)
            })
            .catch(error => {
                console.log(error.message);
                this.props.dispatch(unauthenticated('Login failed'));
            })
    }

    render() {
        return (
            <LoginForm handleSubmit={this.handleSubmit} />
        );
    }
}

export default connect()(LoginContainer)