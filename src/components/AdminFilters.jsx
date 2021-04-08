import React, { Component } from 'react'
import { Row, Col, FormControl } from 'react-bootstrap'
import AdminDatePicker from '../components/AdminDatePicker'


class AdminFilters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            project: "",
            category: ""
        };
        this.onChangeUser = this.onChangeUser.bind(this);
        this.onChangeProject = this.onChangeProject.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
    }

    onChangeUser(event) {
        this.setState({ user: event.target.value });
    }

    onChangeProject(event) {
        this.setState({ project: event.target.value });
    }
    onChangeCategory(event) {
        this.setState({ category: event.target.value });
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
                            <h4 className="filtersLabel">Filters:</h4>
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
                        <Col sm={3} controlid="category">
                            <FormControl value={this.state.category} as="select"
                                onChange={this.onChangeCategory}>
                                <option value="">Category</option>
                                {categories.map((category) => (<option key={category.id} value={category.id}>{category.category}</option>))}
                            </FormControl>
                        </Col>
                    </Row>
                </form>
                <div className="datePicker">
                    <AdminDatePicker notes={this.props.notes}
                        users={users}
                        projects={projects}
                        categories={categories}
                        users_filter={this.state.user}
                        projects_filter={this.state.project}
                        categories_filter={this.state.category}
                        updateNote={this.props.updateNote}
                        deleteNote={this.props.deleteNote} />
                </div>
            </div>
        );
    }
}

export default AdminFilters