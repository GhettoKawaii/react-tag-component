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
      showCatConfig: false,
      tags: [],
      isEmpty: false,
      configureCategory: null,
      selectedTag: null,
      categories: [
        { name: "transport", color: "#676767" },
        { name: "fruits", color: "#DFFF2D" },
        { name: "animals", color: "#198111" },
        { name: "names", color: "#FC1B1B" }
      ]
    };
    this.state.tags = [
      {
        id: 20,
        name: "Sanya",
        category: this.state.categories[3],
        disabled: false,
        description: "The best name ever",
        show: false
      },
      {
        id: 21,
        name: "Passat",
        category: this.state.categories[0],
        disabled: false,
        description: "German auto",
        show: false
      },
      {
        id: 22,
        name: "Banana",
        category: this.state.categories[1],
        disabled: false,
        description: "Yellow sausage",
        show: false
      },
      {
        id: 23,
        name: "Iguana",
        category: this.state.categories[2],
        disabled: false,
        description: "Anonymous agent",
        show: false
      }
    ];
    this.selectTag = this.selectTag.bind(this);
    this.deleteTag = this.deleteTag.bind(this);
    this.configureTag = this.configureTag.bind(this);
    this.closeConfigureTag = this.closeConfigureTag.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onDisable = this.onDisable.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
  }

  handleChange = e => {
    const userInput = e.currentTarget.value;

    const filteredSuggestions = this.state.tags.filter(
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

  onDisable = (e, tag) => {
    let newTags = this.state.tags;
    newTags[newTags.indexOf(newTags.find(item => item === tag))].disabled =
      e.currentTarget.checked;
    this.setState({
      tags: newTags
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
          {
            id: this.state.tags.length,
            name: this.state.input,
            disabled: false,
            description: "",
            show: true
          }
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
    let newTags = this.state.tags;
    newTags[
      newTags.indexOf(
        this.state.tags.find(tag => {
          return tag.name === e.target.getAttribute("value");
        })
      )
    ].show = true;
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      input: "",
      tags: newTags
    });
  };
  handleChangeDescription = (e, tag) => {
    let tags = this.state.tags;
    tags[
      tags.indexOf(
        tags.find(item => {
          return item.id === tag.id;
        })
      )
    ].description = e.currentTarget.value;
    this.setState({ tags });
  };

  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    // enter
    if (e.keyCode === 13) {
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

  deleteTag = (e, tag) => {
    e.stopPropagation();
    if (!tag.disabled) {
      let findItem = this.state.tags.find(tag => {
        return Number(e.currentTarget.id) === tag.id;
      });
      let tagArr = this.state.tags;
      tagArr.splice(this.state.tags.indexOf(findItem), 1);
      this.setState({
        tags: tagArr,
        selectedTag: null
      });
    }
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
    this.setState({
      selectedTag: null
    });
  };
  handleCategorySelect = e => {
    this.setState({
      configureCategory: e.target.value
    });
  };
  handleColor = e => {
    let newCategories = this.state.categories;
    newCategories[
      newCategories.indexOf(
        newCategories.find(cat => {
          return cat.name === this.state.configureCategory;
        })
      )
    ].color = e.target.value;
    this.setState({
      categories: newCategories
    });
  };
  createNewCategory = e => {
    if (e.keyCode === 13) {
      if (
        this.state.categories.indexOf(
          this.state.categories.find(cat => {
            return cat.name === e.currentTarget.value;
          })
        )
      ) {
        this.setState({
          categories: [
            ...this.state.categories,
            { name: e.currentTarget.value, color: "coral" }
          ]
        });
      } else alert("Category already exist");
    }
  };

  render() {
    console.log("%cthis.state", "color: orange; font-size: 20px", this.state);
    let {
      handleChange,
      onKeyDown,
      onClick,
      deleteTag,
      selectTag,
      closeConfigureTag,
      configureTag,
      onDisable,
      handleChangeDescription,
      handleCategorySelect,
      handleColor,
      createNewCategory,
      state: {
        input,
        isEmpty,
        tags,
        selectedTag,
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        categories,
        configureCategory
      }
    } = this;
    const showTags = this.state.tags.filter(tag => {
      return tag.show;
    });
    return (
      <div className="input-wrapper">
        <div
          className="categories-info-box"
          style={
            this.state.showCatConfig
              ? { visibility: "visible" }
              : { visibility: "hidden" }
          }
        >
          <h2>Configurate categories here</h2>
          <div className="category-configure-rows">
            <div>
              <label>Create category:</label>
              <input onKeyDown={createNewCategory} />
            </div>
            <div>
              <label>Select category:</label>
              <select onChange={handleCategorySelect}>
                <option>...</option>
                {this.state.categories.map((category, key) => {
                  return <option key={key}>{category.name}</option>;
                })}
              </select>
            </div>
            {configureCategory && (
              <div>
                <label>Select color</label>
                <select onChange={handleColor}>
                  <option>...</option>
                  <option>black</option>
                  <option>silver</option>
                  <option>gray</option>
                  <option>white</option>
                  <option>maroon</option>
                  <option>red</option>
                  <option>purple</option>
                  <option>fuchsia</option>
                  <option>green</option>
                  <option>lime</option>
                  <option>olive</option>
                  <option>yellow</option>
                  <option>navy</option>
                  <option>blue</option>
                  <option>teal</option>
                  <option>aqua</option>
                </select>
              </div>
            )}
          </div>
        </div>
        <h1>This is React-Tag-Component, by the way "AREERS"!</h1>
        <div className="input-with-tags">
          <Autocomplete
            onChange={handleChange}
            suggestions={tags}
            userInput={input}
            onKeyDown={onKeyDown}
            onClick={onClick}
            activeSuggestion={activeSuggestion}
            filteredSuggestions={filteredSuggestions}
            showSuggestions={showSuggestions}
          />
          <div className="tags-wrapper">
            {showTags.length > 0
              ? showTags.map((tag, key) => {
                  return (
                    <Tag
                      key={key}
                      deleteTag={deleteTag}
                      selectTag={selectTag}
                      tag={tag}
                    />
                  );
                })
              : null}
          </div>
        </div>
        <button onClick={this.handleClick}>Add tag</button>
        <button
          onClick={() => {
            this.setState({ showCatConfig: !this.state.showCatConfig });
          }}
        >
          Show categories configuration
        </button>
        {isEmpty && <p>Nothing to add, bruh -_-</p>}
        {selectedTag != null && (
          <ConfigureTag
            categories={categories}
            configureTag={configureTag}
            closeConfigureTag={closeConfigureTag}
            onDisable={onDisable}
            handleChangeDescription={handleChangeDescription}
            tag={tags.find(tag => {
              return tag.id === selectedTag;
            })}
          />
        )}
      </div>
    );
  }
}
