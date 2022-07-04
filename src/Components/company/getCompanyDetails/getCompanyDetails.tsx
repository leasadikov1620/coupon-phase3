import { useLocation } from "react-router-dom";
import { store } from "../../../redux/store";
import "./getCompanyDetails.css";
import SingleCompany from './../singleCompany/singleCompany';
import { useEffect, useState } from "react";
import CompanyData from "../../../modal/companyModal";
import jwtAxios from "../../../util/JWTaxios";
import globals from "../../../util/global";

function GetCompanyDetails(): JSX.Element {
    const [company,setCompany] = useState(new CompanyData()); 
  //  const location = useLocation();
    // const {companyId}=location.state as any;
      //useEffect(()=>{
   //console.log(companyId);
    //setCompany(store.getState().companyState.company.find(item=>company.id==item.id))        
   //},[])
   
     //const [loggedInCompany,setCompany] = useState(new CompanyData());
     //store.getState().companyState.company;
    // jwtAxios.get<CompanyData[]>(globals.admin.getAllCompanies)
     useEffect(()=>{
        setCompany(store.getState().companyState.company[0]);     
    },[])

 

    return (
        <div className="getCompanyDetails">
			<h1>company details</h1><hr/>
           {<SingleCompany company={company}/>}
        </div>
    );
}

export default GetCompanyDetails;
