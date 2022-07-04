import "./getAllCompanyCoupons.css";
import CouponData from './../../../modal/couponModal';
import { SyntheticEvent, useEffect, useState } from "react";
import SingleCoupon from "../singleCoupon/singleCoupon";
import { store } from "../../../redux/store";
import jwtAxios from "../../../util/JWTaxios";
import globals from "../../../util/global";
import { downloadCoupons } from "../../../redux/couponState";
import { useLocation, useNavigate } from 'react-router-dom';
import CompanyData from "../../../modal/companyModal";
import notify from "../../../util/notify";
import { Box, Button, Fade, FormControl, FormControlLabel, InputLabel, MenuItem, Select, SelectChangeEvent, Slider, Switch, TextField } from "@mui/material";
import categoryArr from "../../../modal/categoryModal";
import { clickOptions } from "@testing-library/user-event/dist/click";
import { BrowserRouter } from 'react-router-dom';

function GetAllCompanyCoupons(): JSX.Element {
    const [coupons,setCoupons] = useState<CouponData[]>([]); 
    const [maxCoupons,setMax] = useState<CouponData[]>([]); 
 const location = useLocation();
   const {companyId}=location.state as any;
   const[display,setDisplay]=useState(false)

   const {maxPrice} = location.state as any;

    const navigate = useNavigate();
    useEffect(()=>{
       
        if (store.getState().authState.userType==="ADMIN") {
            let company= store.getState().companyState.company.find(item=> item.id==companyId);
            //let company= store.getState().companyState.company[0];
            setCoupons(company.coupons);
          
        }else if(store.getState().authState.userType==="COMPANY"){
           setCoupons(store.getState().couponState.coupon);
            setMax(store.getState().couponState.coupon.filter(item=> item.price<=maxPrice))
            
        }else{
            notify.error("wrong company");
            navigate("/login");
        }
    
    },[])

  console.log(coupons);


  const[getCategory,setCategory]=useState("");

    const searchCategory=(sender:SelectChangeEvent)=>{
        let value= (sender.target as HTMLSelectElement).value;
        setCategory(value);
      //  setDisplay(true); 
    }

    const[getPrice,setPrice]=useState(null);

      const searchPrice=(sender: SyntheticEvent)=>{
      const priceValue = (sender.target as HTMLInputElement).value;
      setPrice(priceValue);
  }
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
  setChecked((prev) => !prev);
  };
 //  const searchPrice =(event:React.MouseEvent<HTMLSelectElement>)=>{
  //  setPrice(event.target as number)
    // const searchPrice = (event: Event, newValue: number| number[]) => {
      // const priceValue = (sender.target as HTMLElement);
   // const searchPrice=(sender: SyntheticEvent)=>{
        //const priceValue = (sender.target as HTMLElement);
       // setPrice((event as HTMLSelectElement).value);
  //      setCategory("")
   //     setDisplay(true); 
  //  }

  

    return (
        <div className="getAllCompanyCoupons" style={{textAlign:"center"}}>
			<h1>All Company Coupons</h1><hr/>
      <FormControlLabel
        control={<Switch checked={checked} onChange={handleChange} />}
        label="filters"
        />
        <Fade in={checked}>
        <div style={{ textAlign:"center" }}>
        {/* width: '100%' */}
            <FormControl fullWidth >
                <InputLabel id="demo-simple-select-label">Search By Category </InputLabel>
                <Select 
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="category"   
                label="Category"
                value={getCategory}
                onChange={searchCategory}
            >
                
            {categoryArr.map((item,index)=>
            <MenuItem key={index} value={item}>{item}</MenuItem>
            )}
            
            </Select>
            </FormControl> 
         
            {/* <Box padding={10} width={800} >
      <Slider defaultValue={0} aria-label="Default" valueLabelDisplay="auto" />
    </Box> */}


    <Box sx={{ textAlign:"center" }}>
    {/* width: 800 */}
      <Slider
        aria-label="Default"
        defaultValue={0}
        valueLabelDisplay="auto"
        step={1}
        min={0}
        max={maxPrice}
        //onChange={searchPrice}
      />
    </Box>

<br /><br />
{/* <FormControl fullWidth >
        <InputLabel id="demo-simple-select-label">Search By Price </InputLabel>
        <TextField type={"number"} onChange={searchPrice} value={getPrice} variant="outlined" className="TextBox"> </TextField>
        </FormControl>

        <Box sx={{display: 'flex', p: 1,m:1 }}>
        <Button fullWidth variant="contained" color="info" onClick={() => {
                setDisplay(true); 
        }}>Find</Button> 
        </Box>
        <Box sx={{display: 'flex', p: 1,m:1 }}>
        <Button fullWidth variant="contained"  color="secondary" onClick={() => {
            setDisplay(false); 
            setCategory("");
            setPrice(0);
        }}>Rest</Button> 
        </Box>*/}
        </div>
        </Fade>  
       
            {( display==true) &&coupons.filter(item=>item.category==getCategory).map(item=><SingleCoupon key={item.id} coupon={item}/>)}
            {/* {( display==true) &&coupons.filter(item=>item.price <=getPrice).map(item=><SingleCoupon key={item.id} coupon={item}/>)}   */}
            {( display==true) && maxCoupons.map(item=> <SingleCoupon key={item.id} coupon={item}/>)}
            {( display==!true) &&coupons.map(item => <SingleCoupon key={item.id} coupon={item}/>)}
           
        </div>
    );
}


export default GetAllCompanyCoupons;



