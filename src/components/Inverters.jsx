import React, { useEffect, useState } from "react";
import MobileNavbar from "./MobileNavBar";
import { invertersDataContext } from "../context/InvertersDataContext/InvertersDataContext";
import { div } from "framer-motion/client";

const InvertersData = () => {
  const { inverterDetail, inverterData } = invertersDataContext();
  const [selectedInverterId, setSelectedInverterId] = useState(""); // State to store selected inverter_id

  // Set default selected inverter ID based on the first element of inverterDetail
  useEffect(() => {
    if (inverterDetail && inverterDetail.length > 0) {
      const defaultInverter = inverterDetail[0].inverter_id;
      setSelectedInverterId(defaultInverter); // Set inverter_id instead of inverter_name
      console.log('Default Inverter ID:', defaultInverter); // Log the default inverter ID
    }
  }, [inverterDetail]);

  // Handle dropdown change and log the selected inverter ID
  const handleInverterChange = (e) => {
    const selectedId = e.target.value;
    setSelectedInverterId(selectedId); // Update selected inverter_id
    console.log('Selected Inverter ID:', selectedId); // Log the selected inverter ID
  };

  return (
    <div className="min-w-full bg-white h-screen flex flex-col">
      <MobileNavbar />
      <h1 className="text-xl font-semibold mt-10 px-4">Inverters</h1>

      {/* Display selected inverter ID */}
      <h1>Selected Inverter ID: {selectedInverterId}</h1>

      {/* Dropdown to select inverter */}
      <div className="px-4 w-full min-w-full">
        <select
          value={selectedInverterId}  // Bind the dropdown to the selected inverter ID
          onChange={handleInverterChange} // Handle the selection change
          className="mt-4 px-4 py-2 border rounded bg-red-300"
        >
          {inverterDetail.map((inverter) => (
            <option key={inverter.inverter_id} value={inverter.inverter_id}>
              {inverter.inverter_name}
            </option>
          ))}
        </select>

        {selectedInverterId===inverterData.inverter_id && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {/* Power Output Card */}
            <div className="card p-4 border rounded-lg shadow-lg bg-blue-100">
              <h2 className="font-bold text-lg">Power Output</h2>
              <p>Power Output: {inverterData.power_output} kW</p>
              <p>Total Energy Generated: {inverterData.total_energy_generated} kWh</p>
            </div>

            {/* Voltage Card */}
            <div className="card p-4 border rounded-lg shadow-lg bg-green-100">
              <h2 className="font-bold text-lg">Voltage</h2>
              <p>Input Voltage: {inverterData.input_voltage} V</p>
              <p>Output Voltage: {inverterData.output_voltage} V</p>
            </div>

            {/* Current Card */}
            <div className="card p-4 border rounded-lg shadow-lg bg-yellow-100">
              <h2 className="font-bold text-lg">Current</h2>
              <p>Output Current: {inverterData.output_current} A</p>
              <p>Frequency: {inverterData.frequency} Hz</p>
            </div>

            {/* Efficiency Card */}
            <div className="card p-4 border rounded-lg shadow-lg bg-orange-100">
              <h2 className="font-bold text-lg">Efficiency</h2>
              <p>Efficiency: {inverterData.efficiency} %</p>
            </div>

            {/* Temperature Card */}
            <div className="card p-4 border rounded-lg shadow-lg bg-red-100">
              <h2 className="font-bold text-lg">Temperature</h2>
              <p>Inverter Temperature: {inverterData.temperature} °C</p>
            </div>

            {/* Battery Status Card */}
            <div className="card p-4 border rounded-lg shadow-lg bg-purple-100">
              <h2 className="font-bold text-lg">Battery Status</h2>
              <p>Battery Voltage: {inverterData.battery_voltage} V</p>
              <p>Battery Current: {inverterData.battery_current} A</p>
              <p>Battery Capacity: {inverterData.battery_capacity} Ah</p>
              <p>State of Charge: {inverterData.battery_state_of_charge} %</p>
              <p>Battery Health: {inverterData.battery_health} %</p>
              <p>Battery Temperature: {inverterData.battery_temperature} °C</p>
              <p>Battery Status: {inverterData.battery_status}</p>
              <p>Battery Cycles: {inverterData.battery_cycles}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvertersData;
