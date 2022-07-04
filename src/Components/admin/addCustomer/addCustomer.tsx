import "./addCustomer.css";
import { useForm } from 'react-hook-form';
import CustomerData from './../../../modal/customerModal';
import { useNavigate } from "react-router-dom";
import jwtAxios from "../../../util/JWTaxios";
import globals from "../../../util/global";
import notify, { ErrorMsg, SuccessMsg } from "../../../util/notify";
import { store } from "../../../redux/store";
import { addCustomer } from './../../../redux/customerState';
import { Button, ButtonGroup, TextField, Typography } from "@mui/material";

function AddCustomer(): JSX.Element {
    const {register, handleSubmit,formState:{errors}} = useForm<CustomerData>();
    const navigate = useNavigate();
    
    const send = (createCustomer : CustomerData) =>{
  jwtAxios.post(globals.admin.addCustomer , createCustomer)
  .then(response=> {
    if(response.status==200){
      createCustomer.id = response.data;
        notify.success(SuccessMsg.CUSTOMER_ADD);
        navigate("/admin/getAllCustomers");
    }else{
      notify.error (ErrorMsg.CUSTOMER_NOT_ADD);
    }
})
.catch(err=>{
 notify.error(ErrorMsg.BAD_TOKEN);
 navigate("/login");
     console.log(err);
})

store.dispatch(addCustomer(createCustomer));
    };

    return (
        <div className="addCustomer SolidBox">
		 <Typography variant="h3" className="HeadLine">
        Add A Customer 
      </Typography>
      <hr />
      <br />
      <form onSubmit={handleSubmit(send)}>
      <TextField
          name="first name"
          label="first name"
          variant="outlined"
          className="TextBox"
          fullWidth {...register("firstName", {
            required: {
              value: true,
              message: "Missing name",
            },
          })}/>
            {errors.firstName?.message}
          <br /><br />

          <TextField
          name="last name"
          label="last name"
          variant="outlined"
          className="TextBox"
          fullWidth {...register("lastName", {
            required: {
              value: true,
              message: "Missing name",
            },
          })}/>
            {errors.lastName?.message}
          <br /><br />

          <TextField
       type={"email"}
          name="email"
          label="email"
          variant="outlined"
          className="TextBox"
          fullWidth {...register("email", {
            required: {
              value: true,
              message: "Missing email",
            },
          })} />
            <span>{errors.email?.message}</span>
            <br /><br />

            <TextField
          type={"password"}
          name="password"
          label="password"
          variant="outlined"
          className="TextBox"
          fullWidth {...register("password", {
            required: {
              value: true,
              message: "Missing passsword",
            },
          })}/>
          {errors.password?.message}
<br /><br />


<ButtonGroup variant="contained" fullWidth>
          <Button type="submit" color="primary">
            Add
          </Button>
        </ButtonGroup>

      </form>
        </div>
    );
}

export default AddCustomer;
