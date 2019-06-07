import React from "react";
import "./Tag.css";

const Tag = ({ tag, selectTag, deleteTag }) => {
  return (
    <div
      className="tag"
      style={
        tag.category && tag.disabled
          ? { backgroundColor: `${tag.category.color}`, opacity: "0.5" }
          : tag.category
          ? { backgroundColor: `${tag.category.color}` }
          : tag.disabled
          ? { opacity: "0.5" }
          : null
      }
      onClick={() => selectTag(tag.id)}
    >
      {tag.description && (
        <span className="tag-tooltip-description">{tag.description}</span>
      )}
      <button
        onClick={e => deleteTag(e, tag)}
        id={tag.id}
        className="delete-tag"
      >
        &#10006;
      </button>
      <p>{tag.name}</p>
      {tag.category && (
        <p className="tag-category">Category: {tag.category.name}</p>
      )}
    </div>
  );
};
export default Tag;
