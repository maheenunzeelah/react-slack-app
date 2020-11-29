import React, { Component } from 'react';
import { Grid, Header, Message, Icon, Button, Segment, Form } from 'semantic-ui-react';
import {Link} from 'react-router-dom';

class Register extends Component {
    handleChange=()=>{

    }
    render() {
        return (
            <Grid textAlign="center" verticalAlign="middle" className="app">
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h2" icon color="blue" textAlign="center">
                        <Icon name="signup" color="blue" />
                        Register For Chat
                   </Header>
                    <Form size="large">
                        <Segment stacked >
                            <Form.Input fluid icon="user" name="username" placeholder="Username" iconPosition="left" onChange={this.handleChange} type="text"/>
                            <Form.Input fluid icon="mail" name="email" placeholder="Email Address" iconPosition="left" onChange={this.handleChange} type="email"/>
                            <Form.Input fluid icon="lock" name="password" placeholder="Password" iconPosition="left" onChange={this.handleChange} type="password"/>
                            <Form.Input fluid icon="repeat" name="passwordConfirmation" placeholder="Password Confirmation" iconPosition="left" onChange={this.handleChange} type="password"/>
                            <Button color="blue" fluid size="large">Submit</Button>
                        </Segment>
                        <Message>Already a User? <Link to="/login">Login</Link></Message>
                    </Form>
                </Grid.Column>
            </Grid>
        )
    }
}

export default Register;