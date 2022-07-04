import { createSolutionBuilderWithWatch } from 'typescript';
import CouponData from './../modal/couponModal';

export class couponState{
    coupon : CouponData[] =[];
}

export enum couponActionType{
DownloadCoupons = "DownloadCoupons",
AddCoupon = "AddCoupon",
UpdateCoupon = "UpdateCoupon",
DeleteCoupon ="DeleteCoupon",
ClearCoupons="ClearCoupons",
}

export interface couponAction{
    type:couponActionType,
    payload?:any;
}

export function downloadCoupons (coupons: CouponData[]):couponAction{
    return {type: couponActionType.DownloadCoupons , payload:coupons}
}

export function addCoupon (coupon : CouponData):couponAction{
    return {type: couponActionType.AddCoupon , payload:coupon}
}

export function updateCoupon(coupon : CouponData) : couponAction{
    return {type:couponActionType.UpdateCoupon , payload:coupon}
}

export function deleteCoupon (couponID : number): couponAction{
    return {type: couponActionType.DeleteCoupon , payload:couponID}
}

export function clearCoupons():couponAction{
    return {type:couponActionType.ClearCoupons}
}

export function couponReducer (currentState:couponState = new couponState ,action : couponAction) : couponState{
    var newCouponState = {...currentState};

    switch(action.type){
        case couponActionType.DownloadCoupons:
            newCouponState.coupon= action.payload;
        break;


        case couponActionType.AddCoupon:
            // newCouponState.coupon.push(action.payload);
            const newCoupons = [...newCouponState.coupon];
            newCoupons.push(action.payload);
            // newCouponState.coupon.push(action.payload);
            newCouponState.coupon = newCoupons;
        break;


        case couponActionType.UpdateCoupon:
            newCouponState.coupon = newCouponState.coupon.filter(item=> item.id != action.payload.id);
            newCouponState.coupon.push(action.payload);
        break;


        case couponActionType.DeleteCoupon:
            newCouponState.coupon= newCouponState.coupon.filter(item=> item.id != action.payload);
        break;

        case couponActionType.ClearCoupons:
            newCouponState.coupon=[];
        break;
    }
    return newCouponState;
}