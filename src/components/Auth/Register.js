import React, { useState} from 'react';
import { Grid, Header, Message, Icon, Button, Segment, Form } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import firebase from '../../firebase';
import md5 from 'md5';

const Register = () => {
    const [user, setUser] = useState({
     username: '',
     email: '',
     password: '',
     passwordConfirmation: '',
     errors: [],
     loading:false, 
     userRef:firebase.database().ref('users') 
    })



    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const isFormValid = () => {
        let errors = [];
        let error;

        if (isFormEmpty(user)) {
            error = { message: 'Fill in the form fields' }
            setUser({ ...user, errors: errors.concat(error) })
            return false
        }
        else if (!isPassValid(user)) {
            error = { message: 'Password is Invalid' }
            setUser({ ...user, errors: errors.concat(error) })
            return false
        }
        else {
            return true
        }
    }
    const isFormEmpty = ({ username, email, password, passwordConfirmation }) => {
        return !username.length || !email.length || !password.length || !passwordConfirmation.length;
    }
    const isPassValid = ({ password, passwordConfirmation }) => {
        if (password.length < 6 || passwordConfirmation.length < 6)
            return false

        else if (password != passwordConfirmation)
            return false
        
        else 
          return true
    }

    const handleInputError=(error,input)=>{
        return error.some(err=>err.message.toLowerCase().includes(input))?'error':''
    }
 
    const displayErrors=(errors)=>{
        console.log(errors)
        return errors.map((error,i)=>{
         return <p key={i}>{error.message}</p>
     })
    }
    const saveUser=(createdUser)=>{
      return user.userRef.child(createdUser.user.uid).set({
          name: createdUser.user.displayName,
          avatar:createdUser.user.photoURL
      })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            setUser({...user,errors:[],loading:true})
            firebase
                .auth()
                .createUserWithEmailAndPassword(user.email, user.password)
                .then(createdUser => {
                    console.log(createdUser)
                    createdUser.user.updateProfile({
                        displayName:user.username,
                        photoURL:`http://gravatar.com/avatar/${md5(createdUser.user.email)}?d.identicon`
                    })
                    .then(()=>{
                        saveUser(createdUser)
                        .then(()=>{
                            console.log('User Saved')
                            setUser({...user,loading:false})
                        })
                       
                       
                    })
                    .catch(err=>{
                        setUser({...user,errors:user.errors.concat(err),loading:false})
                    })
                })
                .catch(err => {
                    setUser({...user,errors:user.errors.concat(err),loading:false})
                    console.log(err)
                })
        }

    }
    return (
        <Grid textAlign="center" verticalAlign="middle" className="app">
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as="h1" icon color="blue" textAlign="center">
                    <Icon name="signup" color="blue" />
                    Register For Chat
               </Header>
                <Form size="large" onSubmit={handleSubmit}>
                    <Segment stacked >
                        <Form.Input fluid icon="user" name="username" placeholder="Username" iconPosition="left" onChange={handleChange} type="text" value={user.username}/>

                        <Form.Input fluid icon="mail" name="email" placeholder="Email Address" iconPosition="left" onChange={handleChange} type="email" value={user.email}  className={handleInputError(user.errors,"email")}/>

                        <Form.Input fluid icon="lock" name="password" placeholder="Password" iconPosition="left" onChange={handleChange} type="password" value={user.password}  className={handleInputError(user.errors,"password")}/>

                        <Form.Input fluid icon="repeat" name="passwordConfirmation" placeholder="Password Confirmation" iconPosition="left" onChange={handleChange} type="password" value={user.passwordConfirmation}  className={handleInputError(user.errors,"password")} />

                        <Button disabled={user.loading} className={user.loading?'loading':''} color="blue" fluid size="large">Submit</Button>
                    </Segment>
                </Form>
                {user.errors.length>0 && (
                    <Message error>
                     <h3>Error</h3>
                      {displayErrors(user.errors)}
                    </Message>
                )}
                <Message>Already a User? <Link to="/login">Login</Link></Message>
            </Grid.Column>
        </Grid>
    )
}




export default Register;