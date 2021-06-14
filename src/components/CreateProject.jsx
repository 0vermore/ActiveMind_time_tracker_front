import React, { Component } from 'react'
import { Button, Row, FormControl } from 'react-bootstrap'

class CreateProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: "",
    };
    this.onChangeProject = this.onChangeProject.bind(this);
  }

  onChangeProject(event) {
    this.setState({ project: event.target.value });
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.handleSubmit({
      project: this.state.project,
    })
  }

  render() {
    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        <Row controlid="project" sm className='mb-2'>
          <FormControl required placeholder="Project Name"
            onChange={this.onChangeProject} />
        </Row>
        <Button type="submit">
          Create
        </Button>
      </form>
    );
  }
}

export default CreateProject