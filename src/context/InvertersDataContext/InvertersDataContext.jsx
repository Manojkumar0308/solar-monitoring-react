import React,{createContext,useEffect,useState,useContext} from "react";
import axios from "axios";
const InvertersDataContext = createContext();
export const InvertersDataProvider =({children})=>{
    const [inverterData,setInverterData] = useState({});


    const fetchPlantsInverter =async(plantId)=>{
        const requestBody= {
          plant_id:plantId
        }
        console.log('request body userdashboard for inverters of plants',requestBody)
        try {
      const response= await axios.post('http://192.168.1.49:3000/api/inverters/get-all-inverter',requestBody);
      if(response.status===200){
        console.log('response of inverters for plants',response.data.data[0])
        if (response.data.data  && response.data.data.length > 0) {
         setInvertersLength(response.data.data.length)
        } else {
          console.log('No Inverters found for the plant');
        }
        
      }
        } catch (error) {
          console.log(error.message);
        }
      }
return (
    <InvertersDataContext.Provider value={setInverterData}>
        {children}
    </InvertersDataContext.Provider>
);
}