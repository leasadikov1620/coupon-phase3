import "./updateCustomer.css";
import { useForm } from 'react-hook-form';
import CustomerData from './../../../modal/customerModal';
import { useLocation, useNavigate } from 'react-router-dom';
import { SyntheticEvent, useEffect, useState } from "react";
import { store } from "../../../redux/store";
import { Button, ButtonGroup, TextField, Typography } from "@mui/material";
import globals from './../../../util/global';
import jwtAxios from './../../../util/JWTaxios';
import notify, { ErrorMsg, SuccessMsg } from './../../../util/notify';
import { updateCustomer } from "../../../redux/customerState";

function UpdateCustomer(): JSX.Element {
    const {register , handleSubmit , formState: {errors},} = useForm<CustomerData>();
    const location = useLocation();
    const navigate = useNavigate();
    const [customer,setCustomer] = useState(new CustomerData());
    const {customerId} = location.state as any;
    useEffect(()=>{
        console.log(customerId);
        setCustomer(store.getState().customerState.customer.find(item=>customerId==item.id))

    },[])
  
    const send = ()=> {
        jwtAxios.put(globals.admin.updateCustomer,customer)
        //jwtAxios.put("/admin/updateCustomer",customer)
        .then(response =>{
            if(response.status==200){
                notify.success(SuccessMsg.CUSTOMER_UPDATED);
                // navigate("/admin/getAllCustomers");
            }else{
                notify.error(ErrorMsg.CUSTOMER_NOT_UPDATED);
                console.log(response.data);
            }
        })
        .then(()=> {
            store.dispatch(updateCustomer(customer));
            navigate("/admin/getAllCustomers");
        })
        .catch(err=>{
            notify.error(err);
            console.log(err);
        })
    };



     
    const handleInputChange = (args:any)=>{
        const {name, value} = args.target;
        setCustomer({
            ...customer,
            [name]:value,
    
        });
      };




    // const emailChange = (args:SyntheticEvent)=>{
    //         customer.email= (args.target as HTMLInputElement).value;
    // }

    // const firstNameChange= (args:SyntheticEvent)=>{
    //     customer.firstName=(args.target as HTMLInputElement).value;
    // }

    // const lastNameChange= (args:SyntheticEvent)=>{
    //     customer.lastName=(args.target as HTMLInputElement).value;
    // }

    return (
        <div className="updateCustomer SolidBox">
		  <Typography variant="h3" className="HeadLine">
            update a customer
            </Typography>  <hr /><br />
            <form onSubmit={handleSubmit(send)}>

                <TextField name="email" label="email" variant="outlined" fullWidth
                //  {...register("email",{
                //     required:{
                //         value:true ,
                //         message: 'you must insert valid email'
                //     }
                // })} 
                
                value={customer.email} onChange={handleInputChange}/>
               {errors.email?.message}
                <br/>
                <br/><br/>



                <TextField name="firstName" label="first name"  fullWidth variant="outlined" className="TextBox"
                
                // {...register("firstName",{
                //     required:{
                //         value:true,
                //         message: 'you must insert valid name'
                //     }
                // })}
                
                value={customer.firstName} onChange={handleInputChange}/>
                {/* <span>{errors.firstName?.message}</span> */}
                <br/>
                <br/><br/>


                <TextField name="lastName" label="last name"  fullWidth variant="outlined" className="TextBox" 
                //{...register("lastName",{
                    // required:{
                    //     value:true,
                    //     message: 'you must insert valid name'
                    // }
              //  })} 
                value={customer.lastName} onChange={handleInputChange}/>
                {/* <span>{errors.lastName?.message}</span> */}
                <br/>
                <br/><br/>
             
               
                <ButtonGroup variant="contained" fullWidth>
                    <Button type="submit" color="primary" >update</Button>
                </ButtonGroup>
                <br/>
            </form>
        </div>
    );
}

export default UpdateCustomer;
