
import jwt_decode  from 'jwt-decode';
import { store } from './store';

export class authState{
    userName:string ="";
    userType:string ="";
    userToken:string = "";
}

export enum authActionType{
    UserLogin ="UserLogin" ,
    UserLogout="UserLogout",
    UpdateToken = "UpdateToken",
}

export interface authAction{
    type:authActionType,
    payload?:any;
}

export function userLogin(userToken:string):authAction{
    return {type: authActionType.UserLogin , payload:userToken};
}

export function userLogout():authAction{
    return {type: authActionType.UserLogout};
}

export function updateToken (userToken:string):authAction{
    return {type: authActionType.UpdateToken , payload:userToken}
}

export function authReducer(currentState: authState = new authState , action: authAction):authState{
    const newState = {...currentState};

    switch(action.type){
        case authActionType.UserLogin:
            var myToken = action.payload.replace("Bearer ", "");
            var decoded = JSON.parse(JSON.stringify(jwt_decode(myToken)));
            newState.userName=decoded.sub;
            newState.userType=decoded.clientType;
            newState.userToken=action.payload;
        break;

        case authActionType.UserLogout:
            newState.userToken="";
            newState.userName="";
            newState.userType="";
          //  localStorage.removeItem("jwt");
            
        break;

        case authActionType.UpdateToken:
            newState.userToken=action.payload;
        break; 

    }

    return newState;
}

