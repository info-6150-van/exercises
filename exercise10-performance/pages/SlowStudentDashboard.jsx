import React, { useCallback, useMemo, useState } from "react";
import HeavyComponent from "../components/HeavyComponent";
import HeavyAnalyticsChart from "../components/HeavyAnalyticsChart";

function expensiveCalculation() {
  console.log("Running expensive calculation...");

  let result = 0;

  for (let i = 0; i < 1000000; i++) {
    result += Math.random();
  }

  return result;
}

export default function SlowStudentDashboard() {
  const [inputValue, setInputValue] = useState("");
  const [count, setCount] = useState(0);

  const heavyData = useMemo(() => {
    return expensiveCalculation();
  }, []);

  const chartConfig = useMemo(() => {
    return {
      theme: "dark",
      value: heavyData,
    };
  }, [heavyData]);

  const handleChartUpdate = useCallback(() => {
    console.log("Chart updated");
  }, []);

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "24px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Performance Audit Dashboard</h1>

      <div
        style={{
          marginTop: "20px",
          borderRadius: "12px",
          overflow: "hidden",
          border: "1px solid #ddd",
        }}
      >
        <img
          src="https://via.placeholder.com/1200x600.png"
          alt="Large Hero Asset"
          loading="lazy"
          style={{
            display: "block",
            width: "100%",
            height: "auto",
          }}
        />
      </div>

      <div
        style={{
          marginTop: "24px",
          padding: "16px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          backgroundColor: "#fff",
        }}
      >
        <h2 style={{ marginTop: 0 }}>Interactivity Test</h2>

        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type here smoothly..."
          style={{
            width: "100%",
            maxWidth: "320px",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            marginBottom: "12px",
          }}
        />

        <div>
          <button onClick={() => setCount((prev) => prev + 1)}>
            Re-render App (Count: {count})
          </button>
        </div>

        <p style={{ marginTop: "12px", color: "#555" }}>
          Current input: {inputValue || "Empty"}
        </p>
      </div>

      <div style={{ marginTop: "24px" }}>
        <HeavyAnalyticsChart
          config={chartConfig}
          onUpdate={handleChartUpdate}
        />
      </div>

      <HeavyComponent />
    </div>
  );
}