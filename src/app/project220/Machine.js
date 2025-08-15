"use client"
import React, { useState, useRef, useEffect } from "react";

const HARDCODED_NUM1 = {
  1: [
    128, 137, 146, 236, 245, 290, 380, 470, 489, 560, 579, 678, 100, 119, 155,
    227, 335, 344, 399, 588, 669, 777,
  ],
  2: [
    129, 138, 147, 156, 237, 246, 345, 390, 480, 570, 589, 679, 110, 200, 228,
    255, 336, 499, 660, 688, 778, 444,
  ],
  3: [
    120, 139, 148, 157, 238, 247, 256, 346, 490, 580, 670, 689, 166, 229, 300,
    337, 355, 445, 599, 779, 788, 111,
  ],
  4: [
    130, 149, 158, 167, 239, 248, 257, 347, 356, 590, 680, 789, 112, 220, 266,
    338, 400, 446, 455, 699, 770, 888,
  ],
  5: [
    140, 159, 168, 230, 249, 258, 267, 348, 357, 456, 690, 780, 113, 122, 177,
    339, 366, 447, 500, 799, 889, 555,
  ],
  6: [
    123, 150, 169, 178, 240, 259, 268, 349, 358, 367, 457, 790, 114, 277, 330,
    448, 466, 556, 600, 880, 899, 222,
  ],
  7: [
    124, 160, 179, 250, 269, 278, 340, 359, 368, 458, 467, 890, 115, 133, 188,
    223, 377, 449, 557, 566, 700, 999,
  ],
  8: [
    125, 134, 170, 189, 260, 279, 350, 369, 378, 459, 468, 567, 116, 224, 233,
    288, 440, 477, 558, 800, 990, 666,
  ],
  9: [
    126, 135, 180, 234, 270, 289, 360, 379, 450, 469, 478, 568, 117, 144, 199,
    225, 388, 559, 577, 667, 900, 333,
  ],
  10: [
    127, 136, 145, 190, 235, 280, 370, 389, 460, 479, 569, 578, 118, 226, 244,
    299, 334, 488, 550, 668, 677, 0,
  ],
};

const WebSocketTable = () => {
  const [tablesData, setTablesData] = useState({
    Machine1: {},
    Machine2: {},
    Machine3: {},
    Summed: {},
  });

  // Using a ref to store machine data to ensure we keep track of latest values
  // even when we receive partial updates
  const machineStore = useRef({
    Machine1: {},
    Machine2: {},
    Machine3: {},
  });

  const allColumns = Object.keys(HARDCODED_NUM1).map(Number);

  // Function to recalculate summed data whenever machine data changes
  const recalculateSummedData = () => {
    const updatedMachines = machineStore.current;
    const summedData = {};

    allColumns.forEach((col) => {
      const keys = HARDCODED_NUM1[col];
      summedData[col] = keys.map((key, idx) => {
        const val1 = parseFloat(
          updatedMachines.Machine1[col]?.[idx]?.split("->")[1] || 0
        );
        const val2 = parseFloat(
          updatedMachines.Machine2[col]?.[idx]?.split("->")[1] || 0
        );
        const val3 = parseFloat(
          updatedMachines.Machine3[col]?.[idx]?.split("->")[1] || 0
        );
        return `${key}->${val1 + val2 + val3}`;
      });
    });

    return summedData;
  };

  useEffect(() => {
    const socket = new WebSocket("wss://be.khodalmaa.in/api/v1/ws_project1");

    socket.onmessage = (event) => {
      try {
        const jsonData = JSON.parse(event.data);
        console.log(jsonData)
        // Create a copy of the current machine data
        const updatedMachines = { ...machineStore.current };

        // Log the received data for debugging
        console.log("Received WebSocket Data:", jsonData);

        // Process each machine's data if present
        ["machine1", "machine2", "machine3"].forEach((machine) => {
          const machineData = jsonData[machine];
          // Skip if this machine's data is not present in this message
          if (!machineData) return;

          console.log(`${machine} Input:`, machineData);

          // Convert machine key format (e.g., "machine1" to "Machine1")
          const machineKey = machine.charAt(0).toUpperCase() + machine.slice(1);
          // Get current data for this machine or initialize empty object
          const currentData = { ...updatedMachines[machineKey] };

          // Process each column of data for this machine
          Object.entries(machineData).forEach(([colStr, entries]) => {
            const col = parseInt(colStr);
            const hardcodedKeys = HARDCODED_NUM1[col];

            // Initialize or maintain existing column data
            const newData = [
              ...(currentData[col] ||
                new Array(hardcodedKeys.length).fill(null)),
            ];

            // Create mapping of keys to indices for easy lookups
            const keyToIndex = Object.fromEntries(
              hardcodedKeys.map((key, i) => [key, i])
            );

            // Process each entry in this column
            entries.forEach((entry) => {
              const [k, v] = entry.split("->").map((x) => x.trim());
              const key = parseInt(k),
                val = parseFloat(v);
              if (!isNaN(val) && keyToIndex.hasOwnProperty(key)) {
                newData[keyToIndex[key]] = `${key}->${val}`;
              }
            });

            // Update column data
            currentData[col] = newData;
          });

          // Update this machine's data in our store
          updatedMachines[machineKey] = currentData;
        });

        // Update machine store with new data
        machineStore.current = updatedMachines;

        // Recalculate summed data based on all machines
        const summedData = recalculateSummedData();

        setTablesData({
          ...updatedMachines,
          Summed: summedData,
        });
      } catch (error) {
        console.error("Error parsing WebSocket data:", error);
      }
    };
  }, []);

  const getThreeLowestValues = (data, start, end) => {
    const result = {};
    for (const [col, values] of Object.entries(data)) {
      const slice = values.slice(start, end);
      const parsed = slice
        .map((entry) => ({ entry, val: parseFloat(entry?.split("->")[1]) }))
        .filter((x) => !isNaN(x.val));
      parsed.sort((a, b) => a.val - b.val);
      result[col] = parsed.slice(0, 3).map((x) => x.entry);
    }
    return result;
  };
  const sendToTelegram = async (title, messageObj) => {
    const message = Object.entries(messageObj)
      .map(([col, entries]) => {
        const cleanedEntries = entries.map(entry => entry.split("->")[0].trim());
        return `${cleanedEntries.join(", ")}`;
      })
      .join(",");

    await fetch("http://be.khodalmaa.in/api/v1/send-alert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
  };

  const handleSendFirstHalf = () => {
    const data = getThreeLowestValues(tablesData["Summed"], 0, 11);
    sendToTelegram("🔵 First Half Lowest Values", data);
  };

  const handleSendSecondHalf = () => {
    const data = getThreeLowestValues(tablesData["Summed"], 11, 21);
    sendToTelegram("🟢 Second Half Lowest Values", data);
  };

  const handleSendBothHalves = () => {
  const firstHalf = getThreeLowestValues(tablesData["Summed"], 0, 11);
  const secondHalf = getThreeLowestValues(tablesData["Summed"], 11, 21);
  const merged = {};

  for (const col of allColumns) {
    const upEntries = firstHalf[col] || [];
    const downEntries = secondHalf[col] || [];

    // Combine entries, then clean: remove arrow and anything after "->"
    const cleanedEntries = [...upEntries, ...downEntries].map(entry => {
      const raw = entry.replace(/^↑|^↓/, '').split("->")[0];
      return raw.trim();
    });

    merged[col] = cleanedEntries;
  }

  sendToTelegram("🟣 Both Halves Lowest Values", merged);
  };

  const renderTable = (machine) => {
    const data = tablesData[machine] || {};
    const minFirstHalf = getThreeLowestValues(data, 0, 11);
    const minSecondHalf = getThreeLowestValues(data, 11, 21);

    const maxRows = Math.max(
      ...Object.values(data).map((col) => col.length),
      0
    );

    return (
      <div key={machine} className="mb-12">
        <h3 className="font-bold text-3xl mb-4">{machine}</h3>
        <table
          className="table-auto border-collapse border w-full text-xl"
          style={{ tableLayout: "fixed" }}
        >
          <thead>
            <tr className="bg-gray-300">
              {allColumns.map((col) => (
                <th key={col} className="border px-6 py-3">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: maxRows }).map((_, rowIdx) => (
              <tr key={rowIdx}>
                {allColumns.map((col) => {
                  const colData = data[col] || [];
                  const cell = colData[rowIdx] || "";
                  const isMin =
                    (rowIdx < 11 && minFirstHalf[col]?.includes(cell)) ||
                    (rowIdx >= 11 &&
                      rowIdx < 21 &&
                      minSecondHalf[col]?.includes(cell));
                  return (
                    <td
                      key={col}
                      className="border px-6 py-3 text-center"
                      style={
                        isMin
                          ? {
                              backgroundColor: "#03055B",
                              color: "white",
                              border: "4px solid blue",
                            }
                          : {}
                      }
                    >
                      {cell}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="overflow-auto p-6" style={{background:"black",color:"white"}}>
      <div className="mb-6 flex flex-wrap gap-4">
        <button onClick={handleSendFirstHalf} className="bg-blue-600 text-white px-4 py-2 rounded shadow">
          📤 Send First Half
        </button>
        <button onClick={handleSendSecondHalf} className="bg-green-600 text-white px-4 py-2 rounded shadow">
          📤 Send Second Half
        </button>
        <button onClick={handleSendBothHalves} className="bg-purple-600 text-white px-4 py-2 rounded shadow">
          📤 Send Both
        </button>
      </div>
      {["Machine1", "Machine2", "Machine3", "Summed"].map(renderTable)}
    </div>
  );
};

export default WebSocketTable;


