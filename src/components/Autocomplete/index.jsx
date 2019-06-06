import React, { Fragment } from "react";
import "./Autocomplete.css";

const Autocomplete = ({
  onChange,
  onClick,
  onKeyDown,
  activeSuggestion,
  filteredSuggestions,
  showSuggestions,
  userInput
}) => {
  let suggestionsListComponent;

  if (showSuggestions && userInput) {
    if (filteredSuggestions.length) {
      suggestionsListComponent = (
        <ul className="suggestions">
          {filteredSuggestions.map((suggestion, index) => {
            let className;
            if (index === activeSuggestion) {
              className = "suggestion-active";
            }

            return (
              <li className={className} key={suggestion.id} onClick={onClick}>
                {suggestion.name}
                <br />
                Category: {suggestion.category.name}
              </li>
            );
          })}
        </ul>
      );
    } else {
      suggestionsListComponent = (
        <div className="no-suggestions">
          <em>No suggestions, you're on your own!</em>
        </div>
      );
    }
  }

  return (
    <Fragment>
      <input
        type="text"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={userInput}
      />
      {suggestionsListComponent}
    </Fragment>
  );
};

export default Autocomplete;
