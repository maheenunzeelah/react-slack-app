import * as actionTypes from '../actions/types';

const initialUserState={
    currentUser:null,
    loading:true
}
export const user_reducer=(state=initialUserState,action)=>{
    switch(action.type){
        case actionTypes.SET_USER:
         return{
             currentUser:action.payload.currentUser,
             loading:false
         }
         default:
          return state
    }
}