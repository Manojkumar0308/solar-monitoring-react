import React, { createContext, useContext, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, CircularProgress } from '@mui/material';

// Context
const DialogContext = createContext();

// Provider Component
export const DialogProvider = ({ children }) => {
  const [dialogConfig, setDialogConfig] = useState({
    open: false,
    type: '', // 'loading' or 'message'
    title: '',
    message: '',
    actions: null,
  });

  const showDialog = ({ type, title, message, actions }) => {
    setDialogConfig({ open: true, type, title, message, actions });
    console.log('showDialog called with params:', { type, title, message, actions });
  };

  const hideDialog = () => {
    setDialogConfig({ ...dialogConfig, open: false });
  };

  return (
    <DialogContext.Provider value={{ showDialog, hideDialog }}>
      {children}
      <Dialog
        open={dialogConfig.open}
        onClose={hideDialog}
        maxWidth={dialogConfig.type === 'loading' ? 'xs' : false}
       
  sx={{
    '.MuiDialog-paper': {
      backgroundColor: '#000000' , // Black for loading
      minHeight: dialogConfig.type === 'loading' ? 'unset' : '50px',
      minWidth: dialogConfig.type === 'loading' ? 'unset' :'250px',
      color: '#ffffff', // White text color for contrast
    },
  }}
        aria-labelledby="dialog-title"
       
      >
        {dialogConfig.type === 'loading' ? (
          <Box display="flex" flexDirection="column" alignItems="center" p={3}
          sx={{
            textAlign: 'center',
           
          }}
          >
            <CircularProgress />
            <p className="text-xs text-gray-400">{dialogConfig.message}</p>
          </Box>
        ) : (
          <>
          <DialogTitle id="dialog-title" sx={{ paddingBottom: '8px' }}>
    {dialogConfig.title}
  </DialogTitle>
  <DialogContent sx={{ paddingBottom: '8px', paddingTop: '8px' }}>
    <p className="text-xs text-gray-400">{dialogConfig.message}</p>
  </DialogContent>
  {dialogConfig.actions && (
    <DialogActions
      sx={{
        paddingTop: '4px', // Gap reduce between content and actions
        paddingBottom: '8px',
      
      }}
    >
      {dialogConfig.actions.map((action, idx) => (
        <Button
          key={idx}
          onClick={action.onClick}
          color={action.color || 'primary'}
          sx={{
            padding: '4px 8px', // Reduce padding inside button
            minHeight: '30px', // Reduce button height
            fontSize: '12px', // Smaller font size
          }}
        >
          {action.label}
        </Button>
      ))}
    </DialogActions>
  )}
          </>
        )}
      </Dialog>
    </DialogContext.Provider>
  );
};

// Custom Hook
export const useDialog = () => useContext(DialogContext);
