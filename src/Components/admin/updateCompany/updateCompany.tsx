import { Button, ButtonGroup, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import UserCred from "../../../modal/userCred";
import "./updateCompany.css";
import CompanyData from './../../../modal/companyModal';
import { useLocation, useNavigate } from "react-router-dom";
import { SyntheticEvent, useEffect, useState } from "react";
import { store } from "../../../redux/store";
import jwtAxios from "../../../util/JWTaxios";
import globals from "../../../util/global";
import notify, { ErrorMsg, SuccessMsg } from "../../../util/notify";
import { updateCompany } from "../../../redux/companyState";
import { customerState } from './../../../redux/customerState';

function UpdateCompany(): JSX.Element {
    const { register,handleSubmit,formState: { errors },} = useForm<CompanyData>();
     const location = useLocation();
     const navigate = useNavigate();
     const [company,setCompany] = useState(new CompanyData());
    const {companyId} = location.state as any;
    useEffect(()=>{
        console.log(companyId);
        setCompany(store.getState().companyState.company.find(item=>item.id==companyId))        
    },[])

    const send = ()=>{
        console.log(company);
        jwtAxios.put(globals.admin.updateCompany,company)
        .then(response=>{
            if (response.status==200){
                notify.success(SuccessMsg.COMPANY_UPDATED);
                navigate("/admin/getAllCompanies");
            } else {
                notify.error(ErrorMsg.COMPANY_NOT_UPDATED);
                console.log(response.data);
            }
        })
        .then(()=>{
            store.dispatch(updateCompany(company));
       })
       .catch(err=>{
          // notify.error(err);
          console.log(err);
       })
      };


    //   const emailChange = (args:SyntheticEvent)=>{
    //     company.email =  (args.target as HTMLInputElement).value;   
    //   }
     
       const handleInputChange = (args:any)=>{
            const {name, value} = args.target;
            setCompany({
                ...company,
                [name]:value,
        
            });
          };

    

    return (
        <div className="updateCompany SolidBox">
            <Typography variant="h3" className="HeadLine">
            update a company
            </Typography>  <hr /><br />
            <form onSubmit={handleSubmit(send)}>
                <TextField name="email" label="email" variant="outlined" 
                fullWidth 
                // {...register("email",{
                //     required:{
                //         value:true,
                //           message: 'you must insert valid email'
                //     }
                // })} 
                value={company.email} onChange={handleInputChange}/>
                <span>{errors.email?.message}</span>
                <br/>
                <br/><br/>
                <TextField name="name" label="company name"  fullWidth variant="outlined" className="TextBox" 
                
                // {...register("name",{
                   
                // })}
                 value={company.name} disabled/>                
                <br/><br/>
               
                <ButtonGroup variant="contained" fullWidth>
                    <Button type="submit" color="primary" >update</Button>
                </ButtonGroup>
                <br/>
            </form>
        </div>
    );
}

export default UpdateCompany;


