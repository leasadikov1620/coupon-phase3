import { AppBar, Box, IconButton, Menu, MenuItem, Toolbar } from "@mui/material";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { store } from "../../../../redux/store";
import "./myMenu.css";
import notify from './../../../../util/notify';

function MyMenu(): JSX.Element {
  const navigate = useNavigate();

// const handleMenu =()=>{
//   if(store.getState().authState.userType==="ADMIN"){
//     return(
//       <>
//       <details>
//       <summary>Admin</summary>
//       <div>
//        <ul>
//        <li onClick={()=>{
//                  navigate("/admin/addCompany")
//                }}> Add Company </li>
      
//         <li  onClick={()=>{
//                  navigate("/admin/getAllCompanies")
//                }}>All Companies</li>

//                <li  onClick={()=>{
//                  navigate("/admin/addCustomer")
//                }}>Add Customer</li>

//           <li onClick={()=>{
//                  navigate("/admin/getAllCustomers")
//                }}>All Customers</li>
//                        </ul>
      
//       </div>
//       </details>
//       </>
//     );
//     }else if(store.getState().authState.userType==="COMPANY"){

//       return(
//         <>
//   <details>
//         <summary>Company</summary>
//         <div>
//           <ul>
//             <li  onClick={()=>{
//                    navigate("/company/addCoupon",{state:{companyId:0},})
//                  }}>Add Coupon</li>
  
//              <li onClick={()=>{
//                    navigate("/company/getAllCompanyCoupons",{state:{companyId:0},})
//                  }}> Company Coupons</li> 
       
      
//             <li onClick={()=>{
//                    navigate("/company/getCompanyDetails",{state:{companyId:0},})
//                  }} >Company Details</li> 
  
//          </ul>
//         </div>
//       </details>
  
//   </>
//    );
//     }else if(store.getState().authState.userType==="CUSTOMER"){
//       return(
//         <>
//   <details>
//      <summary>Customer</summary>
//         <div>
//        <ul>
//             <li onClick={()=>{
//     navigate("/customer/getCustomerCoupons",{state:{customerId:0},})
//   }}>Customer Coupons</li>
  
//             <li onClick={()=>{
//     navigate("/customer/getCustomerDetails",{state:{customerId:0},})
//   }}>Customer Details</li>
//           </ul>
//         </div>
//       </details>
//         </>
//     );
//     }else{
//       return( <div>

//       </div>
//       );
//     }
 
  

//}
  const adminMenu = ()=>{
    return(
      <>
      <details>
      <summary>Admin</summary>
      <div>
       <ul>
       <li onClick={()=>{
                 navigate("/admin/addCompany")
               }}> Add Company </li>
      
        <li  onClick={()=>{
                 navigate("/admin/getAllCompanies")
               }}>All Companies</li>

               <li  onClick={()=>{
                 navigate("/admin/addCustomer")
               }}>Add Customer</li>

          <li onClick={()=>{
                 navigate("/admin/getAllCustomers")
               }}>All Customers</li>
                       </ul>
      
      </div>
      </details>
      </>
    
 ) };
  
    

 const companyMenu = ()=>{
  return(
      <>
<details>
      <summary>Company</summary>
      <div>
        <ul>
          <li  onClick={()=>{
                 navigate("/company/addCoupon",{state:{companyId:0},})
               }}>Add Coupon</li>

           <li onClick={()=>{
                 navigate("/company/getAllCompanyCoupons",{state:{companyId:0},})
               }}> Company Coupons</li> 
     
    
          <li onClick={()=>{
                 navigate("/company/getCompanyDetails",{state:{companyId:0},})
               }} >Company Details</li> 

       </ul>
      </div>
    </details>

</>
 );
 };



const customerMenu = ()=>{ 
 return(
      <>
<details>
   <summary>Customer</summary>
      <div>
     <ul>
          <li onClick={()=>{
  navigate("/customer/getCustomerCoupons",{state:{customerId:0},})
}}>Customer Coupons</li>

          <li onClick={()=>{
  navigate("/customer/getCustomerDetails",{state:{customerId:0},})
}}>Customer Details</li>
        </ul>
      </div>
    </details>
      </>
  );
};  

const emptyMenu =()=>{
  <div>

  </div>
}

// const handleMenu =()=>{
// if(store.getState().authState.userType==="ADMIN"){
//   // return adminMenu();
 
// }else if(store.getState().authState.userType==="COMPANY"){
//   return companyMenu();
// // }else if(store.getState().authState.userType==="CUSTOMER"){
// //   return customerMenu();
// }else{

// }
// }


  return (
    <div className="myMenu">
{adminMenu()}
{companyMenu()}
{customerMenu()}
{/* {handleMenu()} */}
    </div>

    );
}

export default MyMenu;

