import React, { useState } from 'react';
import { Grid, Header, Message, Icon, Button, Segment, Form } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import firebase from '../../firebase';

const Login = () => {
    const [user, setUser] = useState({
        email: '',
        password: '',
        loading: false,

    })
    const [error,setError]=useState([]);



    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const isFormValid = () => {
        let errors = [];
        let error;

        if (isFormEmpty(user)) {
            error = { message: 'Fill in the form fields' }
            setError([error])
            return false
        }
        else {
            return true
        }
    }
    const isFormEmpty = ({  email, password }) => {
        return  !email.length || !password.length ;
    }
  
    const handleInputError = (error, input) => {
        return error.some(err => err.message.toLowerCase().includes(input)) ? 'error' : ''
    }

    const displayErrors = (errors) => {
       
        return errors.map((error, i) => {
            return <p key={i}>{error.message}</p>
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            setUser({ ...user, loading: true })
            setError([])
            firebase
                .auth()
                .signInWithEmailAndPassword(user.email, user.password)
                .then(signedInUser=>{
                    console.log(signedInUser);
                    setUser({...user,loading:false})
                    })
                  
                .catch(err => {
                    setUser({ ...user, loading: false })
                    setError([err])
                    console.log(err)
                })
        }

    }
    return (
        <Grid textAlign="center" verticalAlign="middle" className="app">
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as="h1" icon color="pink" textAlign="center">
                    <Icon name="login" color="pink" />
                    Login to Chat
               </Header>
                <Form size="large" onSubmit={handleSubmit}>
                    <Segment stacked >
                  

                        <Form.Input fluid icon="mail" name="email" placeholder="Email Address" iconPosition="left" onChange={handleChange} type="email" value={user.email} />

                        <Form.Input fluid icon="lock" name="password" placeholder="Password" iconPosition="left" onChange={handleChange} type="password" value={user.password} />

                        

                        <Button disabled={user.loading} className={user.loading ? 'loading' : ''} color="pink" fluid size="large">Login</Button>
                    </Segment>
                </Form>
                {   error.length > 0 && (
                    <Message error>
                        <h3>Error</h3>
                        {displayErrors(error)}
                    </Message>
                )}
                <Message>Do not have an account? <Link to="/register">Register</Link></Message>
            </Grid.Column>
        </Grid>
    )
}




export default Login;