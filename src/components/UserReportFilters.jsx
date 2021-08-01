import React, { Component } from 'react'
import { Row, Col, FormControl } from 'react-bootstrap'
import * as moment from 'moment'
import UserReportTable from './UserReportTable';


class UserReportFilters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            project: "",
            monthYear: moment(new Date()).format('YYYY-MM')
        };
        this.onChangeProject = this.onChangeProject.bind(this);
        this.onChangeMonthYear = this.onChangeMonthYear.bind(this);
    }

    onChangeProject(event) {
        this.setState({ project: event.target.value });
    }

    onChangeMonthYear(event) {
        this.setState({ monthYear: event.target.value });
    }

    render() {
        const projects = this.props.projects;
        const categories = this.props.categories;
        return (
            <div>
                <form>
                    <Row style={{justifyContent: 'center'}}>
                        <Col sm={2} style={{ maxWidth: '130px', padding: '0px' }}>
                            <span className="reportsLabel">Report for:</span>
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
                    <UserReportTable notes={this.props.notes}
                        projects={projects}
                        categories={categories}
                        projects_filter={this.state.project}
                        monthYear_filter={this.state.monthYear}
                        updateNote={this.props.updateNote}
                        deleteNote={this.props.deleteNote} />
                </div>
            </div>
        );
    }
}

export default UserReportFilters