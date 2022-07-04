import {Notyf} from 'notyf'
import { idText } from 'typescript';

    export enum SuccessMsg{
        LOGIN_APPROVED= "Hello , welcome",
        COMPANY_ADD="Company was added succesfully",
        COMPANY_UPDATED = "Company was updated successfully",
        CUSTOMER_UPDATED= "customer was updated successfully",
        CUSTOMER_ADD="Customer was added succesfully",
        COMPANY_DELETED = "Company was deleted successfully",
        CUSTOMER_DELETED = "Customer was deleted successfully",
        COUPON_ADD="Coupon was added succesfully",
        COUPON_UPDATED="Coupon was updated succesfully",
        COUPON_DELETED="Coupon was deleted succesfully",
    }

    export enum ErrorMsg{
        LOGIN_ERROR="Bad user name or password",
        COMPANY_NOT_ADD = "Company already exists",
        BAD_TOKEN = "You must login first",
        COMPANY_NOT_UPDATED = "Could not update company",
        CUSTOMER_NOT_UPDATED = "Could not update customer",
        CUSTOMER_NOT_ADD = "  Customer already exists",
        CUSTOMER_NOT_DELETED = "Could not delete customer",
        COMPANY_NOT_DELETED = "Could not delete company",
        COUPON_NOT_ADD = "Could not add coupon",
        COUPON_NOT_UPDATED = "Could not update coupon",
        COUPON_NOT_DELETED = "Could not delete coupon",

    }

    class Notify {
        private notification = new Notyf({duration:4000 , position: {x:"center", y: "top"}})
       
    public success(message:string){
        this.notification.success(message);

    }
    
    public error(err:any){
       // this.notification.error(message);
        const msg= this.extractMsg(err);
        this.notification.error(msg);
    }

     private extractMsg(err:any):string{
         if(typeof err ==='string'){
             return err;
         }
         if(typeof err?.response?.data === 'string'){
                return err.response.data;

         }
         if(Array.isArray(err?.response?.data)){
             return err?.response?.data[0];
         }
          if(typeof err?.message == 'string'){
            return err?.message;
        }

        return "something went wrong!!!"
     }
}

const notify=new Notify();
export default notify;