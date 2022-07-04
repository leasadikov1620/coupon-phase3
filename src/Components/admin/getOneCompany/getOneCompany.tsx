import "./getOneCompany.css";
import { useState } from 'react';
import CompanyData from './../../../modal/companyModal';

function GetOneCompany(): JSX.Element {
    const [company, setCompany]=useState <CompanyData>() 
    
    
    
    return (
        <div className="getOneCompany SolidBox">
			<h1>One company</h1><hr/>

        </div>
    );
}

export default GetOneCompany;
