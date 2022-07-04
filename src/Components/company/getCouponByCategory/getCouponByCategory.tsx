import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CouponData from "../../../modal/couponModal";
import { store } from "../../../redux/store";
import SingleCoupon from "../singleCoupon/singleCoupon";
import "./getCouponByCategory.css";

function GetCouponByCategory(): JSX.Element {
    const location = useLocation();
    const[coupons,setCoupons]=useState<CouponData[]>([])
    const {categoryTitle} = location.state as any;

    useEffect(()=>{
        if(store.getState().authState.userType=='COMPANY'){
        setCoupons(store.getState().couponState.coupon.filter(item=> item.category===categoryTitle))
     
    }
    },[])

    
    return (
        <div className="getCouponByCategory">
			<h1>coupons by {categoryTitle} category</h1><hr/>
            {coupons.map(item=><SingleCoupon key={item.id} coupon={item}/>)}
        </div>
    );
}

export default GetCouponByCategory;
