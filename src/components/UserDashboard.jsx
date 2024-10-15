import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faCloud, faMapMarkerAlt, faSun, faThermometerFull, faThunderstorm, faWind } from '@fortawesome/free-solid-svg-icons';
import backgroundImage from "../asset/images/solar-panel-dashboard.jpg";
import { faThermometerHalf } from "@fortawesome/free-solid-svg-icons/faThermometerHalf";
import { faWater } from "@fortawesome/free-solid-svg-icons/faWater";
import MobileNavbar from "./MobileNavBar";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons/faPowerOff";
const UserDashBoard = ({ isSidebarOpen, toggleSidebar, setActiveTab }) => {
    return (
        <div className="min-w-full bg-white h-screen flex flex-col">
            <MobileNavbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} setActiveTab={setActiveTab}></MobileNavbar>
            <div className="flex flex-col xl:flex-row  gap-2 mt-4 p-8 h-[35vh]">
                <div className="flex flex-3 flex-col gap-2 ">
                    <div className="h-[35vh] rounded-lg p-2 bg-cover"  style={{ backgroundImage: `url(${backgroundImage})` }} >
                        <div className="flex flex-row gap-2  justify-center">
                            <span>
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-lg text-white" />
                            </span>
                            {/* Apply overflow-auto and max-width to handle overflow properly */}
                            <span className="text-xs font-semibold overflow-auto max-w-full text-white">
                                Bijnore Road, Royal City, Lucknow, Uttar Pradesh 226022
                            </span>
                        </div>
                    </div>
                    {/*Item-1 col part */}
                    <div className="flex flex-row justify-center items-center gap-2 min-w-64">
                    <div className="flex flex-col rounded-lg justify-center items-center py-2 w-1/2 border border-gray-200 bg-white ">
                        <span className="text-xs font-semibold">Total Panels</span>
                        <span className="text-xs font-semibold">2</span>
                    </div>
                    <div className="flex flex-col rounded-lg justify-center items-center py-2 w-1/2 border border-gray-200 bg-white">
                        <span className="text-xs font-semibold">Total Inverters</span>
                        <span className="text-xs font-semibold">1</span>
                    </div>
                    </div>
                    
                </div>

                <div className="flex flex-1 flex-col gap-2 border border-gray-200 rounded-lg">
                   <div className="flex flex-row justify-between items-center p-4 ">
                    <span className="text-sm font-semibold">Generation<FontAwesomeIcon icon={faChevronDown} className="text-[8px] ml-1 mb-[1.6px]"/></span>
                    <span className="text-xs font-semibold text-gray-500">June 25-12:30 Pm<FontAwesomeIcon icon={faChevronDown} className="text-[6px] ml-1 mb-[1.6px]"/></span>
                   </div>
                   <div className="flex flex-row gap-2 p-4">
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col">
                        <span className="text-md font-semibold text-gray-500">This month</span>
                        <span className="text-lg font-semibold text-gray-500">254</span>

                        </div>
                        <div className="flex flex-col">
                        <span className="text-md font-semibold text-gray-500">This year</span>
                        <span className="text-lg font-semibold text-gray-500">3000</span>

                        </div>

                        <div className="flex flex-col">
                        <span className="text-md font-semibold text-gray-500">Total</span>
                        <span className="text-lg font-semibold text-gray-500">3000</span>

                        </div>
                        
                      
                    </div>
                   </div>
                    
                </div>
                 {/*Current Weather*/}
                <div className="flex flex-1 flex-col gap-2">
                   <div className="flex border justify-center border-gray-200 rounded-lg py-2">
                    <span className="text-sm font-semibold">
                        Current weather
                    </span>
                   </div>
                   
                    <div className="flex flex-row gap-2">
                        <div className="flex flex-row gap-4 items-center justify-center border border-gray-200 rounded-lg py-2 px-4 w-1/2">
                            <FontAwesomeIcon icon={faSun} className="text-[20px]"/>
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold">378.79Wh/m2</span>
                                <span className="text-xs font-semibold text-gray-200">Light intensity</span>
                            </div>
                        </div>

                       

                        

                        <div className="flex flex-row gap-4 items-center justify-center border border-gray-200 rounded-lg py-2 px-4 w-1/2">
                            <FontAwesomeIcon icon={faThermometerFull} className="text-[20px]"/>
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold">21.88*C</span>
                                <span className="text-xs font-semibold text-gray-200">Temperature</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row gap-2">
                        <div className="flex flex-row gap-4 items-center justify-center border border-gray-200 rounded-lg py-2 px-4 w-1/2">
                            <FontAwesomeIcon icon={faCloud} className="text-[20px]"/>
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold">71.00%rh</span>
                                <span className="text-xs font-semibold text-gray-200">Humidity</span>
                            </div>
                        </div>

                        <div className="flex flex-row gap-4 items-center justify-center border border-gray-200 rounded-lg py-2 px-4 w-1/2">
                            <FontAwesomeIcon icon={faThermometerHalf} className="text-[20px]"/>
                            <div className="flex flex-col ">
                                <span className="text-sm font-semibold">40.53*C</span>
                                <span className="text-xs font-semibold text-gray-200">Module Temperature</span>
                                {/* <span className="text-md font-semibold text-gray-200">Temperature</span> */}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row gap-2">
                        <div className="flex flex-row gap-4 items-center justify-center border border-gray-200 rounded-lg py-2 px-4 w-1/2">
                            <FontAwesomeIcon icon={faWind} className="text-[20px]"/>
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold">1013.25mb</span>
                                <span className="text-xs font-semibold text-gray-200">Pressure</span>
                            </div>
                        </div>

                        <div className="flex flex-row gap-4 items-center justify-center border border-gray-200 rounded-lg py-2 px-4 w-1/2">
                            <FontAwesomeIcon icon={faWater}  className="text-[20px]"/>
                            <div className="flex flex-col ">
                                <span className="text-sm font-semibold">2.6 m/s</span>
                                
                                <span className="text-xs font-semibold text-gray-200">Wind</span>
                            </div>
                        </div>
                    </div>
                    {/*current and Voltage */}
                    <div className="flex flex-row gap-2">
                        <div className="flex flex-row gap-4 items-center justify-center border border-gray-200 rounded-lg py-2 px-4 w-1/2">
                            <FontAwesomeIcon icon={faThunderstorm} className="text-[20px]"/>
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold">1013.25mb</span>
                                <span className="text-xs font-semibold text-gray-200">Current</span>
                            </div>
                        </div>

                        <div className="flex flex-row gap-4 items-center justify-center border border-gray-200 rounded-lg py-2 px-4 w-1/2">
                            <FontAwesomeIcon icon={faPowerOff}  className="text-[20px]"/>
                            <div className="flex flex-col ">
                                <span className="text-sm font-semibold">2.6 m/s</span>
                                
                                <span className="text-xs font-semibold text-gray-200">Voltage</span>
                            </div>
                        </div>
                    </div>
                  
                    
                </div>
            </div>
        </div>
    );
};

export default UserDashBoard;
