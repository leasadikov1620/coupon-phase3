import { Button, ButtonGroup, FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import categoryArr from "../../../modal/categoryModal";
import CouponData from "../../../modal/couponModal";
import { updateCoupon } from "../../../redux/couponState";
import { store } from "../../../redux/store";
import globals from "../../../util/global";
import jwtAxios from "../../../util/JWTaxios";
import notify, { ErrorMsg, SuccessMsg } from "../../../util/notify";
import "./updateCoupon.css";

function UpdateCoupon(): JSX.Element {
    const{ register,handleSubmit, formState:{errors}}=useForm<CouponData>();
    const location = useLocation();
    const navigate = useNavigate();
    const [coupon,setCoupon] = useState(new CouponData());
    const {couponId} = location.state as any;

    useEffect(()=>{
        console.log(couponId);
        setCoupon(store.getState().couponState.coupon.find(item=>couponId==item.id))

    },[])
    
    const send = ()=> {
        jwtAxios.put(globals.company.updateCoupon,coupon)
        .then(response =>{
            if(response.status==200){
                notify.success(SuccessMsg.COUPON_UPDATED);
               // navigate("/company/getAllCompanyCoupons");
            }else{
                notify.error(ErrorMsg.COUPON_NOT_UPDATED);
                console.log(response.data);
            }
        })
        
        .then(()=> {
            store.dispatch(updateCoupon(coupon));
            navigate("/company/getAllCompanyCoupons",{state:{companyId:0}});
        })
        .catch(err=>{
            notify.error(err);
            console.log(err);
        })
    };



const handleInputChange = (args:any)=>{
        const {name, value} = args.target;
        setCoupon({
            ...coupon,
            [name]:value,
    
        });
      };

      
    const handleChange = (event: SelectChangeEvent) => {
      coupon.category=event.target.value as string;
      
   };
    
    return (
        <div className="updateCoupon SolidBox">
		 <Typography variant="h3" className="HeadLine">
            Update Coupon
            </Typography>
      <hr />
      <br />
      <form onSubmit={handleSubmit(send)}>
        <TextField
          name="endDate"
          label="End date"
          variant="outlined"
          className="TextBox"
          fullWidth 
           value={coupon.endDate} onChange={handleInputChange} />
              <span>{errors.endDate?.message}</span>
        <br /><br />

        <TextField
          name="StartDate"
          label="Start date"
          variant="outlined"
          className="TextBox"
          fullWidth 
           value={coupon.startDate} onChange={handleInputChange} />
             <span>{errors.startDate?.message}</span>
        <br /><br />


        <TextField
          name="price"
          label="Price"
          variant="outlined"
          className="TextBox"
          fullWidth
            value={coupon.price} onChange={handleInputChange} />
             <span>{errors.price?.message}</span>
        <br /><br />


        <TextField
          name="image"
          label="Image"
          variant="outlined"
          className="TextBox"
          fullWidth
           value={coupon.image} onChange={handleInputChange} />
         <span>{errors.image?.message}</span>
        <br /><br />


        <TextField
          name="title"
          label="Title"
          variant="outlined"
          className="TextBox"
          fullWidth
           value={coupon.title} onChange={handleInputChange} />
              <span>{errors.title?.message}</span>
        <br /><br />



        <TextField
          name="amount"
          label="Amount"
          variant="outlined"
          className="TextBox"
          fullWidth 
          value={coupon.amount} onChange={handleInputChange} />
            <span>{errors.amount?.message}</span>
        <br /><br />


        {/* <TextField
          name="category"
          label="Category"
          variant="outlined"
          className="TextBox"
          fullWidth
           value={coupon.category} onChange={handleInputChange} />
            <span>{errors.category?.message}</span>
        <br /><br /> */}

<FormControl fullWidth >
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select  {...register("category",{
                required: "Please select a category",
            })}    
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={coupon.category}  name="category"   
            label="Category"
            onChange={handleChange}
            >
                {categoryArr.map((item,index)=>
            <MenuItem key={index} value={item}>{item}</MenuItem>
            )}
            </Select>
            </FormControl> 
             {/* <FormHelperText style={{ color: "#d32f2f" }}> */}
             <FormHelperText >
            {errors.category?.message}
            </FormHelperText>
            <br />



        <TextField
          name="description"
          label="Description"
          variant="outlined"
          className="TextBox"
          fullWidth
           value={coupon.description} onChange={handleInputChange} />
            <span>{errors.description?.message}</span>
        <br /><br />
        <ButtonGroup variant="contained" fullWidth>
                    <Button type="submit" color="primary" >update</Button>
                </ButtonGroup>
                <br />
            </form>
        </div>
    );
}

export default UpdateCoupon;
