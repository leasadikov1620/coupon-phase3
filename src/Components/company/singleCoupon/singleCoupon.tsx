import CouponData from "../../../modal/couponModal";
import "./singleCoupon.css";
import { Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@mui/material';
import { store } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import jwtAxios from "../../../util/JWTaxios";
import globals from "../../../util/global";
import notify, { ErrorMsg, SuccessMsg } from "../../../util/notify";
import { deleteCoupon } from './../../../redux/couponState';



interface SingleCouponProps {
    coupon: CouponData;
}

function SingleCoupon(props: SingleCouponProps): JSX.Element {
    
    const navigate= useNavigate();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
      };
   
      const handleClose = () => {
      setOpen(false);
      };

      const removeCoupon = () => {
        handleClose();
        console.log("remove");
        jwtAxios.delete(globals.company.deleteCoupon + props.coupon.id)
        .then((response)=>{
            if(response.status ==200){
              //notify.success("company "+ props.company.id+ "was deleted successfully");
              notify.success(SuccessMsg.COUPON_DELETED);
             // navigate("/admin/getAllCompanies")
             navigate("/homePage");
            }else{
              notify.error(ErrorMsg.COUPON_NOT_DELETED);
            }
        })
        .then(()=>{
            store.dispatch(deleteCoupon(props.coupon.id));
        })
        .catch((err)=>{
            notify.error("error");
            console.log(err);
        })
    };

    return (
        <div className="singleCoupon SolidBox" style={{textAlign:"center"}}>
            <h2 style={{textAlign:"center"}}>{props.coupon.id}</h2><hr/>
            <h5 style={{textAlign:"center"}}>{props.coupon.title}</h5><hr/><br/>
            {/* <span>company id: {props.coupon.company_id}</span><br/><br/> */}
            <span>start date: {props.coupon.startDate}</span><br/><br/>
            <span>expiration date: {props.coupon.endDate}</span><br/><br/>
            <span>left to purchase: {props.coupon.amount}</span><br/><br/>
            <span>category: {props.coupon.category}</span><br/><br/>
            <span>price: {props.coupon.price}</span><br/><br/>
            {/*<TextField className="TextBox" name="description: "  fullWidth {props.coupon.description}/><br/><br/>*/}
            <span>description: {props.coupon.description}</span><br/><br/>
			{/* <span style={{textAlign:"center"}}>{props.coupon.image}</span> */}
            <img src={props.coupon.image} width={150} height={150}/><br/>
            <ButtonGroup variant="contained" fullWidth>
               {(store.getState().authState.userType ==='COMPANY') && <Button color="warning" onClick={()=>navigate("/company/updateCoupon",{state:{couponId:props.coupon.id}})} >update coupon</Button>}
               {(store.getState().authState.userType ==='COMPANY') && <Button   startIcon={<HighlightOffIcon style={{minWidth: '30px'}}/>}
               size="small"
               type="submit"
               color="error"
               variant="contained"
               onClick={handleClickOpen}>Delete Coupon</Button>}
                <Dialog
               open={open}
               onClose={handleClose}
               aria-labelledby="alert-dialog-title"
               aria-describedby="alert-dialog-description"
               >
               <DialogTitle id="alert-dialog-title">
               {"Are you sure you want to delete this coupon? "}
               </DialogTitle>
               <DialogContent>
               <DialogContentText id="alert-dialog-description">
               By delete this coupon , all customer coupons purchase history of this coupon will be deleted
               </DialogContentText>
               </DialogContent>
               <DialogActions>
               <Button onClick={handleClose}>Disagree</Button>
               <Button onClick={removeCoupon} >
               Agree
               </Button>
               </DialogActions>
               </Dialog>
            </ButtonGroup>
        </div>
    );
}

export default SingleCoupon;

       
   
