import React from "react";

const HeavyAnalyticsChart = React.memo(function HeavyAnalyticsChart({
  config,
  onUpdate,
}) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        backgroundColor: "#fafafa",
      }}
    >
      <h3 style={{ marginTop: 0 }}>Analytics Chart</h3>
      <p>
        <strong>Theme:</strong> {config.theme}
      </p>
      <p>
        <strong>Value:</strong> {config.value.toFixed(2)}
      </p>
      <button onClick={onUpdate}>Update Chart</button>
    </div>
  );
});

export default HeavyAnalyticsChart;