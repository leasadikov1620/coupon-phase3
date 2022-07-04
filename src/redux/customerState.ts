import CustomerData from "../modal/customerModal";

export class customerState{
    customer: CustomerData [] = [];
}

export enum customerActionType{
    DownloadCustomers = "DownloadCustomers",
    DeleteCustomer ="DeleteCustomer",
    UpdateCustomer = " UpdateCustomer",
    AddCustomer = "AddCustomer",
    clearCustomers = "ClearCustomers",
}

export interface customerAction{
    type:customerActionType,
    payload?:any;
}

export function downloadCustomers(customers:CustomerData[]):customerAction{
    return {type:customerActionType.DownloadCustomers,payload:customers}
}

export function deleteCustomer(customerId:number):customerAction{
    return {type:customerActionType.DeleteCustomer,payload:customerId}
}

export function updateCustomer(customer:CustomerData):customerAction{
    return{type:customerActionType.UpdateCustomer,payload:customer}
}

export function addCustomer(customer:CustomerData):customerAction{
    return {type:customerActionType.AddCustomer,payload:customer}
}

export function clearCustomers ():customerAction{
    return{type:customerActionType.clearCustomers}
}

export function customerReducer(currentState: customerState = new customerState , action: customerAction):customerState{
    var newCustomerState = {...currentState};

    switch(action.type){

    case customerActionType.DownloadCustomers:
        newCustomerState.customer = action.payload;
    break;


    case customerActionType.AddCustomer:
    //newCustomerState.customer.push(action.payload);
    const cust =[...newCustomerState.customer]
    cust.push(action.payload);
    newCustomerState.customer=cust;
    break;


    case customerActionType.UpdateCustomer:
    var updatedCustomers = [...newCustomerState.customer].filter(item=> item.id != action.payload.id);
    updatedCustomers.push(action.payload);
    newCustomerState.customer= updatedCustomers;
    break;


    case customerActionType.DeleteCustomer:
   newCustomerState.customer =[...newCustomerState.customer].filter(item=> item.id !== action.payload);
    break;

    case customerActionType.clearCustomers:
        newCustomerState.customer=[];
        break;

    }
    return newCustomerState;
}
