import React, { Component } from "react";
import "./TagInput.css";

import ConfigureTag from "../ConfigureTag";
import Tag from "../Tag";

export default class TagInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      tags: [],
      isEmpty: false,
      selectedTag: null,
      categories: [
        { name: "transport", color: "#676767" },
        { name: "fruits", color: "#DFFF2D" },
        { name: "animals", color: "#198111" },
        { name: "names", color: "#FC1B1B" }
      ]
    };
    this.selectTag = this.selectTag.bind(this);
    this.deleteTag = this.deleteTag.bind(this);
    this.configureTag = this.configureTag.bind(this);
  }

  handleChange = e => {
    this.setState({
      input: e.target.value
    });
  };

  handleClick = e => {
    if (this.state.input.length > 0) {
      this.setState({
        isEmpty: false,
        tags: [
          ...this.state.tags,
          { id: this.state.tags.length, name: this.state.input }
        ],
        input: ""
      });
    } else {
      this.setState({
        isEmpty: true
      });
    }
  };

  _handleKeyDown = e => {
    if (e.key === "Enter") {
      this.handleClick();
    }
  };

  deleteTag = e => {
    let findItem = this.state.tags.find(tag => {
      return e.target.id == tag.id;
    });
    let tagArr = this.state.tags;
    tagArr.splice(this.state.tags.indexOf(findItem), 1);
    this.setState({
      tags: tagArr
    });
  };

  selectTag = id => {
    this.setState({
      selectedTag: id
    });
  };

  configureTag = select => {
    let newTags = this.state.tags;
    let categoryForTag = this.state.categories.find(cat => {
      return cat.name === select.target.value;
    });
    newTags[
      newTags.indexOf(
        newTags.find(tag => {
          return tag.id === this.state.selectedTag;
        })
      )
    ].category = {
      ...categoryForTag
    };
    this.setState({
      tags: newTags
    });
  };

  render() {
    console.log("%cthis.state", "color: orange; font-size: 20px", this.state);
    let { input, isEmpty, tags, selectedTag } = this.state;
    return (
      <div>
        <h1>This is React-Tag-Component, by the way "AREERS"!</h1>
        <div className="input-with-tags">
          <input
            type="text"
            placeholder="Waiting for your tag..."
            value={input}
            onChange={this.handleChange}
            onKeyDown={this._handleKeyDown}
          />
          <div className="tags-wrapper">
            {tags.length > 0
              ? tags.map((tag, key) => {
                  return (
                    <Tag
                      key={key}
                      deleteTag={this.deleteTag}
                      selectTag={this.selectTag}
                      tagID={key}
                      tag={tag}
                    />
                  );
                })
              : null}
          </div>
        </div>

        <button onClick={this.handleClick}>Add tag</button>
        {isEmpty && <p>Nothing to add, bruh -_-</p>}
        {selectedTag != null && (
          <ConfigureTag
            categories={this.state.categories}
            configureTag={this.configureTag}
          />
        )}
      </div>
    );
  }
}
