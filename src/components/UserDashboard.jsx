import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faCloud, faGauge, faMapMarkerAlt, faSolarPanel, faSun, faThermometerFull, faThunderstorm, faTriangleExclamation, faWind } from '@fortawesome/free-solid-svg-icons';
import backgroundImage from "../asset/images/solar-panel-dashboard.jpg";
import { faThermometerHalf } from "@fortawesome/free-solid-svg-icons/faThermometerHalf";
import { faWater } from "@fortawesome/free-solid-svg-icons/faWater";
import MobileNavbar from "./MobileNavBar";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons/faPowerOff";
import { faMeteor } from "@fortawesome/free-solid-svg-icons/faMeteor";
import DashboardGraphs from "./UserDashboardGraph";
const UserDashBoard = ({ isSidebarOpen, toggleSidebar, setActiveTab,activeTab }) => {
    return (
        <div className="min-w-full bg-white h-screen flex flex-col">
            <MobileNavbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} setActiveTab={setActiveTab} activeTab={activeTab}></MobileNavbar>
            <div className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 gap-2 mt-4 p-4">
                <div className="flex flex-1 flex-col gap-2 h-[32vh] ">
                    <div className="h-full object-cover  rounded-lg p-2 bg-cover"  style={{ backgroundImage: `url(${backgroundImage})` }} >
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

                <div className="flex flex-1 flex-col gap-2 border border-gray-200 rounded-lg ">
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
                 {/*Sensors reading*/}
                <div className="flex flex-1 flex-col gap-[14px] md:col-span-2 xl:col-span-1">
                   <div className="flex border justify-center border-gray-200 rounded-lg py-2 ">
                    <span className="text-sm font-semibold">
                        Current weather
                    </span>
                   </div>
                   
                   <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-2 gap-2">
                 <div className="flex flex-row gap-4 items-center justify-center border border-gray-200 rounded-lg py-2 px-4">
                            <FontAwesomeIcon icon={faSun} className="text-[20px]"/>
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold">378.79Wh/m2</span>
                                <span className="text-xs font-semibold text-gray-200">Light intensity</span>
                            </div>
                        </div>
                        <div className="flex flex-row gap-4 items-center justify-center border border-gray-200 rounded-lg py-2 px-4 ">
                            <FontAwesomeIcon icon={faThermometerFull} className="text-[20px]"/>
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold">21.88*C</span>
                                <span className="text-xs font-semibold text-gray-200">Temperature</span>
                            </div>
                        </div>
                        <div className="flex   flex-row gap-4 items-center justify-center border border-gray-200 rounded-lg py-2 px-4">
                            <FontAwesomeIcon icon={faSun} className="text-[20px]"/>
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold">378.79Wh/m2</span>
                                <span className="text-xs font-semibold text-gray-200">Light intensity</span>
                            </div>
                        </div>
                        <div className="flex   flex-row gap-4 items-center justify-center border border-gray-200 rounded-lg py-2 px-4 ">
                            <FontAwesomeIcon icon={faThermometerFull} className="text-[20px]"/>
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold">21.88*C</span>
                                <span className="text-xs font-semibold text-gray-200">Temperature</span>
                            </div>
                        </div>

                        <div className="flex   flex-row gap-4 items-center justify-center border border-gray-200 rounded-lg py-2 px-4">
                            <FontAwesomeIcon icon={faCloud} className="text-[20px]"/>
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold">71.00%rh</span>
                                <span className="text-xs font-semibold text-gray-200">Humidity</span>
                            </div>
                        </div>
                        <div className="flex   flex-row gap-4 items-center justify-center border border-gray-200 rounded-lg py-2 px-4 ">
                            <FontAwesomeIcon icon={faWater}  className="text-[20px]"/>
                            <div className="flex flex-col ">
                                <span className="text-sm font-semibold">2.6 m/s</span>
                                
                                <span className="text-xs font-semibold text-gray-200">Wind</span>
                            </div>
                        </div>

                        <div className="flex  flex-row gap-4 items-center justify-center border border-gray-200 rounded-lg py-2 px-4 ">
                            <FontAwesomeIcon icon={faThunderstorm} className="text-[20px]"/>
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold">1013.25mb</span>
                                <span className="text-xs font-semibold text-gray-200">Current</span>
                            </div>
                        </div>

                        <div className="flex   flex-row gap-4 items-center justify-center border border-gray-200 rounded-lg py-2 px-4 ">
                            <FontAwesomeIcon icon={faPowerOff}  className="text-[20px]"/>
                            <div className="flex flex-col ">
                                <span className="text-sm font-semibold">2.6 m/s</span>
                                
                                <span className="text-xs font-semibold text-gray-200">Voltage</span>
                            </div>
                        </div>
                 </div>            
                </div>
            </div>

            {/* Efficiency and yield section */}
            <div className="border border-gray-200 rounded-lg mx-4">
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 p-2 ">
        <div className="flex flex-col justify-center items-center gap-2 bg-yellow-100 rounded-lg py-2 min-w-[100px]">
            <FontAwesomeIcon icon={faGauge} className="text-[25px]" />
            <span className="text-[14px] font-semibold text-gray-500">Performance ratio</span>
            <span className="text-[14px] font-semibold">69.1326%</span>
        </div>

        <div className="flex flex-col justify-center items-center gap-2 bg-purple-100 rounded-lg py-2 min-w-[100px]">
            <FontAwesomeIcon icon={faSun} className="text-[25px]" />
            <span className="text-[14px] font-semibold text-gray-500">CUF</span>
            <span className="text-[14px] font-semibold">69.1326%</span>
        </div>

        <div className="flex flex-col justify-center items-center gap-2 bg-blue-100 rounded-lg py-2 min-w-[100px]">
            <FontAwesomeIcon icon={faTriangleExclamation} className="text-[25px]" />
            <span className="text-[14px] font-semibold text-gray-500">Specific yield</span>
            <span className="text-[14px] font-semibold">69.1326%</span>
        </div>

        <div className="flex flex-col justify-center items-center gap-2 bg-green-100 rounded-lg py-2 min-w-[100px]">
            <FontAwesomeIcon icon={faSolarPanel} className="text-[25px]" />
            <span className="text-[14px] font-semibold text-gray-500">Insolation today</span>
            <span className="text-[14px] font-semibold">69.1326%</span>
        </div>
    </div>
   
</div>
<div className="w-full flex flex-row gap-4 items-center justify-center ">
<DashboardGraphs />
<DashboardGraphs />
</div>


        </div>
    );
};

export default UserDashBoard;
