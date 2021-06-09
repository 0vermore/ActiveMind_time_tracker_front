import React, { Component } from 'react'
import { Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap'

class SettingsForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            password_confirmation: ""
        };
    }

    validateForm() {
        return this.state.password.length > 5 &&
            this.state.password === this.state.password_confirmation;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.handleSubmit({ password: this.state.password })
    }

    render() {
        return (
            <div className="Login">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="password" bssize="large">
                        <FormLabel>New password:</FormLabel>
                        <FormControl
                            autoFocus
                            type="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password_confirmation" bssize="large">
                        <FormLabel>Password confirmation:</FormLabel>
                        <FormControl
                            value={this.state.password_confirmation}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </FormGroup>
                    <Button block bssize="large" disabled={!this.validateForm()} type="submit">
                        Save
                    </Button>
                </form>
            </div>
        );
    }
}

export default SettingsForm