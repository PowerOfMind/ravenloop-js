import { useState } from "react";
import PropTypes from "prop-types";

export const SearchChannel = ({ onNewChannel }) => {
  const [inputValue, setInputValue] = useState("");

  const onInputChange = ({ target }) => {
    setInputValue(target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim().length <= 1) return;
    setInputValue("");
    onNewChannel(inputValue.trim());
  };
  return (
    <form onSubmit={onSubmit} aria-label="form">
      <input
        type="text"
        placeholder="Buscar gifs..."
        value={inputValue}
        onChange={onInputChange}
      />
    </form>
  );
};
SearchChannel.propTypes = {
  onNewChannel: PropTypes.func.isRequired,
};
