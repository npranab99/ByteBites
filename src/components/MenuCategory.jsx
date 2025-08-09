// MenuCategory.jsx
import React from "react";
import MenuItem from "./MenuItem";

const MenuCategory = ({ title, itemCards = [], isExpanded, onToggle }) => {
  return (
    <div className="menu-category">
      <div
        style={{
          cursor: "pointer",
          color: "#007bff",
          marginBottom: "10px",
        }}
        onClick={() => onToggle(title)}
      >
        <h4>
          {title} {isExpanded ? "🔽" : "▶️"}
        </h4>
      </div>

      {isExpanded &&
        itemCards.map((item) => (
          <MenuItem key={item.card.info.id} item={item} />
        ))}
    </div>
  );
};

export default MenuCategory;
