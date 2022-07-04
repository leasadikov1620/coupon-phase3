import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CouponData from "../../../modal/couponModal";
import { store } from "../../../redux/store";
import SingleCoupon from "../../company/singleCoupon/singleCoupon";
import "./getCustomerCoupons.css";

function GetCustomerCoupons(): JSX.Element {
    const [coupons,setCoupons]= useState<CouponData[]>([]);
    const location=useLocation();
    let{customerId}=location.state as any  

    
    useEffect(()=>{
        console.log(customerId);
        if(store.getState().authState.userType=='ADMIN') {
        let customer=store.getState().customerState.customer.find(item=>item.id==customerId);
        setCoupons(customer.coupons);
        } else if(store.getState().authState.userType=='CUSTOMER'){
            let customer=store.getState().customerState.customer[0];
            setCoupons(customer.coupons);
        }
    },[])

    return (
        <div className="getCustomerCoupons">
			<h1>All customer coupons</h1><hr/>
            {coupons.map(item => <SingleCoupon key={item.id} coupon={item}/>)}
        </div>
    );
}

export default GetCustomerCoupons;
