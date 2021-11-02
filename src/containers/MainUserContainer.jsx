import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { loadNotes, addNote, updateNote, deleteNote, loadProjects, loadCategories } from '../actions/actionCreators'
import Loader from '../components/Loader'
import CreateNote from '../components/CreateNote'
import DatePicker from '../components/DatePicker'
import { createBrowserHistory } from 'history'
import { DateTime as DT } from 'luxon'
import ROUTES from '../routes'

const history = createBrowserHistory();

class MainUserContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			date: DT.now().toISODate()
		};
		this.updateDate = this.updateDate.bind(this);
	}

	getAuthToken() {
		var config = {
			baseURL: ROUTES.API,
			headers: { 'Authorization': localStorage.getItem('token') }
		}
		return config;
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

	createNote = ({ user_id, project_id, category_id, description, hours, date }) => {

		var config = this.getAuthToken();
		axios.post(ROUTES.NOTES, {
			user_id: user_id,
			project_id: project_id, category_id: category_id,
			description: description, hours: hours, date: date
		}, config)
			.then(response => {
				this.props.dispatch(addNote(response.data.id))
				history.go(0)
			})
			.catch(error => console.log(error))

	}

	updateDate = (value) => {
		this.setState({ date: value})
	}

	updateNote = (params) => {
		var config = this.getAuthToken();

		axios.put(ROUTES.NOTES + `/${params.id}`, {
			project_id: params.project_id,
			category_id: params.category_id, description: params.description,
			hours: params.hours, date: params.date
		}, config)
			.then(response => {
				this.props.dispatch(updateNote(params.id))
			})
			.catch(error => console.log(error))
		history.go(0)
	}

	deleteNote = (id) => {
		var config = this.getAuthToken();

		axios.delete(ROUTES.NOTES + `/${id}`, config)
			.then(response => {
				this.props.dispatch(deleteNote(id))
			})
			.catch(error => console.log(error))
	}

	getProjects() {
		var config = this.getAuthToken();

		axios.get(ROUTES.PROJECTS, config)
			.then(response => {
				this.props.dispatch(loadProjects(response.data));
			})
			.catch(error => console.log(error.message))
	}

	getCategories() {
		var config = this.getAuthToken();

		axios.get(ROUTES.CATEGORIES, config)
			.then(response => {
				this.props.dispatch(loadCategories(response.data));
			})
			.catch(error => console.log(error.message))
	}

	componentDidMount() {
		this.getNotes();
		this.getProjects();
		this.getCategories();
	}

	render() {
		
		return (
			<div>
				<div className="container">
					{this.state.loading ? <Loader /> : (
						<CreateNote projects={this.props.projects}
							categories={this.props.categories}
							handleSubmit={this.createNote} 
							date={this.state.date} />
					)
					}
					<div className="datePicker">
						<DatePicker notes={this.props.notes}
							projects={this.props.projects}
							categories={this.props.categories}
							updateNote={this.updateNote}
							deleteNote={this.deleteNote} 
							updateDate={this.updateDate} />
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		notes: state.notes,
		projects: state.projects,
		categories: state.categories
	}
}

export default connect(mapStateToProps)(MainUserContainer)