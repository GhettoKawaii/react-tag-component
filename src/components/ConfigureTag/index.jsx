import React from "react";
import "./ConfigureTag.css";

const ConfigureTag = ({ categories, configureTag, closeConfigureTag, tag }) => {
  return (
    <div className="configure-tag-container">
      <button onClick={closeConfigureTag} className="close-configure-tag">
        &#10006;
      </button>
      <span className="configure-tag-name">{tag.name}</span>
      <div className="configure-category">
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
    </div>
  );
};
export default ConfigureTag;
