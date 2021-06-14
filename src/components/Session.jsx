import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { loadUser } from '../actions/actionCreators'

class Session extends Component {
    componentDidMount() {
      this.getCurrentUser()
    }

    getCurrentUser() {
      var config = this.getAuthToken()
      axios.post('/api/signin', config)
        .then(response => {
          this.props.dispatch(loadUser(response.data))
        })
        .catch(error => {
          console.log(error);
        })
    }

    getAuthToken() {
      var config = {
        baseURL: `${process.env.REACT_APP_BASE_URL}`,
        headers: { 'Authorization': localStorage.getItem('token') }
      }
      return config;
    }
    render() {
      return (<div></div>)}
  }

  const mapStateToProps = (state) => {
    return {
        user: state.user.user,
        users: state.users,
        projects: state.projects,
        categories: state.categories
    }
}

export default connect(mapStateToProps)(Session)
