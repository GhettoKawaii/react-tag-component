import React, { Component } from "react";
import "./ConfigureTag.css";

class ConfigureTag extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   tag: this.props.tag
    // };
  }
  // handleChangeDescription = e => {
  //   this.setState({
  //     tag: {
  //       ...this.state.tag,
  //       description: e.currentTarget.value
  //     }
  //   });
  // };
  // handleKeyDown = e => {
  //   if (e.keyCode === 13) {
  //     // this.setState({

  //     // })
  //     // this.state.tag.description = e.currentTarget.value;
  //     this.props.changeDescription(this.state.tag);
  //   }
  // };
  render() {
    let {
      // handleKeyDown,
      props: {
        closeConfigureTag,
        configureTag,
        onDisable,
        tag,
        handleChangeDescription
      }
    } = this;
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
            {this.props.categories.map((category, key) => {
              return (
                <option key={key} value={category.name}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="configure-disable">
          <label className="switch-disable">
            <p>Disabled</p>
            <input
              onChange={e => onDisable(e, tag)}
              type="checkbox"
              checked={tag.disabled}
            />
            <span className="slider round" />
          </label>
        </div>
        <div className="configure-description">
          <label>Description</label>
          <input
            value={tag.description}
            onChange={e => handleChangeDescription(e, tag)}
            // onKeyDown={handleKeyDown}
          />
        </div>
      </div>
    );
  }
}
export default ConfigureTag;
