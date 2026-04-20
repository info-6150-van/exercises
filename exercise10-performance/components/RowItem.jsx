import React from "react";

const RowItem = React.memo(function RowItem({ row, onButtonClick }) {
  return (
    <div
      style={{
        padding: "8px 12px",
        borderBottom: "1px solid #eee",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "12px",
      }}
    >
      <div>
        <strong>{row.id}</strong> - {row.computed.substring(0, 60)}
      </div>

      <button onClick={() => onButtonClick(row.id)}>Fast Btn</button>
    </div>
  );
});

export default RowItem;