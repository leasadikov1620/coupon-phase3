import "./getAllCustomers.css";
import { useState, useEffect, SyntheticEvent } from 'react';
import CustomerData from './../../../modal/customerModal';
import { store } from "../../../redux/store";
import notify from './../../../util/notify';
import { useNavigate } from "react-router-dom";
import SingleCustomer from './../../customer/singleCustomer/singleCustomer';
import jwtAxios from './../../../util/JWTaxios';
import globals from './../../../util/global';
import { Button, ButtonGroup } from "@mui/material";
import { iteratorSymbol } from "immer/dist/internal";

function GetAllCustomers(): JSX.Element {
    const [customers, setCustomers] = useState<CustomerData[]>([]);
    const navigate = useNavigate();
    useEffect(()=>{
        if(store.getState().authState.userType!="ADMIN"){
            notify.error("please login");
            navigate("/login");
        }
        setCustomers(store.getState().customerState.customer);
    },[])
    
    const [search,setSearch] = useState("");
    const searchName = (sender:SyntheticEvent)=>{
        const value = (sender.target as HTMLInputElement).value;
        setSearch(value);
    };
    const clearMe = ()=>{
        setSearch("");
    };

    // const res = customers {
    //     return && 
    // }); customers.filter(item=> item.firstName.includes(groom)).filter(item=>item.lastName.includes(groom)

    return (
        <div className="getAllCustomers">
			<h1>All customers</h1><hr/>
            <input type="text" placeholder="find a customer" onChange={searchName} value={search}></input>
            <ButtonGroup variant="contained">
            {/*<Button color="primary" onClick={searchGroom}>find</Button>*/}
            <Button color="secondary" onClick={clearMe}>clear</Button>
            </ButtonGroup>
            <br/><br/>
            {/*customers.map(item => <SingleCustomer key={item.id} customer = {item}/>)*/}
            
            {customers.filter(item=> item.lastName.toLowerCase().includes(search) || item.firstName.toLowerCase().includes(search)).map(item=><SingleCustomer key={item.id} customer={item}/>)}
            

        </div>
    );
}

export default GetAllCustomers;
// const filterField = (search, value) => value.toLowerCase().indexOf(search.toLowerCase()) >= 0;

// const orFilter = (search, values) => values.some(filterField.bind(null, search));

// const filteredUsers = this.state.dataToDisplay.filter(item =>
//   orFilter(this.state.search, [item.name, item.surname, phone]);
// )