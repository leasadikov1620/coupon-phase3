import { useNavigate } from "react-router-dom";
import CustomerData from "../../../modal/customerModal";
import "./singleCustomer.css";
import { Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useState } from "react";
import { store } from "../../../redux/store";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import jwtAxios from "../../../util/JWTaxios";
import globals from "../../../util/global";
import notify, { ErrorMsg, SuccessMsg } from "../../../util/notify";
import { deleteCustomer } from './../../../redux/customerState';

interface SingleCustomerProps{
    customer: CustomerData;
}
function SingleCustomer(props:SingleCustomerProps): JSX.Element {
    const navigate= useNavigate();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
      };
      //dialog close box
      const handleClose = () => {
      setOpen(false);
      };

      const removeCustomer = () => {
        handleClose();
        console.log("remove");
        jwtAxios.delete(globals.admin.deleteCustomer + props.customer.id)
        .then((response)=>{
            if(response.status ==200){
             // notify.success("customer "+ props.customer.id+ "was deleted successfully");
              notify.success(SuccessMsg.CUSTOMER_DELETED);
              navigate("/homePage");
            }else{
              notify.error(ErrorMsg.CUSTOMER_NOT_DELETED);
            }
        })
        .then(()=>{
            store.dispatch(deleteCustomer(props.customer.id));
        })
        .catch((err)=>{
            notify.error("error");
            console.log(err);
        })
    };


    return (
        <div className="singleCustomer SolidBox">
			<h2 style={{textAlign:"center"}}>{props.customer.id}</h2><hr />
            <h4 style={{textAlign:"center"}}>{props.customer.firstName} {props.customer.lastName}</h4><br/>
            <span>email: {props.customer.email}</span> <br/><br />
           {/* <ButtonGroup variant="contained" fullWidth>*/}
            <ButtonGroup>                                                       
                <Button color="primary" onClick={() => { navigate("/customer/getCustomerCoupons",{state:{customerId:props.customer.id},})}}>coupon list</Button>
                {(store.getState().authState.userType=='ADMIN') && <Button color="warning" onClick={()=>navigate("/admin/updateCustomer",{state:{customerId:props.customer.id}})} >update customer</Button>}
               {/*<Button color="error" >delete customer</Button>*/}
               {(store.getState().authState.userType=='ADMIN') && <Button
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
               {"Are you sure you want to delete this customer? "}
               </DialogTitle>
               <DialogContent>
               <DialogContentText id="alert-dialog-description">
               This customer is going to be deleted
               </DialogContentText>
               </DialogContent>
               <DialogActions>
               <Button onClick={handleClose}>Disagree</Button>
               <Button onClick={removeCustomer} >
               Agree
               </Button>
               </DialogActions>
               </Dialog>
            </ButtonGroup>
        </div>
    );
}

export default SingleCustomer;
