import React ,{useEffect} from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Switch, Route, withRouter} from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import 'semantic-ui-css/semantic.min.css';
import firebase from './firebase';
import {Provider,connect} from 'react-redux';
import{createStore} from 'redux';
import reducers from './reducers';
import{composeWithDevTools} from 'redux-devtools-extension';
import {setUser} from './actions';
import Spinner from './components/Spinner';

const store=createStore(reducers,composeWithDevTools())

const Root=(props)=>{

  useEffect(()=>{
    firebase.auth()
     .onAuthStateChanged(user=>{
       if(user){
         props.setUser(user)
         props.history.push('/')
       }
     })
  },[props.loading])
  return props.loading?<Spinner />:(
    
      <Switch>
        <Route exact path='/' component={App} />
        <Route path='/login' component={Login} />
        <Route path= '/register' component={Register} />
      </Switch>
    
  )
}
const mapStateToProps=(state)=>{
 return{
   loading:state.user.loading
 }
}
const RootWithRouter=withRouter(connect(mapStateToProps,{setUser})(Root))
ReactDOM.render(
  <Provider store={store}>
    <Router>
    <RootWithRouter />
    </Router>
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
