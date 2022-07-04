import "./singleCompany.css";
import { useState, useEffect } from 'react';
import { Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import CompanyData from './../../../modal/companyModal';
import { useNavigate } from 'react-router-dom';
import { store } from "../../../redux/store";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import jwtAxios from './../../../util/JWTaxios';
import globals from "../../../util/global";
import notify, { ErrorMsg, SuccessMsg } from './../../../util/notify';
import { deleteCompany } from './../../../redux/companyState';

interface SingleCompanyProps {
	company:CompanyData;
}

function SingleCompany(props: SingleCompanyProps): JSX.Element {
  const navigate= useNavigate();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    };
    //dialog close box
    const handleClose = () => {
    setOpen(false);
    };

    const removeCompany = () => {
        handleClose();
        console.log("remove");
        jwtAxios.delete(globals.admin.deleteCompany + props.company.id)
        .then((response)=>{
            if(response.status ==200){
              //notify.success("company "+ props.company.id+ "was deleted successfully");
              notify.success(SuccessMsg.COMPANY_DELETED);
             // navigate("/admin/getAllCompanies")
             navigate("/homePage");
            }else{
              notify.error(ErrorMsg.COMPANY_NOT_DELETED);
            }
        })
        .then(()=>{
            store.dispatch(deleteCompany(props.company.id));
        })
        .catch((err)=>{
            notify.error("error");
            console.log(err);
        })
    };

    return (
        <div className="singleCompany SolidBox">
			<h2 style={{textAlign:"center"}}>{props.company.id}</h2><hr/>
            <h4 style={{textAlign:"center"}}>{props.company.name}</h4><br/>
            <span>Contact us: {props.company.email}</span> <br/><br/>
            <ButtonGroup variant="contained" fullWidth>
               <Button color="primary" onClick={()=> navigate("/company/getAllCompanyCoupons",{state:{companyId:props.company.id}})}>coupon list</Button>
               {(store.getState().authState.userType ==='ADMIN') && <Button color="warning" onClick={()=>navigate("/admin/updateCompany",{state:{companyId:props.company.id}})} >update company</Button>}
               {/*{store.getState().authState.userType === "ADMIN" <Button color="error" >delete company</Button>*/}
               {(store.getState().authState.userType ==='ADMIN') && <Button 
               startIcon={<HighlightOffIcon style={{minWidth: '30px'}}/>}
               size="small"
               type="submit"
               color="error"
               variant="contained"
               onClick={handleClickOpen}
               >
               Delete
               </Button>}
               <Dialog
               open={open}
               onClose={handleClose}
               aria-labelledby="alert-dialog-title"
               aria-describedby="alert-dialog-description"
               >
               <DialogTitle id="alert-dialog-title">
               {"Are you sure you want to delete this company? "}
               </DialogTitle>
               <DialogContent>
               <DialogContentText id="alert-dialog-description">
               By delete this company , all customer coupons purchase history will be deleted
               </DialogContentText>
               </DialogContent>
               <DialogActions>
               <Button onClick={handleClose}>Disagree</Button>
               <Button onClick={removeCompany} >
               Agree
               </Button>
               </DialogActions>
               </Dialog>
          
            </ButtonGroup>
        </div>
    );
}

export default SingleCompany;
