import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { loadNotes, updateNote, deleteNote, loadProjects, loadCategories} from '../actions/actionCreators'
import Loader from '../components/Loader'
import UserReportFilters from '../components/UserReportFilters'
import { createBrowserHistory } from 'history'
import ROUTES from '../routes'

const history = createBrowserHistory();

class UserReportContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
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
        console.log(this.props.notes, 'notes')
        return (
            <div>
                <div className="container">
                    {this.state.loading ? <Loader /> : (
                        <UserReportFilters
                            notes={this.props.notes}
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
    }
}

export default connect(mapStateToProps)(UserReportContainer)