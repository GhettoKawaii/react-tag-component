import React from "react";
import "./Tag.css";

const Tag = ({ tag, selectTag, deleteTag, tagID }) => {
  console.log("tagID", tagID);
  return (
    <div
      className="tag"
      style={tag.category && { backgroundColor: `${tag.category.color}` }}
      onClick={() => selectTag(tagID)}
    >
      <button onClick={deleteTag} id={tagID} className="delete-tag">
        &#10006;
      </button>
      {tag.name}
    </div>
  );
};
export default Tag;
