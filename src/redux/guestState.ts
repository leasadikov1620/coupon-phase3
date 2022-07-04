import CouponData from "../modal/couponModal";


export class guestState{
    coupons:CouponData[] = [];
}
export enum guestActionType{
    ALL_COUPONS="All Coupons",
  
}
export interface guestAction{
    type: guestActionType,
    payload?:any;
}
export function downloadAll(coupons:CouponData[]):guestAction{
    return {type: guestActionType.ALL_COUPONS,payload:coupons};
}

export function guestReducer(currentState :guestState = new guestState, action:guestAction):guestState{
    let newState={...currentState};
    switch (action.type) {
      case guestActionType.ALL_COUPONS:
        newState.coupons = action.payload;
        break;
    }
    return newState;
}