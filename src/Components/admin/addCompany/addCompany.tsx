import "./addCompany.css";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtAxios from './../../../util/JWTaxios';
import globals from './../../../util/global';
import notify, { ErrorMsg, SuccessMsg } from './../../../util/notify';
import CompanyData from './../../../modal/companyModal';
import SingleCompany from "../../company/singleCompany/singleCompany";
import { Button, ButtonGroup, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { store } from "../../../redux/store";
import { addCompany, companyActionType } from './../../../redux/companyState';
import { isConstructorDeclaration } from "typescript";

function AddCompany(): JSX.Element {
  //const [companies , setCompanies]= useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CompanyData>();
  const navigate = useNavigate();

  // useEffect(()=>{
  //     if(store.getState().authState.userType!=="ADMIN"){
  //         notify.error(ErrorMsg.BAD_TOKEN);
  //         navigate("/login ");
  //     }
  // },[navigate]);

  const send = (createCompany: CompanyData) => {
    jwtAxios.post(globals.admin.addCompany, createCompany)
      .then(response => {
        if (response.status == 200) {
          createCompany.id = response.data;
        //  console.log(response.data);
          notify.success(SuccessMsg.COMPANY_ADD);
        } else {
          // notify.error ("we have an error");
          notify.error(ErrorMsg.COMPANY_NOT_ADD);
        }
        //  console.log(response);
        //setCompanies(response.data);
        //console.log("A");
      })
      .then(() => {
        store.dispatch(addCompany(createCompany));
       // navigate(globals.admin.getAllCompanies);
       navigate("/admin/getAllCompanies")
        //console.log("B");
      })
      .catch(err => {
        navigate("/homePage");
        
        //notify.error("Error in thr system!!");
        console.log(err);
        //navigate("/login");

      })
  };

  return (
    <div className="addCompany SolidBox">
      <Typography variant="h3" className="HeadLine">
        Add A Company
      </Typography>
      <hr />
      <br />
      <form onSubmit={handleSubmit(send)}>
        <TextField
          name="name"
          label="name"
          variant="outlined"
          className="TextBox"
          fullWidth {...register("name", {
            required: {
              value: true,
              message: "Missing name",
            },
          })} />
        {errors.name && <span>message error : {errors.name.message}</span>}
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
          })} />
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

export default AddCompany;
