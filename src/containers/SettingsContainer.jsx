import React, { Component } from 'react'
import axios from 'axios'
import SettingsForm from '../components/SettingsForm'
import { createBrowserHistory } from 'history'
import ROUTES from '../routes'

const history = createBrowserHistory();

class SettingsContainer extends Component {

    getAuthToken() {
        var config = {
            baseURL: ROUTES.API,
            headers: { 'Authorization': localStorage.getItem('token') }
        }
        return config;
    }

    handleSubmit = (params) => {
        var config = this.getAuthToken();

        axios.put(`/api/setup/${localStorage.getItem('id')}`, {
                password: params.password
            }, config)
            .then(response => {
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