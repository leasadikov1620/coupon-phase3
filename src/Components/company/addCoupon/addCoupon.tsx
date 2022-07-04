import "./addCoupon.css";
import { useForm } from 'react-hook-form';
import CouponData from "../../../modal/couponModal";
import { useLocation, useNavigate } from "react-router-dom";
import jwtAxios from "../../../util/JWTaxios";
import globals from "../../../util/global";
import notify, { ErrorMsg, SuccessMsg } from "../../../util/notify";
import { store } from "../../../redux/store";
import { addCoupon } from './../../../redux/couponState';
import { Button, ButtonGroup, FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { useState } from "react";
import categoryArr from "./../../../modal/categoryModal";

function AddCoupon(): JSX.Element {
    const{ register,handleSubmit, formState:{errors}}=useForm<CouponData>();
    const navigate = useNavigate();
    const location = useLocation();
    
    const send = (createCoupon: CouponData) => {
        jwtAxios.post(globals.company.addCoupon,createCoupon)
        .then(response => {
            if (response.status == 200 ) {
                createCoupon.id =response.data;
               // createCoupon.id =response.data;
               notify.success(SuccessMsg.COUPON_ADD);
             
            } else {
                notify.error(ErrorMsg.COUPON_NOT_ADD);
            }
        })
        .then(() => {
            store.dispatch(addCoupon(createCoupon));
           navigate("/homePage")
          })
          .catch(err => {
            //navigate("/");
            console.log(err);
            notify.error("something went wrong, please check if date values are valid");
    
          })
    };


    const [category, setCategory] = useState("");
    
        const handleChange = (event: SelectChangeEvent) => {
            setCategory(event.target.value as string);
        };

        
  // }else if(createCoupon.startDate<createCoupon.endDate){
  //   notify.success(SuccessMsg.COUPON_ADD);
  //   notify.error("start date cannot be after end date!")    
    return (
        <div className="addCoupon SolidBox">
		 <Typography variant="h3" className="HeadLine">
            Add A Coupon
            </Typography>
      <hr />
      <br />
      <form onSubmit={handleSubmit(send)}>

        <TextField
        type={"date"}
          name="Start date"
          label="Start date"
          variant="outlined"
          className="TextBox"
          fullWidth {...register("startDate", {
            required: {
              value: true,
              message: "Missing name",
            },
            })} />
             {errors.startDate && <span>message error : {errors.startDate.message}</span>}
        <br /><br />

        <TextField
        type={"date"}
          name="End date"
          label="End date"
          variant="outlined"
          className="TextBox"
          fullWidth {...register("endDate", {
            required: {
              value: true,
              message: "Missing name",
            },
            })} />
             {errors.endDate && <span>message error : {errors.endDate.message}</span>}
        <br /><br />


        <TextField
          type={"number"}
          name="Price"
          label="Price"
          variant="outlined"
          className="TextBox"
          fullWidth {...register("price", {
            min:1,
            required: {
              value: true,
              message: "Missing name",
            },
          })} />
           {errors.price && <span>message error : {errors.price.message}</span>}
        <br /><br />

        {/* <HTMLImageElement/> */}

        
        <TextField
        type="text"
          name="Image"
          label="Image"
          variant="outlined"
          className="TextBox"
          fullWidth {...register("image", {
            required: {
              value: true,
              message: "Missing name",
            },
            })} />
             {errors.image && <span>message error : {errors.image.message}</span>}
        <br /><br />


        <TextField
          name="Title"
          label="Title"
          variant="outlined"
          className="TextBox"
          fullWidth {...register("title", {
            required: {
              value: true,
              message: "Missing name",
            },
            })} />
             {errors.title && <span>message error : {errors.title.message}</span>}
        <br /><br />



        <TextField
          type={"number"}
          name="Amount"
          label="Amount"
          variant="outlined"
          className="TextBox"
          fullWidth {...register("amount", {
            required: {
              value: true,
              message: "Missing name",
            },
            })} />
             {errors.amount && <span>message error : {errors.amount.message}</span>}
        <br /><br />


        {/* <TextField
          name="Category"
          label="Category"
          variant="outlined"
          className="TextBox"
          fullWidth {...register("category", {
            required: {
              value: true,
              message: "Missing name",
            },
            })} />
             {errors.category && <span>message error : {errors.category.message}</span>} */}
        {/* <br /><br /> */}

            <FormControl fullWidth >
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select  {...register("category",{
                required: "Please select a category",
            })}    
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}  name="category"   
            label="Category"
            onChange={handleChange}
            >
                {categoryArr.map((item,index)=>
            <MenuItem key={index} value={item}>{item}</MenuItem>
            )}
            </Select>
            </FormControl> 
            <FormHelperText style={{ color: "#d32f2f" }}>
            {errors.category?.message}
            </FormHelperText>
            <br /><br />

            
        <TextField
          name="Description"
          label="Description"
          variant="outlined"
          className="TextBox"
          fullWidth {...register("description", {
            required: {
              value: true,
              message: "Missing name",
            },
            })} />
             {errors.description && <span>message error : {errors.description.message}</span>}
        <br /><br />
        <ButtonGroup variant="contained" fullWidth>
          <Button type="submit" color="primary">
            Add
          </Button>
        </ButtonGroup>

            </form>
        </div>
    );
}

export default AddCoupon;
