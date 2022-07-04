import "./login.css";
import { useForm } from "react-hook-form";
import UserCred from "../../../modal/userCred";
import axios from "axios";
import {
  Button,
  ButtonGroup,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import notify, { ErrorMsg, SuccessMsg } from "../../../util/notify";
import globals from './../../../util/global';
import jwtAxios from './../../../util/JWTaxios';
import { useNavigate } from 'react-router-dom';
import CompanyData from './../../../modal/companyModal';
import { companyState, downloadCompanies } from "../../../redux/companyState";
import { store } from "../../../redux/store";
import { userLogin } from "../../../redux/authState";
import { useDispatch } from "react-redux";
import getAllCustomers from "../../admin/getAllCustomers/getAllCustomers";
import getAllCompanies from "../../admin/getAllCompanies/getAllCompanies";
import { downloadCustomers } from "../../../redux/customerState";
import CustomerData from "../../../modal/customerModal";
import CouponData from './../../../modal/couponModal';
import { downloadCoupons } from "../../../redux/couponState";

function Login(): JSX.Element {
  const {register,handleSubmit,  formState: { errors }, } = useForm<UserCred>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [type, setType] = useState('');


  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value);
  };

  
const send =  (msg:UserCred)=>{
  jwtAxios.post<UserCred>(globals.urls.login,msg)
  .then((response) => {
    notify.success(SuccessMsg.LOGIN_APPROVED);
    dispatch(userLogin(response.headers.authorization));
    
    switch (store.getState().authState.userType) {
      case "ADMIN":
        console.log("ADMIN CASE");
        if(store.getState().companyState.company.length<1){
           jwtAxios.get<CompanyData[]>(globals.admin.getAllCompanies)
           .then((response) => {
              console.log(response);
              store.dispatch(downloadCompanies(response.data));
           })
           .catch((err) => {
            console.log(err);
            notify.error("Error");
           })
        }

        if(store.getState().customerState.customer.length<1){
          jwtAxios.get<CustomerData[]>(globals.admin.getAllCustomers)
          .then((response) => {
             console.log(response);
             store.dispatch(downloadCustomers(response.data));
          })
          .catch((err) => {
           console.log(err);
           notify.error("Error")
          })
       }
    
        break;
        
        case "COMPANY":
          console.log("COMPANY CASE");
          if(store.getState().companyState.company.length<1){
            jwtAxios.get<CompanyData>(globals.company.getCompanyDetails)
            .then((response) => {
              console.log(response.data);
              let companies:CompanyData[]=[];
              companies.push(response.data);
              store.dispatch(downloadCompanies(companies));
              store.dispatch(downloadCoupons((response.data as CompanyData).coupons));
             
              //store.getState().couponState.coupon.filter(item=>item.company_id ==  )
           })
           .catch((err) => {
            console.log(err);
            notify.error("Error");
           })

          }

          break;

          case "CUSTOMER":
            console.log("CUSTOMER CASE");
            if(store.getState().customerState.customer.length<1){
              jwtAxios.get<CustomerData>(globals.customer.getCustomerDetails)
              .then((response)=>{
                console.log(response.data);
                let customers : CustomerData[]=[];
                customers.push(response.data);
                store.dispatch(downloadCustomers(customers));
                store.dispatch(downloadCoupons((response.data as CustomerData).coupons));
              })
              .catch((err) => {
                console.log(err);
                notify.error("Error");
               })
            }
            break;
    }
  })
  navigate("/homePage");
};

  return (
    <div className="login SolidBox">
      <Typography variant="h3" className="HeadLine">
        Sign In
      </Typography>
      <hr />
      <br />
      <form onSubmit={handleSubmit(send)}>
        <TextField
         type={"email"}
          name="email"
          label="email"
          variant="outlined"
          className="TextBox"
          fullWidth
          {...register("email", {
            required: {
              value: true,
              message: "Missing email",
            },
          })}
        />
        <span>{errors.email?.message}</span>
        <br />
        <br />
        <br />
        <TextField
          type={"password"}
          name="password"
          label="password"
          variant="outlined"
          className="TextBox"
          fullWidth
          {...register("password", {
            required: {
              value: true,
              message: "Missing password",
            },
          })}
        />
        <span>{errors.password?.message}</span>
        <br />
        <br />
        <br />

        


        {/* <TextField
          name="clientType"
          label="clientType"
          variant="outlined"
          className="TextBox"
          fullWidth
          {...register("clientType", {
            required: {
              value: true,
              message: "Missing clientType",
            },
          })}
        /> 
         <span>{errors.clientType?.message}</span>
        */}

 <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Client Type</InputLabel>
        <Select 
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue=""
          label="Client Type"
          {...register("clientType", {
              required: {
                value: true,
                message: "Missing clientType",
              },
            })}
                >
         <MenuItem value={"ADMIN"}>ADMIN</MenuItem>
          <MenuItem value={"COMPANY"}>COMPANY</MenuItem>
         <MenuItem value={"CUSTOMER"}>CUSTOMER</MenuItem>
         
        </Select>
      </FormControl>





     

        <br />
        <br />
        <br />
        {/* <FormControlLabel
          name="remember me"
          label="remember me"
          control={<Checkbox />}
          {...register("rememberMe")}
        />
        <br /> */}
        <ButtonGroup variant="contained" fullWidth>
          <Button type="submit" color="primary">
            Sign In
          </Button>
        </ButtonGroup>
      </form>
      {/*jwt*/}
    </div>
  );
        
        }   
export default Login;
//================================================================================

// <FormControl   {...register("clientType", {
//   required: {
//     value: true,
//     message: "Missing clientType",
//   },
// })}
// sx={{ m: 1, minWidth: 250  }}>
// <InputLabel id="demo-simple-select-helper-label">Client Type</InputLabel>
// <Select
// labelId="demo-simple-select-helper-label"
// id="demo-simple-select-helper"
// value={type}
// label="Client Type"
// onChange={handleChange}
// >

// <MenuItem value={"ADMIN"}>ADMIN</MenuItem>
// <MenuItem value={"COMPANY"}>COMPANY</MenuItem>
// <MenuItem value={"CUSTOMER"}>CUSTOMER</MenuItem>
// </Select>
// {/* <span>{errors.clientType?.message}</span> */}
// </FormControl>