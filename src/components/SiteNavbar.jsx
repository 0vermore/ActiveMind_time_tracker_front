import React, { Component } from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'


class SiteNavbar extends Component {
    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                <Navbar.Brand><Link to="/">MileStep Portal</Link></Navbar.Brand>
                {this.props.auth.authenticated &&
                    <Navbar.Brand>{localStorage.getItem('firstname') + ' ' + localStorage.getItem('lastname')}</Navbar.Brand>
                }
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        {!this.props.auth.authenticated &&
                            <Navbar.Brand><Link to="/login">Login</Link></Navbar.Brand>
                        }
                        {this.props.auth.authenticated && localStorage.getItem('is_admin') === 'true' &&
                            <>
                                <Navbar.Brand><Link to="/reports">Reports</Link></Navbar.Brand>
                                <Navbar.Brand><Link to="/manage">Manage</Link></Navbar.Brand>
                            </>
                        }
                        {this.props.auth.authenticated && localStorage.getItem('is_admin') === 'false' &&
                            <Navbar.Brand><Link to="/my-report">Report</Link></Navbar.Brand>
                        }
                        {this.props.auth.authenticated &&
                            <>
                                <Navbar.Brand><Link to="/settings">Settings</Link></Navbar.Brand>
                                <Navbar.Brand><Link to="/logout">Logout</Link></Navbar.Brand>
                            </>
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