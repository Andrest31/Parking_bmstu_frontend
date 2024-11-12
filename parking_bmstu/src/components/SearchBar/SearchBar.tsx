import React from 'react';
import './SearchBar.css';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onSubmit }) => {
  return (
    <form
      className="search-bar"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <input
        type="text"
        className="search"
        placeholder="Поиск"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button type="submit" className="submit">Найти</button>
    </form>
  );
};

export default SearchBar;