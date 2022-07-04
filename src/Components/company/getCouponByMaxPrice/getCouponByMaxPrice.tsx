import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CouponData from "../../../modal/couponModal";
import { store } from "../../../redux/store";
import SingleCoupon from "../singleCoupon/singleCoupon";
import "./getCouponByMaxPrice.css";

function GetCouponByMaxPrice(): JSX.Element {
    const location = useLocation();
    const[coupons,setCoupons]=useState<CouponData[]>([])
    const {maxPrice} = location.state as any;

    useEffect(()=>{
        if(store.getState().authState.userType=='COMPANY'){
        setCoupons(store.getState().couponState.coupon.filter(item=> item.price<=maxPrice))
     
    }
    },[])
    console.log(coupons);
    
    return (
        <div className="getCouponByMaxPrice">
			<h1>coupons by max price</h1><hr/>
            {coupons.map(item=><SingleCoupon key={item.id} coupon={item}/>)}
        </div>
    );
}

export default GetCouponByMaxPrice;
