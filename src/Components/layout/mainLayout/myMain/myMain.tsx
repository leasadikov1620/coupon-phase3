import "./myMain.css";
import { store } from './../../../../redux/store';
import { downloadCoupons } from "../../../../redux/couponState";
import SingleCoupon from "../../../company/singleCoupon/singleCoupon";
import { useEffect, useState } from 'react';
import CouponData from "../../../../modal/couponModal";
import CompanyData from './../../../../modal/companyModal';
import SingleCompany from "../../../company/singleCompany/singleCompany";
import { downloadAll } from "../../../../redux/guestState";
import globals from "../../../../util/global";
import jwtAxios from "../../../../util/JWTaxios";
import notify from "../../../../util/notify";

function MyMain(): JSX.Element {
// const coupon = store.getState().couponState.coupon;
// const [coupons,setCoupons] = useState<CouponData[]>([]);
// const [companies,setCompanies] = useState<CompanyData[]>([]);

// useEffect(()=>{
//     setCoupon(store.getState().couponState.coupon)

// },[])

// const allCoupons = ()=>{
//     if(store.getState().authState.userType ===""){
//         setCoupons(store.getState().couponState.coupon)
//        // store.dispatch(downloadCoupons(coupon))
//     }

// }


//useEffect(()=>{
  //  if(store.getState().authState.userType ==="" || store.getState().authState.userType !=""){
    //   setCompanies(store.getState().companyState.company)
      // console.log("wehweh")
       // companies.map(item=><SingleCompany key={item.id} company={item}/>)
      // .filter(item => item.coupons))
      // coupons.push(companies.map(item=>item.coupons))
       //coupons.push(store.getState().companyState.company.map(item => item.coupons))
       // setCompanies(store.getState().companyState.company)
        //setCoupons(store.getState().couponState.coupon)
        //setCoupons(companies.forEach(item=> item.(item.coupons)))
       // setCoupons(companies.forEach(item=> item.id>0))

  // }

//},[])


   // const allCoupons = ()=>{
    //      if(store.getState().authState.userType ===""){
    //         return(
    //         store.dispatch(downloadCoupons(coupon))
    //     //  (store.getState().companyState.company)
    //     );}
    // }

    // useEffect(()=>{
    //     if(store.getState().authState.userType ===""){
    //     store.dispatch(downloadCoupons(coupon))
    //     }
    // },[])


    // {store.getState().authState.userType ==="" && 
    //         {allCoupons}} 
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
const[coupons,setCoupons]=useState<CouponData[]>([]);

    useEffect(()=>{
        //if (store.getState().authState.userType==="") {
            jwtAxios.get("http://localhost:8080/guest/allCoupons")
           .then(response=>{
          //  if(response.status==200){
            store.dispatch(downloadAll(response.data))
          setCoupons(store.getState().guestState.coupons)
       // }
           })
           .catch(err=>{
            notify.error(err);
             console.log(err);
         })
   // }
},[])

    return (
        <div className="myMain">
			<h2>All Coupons</h2><hr/>
            {/* {companies.map(item=><SingleCompany key={item.id} company={item}/>)} */}
            {/* {coupons.map(item => <SingleCoupon key={item.id} coupon={item}/>)} */}
            {coupons.map(item => <SingleCoupon key={item.id} coupon={item}/>)}
        </div>
    );
}

export default MyMain;
