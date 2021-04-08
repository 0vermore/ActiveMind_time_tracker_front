import React, { Component } from 'react'
import axios from 'axios'
import SettingsForm from '../components/SettingsForm'
import { unauthenticated } from '../actions/actionCreators'
import { createBrowserHistory } from 'history'

const history = createBrowserHistory();

axios.defaults.baseURL = 'https://portal.milestep.io';
// axios.defaults.baseURL = 'http://localhost:4000';
// axios.defaults.baseURL = 'https://active-mind-api.herokuapp.com';
axios.defaults.timeout = 10000;
axios.defaults.headers = { 'Access-Control-Allow-Origin': '*' }

class SettingsContainer extends Component {

    getAuthToken() {
        var config = {
            // baseURL: 'https://active-mind-api.herokuapp.com',
            // baseURL: 'http://localhost:4000',
            baseURL: 'https://portal.milestep.io',
            headers: { 'Authorization': localStorage.getItem('token') }
        }
        return config;
    }

    handleSubmit = (params) => {
        var config = this.getAuthToken();

        console.log('Password data:')
        console.log({ password: params.password })
        axios.put(`/api/setup/${localStorage.getItem('id')}`, {
                password: params.password
            }, config)
            .then(response => {
                console.log("User password successfully updated!")
                console.log(response.data)
                history.push('/')
                history.go(0)
            })
            .catch(error => {
                console.log(error.message);
            })
    }

    render() {
        return (
            <SettingsForm handleSubmit={this.handleSubmit} />
        );
    }
}

export default SettingsContainer