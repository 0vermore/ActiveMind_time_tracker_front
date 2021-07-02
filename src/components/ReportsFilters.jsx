import React, { Component } from 'react'
import { Row, Col, FormControl } from 'react-bootstrap'
import * as moment from 'moment'
import ReportsTable from './ReportsTable';


class ReportsFilters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            project: "",
            monthYear: moment(new Date()).format('YYYY-MM')
        };
        this.onChangeUser = this.onChangeUser.bind(this);
        this.onChangeProject = this.onChangeProject.bind(this);
        this.onChangeMonthYear = this.onChangeMonthYear.bind(this);
    }

    onChangeUser(event) {
        this.setState({ user: event.target.value });
    }

    onChangeProject(event) {
        this.setState({ project: event.target.value });
    }
    onChangeMonthYear(event) {
        this.setState({ monthYear: event.target.value });
    }

    render() {
        const users = this.props.users.filter(user => user.is_admin !== true);
        const projects = this.props.projects;
        const categories = this.props.categories;
        return (
            <div>
                <form>
                    <Row>
                        <Col sm={2}>
                            <span className="reportsLabel">Report:</span>
                        </Col>
                        <Col sm={3} controlid="user">
                            <FormControl value={this.state.user} as="select"
                                onChange={this.onChangeUser}>
                                <option value="">User</option>
                                {users.map((user) => <option key={user.id} value={user.id}>{user.firstname + ' ' + user.lastname}</option>)}
                            </FormControl>
                        </Col>
                        <Col sm={3} controlid="project">
                            <FormControl value={this.state.project} as="select"
                                onChange={this.onChangeProject}>
                                <option value="">Project</option>
                                {projects.map((project) => <option key={project.id} value={project.id}>{project.project}</option>)}
                            </FormControl>
                        </Col>
                        <Col sm={3} controlid="monthYear">
                            <FormControl value={this.state.monthYear} type="month" min="2021-03"
                                onChange={this.onChangeMonthYear}>
                            </FormControl>
                        </Col>
                    </Row>
                </form>
                <div>
                    <ReportsTable notes={this.props.notes}
                        users={users}
                        projects={projects}
                        categories={categories}
                        users_filter={this.state.user}
                        projects_filter={this.state.project}
                        monthYear_filter={this.state.monthYear}
                        updateNote={this.props.updateNote}
                        deleteNote={this.props.deleteNote} />
                </div>
            </div>
        );
    }
}

export default ReportsFilters