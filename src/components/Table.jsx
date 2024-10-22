import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import MobNavBar from './MobileNavBar';
import { Typography } from '@mui/material';
import '@mui/material';
import CheckIcon from '@mui/icons-material/Check';  
import ClearIcon from '@mui/icons-material/Clear';

const formatDate = (date) => {
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

const columns = [
  { field: 'id', headerName: 'ID', width: 90, headerAlign: 'center',  renderCell: (params) => <div className='flex justify-center items-center'>{params.value
  }</div>,
 },
  {
    field: 'siteId',
    headerName: 'Site-Id',
    width: 150,
    editable: false,
    headerAlign: 'center',
    renderCell: (params) => <div className='flex justify-center items-center'>{params.value
    }</div>,
   
    
  },
  {
    field: 'siteName',
    headerName: 'Site Name',
    width: 150,
    editable: false,
    headerAlign: 'center',
    flex :1,
    renderCell: (params) => <div className='flex justify-center items-center'>{params.value
    }</div>,
   
  },
  {
    field: 'email',
    headerName: 'Email-Id',
    width: 150,
    editable: false,
    headerAlign: 'center',
    renderCell: (params) => <div className='flex justify-center items-center'>{params.value
    }</div>,
   
  },
  {
    field: 'contact',
    headerName: 'Contact',
    width: 150,
    editable: false,
    headerAlign: 'center',
    renderCell: (params) => <div className='flex justify-center items-center'>{params.value
    }</div>,
   
  },
  {
    field: 'address',
    headerName: 'Address',
    width: 150,
    editable: false,
    flex:2,
    headerAlign: 'center',
    renderCell: (params) => <div className='flex justify-center items-center' >{params.value}</div>,
   
  },
  {
    field: 'city',
    headerName: 'City',
    width: 110,
    editable: false,
    headerAlign: 'center',
    renderCell: (params) => <div className='flex justify-center items-center'>{params.value
    }</div>,
   
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 110,
    editable: false,
    headerAlign: 'center',
    renderCell: (params) => <div className='flex items-center justify-center h-full'>
    {params.value === 'Active' ? (
      <CheckIcon className='text-green-500' />
    ) : (
      <ClearIcon className='text-red-500' />
    )}
  </div>
   
  },
  {
    field: 'createdAt',
    headerName: 'Created At',
    type: 'dateTime',
    width: 180,
    editable: false,
    headerAlign: 'center',
    
    renderCell: (params) => (
      <div className='flex justify-center items-center'>
        {formatDate(new Date(params.value))} {/* Format the date here */}
      </div>
    ),
   
  },
  
];

const rows = [
  { id: 1, siteId: 'S123', siteName: 'MJSH Plant', email: 'site1@example.com', contact: '1234567890', address: 'Plot-12334, abc nagar, abc Road', city: 'Noida', status: 'Active', createdAt: new Date() },
  { id: 2, siteId: 'S124', siteName: 'MJSH Plant', email: 'site2@example.com', contact: '9876543210', address: 'Plot-12335, abc nagar, abc Road', city: 'Noida', status: 'InActive', createdAt: new Date() },
  { id: 3, siteId: 'S125', siteName: 'MJSH Plant', email: 'site3@example.com', contact: '6543219870', address: 'Plot-12336, abc nagar, abc Road', city: 'Noida', status: 'Active', createdAt: new Date() },
  { id: 4, siteId: 'S126', siteName: 'MJSH Plant', email: 'site4@example.com', contact: '3216549870', address: 'Plot-12337, abc nagar, abc Road', city: 'Noida', status: 'Active', createdAt: new Date() },
  { id: 5, siteId: 'S127', siteName: 'MJSH Plant', email: 'site5@example.com', contact: '9871236540', address: 'Plot-12338, abc nagar, abc Road', city: 'Noida', status: 'Active', createdAt: new Date() },
  { id: 6, siteId: 'S128', siteName: 'MJSH Plant', email: 'site6@example.com', contact: '1472583690', address: 'Plot-12339, abc nagar, abc Road', city: 'Noida', status: 'Active', createdAt: new Date() },
  { id: 7, siteId: 'S129', siteName: 'MJSH Plant', email: 'site7@example.com', contact: '2583691470', address: 'Plot-12340, abc nagar, abc Road', city: 'Noida', status: 'InActive', createdAt: new Date() },
  { id: 8, siteId: 'S130', siteName: 'MJSH Plant', email: 'site8@example.com', contact: '3691472580', address: 'Plot-12341, abc nagar, abc Road', city: 'Noida', status: 'Active', createdAt: new Date() },
  { id: 9, siteId: 'S131', siteName: 'MJSH Plant', email: 'site9@example.com', contact: '1473692580', address: 'Plot-12342, abc nagar, abc Road', city: 'Noida', status: 'Active', createdAt: new Date() },
  { id: 10, siteId: 'S132', siteName: 'MJSH Plant', email: 'site10@example.com', contact: '2581473690', address: 'Plot-12343, abc nagar, abc Road', city: 'Noida', status: 'Active', createdAt: new Date() },
  { id: 11, siteId: 'S133', siteName: 'MJSH Plant', email: 'site11@example.com', contact: '9638527410', address: 'Plot-12344, abc nagar, abc Road', city: 'Noida', status: 'InActive', createdAt: new Date() },
  { id: 12, siteId: 'S134', siteName: 'MJSH Plant', email: 'site12@example.com', contact: '8527419630', address: 'Plot-12345, abc nagar, abc Road', city: 'Noida', status: 'Active', createdAt: new Date() },
  { id: 13, siteId: 'S135', siteName: 'MJSH Plant', email: 'site13@example.com', contact: '7418529630', address: 'Plot-12346, abc nagar, abc Road', city: 'Noida', status: 'Active', createdAt: new Date() },
  { id: 14, siteId: 'S136', siteName: 'MJSH Plant', email: 'site14@example.com', contact: '3692581470', address: 'Plot-12347, abc nagar, abc Road', city: 'Noida', status: 'Active', createdAt: new Date() },
  { id: 15, siteId: 'S137', siteName: 'MJSH Plant', email: 'site15@example.com', contact: '8529637410', address: 'Plot-12348, abc nagar, abc Road', city: 'Noida', status: 'Active', createdAt: new Date() },
];

export default function DataGridDemo({ isSidebarOpen, toggleSidebar, setActiveTab, showMobNavBar, activeTab }) {
  
  return (
    <div className=" flex flex-col">
      {showMobNavBar && (
        <MobNavBar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          setActiveTab={setActiveTab}
          activeTab={activeTab}
        />
      )}
      {showMobNavBar && (<h1 className='text-3xl font-bold p-8'>Site List</h1>)}

      <Box sx={{ width: '100%',textAlign: 'center' }} className="mt-8 px-8">
       
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10, // Set initial page size to 10
              },
            },
          }}
          pageSizeOptions={[5, 10]}
        
          enableRowSelectionOnClick
               
        />
      </Box>
    </div>
  );
}
