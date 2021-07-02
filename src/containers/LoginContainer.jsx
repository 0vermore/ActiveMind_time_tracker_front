import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import LoginForm from '../components/LoginForm'
import { unauthenticated } from '../actions/actionCreators'
import { createBrowserHistory } from 'history'
import { loadUser } from '../actions/actionCreators'
import { toast } from 'react-toastify'

const history = createBrowserHistory();
axios.defaults.baseURL = 'https://portal.milestep.io';
// axios.defaults.baseURL = 'http://localhost:4000';
// axios.defaults.baseURL = 'https://active-mind-api.herokuapp.com';
axios.defaults.timeout = 10000;
axios.defaults.headers = { 'Access-Control-Allow-Origin': '*' }

class LoginContainer extends Component {

    handleSubmit = (params) => {
        let data = {
            email: params.email,
            password: params.password
        }
        axios.post('/api/signin', data)
            .then(response => {
                this.props.dispatch(loadUser(response.data))
                localStorage.setItem('is_admin', response.data.user.is_admin);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('id', response.data.user.id);
                localStorage.setItem('firstname', response.data.user.firstname);
                localStorage.setItem('lastname', response.data.user.lastname);
                history.push('/')
                history.go(0)
            })
            .catch(error => {
                this.props.dispatch(unauthenticated('Login failed'));
                toast.error('Wrong email or password!', {
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                    })
            })
    }

    render() {
        return (
            <LoginForm handleSubmit={this.handleSubmit} />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(LoginContainer)