import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import AdminNotesTable from './AdminNotesTable'

class ReportsTable extends Component {
    render() {
        let total = 0;
        let users_filter = this.props.users_filter;
        let projects_filter = this.props.projects_filter;
        let monthYear_filter = this.props.monthYear_filter;

        const tmp_arr = []
        const notes = this.props.notes;
        const users = this.props.users;
        const projects = this.props.projects;
        const categories = this.props.categories;

        // if filters values not null set their ids on their names
        if (users_filter !== "") {
            let user_filt = users.find(user => user.id === parseInt(users_filter))
            users_filter = user_filt.firstname + ' ' + user_filt.lastname;
        }
        if (projects_filter !== "") {
            let project_filt = projects.find(project => project.id === parseInt(projects_filter))
            projects_filter = project_filt.project;
        }

        const notes_by_date = notes.filter(note => note.date.includes(monthYear_filter))

        // change users, projects, categories ids in note on their names
        for (let i = 0; i < notes_by_date.length; i++) {
            let note = notes_by_date[i];
            let user = users.find(user => user.id === note.user_id ||
                user.firstname + ' ' + user.lastname === note.user_id)
            let project = projects.find(project => project.id === note.project_id ||
                project.project === note.project_id)
            let category = categories.find(category => category.id === note.category_id ||
                category.category === note.category_id)
            if (user && project && category) {
                note.user_id = user.firstname + ' ' + user.lastname;
                note.project_id = project.project;
                note.category_id = category.category;
                tmp_arr.push(note);
            }
        }

        // use filters for our notes
        let filtred_notes = [];
        for (let i = 0; i < tmp_arr.length; i++) {
            if (tmp_arr[i].user_id.indexOf(users_filter) > -1 &&
                tmp_arr[i].project_id.indexOf(projects_filter) > -1) {
                filtred_notes.push(tmp_arr[i]);
            }
        }

        // calculate total time
        for (let i = 0; i < filtred_notes.length; i++) {
            total += filtred_notes[i].hours;
        }

        return (
            <div>
                <div className="reportsTable">
                    <AdminNotesTable notes={filtred_notes}
                        projects={projects}
                        categories={categories}
                        deleteNote={this.props.deleteNote}
                        updateNote={this.props.updateNote} />
                </div>
                <Row>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                    <Col className="total"><h6 className="totalText">Total: {total.toFixed(1)}</h6></Col>
                    <Col></Col>
                </Row>
            </div >
        );
    }
}

export default ReportsTable