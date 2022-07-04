import { SyntheticEvent, useEffect, useState } from "react";
import globals from "../../../util/global";
import jwtAxios from "../../../util/JWTaxios";
import "./getAllCompanies.css";
import notify, { ErrorMsg } from './../../../util/notify';
import { useNavigate } from "react-router-dom";
import SingleCompany from "../../company/singleCompany/singleCompany";
import CompanyData from "../../../modal/companyModal";
import { store } from "../../../redux/store";
import { downloadCompanies } from "../../../redux/companyState";
import { authState } from './../../../redux/authState';
import { Button, ButtonGroup } from "@mui/material";

function GetAllCompanies(): JSX.Element {
    const [search,setSearch] = useState("");
    const searchName = (sender:SyntheticEvent)=>{
        const value = (sender.target as HTMLInputElement).value;
        setSearch(value);
    };
    const clearMe = ()=>{
        setSearch("");
    };

   const navigate = useNavigate();
    const [companies, setCompanies]= useState<CompanyData[]>([]);

useEffect(()=>{
    if (store.getState().authState.userType!="ADMIN") {
        notify.error("please login...");
        navigate("/login");
    }else{
         setCompanies(store.getState().companyState.company);
    }

},[])
console.log(companies);

    return (
        <div className="getAllCompanies">
			<h1>All companies</h1><hr/>
            <input type="text" placeholder="find a company" onChange={searchName} value={search}></input>
            <ButtonGroup variant="contained">
            {/*<Button color="primary" onClick={searchGroom}>find</Button>*/}
            <Button color="secondary" onClick={clearMe}>clear</Button>
            </ButtonGroup>
           {/* <br/><br/>*/}
       {/* find a company : {groom}*/}
            <br/><br/>
           {/*companies.map(item=><SingleCompany key={item.company.id} company={item}/>)*/}
           {/*companies.map(item=><SingleCompany key={item.id} company={item}/>)*/}
{companies.filter(item=>item.name.toLowerCase().includes(search)).map(item=><SingleCompany key={item.id} company={item}/>)}
                
        </div>
    );
}

export default GetAllCompanies;
