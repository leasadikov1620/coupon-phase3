import { useEffect, useState } from "react";
import CustomerData from "../../../modal/customerModal";
import "./getCustomerDetails.css";
import SingleCustomer from './../singleCustomer/singleCustomer';
import { store } from "../../../redux/store";

function GetCustomerDetails(): JSX.Element {
    const [customer,setCustomer] = useState(new CustomerData()); 

    useEffect(()=>{
        setCustomer(store.getState().customerState.customer[0]);     
    },[])


    return (
        <div className="getCustomerDetails">
			<h1>customer details</h1><hr/>
            {<SingleCustomer customer={customer}/>}
        </div>
    );
}

export default GetCustomerDetails;
