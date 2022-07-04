import "./guest.css";
import jwtAxios from './../../../util/JWTaxios';
import globals from "../../../util/global";
import { useEffect, useState } from "react";
import { store } from "../../../redux/store";
import notify, { SuccessMsg } from "../../../util/notify";
import { downloadAll, guestState } from './../../../redux/guestState';
import CouponData from "../../../modal/couponModal";
import SingleCoupon from "../../company/singleCoupon/singleCoupon";

function Guest(): JSX.Element {
//     const[coupons,setCoupons]=useState<CouponData[]>([]);

//     useEffect(()=>{
//         //if (store.getState().authState.userType==="") {
//             jwtAxios.get("http://localhost:8080/guest/allCoupons")
//            .then(response=>{
//           //  if(response.status==200){
//             store.dispatch(downloadAll(response.data))
//           setCoupons(store.getState().guestState.coupons)
//        // }
//            })
//            .catch(err=>{
//             notify.error(err);
//              console.log(err);
//          })
//    // }
// },[])

    return (
        <div className="guest">
            <h1></h1>
			{/* {coupons.map(item => <SingleCoupon key={item.id} coupon={item}/>)} */}
        </div>
    );
}

export default Guest;
