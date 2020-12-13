import * as reducers from './userReducer';
import {combineReducers} from 'redux';

export default combineReducers({
    user:reducers.user_reducer
})

