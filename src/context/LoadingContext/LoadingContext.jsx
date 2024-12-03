import React,{createContext,useEffect,useState} from 'react';
const LoadingContext = createContext();
export const LoadingProvider = ({children}) => {
    const [loading,setLoading] = useState(false);
    useEffect(()=>{
        setLoading(false);
    },[loading])
    return (
        <LoadingContext.Provider value={{loading,setLoading}}>
            {children}
        </LoadingContext.Provider>
    )
}