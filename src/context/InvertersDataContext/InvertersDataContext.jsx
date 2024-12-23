import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext/AuthContext";
import { initializeSocket, getSocket } from "../../socket";

const InvertersDataContext = createContext();

export const InvertersDataProvider = ({ children }) => {
  const { user } = useAuth();
  const [inverterDetail, setInverterDetail] = useState([]);
  const [inverterData, setInverterData] = useState({});

  // Fetch plants
  const fetchPlants = async () => {
    const requestBody = {
      customer_id: user?._id,
    };
    try {
      const response = await axios.post("http://192.168.1.49:3000/api/user/get-plant", requestBody);
      if (response.status === 200) {
        if (response.data.data && response.data.data.length > 0) {
          fetchPlantsInverter(response.data.data[0]["plant_id"]);
        } else {
          console.log("No plants found for the customer");
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Fetch inverters based on plant id
  const fetchPlantsInverter = async (plantId) => {
    const requestBody = {
      plant_id: plantId,
    };
    try {
      const response = await axios.post("http://192.168.1.49:3000/api/inverters/get-all-inverter", requestBody);
      if (response.status === 200) {
        setInverterDetail(response.data.data || []);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchPlants();
  }, []);

  // Setup real-time socket data for inverters
  useEffect(() => {
    if (!getSocket()) {
      initializeSocket();
    }

    const socket = getSocket();
    if (socket) {
      socket.on("sendInvertersData", (data) => {
        if (user?._id === data.customer_id) {
          setInverterData(data);
        }
      });
    }

    // Cleanup socket listeners
    return () => {
      if (socket) {
        socket.off("sendInvertersData");
      }
    };
  }, [user]);

  return (
    <InvertersDataContext.Provider value={{ inverterDetail, inverterData }}>
      {children}
    </InvertersDataContext.Provider>
  );
};

export const invertersDataContext = () => {
  const context = useContext(InvertersDataContext);
  if (!context) {
    throw new Error("invertersDataContext must be used within an InvertersDataProvider");
  }
  return context;
};
