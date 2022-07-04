import { Menu } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import MyMenu from "../layout/mainLayout/myMenu/myMenu";
import "./clientRouting.css";
import MyMain from '../layout/mainLayout/myMain/myMain';
import AddCompany from "../admin/addCompany/addCompany";
import AddCustomer from "../admin/addCustomer/addCustomer";
import GetAllCompanies from "../admin/getAllCompanies/getAllCompanies";
import GetAllCustomers from "../admin/getAllCustomers/getAllCustomers";
import GetOneCompany from "../admin/getOneCompany/getOneCompany";
import UpdateCompany from "../admin/updateCompany/updateCompany";
import UpdateCustomer from "../admin/updateCustomer/updateCustomer";
import GetOneCustomer from "../admin/getOneCustomer/getOneCustomer";
import PurchaseCoupon from "../customer/purchaseCoupon/purchaseCoupon";
import AddCoupon from "../company/addCoupon/addCoupon";
import DeleteCoupon from "../company/deleteCoupon/deleteCoupon";
import GetAllCompanyCoupons from "../company/getAllCompanyCoupons/getAllCompanyCoupons";
import GetCompanyDetails from "../company/getCompanyDetails/getCompanyDetails";
import GetCouponByCategory from "../company/getCouponByCategory/getCouponByCategory";
import UpdateCoupon from "../company/updateCoupon/updateCoupon";
import GetCustomerCoupons from "../customer/getCustomerCoupons/getCustomerCoupons";
import GetCustomerCouponsByCategory from "../customer/getCustomerCouponsByCategory/getCustomerCouponsByCategory";
import GetCustomerDetails from "../customer/getCustomerDetails/getCustomerDetails";
import GetCustomerCouponsByMaxPrice from "../customer/getCustomerCouponsByMaxPrice/getCustomerCouponsByMaxPrice";
import GetCouponByMaxPrice from "../company/getCouponByMaxPrice/getCouponByMaxPrice";
import Page404 from "../user/page404/page404";
import Login from "../user/login/login";
import Logout from './../user/logout/logout';
import Guest from "../user/guest/guest";
import HomePage from "../layout/mainLayout/homePage/homePage";

function ClientRouting(): JSX.Element {
    return (
        <div className="clientRouting">
			<Routes>
                 {/* admin */}
                <Route path="/" element={<MyMain/>}/>
                <Route path = "homePage" element={<HomePage/>}/>
               {/*<Route index element={<MyMenu/>}/>*/}
                <Route path="admin/addCompany" element={<AddCompany/>}/>
                <Route path="admin/addCustomer" element={<AddCustomer/>}/>
               {/* <Route path="admin/deleteCompany" element={<DeleteCompany/>}/>*/}
                 {/*<Route path="admin/deleteCustomer" element={<DeleteCustomer/>}/>*/}
                <Route path="admin/getAllCompanies" element={<GetAllCompanies/>}/>
                <Route path="admin/getAllCustomers" element={<GetAllCustomers/>}/>
                <Route path="admin/getOneCustomer" element={<GetOneCustomer/>}/>
                <Route path="admin/getOneCompany" element={<GetOneCompany/>}/>
                <Route path="admin/updateCompany" element={<UpdateCompany/>}/>
                <Route path="admin/updateCustomer" element={<UpdateCustomer/>}/> 
               
                {/* company */}
                <Route path="company/addCoupon" element={<AddCoupon/>}/>
                <Route path="company/deleteCoupon" element={<DeleteCoupon/>}/>
                <Route path="company/getAllCompanyCoupons" element={<GetAllCompanyCoupons/>}/>
                <Route path="company/getCompanyDetails" element={<GetCompanyDetails/>}/>
                <Route path="company/getCouponByCategory" element={<GetCouponByCategory/>}/>
                <Route path="company/getCouponByMaxPrice" element={<GetCouponByMaxPrice/>}/>
                <Route path="company/updateCoupon" element={<UpdateCoupon/>}/>

                {/* Customer */}
                <Route path="customer/getCustomerCoupons" element={<GetCustomerCoupons/>}/>
                <Route path="customer/getCustomerCouponsByCategory" element={<GetCustomerCouponsByCategory/>}/>
                <Route path="customer/getCustomerCouponsByMaxPrice" element={<GetCustomerCouponsByMaxPrice/>}/>
                <Route path="customer/getCustomerDetails" element={<GetCustomerDetails/>}/>
                <Route path="customer/purchaseCoupon" element={<PurchaseCoupon/>}/>


                <Route path="login" element={<Login/>}/>
                {/* <Route path="guest" element={<Guest/>}/> */}
                <Route path="logout" element={<Logout/>}/>
                <Route path="*" element={<Page404/>}/>          
            </Routes>
        </div>
    );
}

export default ClientRouting;
