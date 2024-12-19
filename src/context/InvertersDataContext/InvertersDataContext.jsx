import React,{createContext,useEffect,useState,useContext} from "react";
import axios from "axios";
const InvertersDataContext = createContext();
export const InvertersDataProvider =({children})=>{
    const [inverterData,setInverterData] = useState({});


    const fetchInverters = ()=>{
        
    }
return (
    <InvertersDataContext.Provider value={setInverterData}>
        {children}
    </InvertersDataContext.Provider>
);
}