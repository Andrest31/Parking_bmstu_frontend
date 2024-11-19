import React from 'react';
import { Form, FormControl } from 'react-bootstrap';

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
        onSubmit(); // Вызов метода поиска при нажатии на кнопку или Enter
      }}
    >
      <FormControl
        type="text"
        placeholder="Введите время"
        className="me-2 search"
        value={value}
        onChange={(e) => onChange(e.target.value)} // Обновляем временное значение
      />
    </Form>
  );
};

export default SearchBar;
