"use client";
import React, { useState, useRef, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "rsuite/dist/rsuite.min.css";
import "rsuite-table/dist/css/rsuite-table.css";
import { Button } from "rsuite";
import styled from "styled-components";
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

  const machineStore = useRef({
    Machine1: {},
    Machine2: {},
    Machine3: {},
  });

const allColumns = Array.from({ length: 10 }, (_, i) => String(i + 1));

  const recalculateSummedData = () => {
    const updatedMachines = machineStore.current;
    const summedData = {};

    allColumns.forEach((col) => {
      const keys = HARDCODED_NUM1[col];
      summedData[col] = keys.map((key, idx) => {
        const val1 = parseFloat(updatedMachines.Machine1[col]?.[idx]?.split("->")[1] || 0);
        const val2 = parseFloat(updatedMachines.Machine2[col]?.[idx]?.split("->")[1] || 0);
        const val3 = parseFloat(updatedMachines.Machine3[col]?.[idx]?.split("->")[1] || 0);
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
        const updatedMachines = { ...machineStore.current };

        ["machine1", "machine2", "machine3"].forEach((machine) => {
          const machineData = jsonData[machine];
          if (!machineData) return;

          const machineKey = machine.charAt(0).toUpperCase() + machine.slice(1);
          const currentData = { ...updatedMachines[machineKey] };

          Object.entries(machineData).forEach(([colStr, entries]) => {
            const col = parseInt(colStr);
            const hardcodedKeys = HARDCODED_NUM1[col];
            const newData = [...(currentData[col] || new Array(hardcodedKeys.length).fill(null))];
            const keyToIndex = Object.fromEntries(hardcodedKeys.map((key, i) => [key, i]));

            entries.forEach((entry) => {
              const [k, v] = entry.split("->").map((x) => x.trim());
              const key = parseInt(k), val = parseFloat(v);
              if (!isNaN(val) && keyToIndex.hasOwnProperty(key)) {
                newData[keyToIndex[key]] = `${key}->${val}`;
              }
            });

            currentData[col] = newData;
          });
          updatedMachines[machineKey] = currentData;
        });

        machineStore.current = updatedMachines;
        const summedData = recalculateSummedData();

        setTablesData({ ...updatedMachines, Summed: summedData });
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
 const getThreeLowestValuesInHalves = (data, columnNo) => {
  const result = {};

  // If columnNo is given, only process that column
  const targetEntries = columnNo !== undefined
    ? { [columnNo]: data[columnNo] }
    : data;

  for (const [col, values] of Object.entries(targetEntries)) {
    // First half: rows 0-11
    const firstHalf = values.slice(0, 11);
    const parsedFirst = firstHalf
      .map((entry) => ({ entry, val: parseFloat(entry?.split("->")[1]) }))
      .filter((x) => !isNaN(x.val))
      .sort((a, b) => a.val - b.val)
      .slice(0, 3)
      .map((x) => x.entry);

    // Second half: rows 11-21
    const secondHalf = values.slice(11, 21);
    const parsedSecond = secondHalf
      .map((entry) => ({ entry, val: parseFloat(entry?.split("->")[1]) }))
      .filter((x) => !isNaN(x.val))
      .sort((a, b) => a.val - b.val)
      .slice(0, 3)
      .map((x) => x.entry);

    result[col] = {
      firstHalf: parsedFirst,
      secondHalf: parsedSecond
    };
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

    await fetch("https://be.khodalmaa.in/api/v1/send-alert", {
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
      const cleanedEntries = [...upEntries, ...downEntries].map(entry =>
        entry.replace(/^↑|^↓/, '').split("->")[0].trim()
      );
      merged[col] = cleanedEntries;
    }

    sendToTelegram("🟣 Both Halves Lowest Values", merged);
  };


// const handleSendBothHalvesColumn = (columnName = null) => {
//   const firstHalf = getThreeLowestValues(tablesData["Summed"], 0, 11);
//   const secondHalf = getThreeLowestValues(tablesData["Summed"], 11, 21);
  
//   const merged = {};
  
//   // Decide which columns to process
//   const columnsToProcess = columnName ? [columnName] : allColumns;
  
//   for (const col of columnsToProcess) {
//     const upEntries = firstHalf[col] || [];
//     const downEntries = secondHalf[col] || [];

//     const cleanedEntries = [...upEntries, ...downEntries]
//       .map(entry => entry.replace(/^↑|^↓/, '').split("->")[0].trim());

//     merged[col] = cleanedEntries;
//   }

//   sendToTelegram(
//     `🟣 Both Halves Lowest Values${columnName ? ` for ${columnName}` : ""}`,
//     merged
//   );
// };

// console.log(handleSendBothHalvesColumn("1"))

const renderTable = (machine) => {
  const data = tablesData[machine] || {};
  const minFirstHalf = getThreeLowestValues(data, 0, 11);
  const minSecondHalf = getThreeLowestValues(data, 11, 21);

  const maxRows = Math.max(...Object.values(data).map((col) => col.length), 0);

 const rows = Array.from({ length: maxRows }).map((_, rowIdx) => {
  const rowObj = { id: rowIdx }; 
  allColumns.forEach((col) => {
    rowObj[col] = data[col]?.[rowIdx] || "";
  });
  return rowObj;
});


 const columns = allColumns
  .filter((col) => col !== "id")
  .map((col) => ({
    field: col,
    headerName: col,
    width: 120,
    sortable: false,
    // renderHeader: (params) => (
    //   <div
    //     onClick={() => handleSendBothHalvesColumn(col)}
    //     style={{
    //       cursor: "pointer",
    //       fontWeight: "bold",
    //       color: "#032859",
    //       userSelect: "none"
    //     }}
    //     title={`Click to send lowest values for ${col}`}
    //   >
    //     {col}
    //   </div>
    // ),

    renderCell: (params) => {
      const value = params.value;
      const highlight =
        (params.id < 11 && minFirstHalf[col]?.includes(value)) ||
        (params.id >= 11 && params.id < 21 && minSecondHalf[col]?.includes(value));

      return (
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: highlight ? "#032859" : "transparent",
            color: highlight ? "#00ffff" : "black",
            border: highlight ? "1px solid #00ffff" : "none",
            borderRadius: highlight ? "4px" : "0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {value}
        </div>
      );
    },
  }));

const handleSendBothHalvesColumn = (columnName = null) => {
  const firstHalf = getThreeLowestValues(tablesData["Summed"], 0, 11);
  const secondHalf = getThreeLowestValues(tablesData["Summed"], 11, 21);

  const merged = {};

  const columnsToProcess = columnName ? [columnName] : allColumns;

  for (const col of columnsToProcess) {
    const upEntries = firstHalf[col] || [];
    const downEntries = secondHalf[col] || [];

    const cleanedEntries = [...upEntries, ...downEntries]
      .map(entry => entry.replace(/^↑|^↓/, '').split("->")[0].trim());

    merged[col] = cleanedEntries;
  }

  sendToTelegram(
    `🟣 Both Halves Lowest Values${columnName ? ` for ${columnName}` : ""}`,
    merged
  );
};


  return (
    <Body key={machine} style={{ marginBottom: "3rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "12px",
        }}
      >
        <h3 style={{ fontSize: "1.75rem", fontWeight: "bold", color: "#477998ff" }} className="mq450:block">
          {machine}
        </h3>
          {machine === "Summed" && (
      <div className="summed-buttons">
        <Button
          appearance="primary"
          style={{ background: "#477998ff" }}
          onClick={handleSendFirstHalf}
        >
          Send First Half
        </Button>
        <Button
          appearance="primary"
          style={{ background: "#477998ff" }}
          onClick={handleSendSecondHalf}
        >
          Send Second Half
        </Button>
        <Button
          appearance="primary"
          style={{ background: "#477998ff" }}
          onClick={handleSendBothHalves}
        >
          Send Both
        </Button>
      </div>
    )}
      </div>

      <div style={{ height: 500, width: "100%", background: "#121212" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          disableRowSelectionOnClick
          hideFooter
          rowHeight= {60}
          sx={{
    color: "#ccc",
    border: "none",
    "& .MuiDataGrid-columnHeaders": {
      backgroundColor: "#222",
    },
    "& .MuiDataGrid-columnHeader": {
      color: "black",
      fontWeight: "bold",
      fontSize: "1.1rem",
    },
    "& .MuiDataGrid-cell": {
      borderColor: "#333",
    },
  }}
        />
      </div>
    </Body>
  );
};


  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="tables" style={{padding:"40px"}}>
      {["Machine1", "Machine2", "Machine3", "Summed"].map(renderTable)}
      <style>{`
        .hover-row:hover {
          background-color: rgba(0, 224, 255, 0.05) !important;
        }
      `}</style>
      </div>
    </div>
  );
};

export default WebSocketTable;
  

const Body = styled.div`
  .summed-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  }

  .summed-buttons {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  @media (max-width: 450px) {
    .summed-header {
      flex-direction: column;
      align-items: flex-start;
    }

    .summed-buttons {
      width: 130px;
      flex-direction: column;
      gap: 6px;
      margin-top: 8px;
    }

    .summed-buttons button {
      width: 100%;
    }
  }
`;
