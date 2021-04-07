import React, { Component } from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'


class SiteNavbar extends Component {
    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                <Navbar.Brand><Link to="/">Active Mind</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        {this.props.auth.authenticated === false &&
                            <Navbar.Brand><Link to="/login">Login</Link></Navbar.Brand>
                        }
                        {this.props.auth.authenticated === true &&
                            <Navbar.Brand><Link to="/settings">Settings</Link></Navbar.Brand>
                        }
                        {this.props.auth.authenticated === true &&
                            <Navbar.Brand><Link to="/logout">Logout</Link></Navbar.Brand>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}
export default connect(mapStateToProps)(SiteNavbar)