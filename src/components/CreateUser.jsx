import React, { Component } from 'react'
import { Button, Row, FormControl } from 'react-bootstrap'

class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      firstname: "",
      lastname: "",
      password: ""
    };
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeFirstname = this.onChangeFirstname.bind(this);
    this.onChangeLastname = this.onChangeLastname.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
  }

  onChangeEmail(event) {
    this.setState({ email: event.target.value });
  }
  onChangeFirstname(event) {
    this.setState({ firstname: event.target.value });
  }
  onChangeLastname(event) {
    this.setState({ lastname: event.target.value });
  }
  onChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.handleSubmit({
      email: this.state.email,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      password: this.state.password
    })
  }

  render() {
    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        <Row controlid="email" sm className='mb-2'>
          <FormControl required placeholder="Email"
            onChange={this.onChangeEmail} />
        </Row>
        <Row controlid="firstname" sm className='mb-2'>
          <FormControl required placeholder="First Name"
            onChange={this.onChangeFirstname} />
        </Row>
        <Row controlid="lastname" sm className='mb-2'>
          <FormControl required placeholder="Last Name"
            onChange={this.onChangeLastname} />
        </Row>
        <Row controlid="password" sm className='mb-2'>
          <FormControl required placeholder="Password"
            onChange={this.onChangePassword} />
        </Row>
        <Button type="submit">
          Create
        </Button>
      </form>
    );
  }
}

export default CreateUser