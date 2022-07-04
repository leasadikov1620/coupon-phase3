import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { authReducer } from "./authState";
import { companyReducer } from "./companyState";  
import { couponReducer, couponState } from './couponState';
import { customerReducer, customerState } from './customerState';
import { guestState, guestReducer } from './guestState';


const reducers = combineReducers({authState:authReducer, companyState:companyReducer , couponState:couponReducer , customerState:customerReducer, guestState:guestReducer})
export const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
    })});
