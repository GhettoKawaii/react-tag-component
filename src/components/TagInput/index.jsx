import React, { Component } from "react";
import "./TagInput.css";

import ConfigureTag from "../ConfigureTag";
import Tag from "../Tag";
import Autocomplete from "../Autocomplete";

export default class TagInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
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
    this.closeConfigureTag = this.closeConfigureTag.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onClick = this.onClick.bind(this);
  }
  suggestions = [
    { id: 0, name: "Sanya", category: { name: "names", color: "#FC1B1B" } },
    {
      id: 1,
      name: "Passat",
      category: { name: "transport", color: "#676767" }
    },
    { id: 2, name: "XUI", category: { name: "fruits", color: "#DFFF2D" } },
    {
      id: 3,
      name: "Заказчик",
      category: { name: "animals", color: "#198111" }
    }
  ];

  handleChange = e => {
    const userInput = e.currentTarget.value;

    const filteredSuggestions = this.suggestions.filter(
      suggestion =>
        suggestion.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      input: e.currentTarget.value
    });
  };

  onClick = e => {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText.split("Category")[0]
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

  onClick = e => {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      input: e.currentTarget.innerText.split("Category")[0]
    });
  };

  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    // enter
    if (e.keyCode === 13) {
      // this.setState({
      //   activeSuggestion: 0,
      //   showSuggestions: false,
      //   input: filteredSuggestions[activeSuggestion].name
      // });
      this.handleClick();
    }
    // up
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // down
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  deleteTag = e => {
    console.log("e.target", e.target);
    let findItem = this.state.tags.find(tag => {
      return e.target.id === tag.id;
    });
    console.log("findItem", findItem);
    let tagArr = this.state.tags;
    tagArr.splice(this.state.tags.indexOf(findItem), 1);
    console.log("tagArr", tagArr);
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

  closeConfigureTag = () => {
    console.log("close");
    this.setState({
      selectedTag: null
    });
  };

  render() {
    console.log("%cthis.state", "color: orange; font-size: 20px", this.state);
    let {
      handleChange,
      suggestions,
      onKeyDown,
      onClick,
      deleteTag,
      selectTag,
      closeConfigureTag,
      state: {
        input,
        isEmpty,
        tags,
        selectedTag,
        activeSuggestion,
        filteredSuggestions,
        showSuggestions
      }
    } = this;
    console.log("selectedTag", selectedTag);
    return (
      <div className="input-wrapper">
        <h1>This is React-Tag-Component, by the way "AREERS"!</h1>
        <div className="input-with-tags">
          <Autocomplete
            onChange={handleChange}
            suggestions={suggestions}
            userInput={input}
            onKeyDown={onKeyDown}
            onClick={onClick}
            activeSuggestion={activeSuggestion}
            filteredSuggestions={filteredSuggestions}
            showSuggestions={showSuggestions}
          />
          <div className="tags-wrapper">
            {tags.length > 0
              ? tags.map((tag, key) => {
                  return (
                    <Tag
                      key={key}
                      deleteTag={deleteTag}
                      selectTag={selectTag}
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
            closeConfigureTag={closeConfigureTag}
            tag={tags.find(tag => {
              return tag.id === this.state.selectedTag;
            })}
          />
        )}
      </div>
    );
  }
}
