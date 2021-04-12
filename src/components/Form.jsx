import React, { Component } from 'react';
import { Button, FormGroup, FormControl } from 'react-bootstrap'

export class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            project: "",
            category: "",
            description: this.props.note.description,
            hours: this.props.note.hours,
            date: this.props.note.date
        };
        this.onChangeProject = this.onChangeProject.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeHours = this.onChangeHours.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateForm() {
        return this.state.project.length > 0 && this.state.category.length > 0 &&
            this.state.hours > 0;
    }

    onChangeProject(event) {
        this.setState({ project: event.target.value });
    }
    onChangeCategory(event) {
        this.setState({ category: event.target.value });
    }
    onChangeDescription(event) {
        this.setState({ description: event.target.value });
    }
    onChangeHours(event) {
        this.setState({ hours: event.target.value });
    }
    onChangeDate(event) {
        this.setState({ date: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log({
            id: this.props.note.id, project_id: this.state.project,
            category_id: this.state.category, description: this.state.description,
            hours: this.state.hours, date: this.state.date
        })
        this.props.onSubmit({
            id: this.props.note.id, project_id: this.state.project,
            category_id: this.state.category, description: this.state.description,
            hours: this.state.hours, date: this.state.date
        })
        this.props.closeModal();
    }

    render() {
        const projects = this.props.projects;
        const categories = this.props.categories;
        return (
            <form onSubmit={this.handleSubmit}>
                <FormGroup controlid="project">
                    <FormControl value={this.state.project} as="select"
                        onChange={this.onChangeProject}>
                        <option value="">Project</option>
                        {projects.map((project) => <option key={project.id} value={project.id}>{project.project}</option>)}
                    </FormControl>
                </FormGroup>
                <FormGroup controlid="category">
                    <FormControl value={this.state.category} as="select"
                        onChange={this.onChangeCategory}>
                        <option value="">Category</option>
                        {categories.map((category) => (<option key={category.id} value={category.id}>{category.category}</option>))}
                    </FormControl>
                </FormGroup>
                <FormGroup controlid="description">
                    <FormControl required placeholder="Description"
                        value={this.state.description}
                        onChange={this.onChangeDescription} 
                        type="text"/>
                </FormGroup>
                <FormGroup controlid="hours">
                    <FormControl required placeholder="Hours"
                        value={this.state.hours}
                        onChange={this.onChangeHours} />
                </FormGroup>
                <FormGroup controlid="date">
                    <FormControl controlid="date" type="date" required
                        value={this.state.date} onChange={this.onChangeDate} />
                </FormGroup>
                <Button block disabled={!this.validateForm()} type="submit">
                    Save
                    </Button>
            </form>
        );
    }
}
export default Form;