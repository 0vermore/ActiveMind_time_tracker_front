import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { loadNotes, updateNote, deleteNote, loadProjects, loadCategories, loadUsers } from '../actions/actionCreators'
import Loader from '../components/Loader'
import AdminFilters from '../components/AdminFilters'
import { createBrowserHistory } from 'history'

const history = createBrowserHistory();

class MainAdminContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true
		};
	}

	getAuthToken() {
		var config = {
			baseURL: 'https://portal.milestep.io',
			// baseURL: 'http://localhost:4000',
			// baseURL: 'https://active-mind-api.herokuapp.com',
			headers: { 'Authorization': localStorage.getItem('token') }
		}
		return config;
	}

	getNotes() {
		var config = this.getAuthToken();

		axios.get('/api/notes', config)
			.then(response => {
				this.props.dispatch(loadNotes(response.data));
				this.setState({ loading: false });
			})
			.catch(error => console.log(error.message))
	}

	updateNote = (params) => {
		var config = this.getAuthToken();

		axios.put(`/api/notes/${params.id}`, {
			project_id: params.project_id,
			category_id: params.category_id, hours: params.hours, date: params.date
		}, config)
			.then(response => {
				this.props.dispatch(updateNote(params.id))
			})
			.catch(error => console.log(error))
		history.go(0)
	}

	deleteNote = (id) => {
		var config = this.getAuthToken();

		axios.delete(`/api/notes/${id}`, config)
			.then(response => {
				this.props.dispatch(deleteNote(id))
			})
			.catch(error => console.log(error))
	}

	getProjects() {
		var config = this.getAuthToken();

		axios.get('/api/projects', config)
			.then(response => {
				console.log("Projects:")
				console.log(response.data)
				this.props.dispatch(loadProjects(response.data));
			})
			.catch(error => console.log(error.message))
	}

	getCategories() {
		var config = this.getAuthToken();

		axios.get('/api/categories', config)
			.then(response => {
				console.log("Categories")
				console.log(response.data)
				this.props.dispatch(loadCategories(response.data));
			})
			.catch(error => console.log(error.message))
	}

	getUsers() {
		var config = this.getAuthToken();

		axios.get('/api/users', config)
			.then(response => {
				console.log("Users")
				console.log(response.data)
				this.props.dispatch(loadUsers(response.data));
			})
			.catch(error => console.log(error.message))
	}

	componentDidMount() {
		this.getNotes();
		this.getProjects();
		this.getCategories();
		this.getUsers();
	}

	render() {
		return (
			<div>
				<div className="header">
					<h2>{localStorage.getItem('firstname') + ' ' + localStorage.getItem('lastname')}</h2>
				</div>
				<div className="container">
					{this.state.loading ? <Loader /> : (
						<AdminFilters
							notes={this.props.notes}
							users={this.props.users}
							projects={this.props.projects}
							categories={this.props.categories}
							updateNote={this.updateNote}
							deleteNote={this.deleteNote} />
					)
					}
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		notes: state.notes,
		projects: state.projects,
		categories: state.categories,
		users: state.users
	}
}

export default connect(mapStateToProps)(MainAdminContainer)