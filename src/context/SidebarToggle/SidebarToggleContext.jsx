import React, { createContext, useContext, useState } from 'react';

const SideBarContext = createContext();

export const SidebarToggleProvider = ({ children }) => {
    const [isSidebarOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsOpen(false);
    };
    return (
        <SideBarContext.Provider value={{ isSidebarOpen, toggleSidebar,closeSidebar }}>
            {children}                  
        </SideBarContext.Provider>
    );
};

export const useSidebarToggle = () =>{
    const context = useContext(SideBarContext);
    return context;
}