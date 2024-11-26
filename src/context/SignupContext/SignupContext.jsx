import React,{createContext,useEffect,useState,useContext} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const SignupContext = createContext();  

export const SignupProvider = ({children})=>{
    const navigate = useNavigate();
    const [firstName,setfirstName] = useState('');
    const [lastName,setlastName] = useState('');
    const [regEmail,setEmail] = useState('');
    const [regPassword,setPassword] = useState('');
    const [mobile,setPhone] = useState('');
    const [role,setRole] = useState('');
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState('');

    const signup = async()=>{
        try{
            setLoading(true);
            const response = await axios.post('http://localhost:3000/api/user/send-verification',{  
                first_name: firstName, 
            last_name: lastName, 
            email: regEmail, 
            password: regPassword, 
            mobile, 
            role, 
            }); 
            if(response.status === 200){
                alert('Signup successful! Please verify your email.');
                setLoading(false);
                navigate('/otp',{ replace: true });
                const data = response.data;
                console.log('response',data);
                return data;
            } else{
               console.log('respomnse',response);
            }               
           
        }catch(err){            
            setLoading(false);
            setError(err.response.data.message);
            return err.response.data;
        }
    }

   
    return(
        <SignupContext.Provider value={{firstName,setfirstName,lastName,setlastName,regEmail,setEmail,regPassword,setPassword,mobile,setPhone,role,setRole,signup,loading,error}}>
            {children}
        </SignupContext.Provider>
    )
};

export const signUpUser = () =>{ const context = useContext(SignupContext);
    return context;
}