import React, { Component } from 'react'
import './App.css'
import LoginContainer from './containers/LoginContainer'
import MainUserContainer from './containers/MainUserContainer'
import MainAdminContainer from './containers/MainAdminContainer'
import { connect } from 'react-redux'
import '../node_modules/bootstrap/dist/css/bootstrap.css'

class App extends Component {

  render() {
    if (this.props.auth.authenticated === false) {
      return <LoginContainer />
    }

    if (localStorage.getItem('is_admin') === "true") {
      return <MainAdminContainer />
    }
    else {
      return <MainUserContainer />
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    auth: state.auth
  }
}

export default connect(mapStateToProps)(App)
