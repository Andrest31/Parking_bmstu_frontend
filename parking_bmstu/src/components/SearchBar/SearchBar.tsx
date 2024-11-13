import React from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onSubmit }) => {
  return (
    <Form
      className="d-flex search-bar"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(); // Вызов метода поиска при нажатии на кнопку
      }}
    >
      <FormControl
        type="text"
        placeholder="Поиск"
        className="me-2 search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      
    </Form>
  );
};

export default SearchBar;
