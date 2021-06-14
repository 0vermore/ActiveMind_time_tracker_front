import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import { createBrowserHistory } from 'history'
import CreateUser from '../components/CreateUser'
import CreateProject from '../components/CreateProject'
import CreateCategory from '../components/CreateCategory'
import UsersList from '../components/UsersList'
import ProjectsList from '../components/ProjectsList'
import CategoriesList from '../components/CategoriesList'
import { loadUsers, loadProjects, loadCategories, loadUser } from '../actions/actionCreators'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const history = createBrowserHistory();
const danger_notify = (error) => toast.error(error, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
})

class ManageContainer extends Component {
    getCurrentUser() {
        var config = this.getAuthToken()
        axios.post('/api/signin', config)
          .then(response => {
            this.props.dispatch(loadUser(response.data))
            this.getUser()
          })
          .catch(error => {
            console.log(error);
          })
      }

    getUser() {
        if (this.props.user && this.props.user.is_admin === true) {
            this.getUsers()
            this.getProjects()
            this.getCategories()
        } else {
            danger_notify('🚨You are not admin!🚨')
            history.push('/')
            history.go(0)
        }
    }

    getAuthToken() {
        var config = {
            baseURL: `${process.env.REACT_APP_BASE_URL}`,
            headers: { 'Authorization': localStorage.getItem('token') }
        }
        return config;
    }

    getUsers() {
        var config = this.getAuthToken();
        axios.get('/api/users', config)
            .then(response => {
                this.props.dispatch(loadUsers(response.data))
            })
            .catch(error => console.log(error.message))
    }

    getProjects() {
        var config = this.getAuthToken();
        axios.get('/api/projects', config)
            .then(response => {
                this.props.dispatch(loadProjects(response.data))
            })
            .catch(error => console.log(error.message))
    }

    getCategories() {
        var config = this.getAuthToken();
        axios.get('/api/categories', config)
            .then(response => {
                this.props.dispatch(loadCategories(response.data))
            })
            .catch(error => console.log(error.message))
    }

    createUser = ({ firstname, lastname, email, password }) => {
        var config = this.getAuthToken();
        axios.post('/api/users', {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password
        }, config)
            .then(response => {
                history.go(0)
            })
            .catch(error => danger_notify(error.response.data.error))

    }

    createCategory = ({ category }) => {
        var config = this.getAuthToken();
        axios.post('/api/categories', {
            category: category,
        }, config)
            .then(response => {
                history.go(0)
            })
            .catch(error => danger_notify(error.response.data.error))
    }

    createProject = ({ project }) => {
        var config = this.getAuthToken();
        axios.post('/api/projects', {
            project: project,
        }, config)
            .then(response => {
                history.go(0)
            })
            .catch(error => danger_notify(error.response.data.error))
    }

    deleteUser = (id) => {
        var config = this.getAuthToken();
        axios.delete(`/api/users/${id}`, config)
            .then(response => {
                history.go(0)
            })
            .catch(error => console.log(error))
    }

    deleteCategory = (id) => {
        var config = this.getAuthToken();
        axios.delete(`/api/categories/${id}`, config)
            .then(response => {
                history.go(0)
            })
            .catch(error => console.log(error))
    }

    deleteProject = (id) => {
        var config = this.getAuthToken();
        axios.delete(`/api/projects/${id}`, config)
            .then(response => {
                history.go(0)
            })
            .catch(error => console.log(error))
    }

    componentDidMount() {
        this.getCurrentUser()
    }

    render() {
        return (
            <div className="p-4">
                <Row>
                    <Col className="text-center"><h2>Create User</h2></Col>
                    <Col className="text-center"><h2>Create Category</h2></Col>
                    <Col className="text-center"><h2>Create Project</h2></Col>
                </Row>
                <Row>
                    <Col className="shadow p-5 mb-5 bg-white rounded">
                        <CreateUser handleSubmit={this.createUser} />
                    </Col>
                    <Col className="shadow mb-5 ml-3 mr-3 bg-white rounded p-5">
                        <CreateCategory handleSubmit={this.createCategory} />
                    </Col>
                    <Col className="shadow p-5 mb-5 bg-white rounded">
                        <CreateProject handleSubmit={this.createProject} />
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center"><h2>Users List</h2></Col>
                    <Col className="text-center"><h2>Categories List</h2></Col>
                    <Col className="text-center"><h2>Projects List</h2></Col>
                </Row>
                <Row>
                    <Col className="shadow p-5 mb-5 bg-white rounded"><UsersList users={this.props.users} deleteUser={this.deleteUser} /></Col>
                    <Col className="shadow p-5 mb-5 ml-3 mr-3 bg-white rounded"><CategoriesList categories={this.props.categories} deleteCategory={this.deleteCategory} /></Col>
                    <Col className="shadow p-5 mb-5 bg-white rounded"><ProjectsList projects={this.props.projects} deleteProject={this.deleteProject} /></Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user.user,
        users: state.users,
        projects: state.projects,
        categories: state.categories
    }
}

export default connect(mapStateToProps)(ManageContainer)
