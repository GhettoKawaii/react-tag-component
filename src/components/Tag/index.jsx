import React from "react";
import "./Tag.css";

const Tag = ({ tag, selectTag, deleteTag, tagID }) => {
  return (
    <div
      className="tag"
      style={tag.category && { backgroundColor: `${tag.category.color}` }}
      onClick={() => selectTag(tagID)}
    >
      <button onClick={deleteTag} id={tagID} className="delete-tag">
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
