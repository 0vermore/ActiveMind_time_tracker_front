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
import { loadUsers, loadProjects, loadCategories, loadUser, loadNotes} from '../actions/actionCreators'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ROUTES from '../routes'

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
    getAuthToken() {
        var config = {
            baseURL: ROUTES.API,
            headers: { 'Authorization': localStorage.getItem('token') }
        }
        return config;
    }

    getCurrentUser() {
        var config = this.getAuthToken()
        axios.post(ROUTES.SIGN_IN, config)
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

    getUsers() {
        var config = this.getAuthToken();
        axios.get(ROUTES.USERS, config)
            .then(response => {
                this.props.dispatch(loadUsers(response.data))
            })
            .catch(error => console.log(error.message))
    }

    getNotes() {
		var config = this.getAuthToken();

		axios.get(ROUTES.NOTES, config)
			.then(response => {
				this.props.dispatch(loadNotes(response.data));
				this.setState({ loading: false });
			})
			.catch(error => console.log(error.message))
	}

    getProjects() {
        var config = this.getAuthToken();
        axios.get(ROUTES.PROJECTS, config)
            .then(response => {
                this.props.dispatch(loadProjects(response.data))
            })
            .catch(error => console.log(error.message))
    }

    getCategories() {
        var config = this.getAuthToken();
        axios.get(ROUTES.CATEGORIES, config)
            .then(response => {
                this.props.dispatch(loadCategories(response.data))
            })
            .catch(error => console.log(error.message))
    }

    createUser = ({ firstname, lastname, email, password }) => {
        var config = this.getAuthToken();
        axios.post(ROUTES.USERS, {
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
        axios.post(ROUTES.CATEGORIES, {
            category: category,
        }, config)
            .then(response => {
                history.go(0)
            })
            .catch(error => danger_notify(error.response.data.error))
    }

    createProject = ({ project }) => {
        var config = this.getAuthToken();
        axios.post(ROUTES.PROJECTS, {
            project: project,
        }, config)
            .then(response => {
                history.go(0)
            })
            .catch(error => danger_notify(error.response.data.error))
    }

    deleteUser = (id) => {
        const conf = window.confirm('Are you sure you want to delete?')
        var config = this.getAuthToken();
        if (conf) {
            axios.delete(ROUTES.USERS + `/${id}`, config)
            .then(response => {
                history.go(0)
            })
            .catch(error => console.log(error))
        } else {
            alert('ok')
        }
       
    }

    deleteCategory = (id) => {
        const conf = window.confirm('Are you sure you want to delete?')
        var config = this.getAuthToken();
        if (conf) {
            axios.delete(ROUTES.CATEGORIES + `/${id}`, config)
            .then(response => {
                history.go(0)
            })
            .catch(error => console.log(error))
        }
    }

    deleteProject = (id) => {
        const conf = window.confirm('Are you sure you want to delete?')
        var config = this.getAuthToken();
        if (conf) {
            axios.delete(ROUTES.PROJECTS + `/${id}`, config)
            .then(response => {
                history.go(0)
            })
            .catch(error => console.log(error))
        } else {
            alert('ok')
        }
     
    }

    componentDidMount() {
        this.getCurrentUser()
        this.getNotes()
    }

    render() {
        return (
            <div className="p-3">
                <Row>
                    <Col className="shadow p-4 m-3 bg-white rounded">
                        <h3>Create User</h3>
                        <CreateUser handleSubmit={this.createUser} />
                    </Col>
                    <Col className="shadow p-4 m-3 bg-white rounded">
                        <h3>Create Category</h3>
                        <CreateCategory handleSubmit={this.createCategory} />
                    </Col>
                    <Col className="shadow p-4 m-3 bg-white rounded">
                        <h3>Create Project</h3>
                        <CreateProject handleSubmit={this.createProject} />
                    </Col>
                </Row>
                <Row>
                    <Col className="shadow p-4 m-3 bg-white rounded">
                        <h3>Users List</h3>
                        <UsersList users={this.props.users} deleteUser={this.deleteUser} />
                    </Col>
                    <Col className="shadow p-4 m-3 bg-white rounded">
                        <h3>Categories List</h3>
                        <CategoriesList categories={this.props.categories} deleteCategory={this.deleteCategory} />
                    </Col>
                    <Col className="shadow p-4 m-3 bg-white rounded">
                        <h3>Projects List</h3>
                        <ProjectsList projects={this.props.projects} deleteProject={this.deleteProject} />
                    </Col>
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
