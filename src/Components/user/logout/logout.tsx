import { Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";
import "./logout.css";
import { store } from './../../../redux/store';
import { userLogout } from './../../../redux/authState';
import { useEffect, useState } from "react";

function Logout(): JSX.Element {
    const navigate = useNavigate();
    
    const [open, setOpen] = useState(true);

    // const handleClickOpen = () => {
    //   setOpen(true);
    //   };
     

      const handleClose = () => {
      setOpen(false);
      };

      const handleLogout= ()=>{
       
        // if(store.getState().authState.userType === "ADMIN" ||
        // store.getState().authState.userType === "COMPANY"||
        // store.getState().authState.userType === "CUSTOMER" ){
           
        // }
     console.log("bye");
     handleClose();
            store.dispatch(userLogout());
            navigate ("/homePage");
  
        
    }

    // useEffect(()=>{
    //        handleClickOpen();
    // },[]);

{/* <DialogContent>
               <DialogContentText id="alert-dialog-description">
               By delete this company , all customer coupons purchase history will be deleted
               </DialogContentText>
               </DialogContent> */}


    return (
        <div className="logout">
             {/* <Typography variant="h3" className="HeadLine"  onClick={handleLogout}>
             Sign Out
      </Typography> */}
      {/* <hr /> */}
      {/* <br /> */}
     
     {/* <a href="/">  </a> */}

      <Dialog
               open={open}
               onClose={handleClose}
               aria-labelledby="alert-dialog-title"
               aria-describedby="alert-dialog-description"
               >
               <DialogTitle id="alert-dialog-title">
               {"Are you sure you want to sign out? "}
               </DialogTitle>
               



               <DialogActions>
               <ButtonGroup variant="contained" fullWidth>
               <Button onClick={handleClose}>No</Button>
               <Button onClick={handleLogout} >
               Yes
               </Button>
               </ButtonGroup>
               </DialogActions>
               </Dialog>
               
        </div>
    );
}

export default Logout;
