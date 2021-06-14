import React, { Component } from 'react'
import axios from 'axios'
import SettingsForm from '../components/SettingsForm'
import { createBrowserHistory } from 'history'

const history = createBrowserHistory();

class SettingsContainer extends Component {

    getAuthToken() {
        var config = {
            baseURL: 'https://portal.milestep.io',
			// baseURL: 'http://localhost:4000',
			// baseURL: 'https://active-mind-api.herokuapp.com',
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