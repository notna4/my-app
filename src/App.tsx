import React, { useState, useEffect } from "react";
import "./App.css";
import TemperatureStats from "./TemperatureStats";

import { initializeApp } from "firebase/app"; // no compat for new SDK
import { getDatabase, onValue, ref } from "firebase/database";

const config = {
  apiKey: "AIzaSyB0dIE-_fVzg1nGyegiOogulpYpNnTYijk",
  authDomain: "iotca-project-9db0d.firebaseapp.com",
  databaseURL: "https://iotca-project-9db0d-default-rtdb.firebaseio.com",
  projectId: "iotca-project-9db0d",
  storageBucket: "iotca-project-9db0d.appspot.com",
  messagingSenderId: "967021110465",
  appId: "1:967021110465:web:ed43a3ec4a4e597a1e2040",
};

const app = initializeApp(config);

const database = getDatabase(app);

// export const todosRef = ref(database, "todos");

function App() {
  const [data, setData] = useState<any>(null); // Adjust type according to your data structure

  const [temperatures, setTemperatures] = useState<number[]>([]);
  const [humidities, setHumidities] = useState<number[]>([]);

  useEffect(() => {
    const dbRef = ref(database); // Reference to the root of your database
    const fetchData = async () => {
      onValue(dbRef, (snapshot) => {
        const data = snapshot.val();

        const tempValues: number[] = [];
        const humidityValues: number[] = [];

        // Iterate over the data object and extract temperature and humidity values
        for (const key in data["Status"]) {
          const { temperature, humidity } = data["Status"][key];
          if (temperature !== undefined && humidity !== undefined) {
            tempValues.push(temperature);
            humidityValues.push(humidity);
          }
        }

        setTemperatures(tempValues);
        setHumidities(humidityValues);
        setData(data);
      });
    };

    fetchData();

    // No cleanup function to keep the listener active
  }, []);

  return (
    <div className="app">
      <div className="header">
        <div className="live">Live data</div>
        <div className="big">
          {data ? (
            <span>
              {data.temperature}°C | {data.humidity}%
            </span>
          ) : (
            <span>Loading...</span>
          )}
        </div>
        <div className="avg">
          <span>
            avg.:{" "}
            {
              (
                temperatures.reduce((acc, curr) => acc + curr, 0) /
                temperatures.length
              )
                .toString()
                .split(".")[0]
            }
            °C |{"  "}
            {
              (
                humidities.reduce((acc, curr) => acc + curr, 0) /
                humidities.length
              )
                .toString()
                .split(".")[0]
            }{" "}
            %
          </span>
        </div>
      </div>
      <div className="graphics">
        <h2>Temperatures</h2>
        <TemperatureStats temperatures={temperatures} />
        <h2>Humidity</h2>
        <TemperatureStats temperatures={humidities} />
      </div>
    </div>
  );
}

export default App;
