import React from "react";
import "./ConfigureTag.css";

const ConfigureTag = ({ categories, configureTag }) => {
  return (
    <div className="configure-tag-container">
      <label>Category:</label>
      <select onChange={configureTag}>
        Category:
        <option>...</option>
        {categories.map((category, key) => {
          return (
            <option key={key} value={category.name}>
              {category.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export default ConfigureTag;
