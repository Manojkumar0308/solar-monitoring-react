import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faCloud, faGauge, faMapMarkerAlt, faSolarPanel, faSun, faThermometerFull, faThunderstorm, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import backgroundImage from "../asset/images/solar-panel-dashboard.jpg";
import { faWater } from "@fortawesome/free-solid-svg-icons/faWater";
import MobileNavbar from "./MobileNavBar";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons/faPowerOff";
import DashboardGraphs from "./UserDashboardGraph";
import {motion} from 'framer-motion';
const UserDashBoard = ({ isSidebarOpen, toggleSidebar, setActiveTab,activeTab }) => {
    const animation = {
        hidden: { opacity: 0, y: 100 }, // Start off-screen to the left
        visible: { opacity: 1, y: 0 }, // Final state
      };
    
      const data = [
        { icon: faSun, value: "378.79Wh/m2", label: "Light intensity", duration: 3.2 },
        { icon: faThermometerFull, value: "21.88°C", label: "Temperature", duration: 3.4 },
        { icon: faSun, value: "378.79Wh/m2", label: "Light intensity", duration: 3.6 },
        { icon: faThermometerFull, value: "21.88°C", label: "Temperature", duration: 3.8 },
        { icon: faCloud, value: "71.00%rh", label: "Humidity", duration: 4 },
        { icon: faWater, value: "2.6 m/s", label: "Wind", duration: 4.3 },
        { icon: faThunderstorm, value: "1013.25mb", label: "Current", duration: 4.6 },
        { icon: faPowerOff, value: "2.6 m/s", label: "Voltage", duration: 4.9 },
    ];

    return (
        <div className="min-w-full bg-white h-screen flex flex-col">
            <MobileNavbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} setActiveTab={setActiveTab} activeTab={activeTab}></MobileNavbar>
            <div className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 gap-2 mt-4 p-4">
                <div className="flex flex-1 flex-col gap-2 h-[32vh] ">
                    <motion.div 
                      initial={{ opacity: 0}}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 2 }}
                    className="h-full object-cover  rounded-lg p-2 bg-cover"  style={{ backgroundImage: `url(${backgroundImage})` }} >
                        <div className="flex flex-row gap-2  justify-center">
                            <span>
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-lg text-white" />
                            </span>
                            {/* Apply overflow-auto and max-width to handle overflow properly */}
                            <span className="text-xs font-semibold overflow-auto max-w-full text-white">
                                Bijnore Road, Royal City, Lucknow, Uttar Pradesh 226022
                            </span>
                        </div>
                    </motion.div>
                    {/*Item-1 col part */}
                    <motion.div 
                      initial={{ opacity: 0 ,x: -100}}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{duration: 0.7  }}
                    className="flex flex-row justify-center items-center gap-2 min-w-64">
                    <div className="flex flex-col rounded-lg justify-center items-center py-2 w-1/2 border border-gray-200 bg-white ">
                        <span className="text-xs font-semibold">Total Panels</span>
                        <span className="text-xs font-semibold">2</span>
                    </div>
                    <div className="flex flex-col rounded-lg justify-center items-center py-2 w-1/2 border border-gray-200 bg-white">
                        <span className="text-xs font-semibold">Total Inverters</span>
                        <span className="text-xs font-semibold">1</span>
                    </div>
                    </motion.div>
                    
                </div>

                <motion.div 
                initial={{ opacity: 0}}
                animate={{ opacity: 1 }}
                transition={{ duration: 2.5 }}
                className="flex flex-1 flex-col gap-2 border border-gray-200 rounded-lg ">
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
                    
                </motion.div>
                 {/*Sensors reading*/}
                <div className="flex flex-1 flex-col gap-[14px] md:col-span-2 xl:col-span-1">
                   <motion.div 
                     initial={{ opacity: 0 ,y: -100}}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{duration: 0.4, delay:  0.1  }}
                   className="flex border justify-center border-gray-200 rounded-lg py-2 ">
                    <span className="text-sm font-semibold">
                        Current weather
                    </span>
                   </motion.div>
                   
                   <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-2 gap-2">
                   {data.map((item, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0 ,y: -100}}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{duration: 0.6, delay: index * 0.15  }}
                    className="flex flex-row gap-4 items-center justify-center border border-gray-200 rounded-lg py-2 px-4"
                >
                    <FontAwesomeIcon icon={item.icon} className="text-[20px]" />
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold">{item.value}</span>
                        <span className="text-xs font-semibold text-gray-200">{item.label}</span>
                    </div>
                </motion.div>
            ))}
                 </div>            
                </div>
            </div>

            {/* Efficiency and yield section */}
            <div className="border border-gray-200 rounded-lg mx-4">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 p-2">
                {[
                    { icon: faGauge, title: "Performance ratio", value: "69.1326%", bgColor: "bg-yellow-100" },
                    { icon: faSun, title: "CUF", value: "69.1326%", bgColor: "bg-purple-100" },
                    { icon: faTriangleExclamation, title: "Specific yield", value: "69.1326%", bgColor: "bg-blue-100" },
                    { icon: faSolarPanel, title: "Insolation today", value: "69.1326%", bgColor: "bg-green-100" },
                ].map((item, index) => (
                    <motion.div
                        key={index}
                        className={`flex flex-col justify-center items-center gap-2 ${item.bgColor} rounded-lg py-2 min-w-[100px]`}
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                    >
                        <FontAwesomeIcon icon={item.icon} className="text-[25px]" />
                        <span className="text-[14px] font-semibold text-gray-500">{item.title}</span>
                        <span className="text-[14px] font-semibold">{item.value}</span>
                    </motion.div>
                ))}
            </div>
        </div>
<div className="flex flex-col md:flex-row gap-2 md:gap-4 items-center justify-center  rounded-lg mx-4 mt-4 ">
  <div className="w-full md:w-1/2 border border-gray-200 rounded-lg py-2 px-2 ">
    <div className=" w-full "> {/* Set height here */}
      <DashboardGraphs />
    </div>
  </div>
  <div className="w-full md:w-1/2 border border-gray-200 rounded-lg py-2 px-2">
    <div className=" w-full "> {/* Set height here */}
      <DashboardGraphs />
    </div>
  </div>
</div>






        </div>
    );
};

export default UserDashBoard;
