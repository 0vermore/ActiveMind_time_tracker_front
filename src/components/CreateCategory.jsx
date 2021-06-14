import React, { Component } from 'react'
import { Button, Row, FormControl } from 'react-bootstrap'

class CreateCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
    };
    this.onChangeCategory = this.onChangeCategory.bind(this);
  }

  onChangeCategory(event) {
    this.setState({ category: event.target.value });
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.handleSubmit({
      category: this.state.category,
    })
  }

  render() {
    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        <Row controlid="category" sm className='mb-2'>
          <FormControl required placeholder="Category Name"
            onChange={this.onChangeCategory} />
        </Row>
        <Button type="submit">
          Create
        </Button>
      </form>
    );
  }
}

export default CreateCategory