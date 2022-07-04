import { useState } from 'react';
import globals from '../util/global';
import jwtAxios from '../util/JWTaxios';
import CompanyData from './../modal/companyModal';
import notify from './../util/notify';
import { store } from './store';

export class companyState{
    company: CompanyData[] = [];
}

export enum companyActionType{
    DownloadCompanies = "DownloadCompanies",
    DownloadOneCompany = "DownloadOneCompany",
    DeleteCompany ="DeleteCompany",
    UpdateCompany = "UpdateCompany",
    AddCompany = "AddCompany",
    clearCompanies = "ClearCompanies",
}

export interface companyAction{
    type:companyActionType,
    payload?:any;
}

export function downloadCompanies(companies:CompanyData[]):companyAction{
    return {type:companyActionType.DownloadCompanies,payload:companies}
}

export function deleteCompany(companyID:number):companyAction{
    return {type:companyActionType.DeleteCompany,payload:companyID}
}

export function updateCompany(company:CompanyData):companyAction{
    return{type:companyActionType.UpdateCompany,payload:company}
}

export function addCompany(company:CompanyData):companyAction{
    return {type:companyActionType.AddCompany,payload:company}
}

export function clearCompanies():companyAction{
    return {type:companyActionType.clearCompanies}
}

export function companyReducer(currentState: companyState = new companyState , action: companyAction):companyState{
  var newState = {...currentState};

  switch(action.type){
      case companyActionType.DownloadCompanies:
        
        //  jwtAxios.get<CompanyData[]>(globals.urls.getAllCompanies)
        //  .then(response=>{
        //      newState.company = response.data;
        //     console.log(newState.company);
           
        // })
        //  .catch(err=>{
        //    notify.error("something went wrong")
        //      console.log(err);
        //  })

       newState.company = action.payload;
       console.log(action.payload);
      break;


      case companyActionType.AddCompany:
        console.log("redux payload");
        console.log(action.payload);
        const comp =[...newState.company]
       comp.push(action.payload);
       newState.company=comp;
        break;


      case companyActionType.DeleteCompany:
        newState.company = [...newState.company].filter(item=>item.id!=action.payload);
        break;


        case companyActionType.UpdateCompany:
            const updatedCompanies = [...newState.company].filter(item=>item.id!=action.payload.id);
            updatedCompanies.push(action.payload);
            newState.company = updatedCompanies;
        break;

        case companyActionType.clearCompanies:
            newState.company=[];
        break;

  }

  return newState;

}