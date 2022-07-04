import { AppBar, Box, Button, Divider, IconButton, ListItemIcon, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import "./myHeader.css";
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from 'react';
import { store } from './../../../../redux/store';
import { useDispatch } from 'react-redux';
import { userLogout } from './../../../../redux/authState';
import { clearCompanies } from "../../../../redux/companyState";
import { clearCustomers } from "../../../../redux/customerState";
import { clearCoupons } from "../../../../redux/couponState";

function MyHeader(): JSX.Element {
    
     const [anchorE1 , setAnchorE1] = useState<null|HTMLElement>(null);
    const open = Boolean(anchorE1);
    const [type , setType] = useState('');
    const [menuOptions,setMenuOptions]=useState([]);
    const [menuLinks,setMenuLinks]=useState([]);

    
const adminOptions = ["All Companies", "Add Company", "All Customers", "Add Customer",];
const adminLinks =["/admin/getAllCompanies","/admin/addCompany","/admin/getAllCustomers","/admin/addCustomer",];
      
        
const companyOptions = ["Company Details", "All Company Coupons", "Add Coupon",];
const companyLinks =["/company/getCompanyDetails","/company/getAllCompanyCoupons","/company/addCoupon",];
      
        
const customerOptions = ["Customer Details", "My Coupons",];
const customerLinks =["/customer/getCustomerDetails","/customer/getCustomerCoupons",];


    // const handleClick =(event:React.MouseEvent<HTMLButtonElement>)=>{
    //     const newType =store.getState().authState.userType;
    //     setType(newType);
    //     if (type==='ADMIN'){
    //         setMenuOptions(adminOptions);
    //         setMenuLinks(adminLinks);
    //     }else if(type==='COMPANY'){
    //         setMenuOptions(companyOptions);
    //         setMenuLinks(companyLinks);
    //     }else if(type==='CUSTOMER'){
    //         setMenuOptions(customerOptions);
    //         setMenuLinks(customerLinks);
    //     }else{
    //         setMenuOptions([]);
    //         setMenuLinks([]);
    //     }
    //     setAnchorE1(event.currentTarget);
    // };


    const handleClick =(event:React.MouseEvent<HTMLButtonElement>)=>{
     switch(store.getState().authState.userType){
        case "ADMIN": 
         setMenuOptions(adminOptions);
        setMenuLinks(adminLinks);
        break;


        case "COMPANY": 
          setMenuOptions(companyOptions);
          setMenuLinks(companyLinks);
        break;


        case "CUSTOMER":
         setMenuOptions(customerOptions);
          setMenuLinks(customerLinks);
        break;

        default:
           setMenuOptions([]);
          setMenuLinks([]);
         
      }
      setAnchorE1(event.currentTarget);
  };


    const handleClose=()=>{
        setAnchorE1(null);
    };

    const navigate = useNavigate();

const dispatch = useDispatch();

const logout =()=>{
    dispatch(userLogout());
    dispatch(clearCompanies());
    dispatch(clearCustomers());
   dispatch(clearCoupons());
  //  handleClose();
    navigate("/homePage");
}


const login =()=>{
  navigate("/login");
};
    
    // const linksCompany =[
     
    //   "/company/updateCoupon",
    //   "/company/deleteCoupon",
    
    //   "/company/getCouponByCategory",
    //   "/company/getCouponByMaxPrice" ,
     
    // ];
    
    // const linksCustomer = [
    //   "/customer/purchaseCoupon",
    
    //   "/customer/getCustomerCouponsByCategory",
    //   "/customer/getCustomerCouponsByMaxPrice",
      
    // ];
    // const linksLogin=[ 
//      "/login",
// ];


    // const options= ["All Companies", "Add Company", "All Customers", "Add Customer",
    // "Company Details", "All Company Cuoupons", "Add Couponn",
    // "Customer Details", "My Cuoupons",];


    // const links = ["/admin/getAllCompanies","/admin/addCompany","/admin/getAllCustomers","/admin/addCustomer",
    // "/company/getCompanyDetails","/company/getAllCompanyCoupons","/company/addCoupon",
    // "/customer/getCustomerDetails","/customer/getCustomerCoupons",];

return(

<Box sx={{ flexGrow: 1 }}>
<AppBar position="static">
  <Toolbar>
    <IconButton
      //size="large"
    //  edge="start"
      color="inherit"
      // aria-label="menu"
      // sx={{ mr: 2 }}
      onClick={()=> {
          navigate(-1);
      }}
    >
      {/* <MenuIcon/> */}
      <ArrowBackIcon/>
    </IconButton>
     <IconButton
      id="basic-button"
      aria-controls={open? "basic-menu":undefined}
      aria-haspopup="true"
      aria-expanded={open? "true": undefined}
      onClick={handleClick}
      color="inherit">
<MenuIcon/>
    </IconButton>
    




    <Menu
    id= "basic-menu"
    anchorEl={anchorE1}
    open={open}
    onClose={handleClose}
    MenuListProps={{
      "aria-labelledby":"basic-button",
    }}>

{store.getState().authState.userType==="ADMIN" && 
adminOptions.map((option,index)=>(
<MenuItem
key={index}
onClick={()=>{
  navigate(adminLinks[index]);
  handleClose();
}}>
  {option}
</MenuItem>
))}

{store.getState().authState.userType==="COMPANY" && 
companyOptions.map((option,index)=>(
<MenuItem
key={index}
onClick={()=>{
  navigate(companyLinks[index],{state:{companyId:0},});
  handleClose();
}}>
  {option}
</MenuItem>
))}

{store.getState().authState.userType==="CUSTOMER" && 
customerOptions.map((option,index)=>(
<MenuItem
key={index}
onClick={()=>{
  navigate(customerLinks[index],{state:{customerId:0},});
  handleClose();
}}>
  {option}
</MenuItem>
))}
</Menu>
    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
    COUPONS
    </Typography>

  {store.getState().authState.userType=="" ? <Button color="inherit" onClick={login}>Login</Button> :
   <Button color="inherit" onClick={logout}>Logout</Button>}
  </Toolbar>
</AppBar>
</Box>
);
}


export default MyHeader;





//         const [anchorE1 , setAnchorE1] = useState<null|HTMLElement>(null);
//     const open = Boolean(anchorE1);
//     const [type , setType] = useState('');
//     const [menuOptions,setMenuOptions]=useState([]);
//     const [menuLinks,setMenuLinks]=useState([]);

//     const handleClick =(event:React.MouseEvent<HTMLButtonElement>)=>{
//         const newType =store.getState().authState.userType;
//         setType(newType);
//         if (type==='ADMIN'){
//             setMenuOptions(adminOptions);
//             setMenuLinks(adminLinks);
//         }else if(type==='COMPANY'){
//             setMenuOptions(companyOptions);
//             setMenuLinks(companyLinks);
//         }else if(type==='CUSTOMER'){
//             setMenuOptions(customerOptions);
//             setMenuLinks(customerLinks);
//         }else{
//             setMenuOptions([]);
//             setMenuLinks([]);
//         }
//         setAnchorE1(event.currentTarget);
//     };

//     const handleClose=()=>{
//         setAnchorE1(null);
//     };

//     const navigate = useNavigate();

// const dispatch = useDispatch();

// const logout =()=>{
//     dispatch(userLogout());
//     handleClose();
//     navigate("/");
// }
    
// const adminOptions = ["All Companies", "Add Company", "All Customers", "Add Customer",];
// const adminLinks =["/admin/getAllCompanies","/admin/addCompany","/admin/getAllCustomers","/admin/addCustomer",];
      
        
// const companyOptions = ["Company Details", "All Company Cuoupons", "Add Couponn",];
// const companyLinks =["/company/getCompanyDetails","/company/getAllCompanyCoupons","/company/addCoupon",];
      
        
// const customerOptions = ["Customer Details", "My Cuoupons",];
// const customerLinks =["/customer/getCustomerDetails","/customer/getCustomerCoupons",];
    
//     // const linksCompany =[
     
//     //   "/company/updateCoupon",
//     //   "/company/deleteCoupon",
    
//     //   "/company/getCouponByCategory",
//     //   "/company/getCouponByMaxPrice" ,
     
//     // ];
    
//     // const linksCustomer = [
//     //   "/customer/purchaseCoupon",
    
//     //   "/customer/getCustomerCouponsByCategory",
//     //   "/customer/getCustomerCouponsByMaxPrice",
      
//     // ];
//     // const linksLogin=[ 
// //      "/login",
// // ];


//     const options= ["All Companies", "Add Company", "All Customers", "Add Customer",
//     "Company Details", "All Company Cuoupons", "Add Couponn",
//     "Customer Details", "My Cuoupons",];


//     const links = ["/admin/getAllCompanies","/admin/addCompany","/admin/getAllCustomers","/admin/addCustomer",
//     "/company/getCompanyDetails","/company/getAllCompanyCoupons","/company/addCoupon",
//     "/customer/getCustomerDetails","/customer/getCustomerCoupons",];





//RETURN:


// <Box sx={{ flexGrow: 1 }}>
// <AppBar position="static">
//   <Toolbar>
//     <IconButton
//       //size="large"
//     //  edge="start"
//       color="inherit"
//       // aria-label="menu"
//       // sx={{ mr: 2 }}
//       onClick={()=> {
//           navigate(-1);
//       }}
//     >
//       {/* <MenuIcon /> */}
//       {/* <ArrowBackIcon/> */}
//     </IconButton>
//     <IconButton
//       id="basic-button"
//       aria-controls={open? "basic-menu":undefined}
//       aria-haspopup="true"
//       aria-expanded={open? "true": undefined}
//       onClick={handleClick}
//       color="inherit">
// <MenuIcon/>
//     </IconButton>
//     <Menu
//     id= "basic-menu"
//     anchorEl={anchorE1}
//     open={open}
//     onClose={handleClose}
//     MenuListProps={{
//       "aria-labelledby":"basic-button",
//     }}>

// {store.getState().authState.userType==="ADMIN" && 
// adminOptions.map((option,index)=>(
// <MenuItem
// key={index}
// onClick={()=>{
//   navigate(adminLinks[index]);
//   handleClose();
// }}>
//   {option}
// </MenuItem>
// ))}

// {store.getState().authState.userType==="COMPANY" && 
// companyOptions.map((option,index)=>(
// <MenuItem
// key={index}
// onClick={()=>{
//   navigate(companyLinks[index],{state:{companyId:0},});
//   handleClose();
// }}>
//   {option}
// </MenuItem>
// ))}

// {store.getState().authState.userType==="CUSTOMER" && 
// customerOptions.map((option,index)=>(
// <MenuItem
// key={index}
// onClick={()=>{
//   navigate(customerLinks[index],{state:{customerId:0},});
//   handleClose();
// }}>
//   {option}
// </MenuItem>
// ))}
// <Divider/>
// <MenuItem onClick={logout}>
// Logout{" "}
// <ListItemIcon>
//   <Logout fontSize="small"/>
// </ListItemIcon>
// </MenuItem>
// /</Menu>
//     <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//     COUPONS
//     </Typography>

//     <Button color="inherit" onClick={()=>navigate("/login")}>Login</Button>
//   </Toolbar>
// </AppBar>
// </Box>




// return (
//     <div className="myHeader" >
//        <h1>COUPONS</h1>
//        <div style={{textAlign:"end",padding:"0px 20px 0px 30px"}}>
//            <NavLink to="/login">sign in</NavLink>
//            <br/>
//             <NavLink to="/logout">sign out</NavLink>
//            </div>
// </div>
// );



// RETURN
//  {adminMenu()}
//   {companyMenu()}
//   {customerMenu()}   

//   const adminMenu = ()=>{ 
//  return(
//            <>
//  <details>
//          <summary>Admin</summary>
//                  <div>
//            <ul>
//             <li><NavLink to="/admin/addCompany">Add Company</NavLink></li>

//              <li><NavLink to="/admin/getAllCompanies">All Companies</NavLink></li>

//             <li><NavLink to="/admin/addCustomer">Add Customer</NavLink></li>

//              <li><NavLink to="/admin/getAllCustomers">All Customers</NavLink></li>

//           </ul>
//         </div>
//       </details>
//      </>  
//  <Menu>
//  <MenuItem
//  onClick={()=>{
//              navigate("/admin/addCompany")
//            }}
//            color="primary">
//  Add Company
//  </MenuItem>

//  <MenuItem
//  onClick={()=>{
//              navigate("/admin/getAllCompanies")
//            }}
//            color="primary">
//  All Companies
//  </MenuItem>
//  </Menu>>

//  );
//     };


//  const companyMenu = ()=>{
//    return(
//        <>
//  <details>
//        <summary>Company</summary>
//        <div>
//          <ul>
//            <li><NavLink to="/company/addCoupon">Add Coupon</NavLink></li>

//            <li><NavLink to="/company/updateCoupon">Update Coupon</NavLink></li> 

//             <li><NavLink to="/company/deleteCoupon">Delete Coupon</NavLink></li> 

//             <li><NavLink to="/company/getAllCompanyCoupons">Company Coupons</NavLink></li> 

//            <li><NavLink to="/company/getCouponByCategory">Company Coupons By Category</NavLink></li> 

//             <li><NavLink to="/company/getCouponByMaxPrice">Company Coupons By Price</NavLink></li> 

//            <li><NavLink to="/company/getCompanyDetails"  >Company Details</NavLink></li> 


//  <MenuItem
// onClick={()=>{
//              navigate("/company/getCompanyDetails",{state:{companyId:0},})
//                        }}
//           color="primary">
//  Company Details
//  </MenuItem>
//         </ul>
//        </div>
//      </details>

// </>
//   );
//    };

//  const customerMenu = ()=>{ 
//   return(
//        <>
//  <details>
//     <summary>Customer</summary>
//        <div>
//       <ul>
//           <li><NavLink to="/customer/purchaseCoupon">Purchase Coupon</NavLink></li>
//            <li><NavLink to="/customer/getCustomerCoupons">Customer Coupons</NavLink></li>

//            <li><NavLink to="/customer/getCustomerCouponsByCategory">Customer Coupons By Category</NavLink></li>
//            <li><NavLink to="/customer/getCustomerCouponsByMaxPrice">Customer Coupons By Price</NavLink></li>

//            <li><NavLink to="/customer/getCustomerDetails">Customer Details</NavLink></li>
//          </ul>

//        </div>
//      </details>
//        </>
//    );
// };  