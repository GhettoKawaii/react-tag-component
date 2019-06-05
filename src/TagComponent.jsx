import React, { Component } from "react";

export default class TagComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      tags: [],
      isEmpty: false
    };
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

  render() {
    console.log("%cthis.state", "color: orange; font-size: 20px", this.state);
    let { input, isEmpty, tags } = this.state;
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
                    <div className="tag" key={key}>
                      <span
                        onClick={this.deleteTag}
                        id={key}
                        className="delete-tag"
                      >
                        &#10006;
                      </span>
                      {tag.name}
                    </div>
                  );
                })
              : null}
          </div>
        </div>

        <button onClick={this.handleClick}>Add tag</button>
        {isEmpty ? (
          <p>Nothing to add, bruh -_-</p>
        ) : (
          <p>Here is your input: {this.state.input}</p>
        )}
      </div>
    );
  }
}
