import React,{createContext,useContext,useState,useRef,useEffect} from 'react';
import { Dialog, CircularProgress, Box , DialogActions, DialogContent, DialogTitle, Button, } from '@mui/material'; // Material-UI imports
const DialogContext = createContext();

export const DialogContextProvider = ({children})=>{
    const [shakeDialog, setShakeDialog] = useState(false);  // State to handle shake effect
  
    const [dialogMessage, setDialogMessage] = useState('');  // Dialog message state
    const [dialogOpen, setDialogOpen] = useState(false);  // State to manage dialog visibility
    const dialogRef = useRef();

    const onLoginerror =()=>{
        setDialogMessage
    }
};

