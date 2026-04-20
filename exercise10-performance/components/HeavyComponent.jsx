import React, { useCallback, useMemo, useState } from "react";
import RowItem from "./RowItem";

const makeHugeArray = () =>
  new Array(3000).fill(0).map((_, i) => ({
    id: i,
    text: "Item " + i + " " + new Array(100).fill("x").join(""),
  }));

export default function HeavyComponent() {
  const [input, setInput] = useState("");

  const items = useMemo(() => {
    return makeHugeArray().map((row) => ({
      ...row,
      computed: row.text.split("").reverse().join(""),
    }));
  }, []);

  const filteredItems = useMemo(() => {
    const keyword = input.trim().toLowerCase();

    if (!keyword) {
      return items;
    }

    return items.filter((row) => row.text.toLowerCase().includes(keyword));
  }, [items, input]);

  const derivedValue = useMemo(() => {
    return filteredItems
      .slice(0, 20)
      .map((row) => row.id)
      .join("-");
  }, [filteredItems]);

  const handleButtonClick = useCallback((id) => {
    alert(`Clicked row ${id}`);
  }, []);

  return (
    <div
      style={{
        border: "2px solid green",
        borderRadius: "10px",
        padding: "16px",
        marginTop: "24px",
        backgroundColor: "#fff",
      }}
    >
      <h2 style={{ marginTop: 0 }}>HeavyComponent (Optimized)</h2>

      <p>
        This version avoids unnecessary recalculation and reduces repeated
        rendering work.
      </p>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type here to filter..."
        style={{
          width: "100%",
          maxWidth: "320px",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "6px",
        }}
      />

      <div
        style={{
          height: "300px",
          overflowY: "auto",
          border: "1px solid #ddd",
          marginTop: "16px",
          borderRadius: "6px",
          backgroundColor: "#fcfcfc",
        }}
      >
        {filteredItems.map((row) => (
          <RowItem key={row.id} row={row} onButtonClick={handleButtonClick} />
        ))}
      </div>

      <p style={{ marginTop: "16px" }}>
        <strong>Derived:</strong> {derivedValue || "No matching items"}
      </p>
    </div>
  );
}